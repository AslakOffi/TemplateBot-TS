const { Client, Collection, RichEmbed } = require('discord.js');
const { config } = require('dotenv');
const client = new Client({ disableEveryone: true });
client.commands = new Collection();
client.aliases = new Collection();
config({
  path: __dirname + '/.env'
});
['command'].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
client.on('ready', () => {
  console.log(`Hi, ${client.user.username} is now online!`);
  client.user.setPresence({
    status: 'online',
    game: {
      name: 'Je te regarde..',
      type: 'WATCHING'
    }
  });
});
const newUsers = new Collection();
client.on('guildMemberAdd', (member: any) => {
  newUsers.set(member.id, member.user);
  member.guild.channels.get('708783015484063897').send( // A changer !
    new RichEmbed()
      .setColor('#d347a6') // Je recommande : https://htmlcolorcodes.com
      .setDescription(`Welcome ${member.user.username} 👶`)
      .setTitle('Bienvenue toi !')
  );
});
client.on('guildMemberRemove', (member: any) => {
  if (newUsers.has(member.id)) newUsers.delete(member.id);
  member.guild.channels.get('708783015484063897').send( // A changer !
    new RichEmbed()
      .setColor('#d347a6') // Je recommande : https://htmlcolorcodes.com
      .setDescription(`${member.user.username} ...`)
      .setTitle('Il a préféré nous quitter..')
  );
});
client.on('message', async (message: any) => {
  const prefix: string = '!!'; // Vous pouvez changer bien évidemment.
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) command.run(client, message, args);
});
client.login(process.env.TOKEN);