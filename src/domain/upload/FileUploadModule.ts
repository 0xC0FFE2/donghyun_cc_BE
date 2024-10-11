import { Module } from "@nestjs/common";
import { FileUploadController } from "./presentation/FileUploadController";
import { FileUploadService } from "./service/FileUploadService";
import { AuthModule } from "src/global/auth/AuthModule";

@Module({
    imports: [
        AuthModule
    ],
    controllers :[
        FileUploadController,
    ],
    providers :[
        FileUploadService
    ]
})

export class UploadModule { }