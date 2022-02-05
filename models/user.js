const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: String,
    pass: String,
    enable: Boolean
});

module.exports.userModel = mongoose.model('userModel', userSchema);  