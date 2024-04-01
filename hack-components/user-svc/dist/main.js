"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            url: '0.0.0.0:3001',
            package: 'user_svc',
            protoPath: (0, path_1.join)(__dirname, './proto/user_svc.proto')
        }
    });
    app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map