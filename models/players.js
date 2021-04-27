const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//先创建数据库Schema
const playerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    transform_x: {
        type: Number,
        required: true
    },
    transform_y: {
        type: Number,
        required: true
    },
    transform_z: {
        type: Number,
        required: true
    },
    data: {
        type: String,
    },
}, { timestamps: true });

//Schema -> model,第一额参数是与后端数据库交流的名称，第二个是Schema
const Player = mongoose.model('Player', playerSchema);
module.exports = Player;