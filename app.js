const prompt = require('prompt-sync')();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');





const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('You have entered the CRM');

    await runQueries();

};

const runQueries = async () => {
    // do logic of stuff in app
    const username = prompt('What is your name? ');
    if (username === 'quit') {
        await mongoose.disconnect();
        console.log('exiting. goodbyeeee.......');
        process.exit(); // not sure why/when this is needed - seems like doesn't matter with Node.js
    } else {
        console.log(`Your name is ${username}`);
        console.log('doing app stuffs');
        await runQueries();
    }
};

connect();