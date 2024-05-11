const mongoose = require('mongoose');


//schema for adding values in the database
const ProductSchema =  new mongoose.Schema({
    ProductName: {
        type: String,
        required: true
    },
    ProductPhase: {
        type: String,
        enum: {
            values: ['Manufacturing', 'Testing', 'Storage', 'Sold'],
            message: '{VALUE} is not supported'},
        default: 'Manufacturing',
        required: true
    },
    Date: {
        type: String,
        required: true
    }
})
//exporting schema for adding values to the routes page that has the different requests that can be made
module.exports = mongoose.model('ProductDB', ProductSchema);