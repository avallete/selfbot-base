exports.run = async (client, msg) => {
  client.funcs.perms(msg,client)
  const embed = new client.methods.Embed()
  .setTitle("Information")
  .setColor(embedColor)
  .addField("Developer","Loganrose#2582 (<@145749360515219456>)", false)
  .addField("About",`The selfbot your using is v${version}. It is built off of the Komada framework with NodeJS.`, false)
  .addField("https://discord.gg/WkXuhbb", "Join our support server!",false)
  msg.channel.sendEmbed(embed)
};

exports.conf = {
  enabled: true,
  runIn: ['text', 'dm', 'group'],
  aliases: ['h'],
  permLevel: 1,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: 'info',
  description: 'More info about the selfbot',
  usage: '[action:str]',
  usageDelim: '',
  extendedHelp: []
};

