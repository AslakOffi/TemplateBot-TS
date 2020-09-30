import { readdirSync } from 'fs';
const ascii = require('ascii-table');
let table = new ascii('Commands');
table.setHeading('Commands', 'STATUS');
module.exports = (client: any) => {
  readdirSync('./commands/').forEach(dir => {
    const commands = readdirSync(`./commands/${dir}/`).filter(file =>
      file.endsWith('.ts')
    );
    for (let file of commands) {
      let pull = require(`../commands/${dir}/${file}`);
      if (pull.name) {
        client.commands.set(pull.name, pull);
        table.addRow(file, '✓');
      } else {
        table.addRow(file, `❌  -> help.name MISSING.`);
        continue;
      }
      if (pull.aliases && Array.isArray(pull.aliases))
        pull.aliases.forEach((alias: any) =>
          client.aliases.set(alias, pull.name)
        );
    }
  });
  console.log(table.toString());
};