const hltb = require('howlongtobeat');

const utils = require('./utils');

const hltbService = new hltb.HowLongToBeatService();

const getResultHLTB = (message, commandBody) => {
  const messageToSend = [];
  const hltbArg = commandBody.slice(5);
  
  hltbService.search(hltbArg).then(result => {
    const limit = result.length > 3 ? 3 : result.length;
    
    if(result.length === 0){      
      messageToSend.push({
        color: utils.colors.BLUE,
        title: `No result found on HTLB website`,
        timeRequest: message.createdTimestamp,
      });
    } else {
      result.slice(0, limit).forEach((item, index) => {
        const fields = [];
        item.timeLabels.forEach(timeLabel => {
          fields.push({ name: timeLabel[1], value: `${item[timeLabel[0]]} Hours`, inline: true });
        });
        
        messageToSend.push({
          color: utils.colors.GREEN,
          title: `${index+1}/${result.length}: ${item.name}`,
          url: `https://howlongtobeat.com/game?id=${item.id}`,
          imageUrl: item.imageUrl,
          fields,
          timeRequest: message.createdTimestamp,
        });
      });
    }

    if(result.length > limit){
      messageToSend.push({
        color: utils.colors.RED,
        title: `Only ${limit} result displayed. ${result.length}+ available on HLTB website`,
        timeRequest: message.createdTimestamp,
      });
    }

    messageToSend.forEach(msg => message.reply(utils.createEmbedMsg(msg)));
  });
}

exports.getResultHLTB = getResultHLTB;