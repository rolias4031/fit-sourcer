import React from 'react'
import CreateGarmentContainer from '../../components/garment/container/CreateGarmentContainer'

/*
* contains a container that initiates a create garment flow.
* starts with selecting a garment type from a dropdown => filling in details => then measurements
*/

function create() {
  return (
    <CreateGarmentContainer />
  )
}

export default create