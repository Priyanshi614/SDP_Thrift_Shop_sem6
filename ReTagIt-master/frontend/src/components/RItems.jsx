import React from 'react'
import RItem from "./RItem"

function RItems({ r_items, loggedUserRequests = false }) {
  // const items = r_items.item
  return (
    <div className='items-container'>
      {
        r_items.map((r_item, idx) => (
          <RItem r_item={r_item} key={idx} loggedUserRequests={loggedUserRequests}/>
        ))
      }
    </div>
  )
}

export default RItems