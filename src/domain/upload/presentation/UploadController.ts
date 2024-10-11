import { Controller, InternalServerErrorException, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../service/UploadService';
import { AdminGuard } from 'src/global/auth/guard/AdminGuard';

@UseGuards(AdminGuard)
@Controller('upload')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        try {
            const result = await this.fileUploadService.uploadFile(file);
            return {
                message: 'File uploaded successfully',
                data: result,
            };
        } catch (error) {
            throw new InternalServerErrorException('File upload failed');
        }
    }
}
