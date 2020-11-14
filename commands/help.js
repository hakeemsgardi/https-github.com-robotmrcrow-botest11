const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions",
  execute(message) {
    let commands = message.client.commands.array();
     
    let helpEmbed = new MessageEmbed()
    
    
      .setTitle(`${message.client.user.username} Help`)
      .setDescription("ALL")
      .setTitle(
        "Link invite Bot ::blue_heart:"
      )
      .setURL(
       "https://discord.com/api/oauth2/authorize?client_id=755768592104030208&permissions=8&scope=bot"
        )
      .setThumbnail(message.author.avatarURL)
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
