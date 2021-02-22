const Discord = require('discord.js');
const moment = require("moment")
const PlayStore = require("google-play-scraper");
const EmbedColor = ``;
moment.locale('pt-br')

module.exports.run = async (client, message, args) => {
    if (!args[0])
      return message.channel.send(`<:hm_error:812689130043211787>  ›  ${message.author}, Você precisa escrever o nome de um aplicativo.`);

    PlayStore.search({
      term: args.join(" "),
      num: 1
    }).then(Data => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.quote(
          `<:hm_error:812689130043211787>  ›  ${message.author}, Não consegui encontrar o aplicativo, desculpe.`
        );
        }
      let Embed = new Discord.MessageEmbed()
        .setColor(EmbedColor || "#3030E2")
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(App.summary)
        .addField(`Preço:`, App.priceText.replace('FREE', 'Gratis'), true)
        .addField(`Desenvolvedor:`, App.developer, true)
        .addField(`Avaliação:`, App.scoreText, true)
        .setFooter(`${message.author.username}`)
        .setTimestamp();

      return message.channel.send(Embed);
    });
  };

exports.help = {
    name: 'playstore',
    aliases: [],
    categoria: 'Pesquisas',
  }
