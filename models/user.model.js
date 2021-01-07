const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    expiryWarningWeeks: { type: Number, default: 2, min:1, max: 8 }
})

const User = mongoose.model('User', userSchema);
module.exports = User;