module.exports = app => {
    const buff = require('../controllers/buff.controller.js');

    var router = require("express").Router();

    // retrieves all items from Buff
    router.get('/items', buff.findAll);

    app.use('/api/buff', router);
};
