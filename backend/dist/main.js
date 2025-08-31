"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
let HealthController = class HealthController {
    getHealth() {
        return { status: 'ok', message: 'Servicio funcionando correctamente' };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "getHealth", null);
HealthController = __decorate([
    (0, common_1.Controller)('health')
], HealthController);
let ApiController = class ApiController {
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
    getHello() {
        return { message: '¡Hola desde Turismo API!' };
    }
    getTurismoInfo() {
        return {
            servicios: ['Hoteles', 'Vuelos', 'Tours', 'Actividades'],
            disponible: true
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "getApiInfo", null);
__decorate([
    (0, common_1.Get)('hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('turismo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApiController.prototype, "getTurismoInfo", null);
ApiController = __decorate([
    (0, common_1.Controller)('api')
], ApiController);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [HealthController, ApiController],
    })
], AppModule);
async function bootstrap() {
    const app = await core_1.NestFactory.create(AppModule);
    await app.listen(3000);
    console.log('🚀 Servidor ejecutándose en http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map