const db = require("../../models");
const m_membership = db.membership;
const jwt = require("jsonwebtoken");
const {
  authenticateJWT,
} = require("../../middleware/AuthenticateJwt/authenticateJwt");
const {
  encryptedString,
  decryptedString,
} = require("../../middleware/encryptr/encryptr");
const { upload } = require("../../middleware/utilities/upload");

require("dotenv").config();

exports.auth = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(103).send({ message: "Parameter tidak lengkap" });
  }

  const pass = await encryptedString(req.body.password);

  var data = await m_membership.findOne({
    where: { email: req.body.email, password: pass },
  });

  if (!data) return res.status(103).send({
    status: 103,
    message: "Username atau password salah",
    data: null
  });

  const expirationTimeInSeconds = '12h' // Set the expiration time in seconds

  var tokenTime = {
    expiresIn: expirationTimeInSeconds,
  };

  try {
    jwt.sign({ data }, process.env.SECRET_KEY, tokenTime, (err, token) => {
      return res.status(200).send({
        status: 0,
        message: "Login Sukses",
        token: token
      });
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Server mengalami gangguan!", error });
  }
};

exports.registration = async (req, res) => {
  try {
    const cekMembership = await m_membership.findOne({
      where: { email: req.body.email },
    });

    if (cekMembership) {
      return res.status(400).send({ message: "Email sudah digunakan" });
    }

    if (
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.email ||
      !req.body.password
    ) return res.status(400).send({ message: "Parameter tidak lengkap" });

    const payload = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: cek.data.email,
      password: await encryptedString(req.body.password),
    };

    await m_membership.create(payload);

    return res.status(200).send({ user: data });

  } catch (error) {
    return res
      .status(500)
      .send({ message: "Server mengalami gangguan !", error });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await authenticateJWT(req.headers.authorization);
    if (!user)
      return res
        .status(108)
        .send({
          status: 108,
          message: "Token tidak tidak valid atau kadaluwarsa",
          data: null
        });

    const userData = user.data.dataValues
    const { id, password, ...userWithoutSensitiveData } = userData;

    return res.status(200).send({
      status: 0,
      message: "Sukses",
      data: userWithoutSensitiveData
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Server mengalami gangguan !", error });
  }
};

exports.update = async (req, res) => {
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

    const payload = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    };

    await m_membership.update(payload, {
      where: { id: cek.data.id },
    });

    const findOneMembership = await m_membership.findOne({
      where: { id: cek.data.id },
      attributes: { exclude: ['id', 'password'] },
    });

    return res.status(200).send({
      status: 0,
      message: "data berhasil terupdate",
      data: findOneMembership
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.profileImage = async (req, res) => {
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

    const imageUrl = req.files.profile_image;

    const uploadFile = await upload(imageUrl)
    const urlCloud = uploadFile.secure_url;

    const payload = {
      profile_image: urlCloud
    };

    await m_membership.update(payload, {
      where: { id: cek.data.id },
    });

    const findOneMembership = await m_membership.findOne({
      where: { id: cek.data.id },
      attributes: { exclude: ['id', 'password'] },
    });

    return res.status(200).send({
      status: 0,
      message: "data berhasil terupdate",
      data: findOneMembership
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

