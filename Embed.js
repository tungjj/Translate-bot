const {MessageEmbed} = require('discord.js');

exports.showError = (msg)=>{
  let newEmbed = new MessageEmbed()
		.setColor('RED')
		.setTitle("Error! I can't find this word.");
	msg.channel.send({embeds: [newEmbed]})
}
exports.showResult = (msg, result)=>{
	let meaning;
	let firstLine ;
	let arrayOfEmbeds = []


	result.category.forEach((el, index)=>{
		meaning = result.meaning[index].join('; ');
		firstLine = `**${result.category[index]}** -  \/ ${result.pronunciation[index]} \/`;
	
		let newEmbed = new MessageEmbed()
			.setTitle(result.word)
			.setDescription(firstLine)
			.addField('**Meaning**:', meaning)		

		if(result.category[index]=='Noun'){
			newEmbed.setColor('GREEN');
		}
		else if(result.category[index]=='Verb'){
			newEmbed.setColor('LUMINOUS_VIVID_PINK');
		}
		else if(result.category[index]=='Adverb'){
			newEmbed.setColor('NAVY');
		}
		else{
			newEmbed.setColor('ORANGE');
		}
		if(result.example.length){
			result.example[index].forEach(el => {
			newEmbed.addField('**Example**', el);
			});
		} 
		

		arrayOfEmbeds.push(newEmbed);
	});
	
	return arrayOfEmbeds;
}