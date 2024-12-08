const db = require("../../models");
const m_membership = db.membership;
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports.authenticateJWT = async (token) => {
  let authHeader = token;

  if (authHeader) {
    try {
      const tokenConvert = authHeader.split(" ")[1];
      const decode = jwt.verify(tokenConvert, process.env.SECRET_KEY);

      const cekData = await m_membership.findOne({
        where: { id: decode.data.id },
        include: [{
          model: db.balance
        },
        {
          model: db.transaction,
        }]
      });

      return {
        login: true,
        data: cekData,
      };
    } catch (error) {
      return {
        login: false,
        data: "error" + error,
      };
    }
  } else {
    return {
      login: false,
      data: "Unauthorize",
    };
  }
};
