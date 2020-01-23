const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, //trim whitespaces off the end
        minlength: 3
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

//export the Schema
module.exports = User;