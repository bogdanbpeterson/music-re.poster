import { Bot, webhookCallback } from 'https://deno.land/x/grammy@v1.17.2/mod.ts';

export const raise = (error: string): never => {
  throw new Error(error);
};

const BOT_TOKEN = Deno.env.get('BOT_TOKEN') ?? raise('No BOT_TOKEN variable');
const MUSIC_CHANNEL = Deno.env.get('MUSIC_CHANNEL') ?? raise('No MUSIC_CHANNEL variable');
const ME = Deno.env.get('ME') ?? raise('No ME variable');

const bot = new Bot(BOT_TOKEN);

bot.command('start', (ctx) => ctx.reply('Welcome! Up and running.'));

bot.on(':audio', (ctx) => {
  if (ctx.chat.id.toString() !== ME) return ctx.reply('Something wrong, reporting...');
  if (!ctx.msg.audio?.file_id) return ctx.reply('Something wrong, reporting...');
  void ctx.api.sendAudio(MUSIC_CHANNEL, ctx.msg.audio.file_id, {
    caption: '[Music: Reborn](https://t.me/the_ankh_music)',
    parse_mode: 'MarkdownV2',
  });
  return ctx.deleteMessage();
});

const handleUpdates = webhookCallback(bot, 'oak');

export { bot, handleUpdates };
