import { RichEmbed } from 'discord.js';

module.exports = {
  name: 'ping',
  category: 'info',
  description: "Returns the latency and ping of the API",
  run: async (client: any, message: any, args: any) => {
    await message.channel.send(
      new RichEmbed()
        .setTitle('Ping')
        .setColor('#f9ff35') // I recommend : https://htmlcolorcodes.com
        .setDescription(`The latency of the API is : **${client.ping}** ms`)
    );
  }
};
