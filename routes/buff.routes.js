module.exports = app => {
    const buff = require('../controllers/buff.controller.js');

    var router = require("express").Router();

    // saves new session
    router.post('/session', buff.saveSession);

    // retrieves all items from Buff
    router.get('/items', buff.findAll);

    app.use('/api/buff', router);
};
