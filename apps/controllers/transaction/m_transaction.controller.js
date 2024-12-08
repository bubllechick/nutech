const db = require('../../models');
const m_balance = db.balance
const m_transaction = db.transaction
const { authenticateJWT } = require('../../middleware/AuthenticateJwt/authenticateJwt');
const { invoceNumber } = require('../../middleware/utilities/inv_number');

require('dotenv').config();

exports.topup = async (req, res) => {
    try {
        const cek = await authenticateJWT(req.headers.authorization);
        if (cek.login === false) {
            return res
                .status(108)
                .send({
                    status: 108,
                    message: "Token tidak tidak valid atau kadaluwarsa",
                    data: null
                });
        }

        const { top_up_amount } = req.body;

        if (typeof top_up_amount !== "number" || top_up_amount <= 0 || top_up_amount === null) {
            return res.status(400).send({ message: "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0" });
        }

        const payload = {
            balance: cek.data.balances[0].balance + req.body.top_up_amount,
        }

        await m_balance.update(payload, {
            where: { id: cek.data.balances[0].id },
        });

        const createInvNumber = await invoceNumber(cek.data.transactions)

        await m_transaction.create({
            invoice_number: createInvNumber,
            transaction_type: "TOPUP",
            description: "Top Up balance",
            total_amount: req.body.top_up_amount,
            idMembership: cek.data.id
        })

        return res.status(200).send({
            status: 0,
            message: "Top Up Balance berhasil",
            data: {
                balance: cek.data.balances[0].balance + req.body.top_up_amount
            }
        })
    } catch (error) {
        return res.status(500).send({ message: "Server mengalami gangguan !", error })
    }
}

exports.transaction = async (req, res) => {
    try {
        const cek = await authenticateJWT(req.headers.authorization);
        if (cek.login === false) {
            return res
                .status(108)
                .send({
                    status: 108,
                    message: "Token tidak tidak valid atau kadaluwarsa",
                    data: null
                });
        }

        const { service_code } = req.body;

        const cekService = await db.services.findOne({
            where: { service_code: service_code }
        });

        if (!cekService) {
            return res.status(500).send({
                status: 102,
                message: "Service ataus Layanan tidak ditemukan",
                data: null
            })
        }

        const payload = {
            balance: cek.data.balances[0].balance + cekService.service_tariff,
        }

        await m_balance.update(payload, {
            where: { id: cek.data.balances[0].id },
        });

        const createInvNumber = await invoceNumber(cek.data.transactions)

        const transaction = await m_transaction.create({
            invoice_number: createInvNumber,
            transaction_type: "PAYMENT",
            description: cekService.service_name,
            total_amount: cekService.service_tariff,
            idMembership: cek.data.id
        })

        return res.status(200).send({
            status: 0,
            message: "Top Up Balance berhasil",
            data: {
                invoice_number: createInvNumber,
                service_code: cekService.service_code,
                service_name: cekService.service_name,
                transaction_type: "PAYMENT",
                total_amount: 10000,
                created_on: transaction.createdAt
            }
        })
    } catch (error) {
        return res.status(500).send({ message: "Server mengalami gangguan !", error })
    }
}


exports.balance = async (req, res) => {
    try {
        const user = await authenticateJWT(req.headers.authorization);
        if (!user.login) {
            return res
                .status(108)
                .send({
                    status: 108,
                    message: "Token tidak tidak valid atau kadaluwarsa",
                    data: null
                });
        }

        const userData = user.data.dataValues
        const { id, idMembership, createdAt, updatedAt, ...balnce } = userData.balances[0].dataValues;

        return res.status(200).send({
            status: 0,
            message: "Sukses",
            data: balnce
        });
    } catch (error) {
        return res.status(500).send({ message: "Server mengalami gangguan !", error })
    }
}


exports.transactionHistory = async (req, res) => {
    try {
        const user = await authenticateJWT(req.headers.authorization);
        if (!user.login) {
            return res
                .status(108)
                .send({
                    status: 108,
                    message: "Token tidak tidak valid atau kadaluwarsa",
                    data: null
                });
        }

        const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 if not provided
        const offset = parseInt(req.query.offset, 10) || 0; // Default to 0 if not provided

        const findTransactionHistory = await m_transaction.findAll({
            where: { idMembership: user.data.id },
            limit,
            offset,
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).send({
            status: 0,
            message: "Get History Berhasil",
            data: {
                offset,
                limit,
                records: findTransactionHistory.map(transaction => ({
                    invoice_number: transaction.dataValues.invoice_number,
                    transaction_type: transaction.dataValues.transaction_type,
                    description: transaction.dataValues.description,
                    total_amount: transaction.dataValues.total_amount,
                    createdAt: transaction.dataValues.createdAt,
                })),
            },
        });
    } catch (error) {
        return res.status(500).send({ message: "Server mengalami gangguan !", error })
    }
}

