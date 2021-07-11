## discord-init

This package will create a discord bot for you and install the packages and write the files that you need to write each time you create a [Discord.js](https://www.npmjs.com/package/discord.js) bot!

**This package will install this packages:**

- [@discordjs/opus](https://www.npmjs.com/package/@discordjs/opus)
  voice support for your discord bot
- [eslint](https://www.npmjs.com/package/eslint)
  lets you write clean code
- [nodemon](https://www.npmjs.com/package/nodemon)
  lets you edit the bot without writing `node bot.js` each time you edit the code.

to start run this command:

```
npx discord-init my-bot
```

Edit `config.json` and add your discord bot token

development:

```
npm run dev
```

production:

```
npm run start
```

This package is not supporting typescript yet
