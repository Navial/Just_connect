const { GOOGLE_CLIENT_ID } = require("../utils/config");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

const verify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  

  return payload;

};

module.exports = { verify };
