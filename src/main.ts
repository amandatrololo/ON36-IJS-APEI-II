import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '././app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';  // Para logs';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  // Habilita validação e transforma DTOs automaticamente
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('APEI API')
    .setDescription('API para gerenciamento de alunos e relatórios')
    .setVersion('1.0')
    .addBearerAuth({type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token') 
    .addTag('login') // Suporte para autenticação JWT no Swagger
    .addTag('usuarios')
    .addTag('alunos')
    .addTag('relatorios-progresso')
    .addTag('relatorios-profissional')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('escolainclusao', app, document);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);
  const logger = new Logger('Bootstrap');
  logger.log(`Aplicação está rodando na: http://localhost:${port}`);
}

bootstrap();