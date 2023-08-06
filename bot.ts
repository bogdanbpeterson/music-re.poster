import { Bot, webhookCallback } from 'https://deno.land/x/grammy@v1.17.2/mod.ts';

export const raise = (error: string): never => {
  throw new Error(error);
};

const MUSIC_CHANNEL = Deno.env.get('MUSIC_CHANNEL') ?? raise('No music channel to send to');
const BOT_TOKEN = Deno.env.get('BOT_TOKEN') ?? raise('No BOT_TOKEN variable');

const bot = new Bot(BOT_TOKEN); // <-- put your bot token between the ""

bot.command('start', (ctx) => ctx.reply('Welcome! Up and running.'));

bot.on(':audio', (ctx) => {
  if (!ctx.msg.audio?.file_id) return ctx.reply('Something wrong, reporting...');
  void ctx.api.sendAudio(MUSIC_CHANNEL, ctx.msg.audio.file_id, {
    caption: '[Music: Reborn](https://t.me/the_ankh_music)',
    parse_mode: 'MarkdownV2',
  });
  return ctx.deleteMessage();
});

const handleUpdates = webhookCallback(bot, 'oak');

export { bot, handleUpdates };