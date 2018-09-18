# Completion Time
Completion Time is a **voice application** *(Alexa skill for now. Google Assistant app coming soon!)* which gives the time taken to complete a video game asked by the user.

## Invocation
````
Alexa, open completion time
````

The skill can be opened like any other skill on the Alexa platform.

````
Alexa, ask completion time about Battlefield 3
````

The skill can also be directly invoked.

## Dependencies

[Jovo Framework](https://github.com/jovotech/jovo-framework-nodejs/) - Jovo is an open source framework to build voice applications using Node.js

[How Long to Beat](https://github.com/ckatzorke/howlongtobeat) - How Long to Beat provides information about games and the time it takes to complete them.

## Issues

The project uses `AMAZON.Game` slot type to identify the utterance of game names. The predefined slot type `AMAZON.Game` does not recognize many games and hence the skill might not work for all the games even though the `How Long to Beat` API has information about that game.

## License

This project is distributed under Apache License v2.0. The license can be found [here](./LICENSE.md).

## Author

This project is owned and maintained by [Aakaash Jois](https://github.com/aakaashjois).