const urban = require('urban');
exports.run = async (client, msg, [term]) => {
    if(!term) return msg.reply("**You can't search for nothing!**");
    const embed = new client.methods.Embed();
    var uterm = urban(term);
    uterm.first(function(json) {
        if(json.definition.length > 700){
            embed.setTitle("Error")
            .setColor(16711680)
            .addField("Error", "Definition to long for embed")
            .setFooter(`Selfbot v${global.version} | ${new Date()}`);
            msg.channel.sendEmbed(embed);
        }else{
            if (json == null) {
                embed.setTitle("Error")
                .setColor(16711680)
                .addField("Error", "Term not found")
                .setFooter(`Selfbot v${global.version} | ${new Date()}`);
                msg.channel.sendEmbed(embed);
            }
            else {
                embed.setTitle("Urban Results")
                .setColor(global.embedColor)
                .addField("Term", `${json.word}`,false)
                .addField("Result", `${json.definition}`,false)
                .addField("Example", `${json.example}`, false)
                .addField(':thumbsup:', `${json.thumbs_up}`,true)
                .addField(':thumbsdown:', `${json.thumbs_down}`, true)
                .setFooter(`Selfbot v${global.version} | ${new Date()}`);
                msg.channel.sendEmbed(embed);
                }
        }
    });
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 1,
  botPerms: ["EMBED_LINKS"],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "urban",
  description: "Search UrbanDictionary.com for a word",
  usage: "[term:str]",
  usageDelim: "",
};
