const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "Manager", "Member"],
        default: "Member"
    }
}, {
    versionKey: false
});

const userModel = mongoose.model('User', schema);

module.exports = { userModel };