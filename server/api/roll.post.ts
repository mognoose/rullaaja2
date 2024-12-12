import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
client.login(process.env.CLIENT_SECRET);

export default defineEventHandler(async event => {

    const body = await readBody(event);

    const user = body.user || 'Anonymous';
    const channelId = body.channel || process.env.DEFAULT_CHANNEL;
    const dice = body.dice || 20;

    if (!channelId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request: No ChannelId provided',
        });
    }

    const channel = await client.channels.fetch(channelId);

    if (!channel) {
        throw createError({
            statusCode: 400,
            statusMessage: `Bad Request: No Channel found with id ${channelId}`,
        })
    }

    const rnd = Math.ceil(Math.random()*dice);

    const msg = `${user} heitti D${dice} nopalla: ${rnd}`;

    channel.send(msg);

    return {msg, rnd}
})