const Doctor = require('../models/doctor.model');

const initializeDoctors = async () => {
    try {
        // Buat dokter pertama
        const doctor1 = new Doctor({
            name: 'Dr. John Doe',
            specialization: 'General Physician',
            experience: 5,
            qualification: 'MBBS, MD',
            contact: '1234567890',
            email: 'john.doe@example.com',
            address: '123 Main Street, City, Country'
        });
        await doctor1.save();

        // Buat dokter kedua
        const doctor2 = new Doctor({
            name: 'Dr. Jane Smith',
            specialization: 'Pediatrician',
            experience: 8,
            qualification: 'MBBS, DCH',
            contact: '9876543210',
            email: 'jane.smith@example.com',
            address: '456 Park Avenue, City, Country'
        });
        await doctor2.save();

        console.log('Data dokter berhasil diinisialisasi.');
    } catch (err) {
        console.error('Gagal menginisialisasi data dokter:', err);
    }
};

module.exports = initializeDoctors;
