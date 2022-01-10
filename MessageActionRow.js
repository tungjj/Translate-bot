const {MessageActionRow, MessageButton, MessageEmbed} = require('discord.js')
const embed = require('./Embed.js');
const config = require('./config.json')

exports.showMessage = async (msg, result)=>{

	const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				// .setCustomId('primary')
				.setLabel('Donate to the very POOR Uncle!')
				.setURL(config.linkDonate)
				.setStyle('LINK')
	);
	const arrayOfEmbed = await embed.showResult(msg, result);
	msg.channel.send({ embeds:arrayOfEmbed, components: [row] });
}