import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import AWS from 'aws-sdk';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import config from './config.json'


@Controller('/s3')
export class AppController {
  constructor(private readonly appService: AppService) { }

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
  async uploadS3Client(@UploadedFile() media: Express.Multer.File) {
    const s3Client = new S3Client({
      credentials: {
        accessKeyId: config.AWS_ACCESS_KEY,
        secretAccessKey: config.AWS_SECRET_KEY,
      },
      region: config.REGION,
      // signatureVersion: 'v4',
    });

    const key = media.originalname;
    const params = {
      Bucket: config.BUCKET,
      Body: media.buffer,
      Key: key,
    };
  
    const command = new PutObjectCommand(params);
    let data: any = {};
    try {
      data = await s3Client.send(command);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(data);
    }

    return key;
  }
}
