import { Module } from "@nestjs/common";
import { DriveController } from "src/controllers/drive.controller";
import { DriveService } from "src/services/drive.service";


@Module({
    controllers: [DriveController],
    providers: [DriveService]
})

export class DriveModule { }