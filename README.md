# 🧠 Turismoapp - Backend

## ✨ Descripción General
Este backend es el núcleo de Turismoapp, una plataforma que conecta turistas con operadores y guías certificados. Gestiona:

- Lógica de negocio
- Autenticación y control de acceso  
- Interacción con PostgreSQL y CouchDB
- Seguridad integral
- Flujo financiero con fiduciaria
- Reglas de cancelación y condiciones legales

## 🧩 Arquitectura Técnica
[Frontend Web/App]
|
v
[Backend NestJS]
├── PostgreSQL 🐘 → reservas, transacciones, bitácoras
└── CouchDB 🛢️ → perfiles, hojas de vida, reseñas, sesiones
|
v
[Fiduciaria API] → retención y liberación de pagos

text

## 🚀 Primeros Pasos

### 📦 Requisitos Previos
- Docker & Docker Compose
- Node.js ≥ 18.x
- Git

### 🛠️ Configuración del Entorno
```bash
git clone https://github.com/tritano/Turismoapp.git
cd Turismoapp/backend
npm install
cp .env.example .env
✅ Validación del Entorno
bash
npm run check:env
🐳 Levantando los Servicios
👷 Modo Desarrollo (con hot-reloading)
bash
docker compose -f docker-compose.base.yml -f docker-compose.dev.yml up
🚀 Modo Producción
bash
docker compose -f docker-compose.base.yml -f docker-compose.yml up -d
🗂️ Estructura del Proyecto
text
Turismoapp/
├── backend/                 # API NestJS
├── frontend/                # Aplicación React
├── database/               # Scripts de inicialización
├── docker-compose.base.yml # Configuración base
├── docker-compose.dev.yml  # Desarrollo con hot-reload
└── docker-compose.yml      # Producción
🔐 Buenas Prácticas de Seguridad
Contraseñas: bcrypt.hash(password, 10)

RBAC: @Roles('operador') + RolesGuard

Validación: DTOs con class-validator

Logging: Winston o Pino, sin PII

Producción: HTTPS + HSTS + proxy para CouchDB

💼 Modelo de Negocio
🔐 Flujo con Fiduciaria
Turista paga → dinero retenido

Operador inicia actividad → fiduciaria libera fondos

Backend actualiza estado y registra transacción

📜 Reglas de Cancelación
Tiempo antes	Penalización	Reembolso
≥ 48h	0%	100%
24–48h	20%	80%
< 24h	50%	50%
Iniciada	100%	0%
🌐 API Endpoints
Swagger: http://localhost:3002/api

Health: http://localhost:3002/health

🧪 Pruebas y Validación
bash
npm run test
⚙️ CI/CD Recomendado
text
[Push a GitHub/GitLab]
       ↓
[CI/CD Pipeline]
       ↓
- npm run lint
- npm run test  
- npm run check:env
- SAST (Semgrep, Snyk)
- DAST (ZAP scan)
       ↓
[Deploy a Staging/Prod]
📞 Soporte
Para problemas técnicos contactar al equipo de desarrollo.

📄 Licencia
MIT License - ver LICENSE para detalles.
EOF