import { Controller, InternalServerErrorException, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../service/FileUploadService';
import { AdminGuard } from 'src/global/auth/guard/AdminGuard';

@Controller('upload')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        try {
            const result = await this.fileUploadService.uploadFile(file);
            return result;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('서버 오류 발생');
        }
    }
}
