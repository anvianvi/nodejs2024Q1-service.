import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, server is running! OpenAPI documentation: http://localhost:4000/doc';
  }
}
