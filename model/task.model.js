const mongoose = require("mongoose");
const schema = mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true, enum: ["Low", "Medium", "High"] },

}, {
    versionKey: false,
    timestamps: true
});

const taskModel = mongoose.model("Task", schema);

module.exports = { taskModel };