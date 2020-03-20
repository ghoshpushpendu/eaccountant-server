const users = require('./users.model');
const verifications = require('./../verifications/verifications.model');
const express = require('express');
const router = express.Router();
const sms = require('./../../helpers/sendsms')
//send OTP

router.post('/sendcode', (req, res) => {
    let phonenumber = req.body.phoneNumber;
    let code = Math.floor(1000 + Math.random() * 9000);

    let query = {
        phoneNumber: '91' + phonenumber
    }
    let update = {
        phoneNumber: '91' + phonenumber,
        code: code
    }
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    verifications.findOneAndUpdate(query, update, options, function (error, success) {
        if (error) {
            res.status(200).json({
                error: true,
                message: 'Got Error. Please try again',
                data: error
            })
        } else {
            sms.sendMessage(code, phonenumber)
            res.status(200).json({
                error: false,
                message: 'Verification code sent to ' + phonenumber,
                data: success
            })
        }
    });
});


router.post('/verifycode', (req, res) => {
    let user_data = req.body;
    let query = {
        phoneNumber: '91' + user_data.phoneNumber,
        code: user_data.code
    }
    console.log(query)
    verifications.findOne(query, function (error, success) {
        console.log(error,success)
        if (!error && success != null) {
            users.findOne({
                phoneNumber: query.phoneNumber
            }, function (error, success) {
                if (!error && success != null) {
                    res.status(200).json({
                        error: false,
                        message: 'User logged in successfully.',
                        data: success
                    })
                } else {
                    res.status(200).json({
                        error: false,
                        data: success,
                        message: 'User with this phone number not found.'
                    })
                }
            })
        } else {
            res.status(200).json({
                error: true,
                data: error,
                message: 'Wrong verification code'
            })
        }
    })
})

router.post('/saveuser', function (req, res) {
    let user = req.body;
    user.phoneNumber = '91' + user.phoneNumber
    let users_collection = new users(user);
    users_collection.save(function (error, success) {
        if (!error) {
            res.status(200).json({
                error: false,
                message: 'User saved',
                data: success
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'Duplicate phone number',
                data: error
            })
        }
    });
})

router.get('/deleteuser', function (req, res) {
    let phonenumber = '91' + req.query.phoneNumber;
    users.remove({
        phoneNumber: phonenumber
    }, function (error, success) {
        if (!error) {
            res.status(200).json({
                error: false,
                message: 'User Deleted',
                data: success
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'Uer can not be deleted',
                data: error
            })
        }
    });
})

router.get('/profile', function (req, res) {
    let phonenumber = req.query.phoneNumbera;
    users.findOne({
        _id: user_id
    }, function (error, success) {
        if (!error && success != null) {
            res.status(200).json({
                error: false,
                message: 'User profile got sucessfully',
                data: success
            });
        } else {
            res.status(200).json({
                error: true,
                message: 'No user found with this profile',
                data: error
            })
        }
    })
});

router.post('/profile', function (req, res) {
    let phonenumber = req.query.phoneNumber;
    let user_data = req.body;
    users.findOneAndUpdate({
        phoneNumber: phonenumber
    }, {
        $set: user_data
    }, { returnOriginal: false }, function (error, success) {
        if (error) {
            res.status(200).json({
                error: true,
                message: 'Can not update user profile.',
                data: error
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'Profile updated successfully.',
                data: success
            })
        }
    })
})


router.get('/getuser', function (req, res) {
    let phone = '91' + req.query.phoneNumber
    users.findOne({
        phoneNumber: phone
    }, function (error, success) {
        if (!error && success != null) {
            res.status(200).json({
                error: false,
                message: 'user got successfully',
                data: success
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'not a user',
                data: error
            })
        }
    })
})

module.exports = router;

