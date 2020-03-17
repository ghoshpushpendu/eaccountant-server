const users = require('./../users/users.model');
const expense = require('./expenses.model');
const express = require('express');
const router = express.Router();
const sms = require('./../../helpers/sendsms')
//send OTP

router.post('/create_expense', (req, res) => {
    let expense_collection = new expense(req.body)

    // Find the document
    expense_collection.save(function (error, success) {
        if (error) {
            res.status(200).json({
                error: true,
                message: 'Can not created expense',
                data: error
            })
        } else {
            res.status(200).json({
                error: false,
                message: 'Expense Created',
                data: success
            })
        }
    });
});

router.post('/update_expense', (req, res) => {

    let expense_id = req.body._id;
    // Find the document
    expense.findOneAndUpdate({ _id: expense_id }, { $set: req.body }, function (error, success) {
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

router.get('delete_expense', function (req, res) {
    let expense_id = req.body._id;
    expense.remove({
        _id: expense_id
    }, function (error, success) {
        if (!error) {
            res.status(200).json({
                error: false,
                message: 'Expense deleted',
                data: success
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'can not delete expense',
                data: error
            })
        }
    })
})

router.get('/list_expenses', function (req, res) {
    let start_date = req.query.start_date;
    let end_date = req.query.end_date;
    var pageNo = parseInt(req.query.page)
    var size = parseInt(req.query.size)
    var query = {}
    if (pageNo < 0 || pageNo === 0) {
        response = { error: true, message: "invalid page number, should start with 1", data: null };
        res.status(200).json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    query.phoneNumber = '91' + req.query.phoneNumber,
        query.created_at = {
            $gte: new Date(start_date).toISOString(), //iso TZ
            $lt: new Date(end_date).toISOString() // ISO TZ
        }
    expense.find({}, {}, query, function (error, success) {
        if (!error) {
            res.status(200).json({
                error: false,
                message: 'all the expenses in the given time range',
                data: success
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'system can not perform this operation now',
                data: error
            })
        }
    })
})


module.exports = router;

