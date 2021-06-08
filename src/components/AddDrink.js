import React, { useState } from 'react'

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

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addDrink(drink)
    setDrink({
      name: '',
      alcohol: '',
      profile: '',
      image: ''
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" name="name" value={drink.name} onChange={handleChange} />
      <br />
      <label htmlFor="alcohol">Alcohol</label>
      <select id="alcohol" type="text" name="alcohol" value={drink.alcohol} onChange={handleChange}>
        <option value="">Choose Alcohol Type...</option>
        <option value="Gin">Gin</option>
        <option value="Rum">Rum</option>
        <option value="Tequila">Tequila</option>
        <option value="Vodka">Vodka</option>
        <option value="Whiskey">Whiskey</option>
      </select>
      <br />
      <label htmlFor="profile">Profile</label>
      <select id="profile" type="text" name="profile" value={drink.profile} onChange={handleChange}>
        <option value="">Choose Drink Profile...</option>
        <option value="Bitter">Bitter</option>
        <option value="Fruity">Fruity</option>
        <option value="Strong">Strong</option>
        <option value="Sweet">Sweet</option>
        <option value="Tart">Tart</option>
      </select>
      <br />
      <label htmlFor="image">Image</label>
      <input id="image" type="text" name="image" value={drink.image} onChange={handleChange} />
      <br />
      <input type="submit" value="Add Drink" />
    </form>
  )
}

export default AddDrink
