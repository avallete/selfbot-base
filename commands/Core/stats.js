const moment = require("moment");
require("moment-duration-format");
const { version: komadaVersion } = require("komada");

exports.run = async (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const embed = new client.methods.Embed();
  embed.setTitle("Statistics");
  embed.setColor(global.embedColor);
  embed.setAuthor('Selfbot Stats', client.user.avatarURL({format: 'png', size: 128}), 'https://www.selfbot.loganrose.xyz')
  .addField("Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,true)
  .addField("Uptime", `${duration}`,true)
  .addField("Users", `${client.users.size}`,true)
  .addField("Servers", `${client.guilds.size}`,true)
  .addField("Channels", `${client.channels.size}`,true)
  .addField("Komada", `${komadaVersion}`,true)
  .addField("Self-Bot", `${global.version}`,true);
  embed.setFooter(`Selfbot v${global.version} | ${new Date()}`);
  msg.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["details", "what"],
  permLevel: 0,
  botPerms: ["EMBED_LINKS"],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "stats",
  description: "Provides some details about the bot and stats.",
  usage: "",
  usageDelim: "",
};
