const {MessageActionRow, MessageButton, MessageEmbed} = require('discord.js')
const embed = require('./Embed.js');

exports.showMessage = async (msg, result)=>{

	const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				// .setCustomId('primary')
				.setLabel('Donate to the very POOR Uncle!')
				.setURL('https://adhyayan.edu.np/wp-content/uploads/2019/06/buddha.jpg')
				.setStyle('LINK')
	);
	const arrayOfEmbed = await embed.showResult(msg, result);
	msg.channel.send({ embeds:arrayOfEmbed, components: [row] });
}