import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')


  app.use(
    session({
      secret: 'your_secret_key', // Use a secret for signing the session ID cookie (ideally from environmental variables)
      resave: false, // Forces the session to be saved even when unmodified
      saveUninitialized: false, // Forces a session that is "uninitialized" to be saved to the store
      cookie: {
        secure: process.env.NODE_ENV === 'production', // Ensures cookies are only used over HTTPS
        httpOnly: true, // Prevents client-side JS from reading the cookie
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
