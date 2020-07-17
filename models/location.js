const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    featured: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

const Location = mongoose.model('RSVP', locationSchema);

module.exports = Location;