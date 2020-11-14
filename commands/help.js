const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
    {
  var SUPPORT = "https://discord.gg/PN6VQUc";
  var Link = "https://discord.com/api/oauth2/authorize?client_id=761634046840275005&permissions=8&scope=bot";
  var Web = "https://discord.gg/Ra8dJ4t";
let embed = new Discord.RichEmbed()


.setThumbnail(message.author.avatarURL)
.setDescription(`** **[ Support](${SUPPORT})** - **[ Invite](${Link})**
 
      .setTitle(`${message.client.user.username} Help`)
      .setDescription("List of all commands")
      .setColor("#F8AA2A");

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};
