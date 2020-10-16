var express = require('express');
var app = express();
var port = process.env.port || 3000
var config = require('./env.json')[process.env.Node_ENV || 'development'];
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var routes = require('./routes');
var path = require('path');
var schema = require('./schema');

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, result) => {

    if (err) {
        console.log(err);
    } else {
        console.log('Connected to remote MongoDB');
    }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use('/api_v1', routes)




// app.use(express.static(path.join(__dirname, 'public')));


app.use('/read', (req, res) => {

    schema.find().then((data) => {
        var result = data;
        res.render('read', { result });
    })

});
app.use('/update', (req, res) => {

    schema.find().then((data) => {
        var result = data;
        res.render('update', { result });
    })
});
app.use('/delete', (req, res) => {
    schema.find().then((data) => {
        var result = data;
        res.render('delete', { result });
    })
});



app.use('/', (req, res) => {
    res.render('index');
});


app.listen(port, (req, res) => {


    console.log("server running on port: " + port);
});