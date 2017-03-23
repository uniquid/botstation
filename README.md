# Botstation
Botstation is a tiny framework made to build your own chatbot fast.

## Installation
```
npm install --save botstation
```

## Usage
```js
var Botstation = require('botstation');
var bot = new Botstation.Bot();

bot.config({
    key: 'xoxb-157105193143-eJdSjJRttSCU2DAd3IdAtBoi',
    name: 'Dat Bot'
});

bot.task({
    name: "Help",
    matcher: "isMessage",
    content: "!help",
    exec: (bot, data, params) => {
        bot.postMessage(data.channel, 'Do you need help?', params);
    }
});

bot.start(() => {
    console.log('Bot started!');
});
```

## Matchers
You can configure tasks to match in several ways with incoming messages:

- `isMessage`: Checks if the incoming message is strictly equal to the specified content
- `beginsWith`: Checks if an incoming message begins with the specified content string
- `isJoining`: Looks for channel joining events in incoming messages, so the bot can advertise itself
