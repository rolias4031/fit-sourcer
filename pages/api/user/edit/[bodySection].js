import { withAuth } from '@clerk/nextjs/api'
import { ERRORS, METHODS } from '../../../../lib/constants';
import { convertBodySectionValuesToNums, editUserBodySection } from '../../../../lib/util';
import { editBodySectionSchema } from '../../../../validation/schemas';

/*
 * 1. get the link params, check if an id exists on user using a findUnique()
 * 2. if doesn't exist, connect user to newly created bodySection
 * 3. if does exist, then update the values.
 */
export default withAuth(async (req, res) => {
  // check session
  const { userId, sessionId } = req.auth;
  if (!sessionId) {
    return req.status(401).json({
      message: ERRORS.UNAUTHORIZED,
    });
  }

  // check method
  if (req.method !== METHODS.PUT) {
    return res.status(405).json({ message: ERRORS.METHOD_NOT_ALLOWED });
  }
  // get bodySection and inputs, also set up validation here and input value conversion -> int/floats
  const { inputs } = req.body
  const convertedInputs = convertBodySectionValuesToNums(inputs)
  const val = editBodySectionSchema.safeParse(convertedInputs)
  if (!val.success) {
    return res.status(400).json({
      message: `${ERRORS.VALIDATION_FAILED} - ${val.error.issues[0].message}`
    })
  }
  // make edits and return error if update is empty or failed
  const { bodySection } = req.query
  const update = await editUserBodySection(userId, bodySection, inputs)
  if (!update) {
    return res.status(404).json({ message: ERRORS.NOT_FOUND })
  }
  return res.status(201).json({
    message: 'Update success',
    update,
  });
})