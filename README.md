# Discord-A1111

First of all, this is more of an educational project for myself!

## What can this Discord Bot do?

It can generate AI Images with stable diffusion right inside of discord, like you can do it with Midjourney. The Bot supports only the most important key features to prompt the AI right now. To generate the Images this project makes use of the API of A1111, which is another open-source prject (link below under Credits). 

You can use whatever SD or SDXL model you want, just install it in A1111 and it will show up for the Discord Bot. 

**Note:** keep in mind that this Bot **can** use uncensored models! So be cearful in wich Channels you generate your Images xD

## Getting Started

The Bot has it's own Getting Started Tutorial build in. You can just use the `/getting-started` command. Have fun :)

## Installation

**Node:** Make sure you have node.js installed!

To run this Bot on your own you have to do the following steps

1. Create a Discord Application and a bot on [Discord Developer Portal](https://discord.com/developers/applications).
2. Install [Automatic 1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui) and follow their installation guide.
3. Make sure you run the A1111 application with the `--api` flag. [How-to/API Docs](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API#api-guide-by-kilvoctu)
4. If you haven't installed any SD Models for A1111, do this first.
5. Clone this repository
6. Set Up the Token
    1. Create a file `.env` where the `index.js` file is.
    2. Add the line `DISCORD_TOKEN="<token>"` and replace the token with your Discord Bot Token.
7. Run the bot with `node index.js`.

## Credits

Automatic1111: https://github.com/AUTOMATIC1111/stable-diffusion-webui
