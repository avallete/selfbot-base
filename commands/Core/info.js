exports.run = async (client, msg) => {
  const embed = new client.methods.Embed()
  .setTitle("Information")
  .setColor(global.embedColor)
  .addField("Developer","Loganrose#2582 (<@145749360515219456>)", false)
  .addField("About",`The selfbot your using is v${global.version}. It is built off of the Komada framework with NodeJS.`, false)
  .addField("https://discord.gg/WkXuhbb", "Join our support server!",false);
  embed.setFooter(`Selfbot v${global.version} | ${new Date()}`);
  msg.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['h'],
  permLevel: 1,
  botPerms: ["EMBED_LINKS"],
  requiredFuncs: [],
};

exports.help = {
  name: 'info',
  description: 'More info about the selfbot',
  usage: '[action:str]',
  usageDelim: '',
  extendedHelp: []
};

