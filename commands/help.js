const { MessageEmbed } = require("discord.js");

client.on('message', message => {
if (message.content.startsWith(prefix + "help")) 
 
    
{
  var SUPPORT = "https://discord.gg/PN6VQUc";
  var Link = "https://discord.com/api/oauth2/authorize?client_id=761634046840275005&permissions=8&scope=bot";
  var Web = "https://discord.gg/Ra8dJ4t";
let embed = new Discord.RichEmbed()


.setThumbnail(message.author.avatarURL)
.setTitle('Command Help Menu' )
.setDescription(`** **[ Support](${SUPPORT})** - **[ Invite](${Link})**
 
welcome and left
\`craete channel: welcome\`
\`craete channel: left\`
Generall
\`g/server\`- \`g/infobot\`-\`g/bots\`-\`g/myrole\`- 
\`g/invite\` - \`g/vote\` - \`g/support\` - \`g/member\` - \`g/roles\` - \`g/emoji\` - \`g/user\`
Moderation
\`g/lock\` - \`g/unlock\` -\`g/setnick\` - 
\`g/clear\`
**`)
 
 
.setColor('#3BA9FF')
      .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL)
 .setAuthor(`${message.author.username}`, `${message.author.avatarURL}`);
message.channel.sendEmbed(embed);
    }
