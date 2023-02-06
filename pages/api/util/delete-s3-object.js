import { getAuth } from '@clerk/nextjs/server';
import S3 from 'aws-sdk/clients/s3';
import { ERRORS, s3BucketBaseUrl } from '../../../lib/constants';

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
  console.log(req.body);

  const params = {
    Bucket: 'fitsourcer-files',
    Key: req.body.key
  };

  const result = await s3.deleteObject(params, (err, data) => {
    if (err) console.log(err, err.stack);
    if (data) console.log('delete s3 Object success', data);
  });
  console.log('result', result);
  console.log('result.response', result.httpResponse);

  return res.status(200).json({
    message: 'object deleted',
  });
}
