'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
//localhost27017. /books??????? correct?????????

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongoose is connected')
});

const User = require('./books'); //necessary???


const aj = new User({
    name: 'AJ',
    email: 'IamAJ@gmail.com',
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

aj.save();

app.get('/', (request, response) => {
    response.send('hello book!');
});

app.get('/books', getBooks)
function getBooks(request, response) {
    const email = request.query.email;
    console.log({ email });
    try {
    User.find({ name: 'skyler' }, (err, booklist) => {
        if (err) return console.error(err);
        console.log(booklist[0].books);
        response.send(booklist[0]); //TODO allow this to handle errors. May not need this.
        // response.send(booklist.length ? booklist[0] )
    })
    }
    catch {
        response.status(500).send('cannot get books')
    }
}

app.post('/books', async (request, response) => {
    // const { name } = request.body; //variable name must match. are names right???
    const {name, description, status} = request.body
    const { email } = request.query;


    console.log({ email });
    try {
        await User.find({ email }, (err, users) => {
            if (users.length) {
                const currentUser = users[0];
                const currentBooks = currentUser.books;
                const newBooks = { name: name, description: description, status: status };
                currentBooks.push(newBooks);
                currentUser.save();
                response.send(currentUser.books);
            } else {
                return console.error(err);
            }
        })
    }
    catch (err) {
        response.status(500).send('did not post')
    }
});

// app.delete('/books/:index', async (request, response) => {
//     const { name } = request.query;
//     const index = Number //left off here????????????????????????????????????
//         await User.find({name}, (err, users) => {
//             if (users.length) {
//                 const user = user[0];
//                 const currentBooks = users[0].books;
//                 response.send('delete') 
//             } else {
//                 response.send("no user found")
//             }
// });

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
