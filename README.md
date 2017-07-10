Selfbot Base v1.0.0
===================
### Links
[Discord Server](https://discord.gg/WkXuhbb) <br>
[Komada](https://komada.js.org) <br>
[NodeJS](https://nodejs.org)

### About
The selfbot base is built off the [Komada Framework](https://komada.js.org). The framework
is built using Discord.js. You can **Make your own commands, inhibitor, and functions**. 
All of that combined makes the perfect selfbot.

### Requirements
* NodeJS 8.1.0 +

### How to start
1. Download the bot from the [GitHub page](https://github.com/Loganrose/selfbot-base)
2. CD into the Selfbot directory and do `npm install`
3. If there isnt a logs folder create one
4. Edit the config.js and put in your **USER** Token. (Below you can find how to get your user token)
5. Optionally change anything else in the config you want
6. `node bot.js`

### How to get your user token
1. Open inspect element in Discord
2. Find the applications tab
3. click local storage then http://discordapp.com
4. and you should see token in the local storage

![Token](https://image.prntscr.com/image/-1r1lXMYTq6lIfvYWlP2jQ.png)

### How to make new Commands
To make a new command you have to follow a certain format in order for Komada to work properly.
You can divide the commands into categories by creating a folder named with the category of choice
and put a command file in it.
```js
exports.run = async (client, msg, [Optional Arguments]) => {

};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["Optional Command aliases"],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "Command_Name",
  description: "Command_Description",
  usage: "<Argument:Type>",
  usageDelim: "",
};
```
so for a basic echo command you would do

```js
exports.run = async (client, msg, [Text]) => {
    msg.channel.send(Text)
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "echo",
  description: "Repeat what you say",
  usage: "<Text:string>",
  usageDelim: "",
};
```




### Discord.js Methods
* Embeds => `client.methods.Embed`
* Collection => `client.methods.Collection`
* MessageCollector => `client.methods.MessageCollector`
* WebhookClient => `client.methods.Webhook`
* escapeMarkdown => `client.methods.escapeMarkdown`
* splitMessage => `client.methods.splitMessage`

```js
const method = new client.methods.<MethodName>(OptionalMethodProperties);
```
So if you want to create an Embed you would do:
```js
const embed = new client.methods.Embed()
```

### Events
If you have ever built a Discord bot you know there are events. An event is when something happens
(like when a message is sent). You can add a file to the events folder. the name of the file has to
be the name of the event. So if you wanted to know when a member joined a server you would create a 
file named guildMemberAdd.js.

There is a certain format you have to use too.

```js
exports.run = (client, Optional-Arguments) => {
  // event contents
};
```

### Finalizers

