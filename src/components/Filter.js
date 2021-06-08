import React from 'react'

// adding props into a functional component allows us to use ANY PROPS passed into this component
const Filter = (props) => {

  return (
    <>
      <div className="filterDiv">
        <form className="filterForm" onSubmit={props.filterByType}>
          <select className="form-select" type="text" id="filterType" onChange={props.handleChange}>
            <option value="">Filter By Alcohol Type</option>
            <option value="Gin">Gin</option>
            <option value="Rum">Rum</option>
            <option value="Tequila">Tequila</option>
            <option value="Vodka">Vodka</option>
            <option value="Whiskey">Whiskey</option>
          </select>
          <input className="btn" type="submit" value="Filter Drinks" />
        </form>
      </div>
      <button onClick={props.allDrinks}>See All Drinks</button>
      <br />
      <button onClick={props.feelingLucky}>I Am Feeling Lucky!</button>
    </>
  )

}

export default Filter
