import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get } from '@nestjs/common';

@Controller('health')
class HealthController {
  @Get()
  getHealth() {
    return { status: 'ok', message: 'Servicio funcionando correctamente' };
  }
}

@Controller('api')
class ApiController {
  @Get()
  getApiInfo() {
    return { 
      name: 'Turismo API',
      version: '1.0.0',
      description: 'API para la aplicación de turismo',
      endpoints: [
        '/health',
        '/api',
        '/api/hello',
        '/api/turismo'
      ]
    };
  }

  @Get('hello')
  getHello() {
    return { message: '¡Hola desde Turismo API!' };
  }

  @Get('turismo')
  getTurismoInfo() {
    return {
      servicios: ['Hoteles', 'Vuelos', 'Tours', 'Actividades'],
      disponible: true
    };
  }
}

@Module({
  controllers: [HealthController, ApiController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('🚀 Servidor ejecutándose en http://localhost:3000');
}
bootstrap();
