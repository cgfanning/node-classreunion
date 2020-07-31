const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

const rsvpSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    phonenum: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: false,
    }
},{
    timestamps: true
});

const Rsvp = mongoose.model('Rsvp', rsvpSchema);

module.exports = Rsvp;