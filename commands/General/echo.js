exports.run = async (client, msg, [Text]) => {
    msg.channel.send(Text);
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
  name: "echo",
  description: "Repeat what you say",
  usage: "<Text:string>",
  usageDelim: "",
};