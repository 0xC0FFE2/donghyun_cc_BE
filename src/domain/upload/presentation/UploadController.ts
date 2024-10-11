import { Controller, InternalServerErrorException, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../service/UploadService'; // 파일 업로드 서비스 import

@Controller('upload')  // 경로는 주인님께서 원하는 대로 변경 가능
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))  // 'file'은 파일 필드 이름
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
