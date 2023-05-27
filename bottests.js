const { Telegraf } = require('telegraf');

const bot = new Telegraf('6227176395:AAGZanho_BNkqDieZURWNHd95tz-osJIbew');

bot.start((ctx) => {
    ctx.reply('Welcome!');
});

bot.hears(/.*/, (ctx) => {
    const messageText = ctx.message.text;

    // Process the user's text message
    // You can implement your logic here based on the message content

    // Example: Echo the user's message back
    ctx.reply(`You said: ${messageText}`);
});

// ...

bot.launch();
