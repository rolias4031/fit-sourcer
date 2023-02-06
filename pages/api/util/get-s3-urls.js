import { getAuth } from '@clerk/nextjs/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import s3Client from '../../../lib/s3Client';

import { ERRORS, s3BucketBaseUrl } from '../../../lib/constants';

export default async function handler(req, res) {
  const { sessionId } = getAuth(req);
  if (!sessionId) {
    return res.status(403).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }

  const { ext } = req.body.inputs;
  const key = `${randomUUID()}.${ext}`;
  const hostedUrl = `${s3BucketBaseUrl}/${key}`;

  const params = {
    Bucket: process.env.BUCKET,
    Key: key,
    ContentType: `image/${ext}`,
  };

  try {
    const command = new PutObjectCommand(params);
    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60,
    });
    return res.status(200).json({
      message: 'Success',
      uploadUrl,
      hostedUrl,
      key,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: 'error happened',
    });
  }
}
