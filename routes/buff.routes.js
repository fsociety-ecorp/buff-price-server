module.exports = app => {
    const buff = require('../controllers/buff.controller.js');

    var router = require("express").Router();

    // gets current session
    router.get('/session', buff.getSession);

    // saves new session
    router.post('/session', buff.postSession);

    // retrieves all items from Buff
    router.get('/items', buff.findAll);

    app.use('/api/buff', router);
};
