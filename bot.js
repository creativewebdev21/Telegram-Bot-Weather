// Importing the necessary Modules, Models and Routes
const express = require('express');
const { Telegraf } = require('telegraf');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/UserModel.js');
const Subscriber = require('./models/SubscriberModel.js');
const Usage = require('./models/UsageModel.js');
const Stat = require('./models/StatModel.js');
const BlockedUser = require('./models/BlockedUserModel.js');
const router = require('./routes/dataRoute.js');

// Declare the variables
let isListening = false;


// configure dotenv
dotenv.config();

// Load environment variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const weatherAPIKey = process.env.WEATHER_API_KEY;
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;


// Connect to MongoDB database
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to Database!');
}).catch((error) => {
    console.log('Error connecting to Database : ', error.message);
});


// Initializing the express app
const app = express();

// configure cors
app.use(cors());

// configure body-parser
app.use(bodyParser.json());

// Configure the express app
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// Configure the routes
app.use('/', router);

// Start the express app
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


// Create the bot instance
const bot = new Telegraf(BOT_TOKEN);


// Start handler
bot.start((ctx) => {
    // Adding user to database
    const userId = ctx.from.id;
    const username = ctx.from.username;
    const user = new User({
        username: username,
        userid: userId,
    });
    user.save()
        .then(() => {
            console.log('User saved to database!');
        })
        .catch((error) => {
            console.log('Error saving user to database:', error);
        });
    ctx.reply('Welcome to the WEATHER UPDATE bot!\nThis is a publicly available bot made by Rajesh to get the weather information of a particular city of your choice... \n\n\nTap /help - To Get help with commands\n\nMade with ❤️ by Rajesh');
});

// Handling "/subscribe" command
bot.command('subscribe', (ctx) => {
    // Handle subscription logic here
    const userId = ctx.from.id;
    const username = ctx.from.username;

    Subscriber.findOne({ userid: userId })
        .then((subscriber) => {
            if (subscriber) {
                ctx.reply('You have already subscribed to weather updates!');
                return;
            }
            else {
                // Save the user's ID in your database or any other storage mechanism
                const subscriber = new Subscriber({
                    username: username,
                    userid: userId,
                });
                subscriber.save()
                    .then(() => {
                        console.log('Subscriber saved to database!');
                        ctx.reply('You have subscribed to weather updates! \nYou can access weather uodates using /weather command.');
                    })
                    .catch((error) => {
                        console.log('Error saving subscriber to database:', error.message);
                        ctx.reply('Sorry, Unable to Subscribe at the Moment.');
                    });

                // Add User to track usage stats
                const stat = new Stat({
                    username: username,
                    userid: userId,
                });

                stat.save()
                    .then(() => {
                        console.log('New User Stat saved to database!');
                    })
                    .catch((error) => {
                        console.log('Error saving new user stat to database:', error.message);
                    });
            }
        });
});

// Handling "/unsubscribe" command
bot.command('unsubscribe', (ctx) => {
    // Handling unsubscription logic here
    const userId = ctx.from.id;

    // Search for the user's ID in the database
    Subscriber.findOne({ userid: userId })
        .then((subscriber) => {
            // If User not found in database
            if (!subscriber) {
                ctx.reply('You have not subscribed to get Weather Updates!\nUse /subscribe to subscribe to the bot.');
                return;
            }
            else {
                // Remove the user's ID from your database
                Subscriber.findOneAndDelete({ userid: userId })
                    .then(() => {
                        console.log('Subscriber deleted from database!');
                        ctx.reply('You have unsubscribed from weather updates!');
                    })
                    .catch((error) => {
                        console.log('Error deleting subscriber from database:', error.message);
                        ctx.reply('Sorry, Unable to Unsubscribe at the Moment.\nTry again later.');
                    });

                // Remove User from track usage stats
                Stat.findOneAndDelete({ userid: userId })
                    .then(() => {
                        console.log('User Stat deleted from database!');
                    })
                    .catch((error) => {
                        console.log('Error deleting user stat from database:', error.message);
                    });
            }
        });
});

