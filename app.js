const prompt = require('prompt-sync')();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer');




const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('You have entered the CRM.');

    await runQueries();

};

const runQueries = async () => {
    // do logic of stuff in app
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
        console.log('\nexiting. goodbyeeee.......');
        process.exit(); // not sure why/when this is needed - seems like doesn't matter with Node.js
    } else if (input === '1') {
        console.log('\n');
        const customers = await Customer.find({});
        console.log(`All customers: ${customers}`);
        await runQueries();
        // Customer.find().then((customers) => {
        //     customers.forEach((customer) => {
        //         console.log(customer);
        //     });
        // });
    } else {
        console.log(`\ndoing ${input}`);
        await runQueries();
    }
};

connect();