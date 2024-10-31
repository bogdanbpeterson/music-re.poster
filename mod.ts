import { Application, Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import { bot, handleUpdates } from './bot.ts';

const router = new Router();

router
  .get('/', (context) => {
    context.response.body = 'Welcome Music Re:Poster!';
  })
  .post(`/${bot.token}`, handleUpdates);

const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

console.log('run');
console.log(
  await (
    await fetch(`https://api.telegram.org/bot${bot.token}/setWebhook?url=${Deno.env.get('PUBLIC_URL')}/${bot.token}`)
  ).text(),
);
await app.listen({ port: 8000 });
