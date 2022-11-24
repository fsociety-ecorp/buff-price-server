const db = require('../model');
const Buff = db.buff;

exports.saveSession = (req, res) => {
    const session = new Buff({
        sessionId: req.get('Cookie')
    });

    session.save(session)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while saving the session'
            });
        });
};

exports.findAll = (req, res) => {
    const cookie = req.get('Cookie');

    if (validateCookie(cookie)) {
        res.status(200).send({
            message: 'Success',
            sessionId: `${cookie}`
        });
        console.log('200 -> https://buff-server.herokuapp.com/api/buff/items')
    } else {
        res.status(400).send({
            message: 'Error: You need to specify the sessionId'
        });
        console.log('400 -> https://buff-server.herokuapp.com/api/buff/items -> Error: You need to specify the sessionId');
    }
}

function validateCookie(cookie) {
    return;
}