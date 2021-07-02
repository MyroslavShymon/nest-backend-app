import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  //*Документируем
  const config = new DocumentBuilder()
    .setTitle("backend tutorial")
    .setDescription("Documentation REAST Api")
    .setVersion("1.0.0")
    .addTag("First-project")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, () => {
    console.log(`Server started on port = ${PORT}`);
  });
}

start();
