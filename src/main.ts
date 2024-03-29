import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";

import { GlobalException } from "./common/exceptions/global.exception";
import { SwaggerHelper } from "./common/helpers/swagger.helper";
import { swaggerConfig } from "./configs";
import { apiConfigType, AppConfig } from "./configs/api-config.type";
import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      docExpansion: "list",
      defaultModelExpandDepth: 3,
      persistAuthorization: true,
    },
  });

  app.useGlobalFilters(new GlobalException());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  const configService = app.get(ConfigService<apiConfigType>);
  const appConfig = configService.get<AppConfig>("app");

  await app.listen(appConfig.port, () => {
    const url = `http://${appConfig.host}:${appConfig.port}`;
    Logger.log(`Server running ${url}`);
    Logger.log(`Swagger running ${url}/docs`);
  });
}
void bootstrap();
