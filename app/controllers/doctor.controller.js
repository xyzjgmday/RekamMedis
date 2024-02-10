const Doctor = require('../models/doctor.model');

exports.create = (req, res) => {
    const doctor = new Doctor({
        name: req.body.name,
        specialization: req.body.specialization,
        experience: req.body.experience,
        qualification: req.body.qualification,
        contact: req.body.contact,
        email: req.body.email,
        address: req.body.address
    });

    doctor.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the doctor."
            });
        });
};

exports.findAll = (req, res) => {
    Doctor.find()
        .then(doctors => {
            res.send(doctors);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving doctors."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.doctorId;

    Doctor.findById(id)
        .then(doctor => {
            if (!doctor) {
                return res.status(404).send({ message: "Doctor not found with id " + id });
            }
            res.send(doctor);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: "Doctor not found with id " + id });
            }
            return res.status(500).send({ message: "Error retrieving doctor with id " + id });
        });
};

exports.update = (req, res) => {
    const id = req.params.doctorId;

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    Doctor.findByIdAndUpdate(id, req.body, { new: true })
        .then(doctor => {
            if (!doctor) {
                return res.status(404).send({
                    message: `Doctor with id=${id} not found.`
                });
            }
            res.send(doctor);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Error updating Doctor with id=${id}.`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.doctorId;

    Doctor.findByIdAndRemove(id)
        .then(doctor => {
            if (!doctor) {
                return res.status(404).send({ message: "Doctor not found with id " + id });
            }
            res.send({ message: "Doctor deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({ message: "Doctor not found with id " + id });
            }
            return res.status(500).send({ message: "Could not delete doctor with id " + id });
        });
};
