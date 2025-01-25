import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import sharp from "sharp";

const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'test',
        secretAccessKey: 'test',
    },
    endpoint: 'http://localhost:4566',
    forcePathStyle: true,
});


export async function uploadFileToS3(file: File, fileName: string) {

    const fileBuffer = await sharp(Buffer.from(await file.arrayBuffer()))
        .jpeg({quality: 50})
        .toBuffer();

    const params = {
        Bucket: 'photos',
        Key: `${fileName}`,
        Body: fileBuffer,
        ContentType: "image/jpg",
    };

    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    console.log("File uploaded successfully:", response);
    return fileName;
}
