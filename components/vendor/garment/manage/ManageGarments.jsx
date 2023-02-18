import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import GarmentDetailPanel from './GarmentDetailPanel';
import SearchBar from './SearchBar';
import { useFilterVendorGarments } from '../../../../lib/vendor/hooks';
import GarmentStats from './GarmentStats';
import GarmentsList from './GarmentsList';

// shallow route to garment page, appears alongside list to the right with its own query that gets details.
// trick is finding how to make the back button collapse the detail. use a query string to encode the id, no id means no detail

function ManageGarments({ allGarments }) {
  const { searchStr, setSearchStr, filter, setFilter, filteredGarmentsList } =
    useFilterVendorGarments(allGarments);
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className='flex py-5'>
      <div
        className={`p-4 flex flex-col space-y-5 ${
          id ? 'basis-1/2 border-r' : 'basis-full'
        } overflow-hidden`}
      >
        <SearchBar
          curState={searchStr}
          raiseState={setSearchStr}
          styles={{ div: '', input: 'input-lg input-base w-full' }}
        />
        {allGarments.length > 0 ? (
          <>
            <GarmentStats
              garments={allGarments}
              styles={{ div: 'flex space-x-5 items-center' }}
              raiseFilter={setFilter}
              curFilter={filter}
            />
            <GarmentsList
              garments={filteredGarmentsList}
              selectedGarmentId={id}
              styles={{ div: 'flex flex-col space-y-3' }}
            />
          </>
        ) : (
          <div>No garments</div>
        )}
      </div>
      {id ? (
        <GarmentDetailPanel
          garmentId={id}
          styles={{ div: 'p-4 basis-1/2' }}
        />
      ) : null}
    </div>
  );
}

ManageGarments.propTypes = {
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

export default ManageGarments;
