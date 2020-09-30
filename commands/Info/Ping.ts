import { RichEmbed } from 'discord.js';
module.exports = {
  name: 'ping',
  category: 'info',
  description: "Renvoie la latence et le ping de l'API",
  run: async (client: any, message: any, args: any) => {
    await message.channel.send(
      new RichEmbed()
        .setTitle('Ping')
        .setColor('#f9ff35') // Je recommande : https://htmlcolorcodes.com
        .setDescription(`La latence de l'API est de : **${client.ping}** ms`)
    );
  }
};