'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
    response.send('hello books!');
});


app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));