import { useRouter } from 'next/router';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

function Redirect({ to }) {
  const router = useRouter();
  useEffect(() => {
    router.push(to);
    return () => {};
  }, [to]);

  return null;
}

Redirect.propTypes = {
  to: PropTypes.string.isRequired,
};

export default Redirect;
