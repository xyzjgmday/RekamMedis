const MedicalRecord = require("../models/medical-record.model");

exports.create = (req, res) => {
    if (!req.body.patientName || !req.body.diagnosis || !req.body.prescription || !req.body.doctorId) {
        return res.status(400).send({ message: "All fields are required!" });
    }

    const medicalRecord = new MedicalRecord({
        patientName: req.body.patientName,
        diagnosis: req.body.diagnosis,
        prescription: req.body.prescription,
        doctorId: req.body.doctorId
    });

    medicalRecord.save(medicalRecord)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Medical Record."
            });
        });
};

exports.findAll = (req, res) => {
    MedicalRecord.find()
        .then(medicalRecords => {
            res.send(medicalRecords);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving medical records."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    MedicalRecord.findById(id)
        .populate('doctorId')
        .exec((err, medicalRecord) => {
            if (err) {
                return res.status(500).send({ message: "Error retrieving Medical Record with id=" + id });
            }
            if (!medicalRecord) {
                return res.status(404).send({ message: "Medical Record not found with id " + id });
            }

            res.send(medicalRecord);
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    MedicalRecord.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Medical Record with id=${id}. Maybe Medical Record was not found!`
                });
            } else res.send({ message: "Medical Record was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Medical Record with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    MedicalRecord.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Medical Record with id=${id}. Maybe Medical Record was not found!`
                });
            } else {
                res.send({
                    message: "Medical Record was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Medical Record with id=" + id
            });
        });
};
