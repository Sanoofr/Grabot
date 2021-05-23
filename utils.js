const colors = {
  BLUE: 0x0099ff,
  RED: 0xff0000,
  GREEN: 0x00ff00,
};

const getTimeTaken = origin => origin ? Date.now() - origin : '-1';

const createEmbedMsg = (messageInfo) => {
  console.log(JSON.stringify(messageInfo));
  return { 
    embed: {
      color: messageInfo.color,
      title: messageInfo.title,
      url: messageInfo.url,
      thumbnail: {
        url: `https://howlongtobeat.com${messageInfo.imageUrl}`,
      },
      fields: messageInfo.fields || [],
      timestamp: new Date(),
      footer: {
        text: `This message had a latency of ${getTimeTaken(messageInfo.timeRequest)}ms.`,
      },
    },
  };
};

exports.colors = colors;
exports.getTimeTaken = getTimeTaken;
exports.createEmbedMsg = createEmbedMsg;
