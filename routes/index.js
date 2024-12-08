var express = require('express');
var router = express.Router();

const cm_membership = require("../apps/controllers/membership/m_membership.controller");
const cm_transaction = require("../apps/controllers/transaction/m_transaction.controller");

const validated = require("./../apps/middleware/utilities/validator");

// // membership routing
router.post('/login', cm_membership.auth)
router.post('/registration', validated.emailValidate, cm_membership.registration)
router.get('/profile', cm_membership.profile)
router.put('/profile/update', cm_membership.update)
router.put('/profile/image', cm_membership.profileImage)


router.post('/topup', cm_transaction.topup)
router.get('/balance', cm_transaction.balance)
router.get('/transaction-history', cm_transaction.transactionHistory)

router.post('/transaction', cm_transaction.transaction)

router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express' });
});

module.exports = router;
