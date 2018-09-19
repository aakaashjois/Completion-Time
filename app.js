'use strict';

const { App } = require('jovo-framework');
const hltb = require('howlongtobeat');

const app = new App({ logging: true });
const hltbService = new hltb.HowLongToBeatService();

app.setHandler({
    'LAUNCH': function () {
        this.ask('Which game are you trying to complete?');
    },

    'AMAZON.FallbackIntent': function () {
        this.ask('I could not understand what you said. Can you please repeat that?');
    },

    'AMAZON.CancelIntent': function () {
        this.tell('Alright. Cancelled.');
    },

    'AMAZON.StopIntent': function () {
        this.tell('Okay. Bye!');
    },

    'AMAZON.HelpIntent': function () {
        this.tell('You can ask Alexa about the game you are trying to complete. For example, you can say, "Alexa, ask completion time about The Witcher 3');
    },

    'GameQueryIntent': function (game) {
        console.log('GAME NAME: ' + game.value);
        hltbService.search(game.value).then(results => {
            console.log('RESULTS: ' + JSON.stringify(results));
            if (results == undefined || results.length == 0) {
                this.tell('Looks like I have no information for that game. Please try a different one.');
            } else {
                var highestSimilarity = -1.0;
                var bestResult = NaN;
                for (let result of results) {
                    if (result.similarity > highestSimilarity) {
                        highestSimilarity = result.similarity;
                        bestResult = result;
                    }
                }
                if (bestResult != NaN) {
                    console.log('BEST RESULT: ' + JSON.stringify(bestResult));
                    this.tell('For the game, ' + bestResult.name + ', the main content takes ' + bestResult.gameplayMain + ' hours to complete... It takes ' + bestResult.gameplayCompletionist + ' hours to complete the game as a completionist.');
                } else {
                    this.tell('I am unable to find that game. Please try another game.');
                }
            }
        }).catch(error => {
            console.log('ERROR: ' + error);
            this.tell('Game not found. Please try a different game.')
        });
    },
});

module.exports.app = app;
