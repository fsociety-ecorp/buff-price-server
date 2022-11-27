const db = require('../model');
const Buff = db.buff;

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
    Buff.find()
        .then(data => {
            if (data.length > 0) {
                res.status(200).send({
                    message: 'Success',
                    sessionId: `${data[0].session.id}`
                })
            } else {
                res.status(400).send({
                    message: 'Bad Request',
                })
            }
        })
}

function validateCookie(cookie) {
    return cookie != null && cookie != "";
}