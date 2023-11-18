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

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Export model
module.exports = mongoose.model("User", userSchema);
