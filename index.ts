const {Client, Intents} = require ('discord.js');
const {token} = require('./config.json');
const axios = require('axios');
const https = require('https');
const embed = require('./Embed.js');
const actionRow = require('./MessageActionRow.js')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, 
	Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_VOICE_STATES]
});

////for oxford api
const appId:string = "817d8cc8";
const appKey:string = "f4cb1633b152e09525a3eec2934e87dc";

const headers:object = {
	app_id: appId,
	app_key: appKey
};
const endpoint = ["entries", "lemmas"];
const languageCode = ["en-gb", "en-us", "en"];

// let urlUK = `https://od-api.oxforddictionaries.com/api/v2/${endpoint[0]}/${languageCode[0]}/`;


client.on('ready', () => {
	console.log('Ready!');
	client.user.setActivity('Nothing');
});

function GetMeaning(response) {
	// response = response.data;
	let data = response.data.results;
	let arrayOfEntries = data[0].lexicalEntries;

	let result = {
		word: data[0].word.toUpperCase(),
		meaning: [],
		category: [],
		pronunciation: [],
		audio: [],
		example: []
	}
	
	arrayOfEntries.forEach(entry => {
		//category
		let category = entry.lexicalCategory.text;
		result.category.push(category);


		// pronunciation
		let pronunciation = entry.entries[0].pronunciations.filter(el=>{
			return el.phoneticSpelling!='';
		});
		let audioFile = pronunciation[0].audioFile;
		pronunciation = pronunciation[0].phoneticSpelling;

		result.audio.push(audioFile);
		result.pronunciation.push(pronunciation);
		
		//senses
		let senses = [];
		entry.entries[0].senses.forEach(element => {
			senses.push(element.definitions);	
		});
		senses = senses.flat();
		result.meaning.push(senses);

		// examples
		let examples = [];
		entry.entries[0].senses.forEach(element => {
			if(element.examples){
				var arrayOfExample = [];

				element.examples.forEach(element => {
					arrayOfExample.push(element.text);
				});
				result.example.push(arrayOfExample);
			}
		});
	});

	return result;
};

client.on('messageCreate', async message=>{
	if(message.author.bot) return;
	if(message.channelId == '929574785405583360'){
		
  let keyWord:string = message.content.toLowerCase();
	let urlUK = `https://od-api.oxforddictionaries.com/api/v2/${endpoint[0]}/${languageCode[0]}/${keyWord}`;
		
	await axios.get(urlUK, {headers:headers})
		.then(GetMeaning)
		.then((result)=>{
			actionRow.showMessage(message, result);
			// return embed.showResult(message, result);

		})
		// .then(Clear)
		.catch((err)=>{
			embed.showError(message);
			process.on('uncaughtException', function (err) {
				console.error(err);
				console.log("Node NOT Exiting...");
			  });
		});
	};

	
}); 


client.login(token);