'use strict'

const books = {}

const User = require('../bookmodels');

books.getBooks = async (request, response) => {
    const email = request.query.email;
    console.log(email);
    try {
    await User.find({ name: 'skyler' }, (err, booklist) => {
        if (err) return console.error(err);
        console.log(booklist, "Inside getBooks!!!!!!");
        if (!booklist.length) {
            response.send('user not found');
        } else {
            const user = booklist[0];
            response.send(user.books); 
        }
    })
    }
    catch {
        response.status(500).send('cannot get books')
    }
}

books.createNewBooks = async (request, response) => {
    const { name, description } = request.body
    const { email } = request.query;
    console.log({ email });
    try {
        await User.find({ email }, (err, users) => {
            if (users.length) {
                const currentUser = users[0];
                const currentBooks = currentUser.books;
                const newBooks = { name: name, description: description };
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
};

books.deleteBook = async (request, response) => {
    const index = Number(request.params.index)
    const email = request.query.email;
        await User.find({email}, (err, users) => {
            try {
                const user = user[0];
                const currentBooksArray = users.books.filter((_, i) => i !== index);
                user.books = currentBooksArray
                user.save();
                response.send('deleted!') 
            } 
            catch {
                response.send("no user found")
            }
    });
}

books.updateBook = async (request, response) => {
    const index = Number(request.params.index)
    const newBook = request.body.newBook;
    const email = request.query.email;
        await User.find({email}, (err, users) => {
            try {
                const user = users[0];
                user.books.splice(index, 1, newBook);
                user.save();
                response.send(user.books) 
            } 
            catch {
                response.send("no user found")
            }
    });

}

module.exports = books;
