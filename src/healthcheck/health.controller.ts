import { Controller, Get } from '@nestjs/common';

@Controller('/health')
export class HealthController {
  @Get()
  checkHealth() {
    return { status: 'ok' }; // Responde com um status 'ok' se a aplicação estiver saudável
  }
}