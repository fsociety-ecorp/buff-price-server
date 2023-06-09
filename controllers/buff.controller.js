const db = require('../model');
const Buff = db.buff;
const Item = db.item;
const axios = require('axios');
const cron = require('node-cron');
const { sleep } = require('../utils/utils');

let BUFF_URL = 'https://buff.163.com/api/market/goods?game=csgo&page_num={page_num}&page_size=80';

exports.getSession = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Buff.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the current session."
            });
        });
}

exports.postSession = (req, res) => {
    if (!req.body.session.id) {
        res.status(400).send({ message: 'sessionId cannot be empty' });
        return;
    }

    Buff.deleteMany({})
        .catch(err => {
            console.log(`Some error occurred while removing the previous session.${err.message}`);
        });

    const buff = new Buff({
        session: {
            id: req.body.session.id,
            author: req.body.session.author
        }
    });

    buff.save(function (err) {
        if (err) {
            res.status(400).send({
                message: err.message || 'Some error occurred while saving the session'
            });
        } else {
            res.send(buff);
        }
    });
};

exports.findAll = (req, res) => {
    Item.find()
        .then(data => {
            if (data.length > 0) {
                res.status(200).send({
                    data,
                    total: data.length
                })
            } else {
                res.status(400).send({
                    message: 'Bad Request: You need to specify a session ID.',
                })
            }
        })
}

exports.forceItemsUpdate = (req, res) => {
    res.status(200).send({
        message: "Starting items update. This operation may take a while."
    });
    requestBuffItems()
}

cron.schedule("0 */3 * * *", () => {
    requestBuffItems()
});

async function requestBuffItems() {
    let totalPages = 0;
    let counter = 1;
    let cookie = "";

    var data = { items: [] }

    console.log(`Running the scheduled task to update BUFF163 items database. This may take a few minutes.`);

    Buff.find({}).then(data => {
        cookie = data[0].session.id
        console.log(`Starting database update with session id: ${cookie}`);
    });

    do {
        var url = BUFF_URL.replace('{page_num}', counter);

        console.log(`Requesting items from page ${counter} -> ${url}`);

        var requestOptions = {
            method: 'get',
            url: url,
            headers: {
                'Cookie': cookie,
                'Host': 'buff.163.com',
                'Accept-Encoding': 'application/json',
                'User-Agent': 'PostmanRuntime/7.29.2'
            }
        };

        const response = await axios(requestOptions);

        if (response.status == 200 && response.data.data != null) {
            totalPages = response.data.data.total_page;
            counter++;

            var iterator = response.data.data.items.values();
            for (let elements of iterator) {
                data.items.push(elements);
            }
        } else {
            console.log(`${response.status}: Error while requesting items -> ${response.data.code}`);
            return;
        }

        if (counter % 5 == 0) {
            await sleep(60000);
        } else if (counter % 20 == 0) {
            await sleep(80000);
        } else if (counter % 50 == 0) {
            await sleep(120000);
        } else if (counter % 100 == 0) {
            await sleep(200000);
        } else {
            continue;
        }
    } while (counter <= totalPages);

    console.log(`Requests finished, adding ${data.items.length} items to the database`);

    await Item.deleteMany({})
        .catch(err => {
            console.log(`Some error occurred while removing the previous items.${err.message}`);
        });

    await Item.insertMany(data.items)
        .catch(err => {
            console.log(`Some error occurred while inserting the new list of items.${err.message}`);
        });

    console.log('Update completed with success.');
}