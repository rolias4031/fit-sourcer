import React from 'react';
import {
  ChevronRightIcon,
  DocumentCheckIcon,
  PencilSquareIcon,
  XMarkIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import GeneralButton from '../../../form/GeneralButton';
import { APP_URLS } from '../../../../lib/constants';
import ButtonWithConfirm from '../../../form/ButtonWithConfirm';
import FullStatus from '../../../alert/FullStatus';

function GarmentDetailButtons({ editMode, setEditMode, onDelete, onSave, onSaveStatus }) {
  const router = useRouter();
  return (
    <>
      <div className='flex items-center w-full'>
        {editMode ? (
          <>
            <GeneralButton
              styles={{ button: 'btn-sm btn-gray mr-2' }}
              name="save"
              icon={<DocumentCheckIcon className="icon-sm" />}
              id="save-garment-detail"
              onClick={() => onSave(false)}
            />
            <GeneralButton
              styles={{ button: 'btn-sm btn-gray mr-2' }}
              name="cancel"
              icon={<XMarkIcon className="icon-sm" />}
              id="cancel-save-garment-detail"
              onClick={() => setEditMode(false)}
            />
            <ButtonWithConfirm
              styles={{
                button: 'btn-sm btn-red',
              }}
              name="delete"
              icon={<TrashIcon className="icon-sm" />}
              id="delete-garment-detail"
              onClick={onDelete}
              message="Are you sure you want to delete this garment?"
            />
            <FullStatus status={onSaveStatus} aliveTime={0} styles={{div: 'ml-auto mr-2'}}/>
          </>
        ) : (
          <GeneralButton
            styles={{ button: 'btn-sm btn-gray' }}
            name="edit"
            icon={<PencilSquareIcon className="icon-sm" />}
            id="edit-garment-detail"
            onClick={() => setEditMode(true)}
          />
        )}
      </div>

      <GeneralButton
        styles={{ button: 'btn-sm btn-gray ml-auto' }}
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
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSaveStatus: PropTypes.string,
};

export default GarmentDetailButtons;
