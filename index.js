var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var _a = require('discord.js'), Client = _a.Client, Intents = _a.Intents;
var token = require('./config.json').token;
var axios = require('axios');
var https = require('https');
var embed = require('./Embed.js');
var actionRow = require('./MessageActionRow.js');
var client = new Client({ intents: [Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES]
});
////for oxford api
var appId = "817d8cc8";
var appKey = "f4cb1633b152e09525a3eec2934e87dc";
var headers = {
    app_id: appId,
    app_key: appKey
};
var endpoint = ["entries", "lemmas"];
var languageCode = ["en-gb", "en-us", "en"];
// let urlUK = `https://od-api.oxforddictionaries.com/api/v2/${endpoint[0]}/${languageCode[0]}/`;
client.on('ready', function () {
    console.log('Ready!');
    client.user.setActivity('Nothing');
});
function GetMeaning(response) {
    // response = response.data;
    var data = response.data.results;
    var arrayOfEntries = data[0].lexicalEntries;
    var result = {
        word: data[0].word.toUpperCase(),
        meaning: [],
        category: [],
        pronunciation: [],
        audio: [],
        example: []
    };
    arrayOfEntries.forEach(function (entry) {
        //category
        var category = entry.lexicalCategory.text;
        result.category.push(category);
        // pronunciation
        var pronunciation = entry.entries[0].pronunciations.filter(function (el) {
            return el.phoneticSpelling != '';
        });
        var audioFile = pronunciation[0].audioFile;
        pronunciation = pronunciation[0].phoneticSpelling;
        result.audio.push(audioFile);
        result.pronunciation.push(pronunciation);
        //senses
        var senses = [];
        entry.entries[0].senses.forEach(function (element) {
            senses.push(element.definitions);
        });
        senses = senses.flat();
        result.meaning.push(senses);
        // examples
        var examples = [];
        entry.entries[0].senses.forEach(function (element) {
            if (element.examples) {
                var arrayOfExample = [];
                element.examples.forEach(function (element) {
                    arrayOfExample.push(element.text);
                });
                result.example.push(arrayOfExample);
            }
        });
    });
    return result;
}
;
client.on('messageCreate', function (message) { return __awaiter(_this, void 0, void 0, function () {
    var keyWord, urlUK;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (message.author.bot)
                    return [2 /*return*/];
                if (!(message.channelId == '929574785405583360')) return [3 /*break*/, 2];
                keyWord = message.content.toLowerCase();
                urlUK = "https://od-api.oxforddictionaries.com/api/v2/".concat(endpoint[0], "/").concat(languageCode[0], "/").concat(keyWord);
                return [4 /*yield*/, axios.get(urlUK, { headers: headers })
                        .then(GetMeaning)
                        .then(function (result) {
                        actionRow.showMessage(message, result);
                        // return embed.showResult(message, result);
                    })["catch"](function (err) {
                        embed.showError(message);
                        process.on('uncaughtException', function (err) {
                            console.error(err);
                            console.log("Node NOT Exiting...");
                        });
                    })];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                ;
                return [2 /*return*/];
        }
    });
}); });
client.login(token);
