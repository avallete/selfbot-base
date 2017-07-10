const config = require("../../config.js").selfbot[0];
const embedColor = parseInt("0x" + Math.floor(Math.random() * 16777215).toString(16));
exports.run = async (client, msg, [action]) => {
  let bmp = msg.channel.permissionsFor(client.user.id);
    if (!bmp.has("SEND_MESSAGES")) return msg.send(`I don't have permissons to send a message in <#${msg.channel.id}>`);
    if (!bmp.has("EMBED_LINKS")) return msg.send(`I don't have permissions to send a embed in <#${msg.channel.id}>`);

  const method = msg.channel.type === 'dm' ? 'author' : 'channel';
  const cmd = client.commands.get(action) || client.commands.get(client.aliases.get(action));
  const prefix = config.prefix;
  if (action) {
    if (cmd) {
      // how the help for a specific command
      const embed = new client.methods.Embed()
        .setTitle(cmd.help.name)
        .setColor(embedColor)
        .setDescription(cmd.help.description)
        .addField('Usage', `${cmd.usage.fullUsage(msg)}`, false)
        .addField('Extended Usages', `${cmd.help.extendedHelp || "No extended help available."}`)
      return msg.channel.sendEmbed(embed).catch(logger.error);
    } else if (action.trim().toLowerCase() === 'all') {
      const help = this.buildHelp(client, msg);
      let titleMessage = '', helpMessage = [];
      const embed = new client.methods.Embed();
      embed.setTitle("Commands")
      embed.setColor(embedColor);
      for (const key in help) {
        titleMessage = (`**${key}**:`);
        for (const key2 in help[key]) helpMessage.push((Object.keys(help[key]).length > 1 ? `__*${key2}*__\n` : ''), `\n${help[key][key2].join('\n')}\n`);
        embed.addField(titleMessage, helpMessage, false);
        helpMessage = [], titleMessage = '';
      }
      return msg.channel.sendEmbed(embed)
    } else {
      msg.reply(`⚠ | This is not how you use that command. Please type \`${prefix}help help\` to check how it's used properly!`);
    }
  } else {
    // show the general help information
    const embed = new client.methods.Embed()
      .setTitle("How to use the selfbot?")
      .setColor(0x41ebf4)
      .addField(`${prefix}help all`, `Type ${prefix}help all to get an overview over all commands`, false)
      .addField(`${prefix}help <commandName>`, `Type ${prefix}help <commandName> to get specific help for one command`, false)
      .addField('https://discord.gg/WkXuhbb', 'Visit our support discord server and ask for help');

    msg.channel.sendEmbed(embed).catch(e=>logger.error(e))
  }
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
  name: 'help',
  description: 'Display general help, all commands and help for a specific command',
  usage: '[action:str]',
  usageDelim: '',
  extendedHelp: [
    '• `help` - get general help',
    '• `help all` - list all commands',
    '• `help <[commandName>` - list detailed help for a specific command',
  ].join('\n'),
};

exports.buildHelp = (client, msg) => {
  const help = {};

  const commandNames = Array.from(client.commands.keys());
  const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

  client.commands.forEach((command) => {
    if (this.runCommandInhibitors(client, msg, command)) {
      const cat = command.help.category;
      const subcat = command.help.subCategory;
      if (!help.hasOwnProperty(cat)) help[cat] = {};
      if (!help[cat].hasOwnProperty(subcat)) help[cat][subcat] = [];
      const prefix = config.prefix;
      help[cat][subcat].push(`**[** ${prefix}${command.help.name} **] -** ${command.help.description}`);
    }
  });

  return help;
};

exports.runCommandInhibitors = (client, msg, command) => !client.commandInhibitors.some((inhibitor) => {
  if (!inhibitor.conf.spamProtection && inhibitor.conf.enabled) return inhibitor.run(client, msg, command);
  return false;
});
