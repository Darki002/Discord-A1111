# Discord-A1111

## Getting Started

The Bot has it is Getting Started Tutorial build in. You can just use the `/getting-started` command.

## Instalation

**Node:** Make sure you have node.js installed!

To run this Bot on your own you have to do the following steps

1. Create Applicationa and a bot on [Discord Developer Portal](https://discord.com/developers/applications).
2. Install [Automatic 1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui) and follow there instalation guide.
3. Make sure you run the A1111 application with the `--api` flag. [How-to/API Docs](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API#api-guide-by-kilvoctu)
4. If you haven't installed any SD Models for A1111, do this first.
5. Clone this repository
6. Set Up the Token
    1. Create a file `.env` where the `index.js` file is.
    2. `DISCORD_TOKEN="<token>"` replace the <token> with your Discord Bot Token.
7. Run the bot with `node index.js`.
