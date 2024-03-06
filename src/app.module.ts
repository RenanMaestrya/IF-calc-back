import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsService } from './students/students.service';
import { StudentsController } from './students/students.controller';
import { StudentModule } from './students/student.module';
import { ModelsModule } from './models/models.module';

@Module({
  imports: [StudentModule, ModelsModule],
  controllers: [AppController, StudentsController],
  providers: [AppService, StudentsService],
})
export class AppModule {}
