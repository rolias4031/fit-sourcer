import { getAuth } from '@clerk/nextjs/server';
import S3 from 'aws-sdk/clients/s3';
import { randomUUID } from 'crypto';
import { ERRORS } from '../../../lib/constants';

const s3 = new S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
  signatureVersion: 'v4',
});

export default async function handler(req, res) {
  const { userId, sessionId } = getAuth(req);
  if (!sessionId) {
    return res.status(403).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }
  try {
    const { ext } = req.body.inputs;
    const key = `${randomUUID()}.${ext}`;
    const s3Params = {
      Bucket: process.env.BUCKET,
      Key: key,
      Expires: 60,
      ContentType: `image/${ext}`,
    };
    const uploadUrl = await s3.getSignedUrl('putObject', s3Params);
    return res.status(200).json({
      message: 'Success',
      uploadUrl,
      key
    });
  } catch (error) {
    return res.status(500).json({
      message: 'something went wrong',
      errors: 'test error',
    });
  }
}
