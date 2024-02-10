const mongoose = require('mongoose');

const MedicalRecordSchema = mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    prescription: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }, 
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    }
}, {
    timestamps: true
});

const MedicalRecord = mongoose.model('MedicalRecord', MedicalRecordSchema);

module.exports = MedicalRecord;
