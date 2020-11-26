const Discord = require("discord.js");
// Config and tools
const config = require("./config.json");
const utils = require('./utils');

// Services
const hltbSrv = require("./hltbSrv");

const client = new Discord.Client();
const prefix = "!";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  
  switch(command) {
    case 'ping':
      message.reply(`Pong! This message had a latency of ${utils.getTimeTaken(message.createdTimestamp)}ms.`);
      break;
    case 'hltb':
      hltbSrv.getResultHLTB(message, commandBody);
      break;
    case 'virement':
      message.reply(`Va te faire foutre avec ton virement ${args[0]}.`);
      break;
    case 'logout':
      message.reply(`ok, i will logout now! This message had a latency of ${utils.getTimeTaken(message.createdTimestamp)}ms.`);
      client.destroy();
      break;
    case 'reboot':
      message.reply(`ok, i will reboot now! This message had a latency of ${utils.getTimeTaken(message.createdTimestamp)}ms.`);
      client.destroy();
      client.login(config.BOT_TOKEN);
      break;
    default:
      message.reply(`I don't know this command! This message had a latency of ${getTimeTaken(message.createdTimestamp)}ms.`);
  }
});

client.login(config.BOT_TOKEN);