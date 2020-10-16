var mongoose = require('mongoose');

const schema = mongoose.Schema({

    title: {
        type: String
    },
    heading: {
        type: String
    },
    content: {
        type: String
    },
    imageURL: {
        type: String
    }

})

module.exports = mongoose.model('technoboot', schema);