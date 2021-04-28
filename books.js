'use strict'

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String }
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    books: [bookSchema]
});


const User = mongoose.model('user', userSchema); //upper or lower 'user' passed in?

const skyler = new User({
    name: 'skyler',
    email: 'basseuph@gmail.com',
    books: [
        {
            name: 'Being in Nothingness',
            description: 'Being in Nothingness!',
            status: 'Currently Reading'
        },
        {
            name: 'Helmet for my Pillow',
            description: 'by Robert Lecke',
            status: 'Finished Reading'
        },
        {
            name: 'The Very Hungry Caterpillar',
            description: 'by Eric Carl',
            status: 'Never finished reading this one'
        }]

})

skyler.save();

module.exports = User;