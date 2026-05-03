const Patient = require('../models/Patient');
const Record = require('../models/Record');

// @desc    Get patient profile
// @route   GET /api/patient/profile
// @access  Private (Patient only)
const getPatientProfile = async (req, res) => {
    try {
        const patient = await Patient.findById(req.user._id).select('-password');
        if (patient) {
            res.json(patient);
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update patient profile
// @route   PUT /api/patient/profile
// @access  Private (Patient only)
const updatePatientProfile = async (req, res) => {
    try {
        const patient = await Patient.findById(req.user._id);

        if (patient) {
            patient.name = req.body.name || patient.name;
            patient.emergencyContact = req.body.emergencyContact || patient.emergencyContact;
            patient.bloodGroup = req.body.bloodGroup || patient.bloodGroup;
            patient.allergies = req.body.allergies ? req.body.allergies : patient.allergies;
            patient.medicalConditions = req.body.medicalConditions ? req.body.medicalConditions : patient.medicalConditions;

            if (req.body.password) {
                patient.password = req.body.password;
            }

            const updatedPatient = await patient.save();
            res.json({
                _id: updatedPatient._id,
                name: updatedPatient.name,
                email: updatedPatient.email,
                emergencyContact: updatedPatient.emergencyContact,
                bloodGroup: updatedPatient.bloodGroup,
                allergies: updatedPatient.allergies,
                medicalConditions: updatedPatient.medicalConditions,
            });
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get patient records
// @route   GET /api/patient/records
// @access  Private (Patient only)
const getPatientRecords = async (req, res) => {
    try {
        const records = await Record.find({ patient: req.user._id });
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new record
// @route   POST /api/patient/records
// @access  Private (Patient only)
const addPatientRecord = async (req, res) => {
    try {
        const { title, description, fileUrl, category } = req.body;

        if (!title || !fileUrl) {
            return res.status(400).json({ message: 'Title and fileUrl are required' });
        }

        const record = new Record({
            patient: req.user._id,
            title,
            description,
            fileUrl,
            category: category || 'Other',
        });

        const createdRecord = await record.save();
        res.status(201).json(createdRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Generate OTP for doctor access
// @route   POST /api/patient/generate-otp
// @access  Private (Patient only)
const generateOtp = async (req, res) => {
    try {
        console.log('Generating OTP for user:', req.user._id);
        const patient = await Patient.findById(req.user._id);
        if (patient) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
            const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
            
            console.log('Generated OTP:', otp, 'Expires:', expires);
            
            patient.accessOtp = otp;
            patient.accessOtpExpires = expires;
            
            console.log('Saving patient document...');
            const savedPatient = await patient.save();
            console.log('Patient saved successfully. OTP stored.');

            res.json({ otp, expires });
        }
    } catch (error) {
        console.error('Error in generateOtp:', error);
        res.status(500).json({ message: error.message });
    }
};

const revokeOtp = async (req, res) => {
    try {
        const patient = await Patient.findById(req.user._id);
        if (patient) {
            patient.accessOtp = null;
            patient.accessOtpExpires = null;
            await patient.save();
            res.json({ message: 'Access revoked successfully' });
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPatientProfile,
    updatePatientProfile,
    getPatientRecords,
    addPatientRecord,
    generateOtp,
    revokeOtp,
};
