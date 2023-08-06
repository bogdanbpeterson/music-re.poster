import { Bot, webhookCallback } from 'https://deno.land/x/grammy@v1.17.2/mod.ts';

export const raise = (error: string): never => {
  throw new Error(error);
};


const BOT_TOKEN = Deno.env.get('BOT_TOKEN') ?? raise('No BOT_TOKEN variable');

const bot = new Bot(BOT_TOKEN); // <-- put your bot token between the ""

bot.command('start', (ctx) => ctx.reply('Welcome! Up and running.'));

bot.on('message', (ctx) => {
  console.log(JSON.stringify(ctx, null, 2));
  return ctx.reply(`\`\`\`json\nJSON.stringify(ctx, null, 2)\`\`\``, { parse_mode: 'MarkdownV2' });
});

const handleUpdates = webhookCallback(bot, 'oak');

export { bot, handleUpdates };