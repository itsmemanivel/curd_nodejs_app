var express = require('express');
var router = express.Router();
var schema = require('./schema');


router.post('/add', (req, res) => {

    // console.log(req.body.title);
    schema.create({

        title: req.body.title,
        heading: req.body.heading,
        content: req.body.content,
        imageURL: req.body.imageURL

    }).then(data => {

        // console.log(data);

        res.redirect('/create')


    })

})


router.get('/get', (req, res) => {

    schema.find().then((data) => {

        res.json({ data })

    })
})


router.get('/getItem/:id', (req, res) => {

    let id = req.params.id;
    schema.find({ _id: id }).then((data) => {

        res.render('updateitem', { data });

    })
})

router.post('/update', (req, res) => {


    let id = req.body.id;

    schema.updateOne({ _id: id }, {
        $set: {
            "title": req.body.title,
            "heading": req.body.heading,
            "content": req.body.content,
            "imageURL": req.body.imageURL
        }

    }).then(data => {
        // console.log(data);
        if (data.nModified > 0) {
            res.redirect('/update');
        }
    })

})

router.post('/delete', (req, res) => {

    let id = req.body.id;
    // console.log(id);
    schema.deleteOne({ _id: id }).then((data) => {

        // console.log(data);
        if (data.deletedCount > 0) {
            res.redirect('/delete');
        }
    })
})


module.exports = router;