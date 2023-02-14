import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import GarmentListItem from './GarmentListItem';
import GarmentDetailPanel from './GarmentDetailPanel';
import SearchBar from './SearchBar';
import { useSearchVendorGarments } from '../../../../lib/vendor/hooks';

// shallow route to garment page, appears alongside list to the right with its own query that gets details.
// trick is finding how to make the back button collapse the detail. use a query string to encode the id, no id means no detail

function ManageGarmentsList({ allGarments }) {
  const { searchStr, setSearchStr, filteredGarmentsList } =
    useSearchVendorGarments(allGarments);
  const router = useRouter();
  const { id } = router.query;

  const garmentComponents = filteredGarmentsList.map((garment) => {
    const selected = garment.id === id;
    return (
      <GarmentListItem
        key={`${garment.id}${garment.updatedAt}`}
        info={garment}
        selected={selected}
      />
    );
  });

  return (
    <div className="mx-auto w-full lg:w-3/4 flex flex-row">
      <div
        className={`my-5 p-4 ${
          id ? 'basis-1/2 border-r' : 'basis-full'
        } overflow-hidden`}
      >
        <SearchBar
          curState={searchStr}
          raiseState={setSearchStr}
          styles={{ div: 'my-2', input: 'input-lg input-base w-full' }}
        />
        {garmentComponents.length > 0 ? (
          garmentComponents
        ) : (
          <div>No garments</div>
        )}
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