// Handling "/weather" command
bot.command('weather', (ctx) => {

    isListening = true;

    BlockedUser.findOne({ userid: ctx.from.id })
        .then((blockedUser) => {
            if (blockedUser) {
                ctx.reply('You have been blocked from using this bot!\nContact the bot owner to unblock you.');
                return;
            }
            else {
                // Search for the user's ID in the database
                Subscriber.findOne({ userid: ctx.from.id })
                    .then(async (subscriber) => {
                        if (!subscriber) {
                            ctx.reply('You have not subscribed to get Weather Updates!\nUse /subscribe to subscribe to the bot.');
                            return;
                        }
                        else {
                            try {
                                const userId = ctx.from.id;
                                const username = ctx.from.username;

                                // Update the usage data in the database
                                const usage = new Usage({
                                    username: username,
                                    userid: userId,
                                });
                                usage.save()
                                    .then(() => {
                                        console.log('Usage saved to database!');
                                    })
                                    .catch((error) => {
                                        console.log('Error saving usage to database:', error.message);
                                    });

                                // Update the stat data for user in the database
                                Stat.updateOne({ userid: userId }, { $inc: { count: 1 } }, { upsert: true })
                                    .then(() => {
                                        console.log('Stat updated in database!');
                                    })
                                    .catch((error) => {
                                        console.log('Error updating stat in database:', error.message);
                                    });

                                // Ask user for desired city name to get weather data
                                ctx.reply('Enter the name of the city to get weather data: ');

                                // Handle the user's response
                                bot.hears(/.*/, (ctx) => {
                                    if (!isListening) {
                                        ctx.reply('No command Specified...');
                                        return;
                                    }
                                    else {
                                        const messageText = ctx.message.text;
                                        const city = messageText;

                                        // Fetch URL for weather data request from OpenWeatherMap API
                                        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?APPID=${weatherAPIKey}&q=${city}`;

                                        // Fetch weather data from OpenWeatherMap API using axios module
                                        try {
                                            axios.get(apiUrl)
                                                .then((response) => {

                                                    // Extract the weather data from the API response
                                                    const weatherData = response.data;

                                                    // Extract the relevant weather information from the API response
                                                    const cityName = weatherData.city.name;
                                                    const country = weatherData.city.country;
                                                    const date_txt = weatherData.list[0].dt_txt;
                                                    const date = date_txt.split(' ')[0];
                                                    const temperature = weatherData.list[0].main.temp;
                                                    const condition = weatherData.list[0].weather[0].description;
                                                    const windSpeed = weatherData.list[0].wind.speed;
                                                    const coord = weatherData.city.coord;
                                                    const population = weatherData.city.population;
                                                    const time = new Date().toLocaleTimeString();

                                                    // Send the weather update to subscribed user
                                                    // const subscribedUsers = [ctx.from.id];
                                                    // subscribedUsers.forEach((userId) => {
                                                    //     bot.telegram.sendMessage(userId, `Current weather in ${city}: ${temperature}K, ${condition}`);
                                                    // });

                                                    // Send the weather update to the user
                                                    ctx.reply(`Current weather in ${cityName}, ${country} :- \n\nTemp: ${temperature}K, ${condition} \nDate: ${date}, Time: ${time}\nWind Speed: ${windSpeed}m/s\nPopulation: ${population}\nCoordinates: ${coord.lon}, ${coord.lat}`);

                                                    // Remove listening the user's response after correct city name entered
                                                    // bot.hears(/.*/, () => { });
                                                    isListening = false;
                                                })
                                                .catch((error) => {
                                                    // Handle errors here
                                                    console.log('Error fetching weather data:', error.message);
                                                    ctx.reply('City not found!\nPlease enter a valid city name...');
                                                    return;
                                                });
                                        }
                                        catch (error) {
                                            // Handle errors here
                                            console.log('Error fetching weather data:', error.message);
                                            ctx.reply('City not found!\nPlease enter a valid city name...');
                                            return;
                                        }
                                    }
                                });
                            }
                            catch (error) {
                                // Handle errors here
                                console.log('Error fetching weather data:', error.message);
                                ctx.reply('Sorry, unable to fetch weather data at the moment.');
                            }
                        }
                    });
            }
        })
        .catch((error) => {
            console.log('Error fetching blocked user from database:', error.message);
            ctx.reply('Sorry, You may seemed to be unable to access the weather data at the moment.');
        });
});


// Handling "/help" command
bot.command('help', (ctx) => {
    ctx.reply('The Bot Commands are as follows:\n\n/subscribe - Subscribe to bot\n/weather - Get the current weather data\n/unsubscribe - Unsubscribe from bot');
});


// Start the bot
bot.launch();

// Handle errors
bot.catch((error) => {
    console.log('Error:', error);
});

console.log('Bot is running!');
