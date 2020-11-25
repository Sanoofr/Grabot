const Discord = require("discord.js");
const hltb = require('howlongtobeat');

const config = require("./config.json");

const client = new Discord.Client();
const hltbService = new hltb.HowLongToBeatService();

const prefix = "!";

const getResultHLTB = (message, commandBody) => {
  const timeTaken = Date.now() - message.createdTimestamp;
  const hltbArg = commandBody.slice(5);
  hltbService.search(hltbArg).then(result => {
    const limit = result.length > 3 ? 3 : result.length;
    result.slice(0, limit).forEach((item, index) => {
      const game = {
        color: 0x0099ff,
        title: item.name,
        url: `https://howlongtobeat.com/game?id=${item.id}`,
        thumbnail: {
          url: item.imageUrl,
        },
        fields: [
          { name: item.timeLabels[0][1], value: `${item.gameplayMain} Hours`, inline: true },
          { name: item.timeLabels[1][1], value: `${item.gameplayMainExtra} Hours `, inline: true },
          { name: item.timeLabels[2][1], value: `${item.gameplayCompletionist} Hours `, inline: true },
        ],
        timestamp: new Date(),
        footer: {
          text: `This message had a latency of ${timeTaken}ms.`,
        },
      };
      message.reply({ embed: game });
    });
    if(result.length > limit){
      const limitMessage = {
        color: 0xff0000,
        title: `Only ${limit} result displayed. ${result.length} available on HLTB website`,
        timestamp: new Date(),
        footer: {
          text: `This message had a latency of ${timeTaken}ms.`,
        },
      };
      message.reply({ embed: limitMessage});
    }
  });
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  
  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }else if (command === "logout") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`ok, i will logout now! This message had a latency of ${timeTaken}ms.`);
    client.destroy();
  } else if(command === "hltb"){
    getResultHLTB(message, commandBody);
  } else {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`I don't know this command! This message had a latency of ${timeTaken}ms.`);
  }
});

client.destroy();
client.login(config.BOT_TOKEN);