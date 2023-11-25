const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  idRiot: String,
  idGithub: String,
  idGoogle: String,
  idDiscord : String,
  idMicrosoft : String,
  idTwitch :String,
  profilePicture: String,
  email: String,
});

const TwitchuserSchema = new mongoose.Schema({
  id: String,
  login: String,
  display_name: String,
  profile_image_url : String,
  email : String,
  created_at :String
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Export model
module.exports = mongoose.model("User", userSchema);
module.exports = mongoose.model("TwitchUser", TwitchuserSchema);
