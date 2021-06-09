import React from 'react'

// adding props into a functional component allows us to use ANY PROPS passed into this component
const Filter = (props) => {

  return (
    <>
      <div className="filterDiv">
        <div id="feelingLuckyButtonDiv">
          <button className="btn btn-light feelingLuckyButton" onClick={props.feelingLucky}>SHAKE IT UP!</button>
        </div>
        <form className="filterForm" onSubmit={props.filterByType}>
          <div className="filterByTypeDiv col-6">
            <select className="filterByType form-select form-select-md mb-2 col-6" type="text" id="filterType" onChange={props.handleChange}>
              <option value="">Choose Your Spirit</option>
              <option value="Gin">Gin</option>
              <option value="Rum">Rum</option>
              <option value="Tequila">Tequila</option>
              <option value="Vodka">Vodka</option>
              <option value="Whiskey">Whiskey</option>
            </select>
          </div>
          <div id="filterDrinksButtonDiv">
            <input className="btn btn-light filterDrinksButton" type="submit" value="SUBMIT FILTER" />
          </div>
        </form>
      </div>
      <div id="allDrinksButtonDiv">
        <button className="btn btn-light allDrinksButton" onClick={props.allDrinks}>SEE ALL DRINKS</button>
      </div>
    </>
  )

}

export default Filter
