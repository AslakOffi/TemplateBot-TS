module.exports = {
  getMember: function(message: any, toFind: any = '') {
    toFind = toFind.toLowerCase();
    let target = message.guild.members.get(toFind);
    if (!target && message.mentions.members)
      target = message.mentions.members.first();
    if (!target && toFind) {
      target = message.guild.members.find((member: any) => {
        return (
          member.displayName.toLowerCase().includes(toFind) ||
          member.user.tag.toLowerCase().includes(toFind)
        );
      });
    }
    if (!target) target = message.member;
    return target;
  },
  formatDate: function(date: any) {
    return new Intl.DateTimeFormat('fr-FR').format(date);
  }
};