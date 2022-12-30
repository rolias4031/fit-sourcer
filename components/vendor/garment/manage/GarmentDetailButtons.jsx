import React from 'react';
import {
  ChevronRightIcon,
  DocumentCheckIcon,
  PencilSquareIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import GeneralButton from '../../form/GeneralButton';
import { APP_URLS } from '../../../../lib/constants';

function GarmentDetailButtons({ editMode, setEditMode }) {
  const router = useRouter();
  return (
    <>
      {editMode ? (
        <>
          <GeneralButton
            btnStyle="btn-sm btn-gray"
            name="save"
            icon={<DocumentCheckIcon className="icon-sm" />}
            id="save-garment-detail"
            onClick={() => setEditMode(false)}
          />
          <GeneralButton
            btnStyle="btn-sm btn-gray ml-2"
            name="cancel"
            icon={<XMarkIcon className="icon-sm" />}
            id="cancel-save-garment-detail"
            onClick={() => setEditMode(false)}
          />
        </>
      ) : (
        <GeneralButton
          btnStyle="btn-sm btn-gray"
          name="edit"
          icon={<PencilSquareIcon className="icon-sm" />}
          id="edit-garment-detail"
          onClick={() => setEditMode(true)}
        />
      )}
      <GeneralButton
        btnStyle="btn-sm btn-gray ml-auto"
        name="close"
        icon={<ChevronRightIcon className="icon-sm" />}
        id="close-garment-detail-panel"
        onClick={() =>
          router.push(APP_URLS.vendorManage, undefined, { shallow: true })
        }
      />
    </>
  );
}

GarmentDetailButtons.propTypes = {
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
};

export default GarmentDetailButtons;
