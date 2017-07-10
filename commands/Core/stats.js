
const moment = require("moment");
require("moment-duration-format");
const { version: komadaVersion } = require("komada");

exports.run = async (client, msg) => {
  if(msg.channel.type === "text"){
    let bmp = msg.channel.permissionsFor(client.user.id)
    if (!bmp.has("SEND_MESSAGES")) return msg.send(`I don't have permissons to send a message in <#${msg.channel.id}>`);
    if (!bmp.has("EMBED_LINKS")) return msg.send(`I don't have permissions to send a embed in <#${msg.channel.id}>`);
  }
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const embed = new client.methods.Embed()
  embed.setTitle("Statistics");
  embed.setColor(embedColor)
  .addField("Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,true)
  .addField("Uptime", `${duration}`,true)
  .addField("Users", `${client.users.size}`,true)
  .addField("Servers", `${client.guilds.size}`,true)
  .addField("Channels", `${client.channels.size}`,true)
  .addField("Komada", `${komadaVersion}`,true)
  .addField("Self-Bot", `${version}`,true);
  msg.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["details", "what"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "stats",
  description: "Provides some details about the bot and stats.",
  usage: "",
  usageDelim: "",
};
