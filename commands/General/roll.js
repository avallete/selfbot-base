exports.run = async (client, msg) => {
    var number = Math.floor(Math.random(1)*6);
    msg.channel.send(`You rolled a **${number}**!`);
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 1,
  botPerms: [],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "roll",
  description: "Roll a random number",
  usage: " ",
  usageDelim: "",
};
