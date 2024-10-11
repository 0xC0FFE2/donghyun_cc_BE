import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class FileUploadService {
    private s3: AWS.S3;
    private readonly bucketName = process.env.AWS_S3_BUCKET_NAME;
    private readonly domainName = process.env.AWS_CLOUDFRONT_DNS_NAME;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'us-east-1',
        });
    }

    async uploadFile(file: Express.Multer.File): Promise<any> {
        const fileExtension = path.extname(file.originalname);
        const key = `${uuidv4()}${fileExtension}`;

        const params = {
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ACL: 'public-read',
        };

        try {
            await this.s3.upload(params).promise();
            const userUrl = this.domainName + "/" + key;
            return { url: userUrl };

        } catch (err) {
            console.log(err)
            throw new InternalServerErrorException('Server Error!')
        }
    }
}
