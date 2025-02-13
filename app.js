const prompt = require('prompt-sync')();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer');

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Welcome to the CRM!');
    await runQueries();
};

const runQueries = async () => {
    console.log(`\nWhat would you like to do?
        
        1. Create a new customer
        2. View all customers
        3. Update an existing customer
        4. Delete an existing customer
        5. Quit the CRM app
        `);
    const input = await prompt('Number of the action you want to do: ');
    if (input === '5') {
        await mongoose.disconnect();
        await mongoose.connection.close(); // duplicating previous line?
        console.log('\nexiting. goodbyeeee.......');
        process.exit(); // seems like this doesn't matter with Node.js
    } else if (input === '1') {
        console.log('\nWhat is this new customer\'s name?');
        const customerName = await prompt('> ');
        console.log(`\nWhat is this new customer\'s age?`);
        const customerAge = await prompt('> ');
        await createCustomer(customerName, customerAge);
        await runQueries();
    } else if (input === '2') {
        console.log(`\nViewing all customers:`);
        await showCustomers();
        await runQueries();
    } else if (input === '3') {
        console.log(`\nBelow is a list of all customers:`);
        await showCustomers();
        await updateCustomer();
        await runQueries();
    } else if (input === '4') {
        console.log(`\nBelow is a list of all customers:`);
        await showCustomers();
        await deleteCustomer();
        await runQueries();
    } else {
        console.log(`\ndoing ${input}`);
        await runQueries();
    };
};

const createCustomer = async (customerName, customerAge) => {
    const customerData = {
        name: customerName,
        age: customerAge,
    };
    const customer = await Customer.create(customerData);
    console.log(`\nAdded new customer: ${customer.name}`);
};

const showCustomers = async () => {
    const customers = await Customer.find({});
    if (customers.length === 0) {
        console.log('No customers to show.');
        return;
    };
    customers.forEach(c => console.log(`id: ${c.id} -- Name: ${c.name}, Age: ${c.age}`));
};

const updateCustomer = async () => {
    console.log(`\nCopy and paste the id of the customer you would like to update here:`);
    const customerId = await prompt('> ');
    const chosenCustomer = await Customer.findById(customerId);
    console.log(`\nWhat is ${chosenCustomer.name}\'s new name?`);
    let newCustomerName = await prompt('> ');
    newCustomerName = newCustomerName[0].toUpperCase() + newCustomerName.slice(1).toLowerCase();
    console.log(`\nWhat is (was ${chosenCustomer.name}\'s, now ${newCustomerName}\'s) new age?`);
    const newCustomerAge = await prompt('> ');
    const updatedCustomer = await Customer.findByIdAndUpdate(
        customerId,
        { name: newCustomerName, age: newCustomerAge },
        { new: true }
    );
    console.log(`Update successful.`);
};

const deleteCustomer = async () => {
    console.log(`\nCopy and paste the id of the customer you would like to delete here:`);
    const customerId = await prompt('> ');
    const removedCustomer = await Customer.findByIdAndDelete(customerId);
    console.log('Delete successful.');
};

connect();