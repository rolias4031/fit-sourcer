import React from 'react';
import PropTypes from 'prop-types';
import GeneralLabel from './GeneralLabel';

function GeneralCheckbox({ label, id, name, styles, raiseState }) {
  function clickHandler(event) {
    const { checked } = event.target;
    raiseState((prevState) => {
      const newState = { ...prevState, [name]: checked };
      return newState;
    });
  }

  return (
    <div className={styles.div}>
      <input
        onClick={clickHandler}
        className={styles.input}
        type="checkbox"
        id={id}
        name={name}
      />
    <GeneralLabel id={id} name={name} label={label} style={styles.label} />
    </div>
  );
}

GeneralCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  raiseState: PropTypes.func.isRequired,
  styles: PropTypes.exact({
    div: PropTypes.string,
    input: PropTypes.string,
    label: PropTypes.string,
  }),
};

GeneralCheckbox.defaultProps = {
  checkStyle: '',
};

export default GeneralCheckbox;
