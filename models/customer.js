const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

customerSchema.pre('save', function (next) {
    const customerToBeSaved = this;
    if (customerToBeSaved.name) {
        customerToBeSaved.name = customerToBeSaved.name[0].toUpperCase() + customerToBeSaved.name.slice(1).toLowerCase();
    };
    next();
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;