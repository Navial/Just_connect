require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
module.exports = {
  MONGODB_URI,
  GOOGLE_CLIENT_ID,
};
