'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const { App } = require('jovo-framework');
const hltb = require('howlongtobeat');

const app = new App({ logging: true });
const hltbService = new hltb.HowLongToBeatService();


// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
    'LAUNCH': function () {
        this.ask('Which game are you trying to complete?');
    },

    'GameNameIntent': function (game) {
        console.log('GAME NAME: ' + game.value);
        hltbService.search(game.value).then(results => {
            console.log('RESULTS: ' + JSON.stringify(results));
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
                this.tell('For the game, ' + bestResult.name + ', the main content takes ' + bestResult.gameplayMain + ' hours to complete.');
                this.tell('It takes ' + bestResult.gameplayCompletionist + ' hours to complete the game as a completionist.');
            } else {
                this.tell('I am unable to find that game. Please try another game.');
            }
        }).catch(error => {
            console.log('ERROR: ' + error);
            this.tell('Game not found. Please try a different game.')
        });
    },
});

module.exports.app = app;
