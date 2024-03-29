import { NestFactory } from '@nestjs/core';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { load } from 'js-yaml';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4001;

  const file = await readFile(join(__dirname, '..', 'doc', 'api.yaml'), 'utf8');
  const document = load(file) as OpenAPIObject;
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`),
      console.log(`OpenAPI documentation: http://localhost:${PORT}/doc`);
  });
}

bootstrap();
