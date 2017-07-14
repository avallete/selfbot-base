const { inspect } = require("util");

/* eslint-disable no-eval */
exports.run = async (client, msg, [code]) => {
  try {
    const embed = new client.methods.Embed();
    let evaled = eval(code);
    if (evaled instanceof Promise) evaled = await evaled;
    if (typeof evaled !== "string") evaled = inspect(evaled, { depth: 0 });
    try{
    embed.addField('Input :inbox_tray:', `\`\`\`js\n ${code} \`\`\``);
    embed.setColor(65280);
    embed.addField('Output :outbox_tray:', `\`\`\`js\n ${evaled} \`\`\``);
    embed.setFooter(`Selfbot v${global.version} | ${new Date()}`);
    msg.channel.sendEmbed(embed);
    } catch(err){
      msg.channel.send('**There was an error with your eval. Most likely your code was to long.**');
    }
  } catch (err) {
    const embed = new client.methods.Embed();
    embed.addField('Input :inbox_tray:', `\`\`\`js\n ${code} \`\`\``);
    embed.addField('Error :inbox_tray:', `\`\`\`\n ${err} \`\`\``);
    embed.setColor(16711680);
    embed.setFooter(`Selfbot v${global.version} | ${new Date()}`);
    msg.channel.sendEmbed(embed);
    //if (err.stack) logger.error("error", err.stack);
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["ev"],
  permLevel: 10,
  botPerms: ["EMBED_LINKS"],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "eval",
  description: "Evaluates arbitrary Javascript.",
  usage: "<code:str>",
  usageDelim: "",
};
