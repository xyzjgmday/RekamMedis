module.exports = (app) => {
    const records = require('../controllers/medical-record.controller');
    var router = require("express").Router();

    router.get('/', records.findAll);
    router.post('/', records.create);
    router.get('/:id', records.findOne);
    router.put('/:id', records.update);
    router.delete('/:id', records.delete);

    app.use("/api/medical-records", router);
}
