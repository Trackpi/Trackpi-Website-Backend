const adminModel = require("../models/adminSchema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// getAllAdmin
exports.getadmins = async (req, res) => {
    try {
        const response = await adminModel.find();
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(406).json({
            err: 'server side error'
        });
    }
};

// deleteAdmin
exports.deleteadmin = async (req, res) => {
    try {
        const user = req.user;
        const adminid = req.params.id;

        if (!user) {
            return res.status(406).json({
                err: 'failed to delete'
            });
        }

        // Verify the admin credentials
        const foundUser = await adminModel.findOne({
            _id: user
        });
        if (!foundUser) {
            return res.status(406).json({
                err: 'you dont have credentials'
            });
        }

        // Proceed to delete the admin by ID
        const response = await adminModel.findOneAndDelete({
            _id: adminid
        });
        if (!response) {
            return res.status(406).json({
                err: 'admin id not found'
            });
        }

        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(406).json({
            err: 'server side error'
        });
    }
};

// addAdmin
exports.addadmin = async (req, res) => {
    try {
        const user = req.user;
        const data = req.body;

        if (!user || !data.username || !data.password || !data.adminType) {
            return res.status(406).json({
                err: 'failed to add'
            });
        }

        // Verify the admin credentials
        const foundUser = await adminModel.findOne({
            _id: user
        });
        if (!foundUser) {
            return res.status(406).json({
                err: 'you dont have credentials'
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        data.password = hashedPassword;

        // Create new admin
        const response = await adminModel.create(data);
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(406).json({
            err: 'server side error'
        });
    }
};

// editAdmin
exports.editadmin = async (req, res) => {
    try {
        const user = req.user;
        const data = req.body;

        if (!user || !data.username || !data.password || !data.adminType) {
            return res.status(406).json({
                err: 'failed to edit'
            });
        }

        // Verify the admin credentials
        const foundUser = await adminModel.findOne({
            _id: user
        });
        if (!foundUser) {
            return res.status(406).json({
                err: 'you dont have credentials'
            });
        }

        // Update admin
        const response = await adminModel.findOneAndUpdate({
                _id: data._id
            },
            data, {
                new: true
            }
        );

        if (!response) {
            return res.status(406).json({
                err: 'error updating admin'
            });
        }

        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(406).json({
            err: 'server side error'
        });
    }
};

// adminLogin
exports.adminlogin = async (req, res) => {
    try {
        const data = req.body;

        if (!data.username || !data.password) {
            return res.status(406).json({
                err: 'data not found'
            });
        }

        const response = await adminModel.findOne({
            username: data.username
        });
        if (!response || !(await bcrypt.compare(data.password, response.password))) {
            return res.status(406).json({
                err: 'invalid credentials'
            });
        }

        // Generate JWT token
        const jwtid = jwt.sign({
                _id: response._id
            },
            process.env.JWT_KEY
        );

        res.status(200).json(jwtid);

    } catch (err) {
        console.log(err);
        res.status(406).json({
            err: 'server side error'
        });
    }
};