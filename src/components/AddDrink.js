import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

// adding props into a functional component allows us to use ANY PROPS passed into this component
const AddDrink = (props) => {

  const emptyDrink = {
    name: '',
    alcohol: '',
    profile: '',
    image: ''
  }

  const [drink, setDrink] = useState(emptyDrink)

  const handleChange = (event) => {
    setDrink({ ...drink, [event.target.name]: event.target.value })
  }

  let history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addDrink(drink)
    setDrink({
      name: '',
      alcohol: '',
      profile: '',
      image: ''
    })
    history.push('/')
  }

  return (
    <div className="addDrinkForm">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>CHEERS!</legend>
          <div className="row mb-4 addRow">
            <div className="col-10">
              <label className="form-label" htmlFor="name">NAME</label>
              <input className="form-control" id="name" type="text" name="name"
              value={drink.name} onChange={handleChange} maxLength="23" required />
            </div>
          </div>
          <div className="row mb-4 addRow">
            <div className="col-5">
              <label className="form-label" htmlFor="alcohol">ALCOHOL</label>
              <select className="form-select" id="alcohol" type="text" name="alcohol"
              value={drink.alcohol} onChange={handleChange} required>
                <option value="">Choose...</option>
                <option value="Gin">Gin</option>
                <option value="Rum">Rum</option>
                <option value="Tequila">Tequila</option>
                <option value="Vodka">Vodka</option>
                <option value="Whiskey">Whiskey</option>
              </select>
            </div>
            <div className="col-5">
              <label className="form-label" htmlFor="profile">PROFILE</label>
              <select className="form-select" id="profile" type="text" name="profile"
              value={drink.profile} onChange={handleChange} required>
                <option value="">Choose...</option>
                <option value="Bitter">Bitter</option>
                <option value="Fruity">Fruity</option>
                <option value="Strong">Strong</option>
                <option value="Sweet">Sweet</option>
                <option value="Tart">Tart</option>
              </select>
            </div>
          </div>
          <div className="row mb-4 addRow">
            <div className="col-10">
              <label className="form-label" htmlFor="image">IMAGE</label>
              <input className="form-control" id="image" type="text" name="image"
              value={drink.image} onChange={handleChange} required/>
            </div>
          </div>
          <div id="submitDrinkButtonDiv">
            <input className="btn btn-light submitDrinkButton" type="submit" value="Add Drink" />
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default AddDrink
