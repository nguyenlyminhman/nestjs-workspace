import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import AWS from 'aws-sdk';
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import config from './config.json'


@Controller('/s3')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/upload-sdk')
  @UseInterceptors(FileInterceptor('media'))
  uploadAwsSdk(@UploadedFile() media: Express.Multer.File) {
    AWS.config.update({
      accessKeyId: config.AWS_ACCESS_KEY,
      secretAccessKey: config.AWS_SECRET_KEY,
      region: config.REGION
    });
    
    const s3 = new AWS.S3();

    const key = media.originalname;

    s3.putObject({
      Bucket: config.BUCKET,
      Body: media.buffer,
      Key: key
    })
    .promise()
    .then(res => {
      console.log(`Upload succeeded - `, res);
    })
    .catch(err => {
      console.log("Upload failed:", err);
    });

    return key;
  }

  @Post('/upload-client')
  @UseInterceptors(FileInterceptor('media'))
  uploadS3Client(@UploadedFile() media: Express.Multer.File): string {
    console.log('file', media);
    return null;
  }
}
