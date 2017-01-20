// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create contact schema
var ContactSchema = new Schema({
  // name is a required string
  contactName: {
    type: String,
    trim: true,
    required: "Please enter your name"
  },
  // email is a required string
  email: {
    type: String,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
  },
  comments: {
    type: String,
    required: true
  }
});


var Contact = mongoose.model("Contact", ContactSchema);

// Export the model
module.exports = Contact;
