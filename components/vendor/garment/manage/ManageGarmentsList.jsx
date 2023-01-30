import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import GarmentListItem from './GarmentListItem';
import GarmentDetailPanel from './GarmentDetailPanel';

// shallow route to garment page, appears alongside list to the right with its own query that gets details.
// trick is finding how to make the back button collapse the detail. use a query string to encode the id, no id means no detail

function ManageGarmentsList({ allGarments }) {
  const router = useRouter();
  const { id } = router.query;

  const allGarmentsList = allGarments.map((garment) => (
    <GarmentListItem key={`${garment.id}${garment.updatedAt}`} info={garment} />
  ));

  return (
    <div className="mx-auto w-full lg:w-3/4 border flex flex-row">
      <div
        className={`border border-red-500 m-5 ${
          id ? 'basis-1/2' : 'basis-full'
        }`}
      >
        {allGarmentsList.length > 0 ? allGarmentsList : <div>No garments</div>}
      </div>
      {id && <GarmentDetailPanel garmentId={id} />}
    </div>
  );
}

ManageGarmentsList.propTypes = {
  allGarments: PropTypes.arrayOf(
    PropTypes.shape({
      calf: PropTypes.string,
      waist: PropTypes.string,
      hip: PropTypes.string,
      seat: PropTypes.string,
      thigh: PropTypes.string,
      inseam: PropTypes.string,
      outseam: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string,
      modelNumber: PropTypes.string,
    }),
  ).isRequired,
};

export default ManageGarmentsList;
