const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, role, licenseNumber } = req.body;

        // Default role (important fix)
        if (!role) {
            return res.status(400).json({ message: 'Role is required (patient/doctor)' });
        }

        if (role === 'patient') {
            const userExists = await Patient.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: 'Patient already exists' });
            }

            const patient = await Patient.create({ name, email, password });

            return res.status(201).json({
                _id: patient._id,
                name: patient.name,
                email: patient.email,
                role: 'patient',
                token: generateToken(patient._id, 'patient'),
            });
        }

        if (role === 'doctor') {
            if (!licenseNumber) {
                return res.status(400).json({ message: 'License number is required for doctors' });
            }

            const userExists = await Doctor.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: 'Doctor already exists' });
            }

            const doctor = await Doctor.create({ name, email, password, licenseNumber });

            return res.status(201).json({
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                role: 'doctor',
                token: generateToken(doctor._id, 'doctor'),
            });
        }

        return res.status(400).json({ message: 'Invalid role specified' });

    } catch (error) {
        console.error(error);
        next(error); // ✅ proper error handling
    }
};


// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        if (!role) {
            return res.status(400).json({ message: 'Role is required' });
        }

        if (role === 'patient') {
            const user = await Patient.findOne({ email });

            if (user && (await user.matchPassword(password))) {
                return res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: 'patient',
                    token: generateToken(user._id, 'patient'),
                });
            }

            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (role === 'doctor') {
            const user = await Doctor.findOne({ email });

            if (user && (await user.matchPassword(password))) {
                return res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: 'doctor',
                    token: generateToken(user._id, 'doctor'),
                });
            }

            return res.status(401).json({ message: 'Invalid email or password' });
        }

        return res.status(400).json({ message: 'Invalid role specified' });

    } catch (error) {
        console.error(error);
        next(error); // ✅ fix for "next is not a function"
    }
};

module.exports = { registerUser, loginUser };