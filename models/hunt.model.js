const mongoose = require('mongoose');
const { Schema } = mongoose;

const huntSchema = new Schema({
    hunter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    huntTitle: { type: String, required: true },
    huntDesc: String,
    huntExpire: Date,
}, { createdAt: 'huntStart' })

const Hunt = mongoose.model('Hunt', huntSchema);
module.exports = Hunt;