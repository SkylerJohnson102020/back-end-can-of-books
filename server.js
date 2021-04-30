'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

const books = require('./modules/bookRoutes');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
//localhost27017. /books??????? correct?????????

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongoose is connected')
});

app.get('/', (request, response) => {
    response.send('hello book!');
});

app.get('/books', books.getBooks);
app.post('/books', books.createNewBooks);
app.delete('/books/:index', books.deleteBook);
app.put('/books/:index', books.updateBook);


app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
