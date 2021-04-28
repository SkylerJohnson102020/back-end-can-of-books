'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
//localhost27017. /books??????? correct?????????

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected')
});

const User = require('./books'); //necessary???
const { request } = require('node:http');

// const aj = new User({
//     name: 'AJ',
//     books: [
//         {
//             name: 'Being in Nothingness',
//             description: 'Being in Nothingness!',
//             status: 'Currently Reading'
//         },
//         {
//             name: 'Helmet for my Pillow',
//             description: 'by Robert Lecke',
//             status: 'Finished Reading'
//         },
//         {
//             name: 'The Very Hungry Caterpillar',
//             description: 'by Eric Carl',
//             status: 'Never finished reading this one'
//         }]
// })

// aj.save();

app.get('/', (request, response) => {
    response.send('hello book!');
});

app.get('/books', async (request, response) => {
    response.send('books');
});

function getBooks(request, response) { 
    const name = request.query.name;
    console.log({ name });
    User.find({ name: 'skyler' }, (err, booklist) => {
        if (err) return console.error(err);
        console.log(booklist[0].books);
        response.send(booklist[0]); //TODO allow this to handle errors. May not need this.
        // response.send(booklist.length ? booklist[0] )
    })
        
}

// app.post('books', async (request, response) => {
//     const { booksName } = request.body; //variable name must match. are names right???

// app.get('/books', async (request, response) => {
//     const { name } = request.query;
//     console.log({ name });
//     await User.find({name}, (err, users) => {
//         if (users.length) {
//             const user = user[0];
//             const currentBooks = users[0].books;
//             const newBooks = {name: booksName};
//             currentBooks.push(newBooks);
//             user.save();
//             response.send(users.books);            
//         } else {
//             return console.error(err);
//         }
//     })       
// });
// });

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
