module.exports = (app) => {
    const doctors = require('../controllers/doctor.controller');
    var router = require("express").Router();

    router.get('/', doctors.findAll);
    router.post('/', doctors.create);
    router.get('/:doctorId', doctors.findOne);
    router.put('/:doctorId', doctors.update);
    router.delete('/:doctorId', doctors.delete);

    app.use("/api/doctors", router);
}
