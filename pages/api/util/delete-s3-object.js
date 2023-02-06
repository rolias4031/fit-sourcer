import { getAuth } from '@clerk/nextjs/server';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../../../lib/s3Client';
import { ERRORS } from '../../../lib/constants';

export default async function handler(req, res) {
  const { sessionId } = getAuth(req);
  if (!sessionId) {
    return res.status(403).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }
  console.log(req.body);

  const params = {
    Bucket: 'fitsourcer-files',
    Key: req.body.key,
  };

  try {
    const command = new DeleteObjectCommand(params);
    const response = await s3Client.send(command);
    console.log(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: 'errors happened',
    });
  }

  return res.status(200).json({
    message: 'object deleted',
  });
}
