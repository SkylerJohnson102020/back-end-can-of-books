'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected')
});

const PORT = process.env.PORT || 3002;

const User = require('./books'); 

app.get('/', (request, response) => {
    response.send('hello book!');
});

app.get('/books', getBooks);

function getBooks(request, response) { 
    const name = request.query.name;
    console.log({ name });
    User.find({ name: 'skyler' }, (err, booklist) => {
        if (err) return console.error(err);
        console.log(booklist[0].books);
        response.send(booklist[0]);
    })
        
}

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
