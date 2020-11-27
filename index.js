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
  console.log(commandBody);

  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  
  switch(command) {
    case 'ping':
      message.reply( utils.createEmbedMsg({ 
        color: utils.colors.BLUE,
        title: `Pong!`,
        timeRequest: message.createdTimestamp,
      }));
      break;
    case 'hltb':
      hltbSrv.getResultHLTB(message, commandBody);
      break;
    case 'virement':
      message.reply( utils.createEmbedMsg({ 
        color: utils.colors.BLUE,
        title: `Va te faire foutre avec ton virement ${args[0]}.`,
        timeRequest: message.createdTimestamp,
      }));
      break;
    case 'logout':
      message.reply( utils.createEmbedMsg({ 
        color: utils.colors.BLUE,
        title: `ok, i will logout now!`,
        timeRequest: message.createdTimestamp,
      }));
      client.destroy();
      break;
    case 'reboot':
      message.reply(utils.createEmbedMsg({ 
        color: utils.colors.BLUE,
        title: `ok, i will reboot now!`,
        timeRequest: message.createdTimestamp,
      }));
      client.destroy();
      client.login(config.BOT_TOKEN);
      break;
    default:
      message.reply(utils.createEmbedMsg({ 
        color: utils.colors.BLUE,
        title: `I don't know this command!`,
        timeRequest: message.createdTimestamp,
      }));
  }
});

client.login(config.BOT_TOKEN);