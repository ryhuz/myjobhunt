const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    applicant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date_applied: { type: Date },
    title: { type: String, required: true},
    company: { type: String, required: true},
    jd: { type: String, required: true},        // Actual JD
    jd_link: { type: String, required: true},   // URL
    five_day_follow_up: { type: Boolean, default: false },
    submit_medium: { type: String, required: true },
    /* 0: Applied - waiting for response, 1: In communication, 2: Interview arranged, 3: Interview completed, 4: Rejected, 5: Accepted-awaiting offer,*/
    status: { type: Number, required: true, min: 0, max: 5 },
    comments: String,
    poc_name: String,
    poc_title: String,
    poc_contact: String,
})

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;