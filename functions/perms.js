module.exports = (msg, client) => {
  if(msg.channel.type === "text"){
      let bmp = msg.channel.permissionsFor(client.user.id);
      if (!bmp.has("SEND_MESSAGES")) throw "I don't have permission to send a message!";
      if (!bmp.has("EMBED_LINKS")) throw "I don't have permission to send an embed!";
  }
};