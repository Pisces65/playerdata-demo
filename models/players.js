const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique : true,
    },
    transform_x: {
        type: String,
        required: true
    },
    transform_y: {
        type: String,
        required: true
    },
    transform_z: {
        type: String,
        required: true
    },
    data: {
        type: String,
    },
}, { timestamps: true });

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
