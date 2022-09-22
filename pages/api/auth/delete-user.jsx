import { withAuth } from '@clerk/nextjs/api';
import { ERRORS, SUCCESS, METHODS } from '../../../lib/constants';

export default withAuth(async (req, res) => {
  // check session
  const { userId, sessionId } = req.auth;
  if (!sessionId) {
    return res.status(401).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }
  const url = `https://api.clerk.dev/v1/users/${userId}`;
  const fetchOptions = {
    method: METHODS.GET,
    headers: {
      Authorization: `Bearer ${process.env.CLERK_API_KEY}`,
    },
  };
  // probably should validate inputs first
  // get Clerk user info and compare to user inputs for security, return error if fail.
  const clerkGetResponse = await fetch(url, fetchOptions);
  const clerkVals = await clerkGetResponse.json();
  if (!clerkGetResponse.ok) {
    return res.status(500).json({
      message: "Something went wrong with Clerk!",
      errors: "Something went wrong with Clerk!"
    })
  }
  const { firstName, lastName, email } = req.body.inputs;
  const clerkEmail = clerkVals.email_addresses.find(
    (address) => address.id === clerkVals.primary_email_address_id,
  );
  if (
    firstName !== clerkVals.first_name ||
    lastName !== clerkVals.last_name ||
    email !== clerkEmail.email_address
  ) {
    return res.status(400).json({
      message: "Credentials don't match",
      errors: "Credentials don't match"
    })
  }
  // make request to delete from Clerk if inputs match Clerk info
  fetchOptions.method = METHODS.DELETE
  const response = await fetch(url, fetchOptions);
  const result = await response.json();
  console.log(result);
  return res.status(200).json({ message: SUCCESS.DELETE });
});
