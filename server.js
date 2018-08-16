const express = require('express');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');

const PORT = 8000;

// Connect to MongoDB database
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log(`Connected!`)
});

// Import model for querying
const Item = require('./models/Item');

// API Routes
// In future, routes can be refactored into a folder!
app.get('/', (req, res) => {
    console.log(`Endpoint hit!`)
    res.send('Server working!')
});

app.get('/api/getItems', (req, res) => {
    Item.find({})
    .exec((err, item) => {
        if(err) {
            console.log(err)
            return res.send(500, { message: 'Error in fetching the results! '})
        }

        let result = {
            results: []
        }

        item.forEach((item) => {
            result.results.push(item)
        })

        res.send(result)
    })
});

app.post('/api/createItem', (req, res) => {
    res.send('Item created!')
});

app.get('/api/updateItem/', (req, res) => {
    res.send('Updated item!')
});

app.post('/api/calculateInvoice', (req, res) => {
    res.send('Invoice calculated!')
});

// Run server on PORT 8000
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
});