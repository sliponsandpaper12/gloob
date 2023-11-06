import dotenv from 'dotenv';
import aws from 'aws-sdk';
import crypto from 'crypto'
import {promisify} from "util"
const randomBytes = promisify(crypto.randomBytes)
dotenv.config()

const region = "ap-southeast-1"
const bucketName="gloobimages"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;


const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion:"v4"
})

export async function generateUploadURL(){
    try {
        const rawBytes = await randomBytes(16);
        const imageName = rawBytes.toString('hex');

        const params = {
            Bucket: bucketName,
            Key: imageName,
            Expires: 60 // This means the URL will expire in 60 seconds
        };

        const uploadURL = await s3.getSignedUrlPromise('putObject', params);
        console.log('Generated S3 presigned URL:', uploadURL); // Log the URL for testing
        return uploadURL;
    } catch (error) {
        console.error('Error generating S3 presigned URL:', error);
        throw error; // Rethrow the error so the caller can handle it
    }
}


// export async function generateUploadURL(){
//     const rawBytes = await randomBytes(16)
//     const imageName = rawBytes.toString('hex')

//     const params=({
//         Bucket: bucketName,
//         Key: imageName,
//         Expires: 60
//     })

//     const uploadURL = await s3.getSignedUrlPromise('putObject',params)
//     return uploadURL
// }