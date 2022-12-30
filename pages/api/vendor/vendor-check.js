import { prisma } from '../../../lib/db';
import { ERRORS, USER_ROLES } from '../../../lib/constants';

export default async function handler(req, res) {
  // check if the user at the email trying to sign in is a vendor
  // return 401 if not
  // if role === VENDOR, then use Clerk's API to get the primary email address id, which we need for the frontend signin flow.
  const thisUser = await prisma.user.findUnique({
    where: {
      email: req.body.inputs.email,
    },
    select: {
      id: true,
      role: true,
    },
  });
  if (!thisUser) {
    return res.status(404).json({
      message: 'not found',
      errors: ERRORS.USER_NOT_FOUND,
    });
  }
  if (thisUser.role !== USER_ROLES.vendor) {
    return res.status(401).json({
      message: 'User not a vendor',
      errors: ERRORS.UNAUTHORIZED,
    });
  }
  // get the emailAddressId from Clerk backend api using userId
  const url = `https://api.clerk.dev/v1/users/${thisUser.id}`;
  const fetchOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.CLERK_API_KEY}`,
      'Content-Type': 'application/json',
    },
  };
  let emailAddressId;
  try {
    const response = await fetch(url, fetchOptions);
    console.log({ response });
    const result = await response.json();
    console.log(result);
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(result.message);
    }
    emailAddressId = result.primary_email_address_id
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({
    message: 'success',
    emailAddressId,
  });
}
