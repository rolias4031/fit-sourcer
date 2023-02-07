import { getAuth } from '@clerk/nextjs/server';
import { Prisma } from '@prisma/client';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../../../lib/s3Client';
import { ERRORS } from '../../../lib/constants';
import { prisma } from '../../../lib/db';

export default async function handler(req, res) {
  const { sessionId } = getAuth(req);
  if (!sessionId) {
    return res.status(403).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }

  console.log('delete-image', req.body);

  const params = {
    Bucket: 'fitsourcer-files',
    Key: req.body.key,
  };

  try {
    const command = new DeleteObjectCommand(params);
    const response = await s3Client.send(command);
    console.log('delete-s3-object', { response });
    if (response.$metadata.httpStatusCode !== 204) {
      return res.status(500).json({
        errors: 'Uknown s3 error',
      });
    }
    await prisma.garmentImage.delete({
      where: {
        key: req.body.key,
      },
    });
  } catch (err) {
    console.log('delete-s3-object', { err });
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(200).json({
        message: err.message,
      });
    }
    return res.status(400).json({
      message: 'something unknown went wrong',
    });
  }

  return res.status(200).json({
    message: 'object deleted',
  });
}
