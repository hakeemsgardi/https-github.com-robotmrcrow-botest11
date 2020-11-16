/**
 * Module Imports
 */
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");

let TOKEN, PREFIX;
try {
  const config = require("./config.json");
  TOKEN = config.TOKEN;
  PREFIX = config.PREFIX;
} catch (error) {
  TOKEN = process.env.TOKEN;
  PREFIX = process.env.PREFIX;
}

const client = new Client({ disableMentions: "everyone" });

client.login('NzU1MDQ5NjEwMTQ5NjI1OTA4.X19ovw.Q_PCEsks36oiJYgFvGEA3zKh5D4');
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Client Events
 */
client.on("ready", () => {
setInterval(() => {
console.log(`${client.user.username} ready! ,Users ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}, Guilds ${client.guilds.cache.size}`);
client.user.setActivity(`${PREFIX}help ,Users ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}, Guilds ${client.guilds.cache.size}`);

}, 15000);

});

client.on('message', message => {
if (message.content.startsWith(prefix + "help1")) 
 
    
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
});


client.on("warn", (info) => console.log(info));
client.on("error", console.error);

/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.").catch(console.error);
  }
});

