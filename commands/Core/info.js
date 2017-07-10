exports.run = async (client, msg) => {
  if(msg.channel.type === "text"){
    let bmp = msg.channel.permissionsFor(client.user.id)
    if (!bmp.has("SEND_MESSAGES")) return msg.send(`I don't have permissons to send a message in <#${msg.channel.id}>`);
    if (!bmp.has("EMBED_LINKS")) return msg.send(`I don't have permissions to send a embed in <#${msg.channel.id}>`);
  }
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

