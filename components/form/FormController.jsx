import PropTypes from 'prop-types'
import { useDynamicKey } from '../../lib/hooks'

function FormController({ children }) {
  const { dynamicKey, resetFormHandler } = useDynamicKey()
  return (
    children({ dynamicKey, resetFormHandler })
  )
}

FormController.propTypes = {
  children: PropTypes.func.isRequired,
}

export default FormController