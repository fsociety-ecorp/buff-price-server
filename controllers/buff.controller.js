const db = require('../model');
const Buff = db.buff;

exports.saveSession = (req, res) => {
    if (!req.body.session.id) {
        res.status(400).send({ message: 'sessionId cannot be empty' });
        return;
    }

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
            })
        } else {
            res.send(buff);
        }
    });
};

exports.findAll = (req, res) => {
    const cookie = req.get('Cookie');

    if (validateCookie(cookie)) {
        res.status(200).send({
            message: 'Success',
            sessionId: `${cookie}`
        });
        console.log('200 -> https://buff-server.herokuapp.com/api/buff/items');
    } else {
        res.status(400).send({
            message: 'Error: You need to specify the sessionId'
        });
        console.log('400 -> https://buff-server.herokuapp.com/api/buff/items -> Error: You need to specify the sessionId');
    }
}

function validateCookie(cookie) {
    return cookie != null && cookie != "";
}