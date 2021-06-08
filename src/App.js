import React, {useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import AddDrink from './components/AddDrink'
import DeleteDrink from './components/DeleteDrink'
import Filter from './components/Filter'

const App = () => {


  const [drinks, setDrinks] = useState([])
  const [newDrinks, setNewDrinks] = useState(null)
  const [filterType, setFilterType] = useState('')
  const [drinksJSX, setDrinksJSX] = useState(null)

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), [])


  const filterByType = (event) => {
    event.preventDefault()
    const filteredDrinks = []
    for (let i = 0; i < drinks.length; i++) {
      if (drinks[i].alcohol === filterType.filterType) {
        filteredDrinks.push(drinks[i])
        // console.log(filteredDrinks)
      }
    }
    setNewDrinks(filteredDrinks)
  }


  const handleChange = (event) => {
    setFilterType({ [event.target.id]: event.target.value })
  }


  const getDrinks = () => {
    axios
      .get('https://cocktail-concierge.herokuapp.com/drinks')
      .then(
        (response) => {
          setDrinks(response.data.reverse())
        },
        (error) => {
          console.error(error)
        }
      )
      .catch((error) => {
        console.error(error)
      })
  }


  const addDrink = (drink) => {
    axios
      .post('https://cocktail-concierge.herokuapp.com/drinks', drink)
      .then(
        (response) => {
          getDrinks()
          setFilterType('')
          setNewDrinks(null)
          allDrinks()
        }
      )
  }


  const allDrinks = () => {

    setDrinksJSX(
      drinks.map((drink) => {
      return (
        <div key={drink.id}>
          <h4>{drink.name}</h4>
          <img src={drink.image} alt={drink.name} />
          <h5>Alcohol: {drink.alcohol}</h5>
          <h5>Profile: {drink.profile}</h5>
          <DeleteDrink
          getDrinks={getDrinks}
          drink={drink} />
        </div>
      )}
    ))
  }


  const feelingLucky = () => {

    const deleteDrink = (event) => {
      axios
        .delete('https://cocktail-concierge.herokuapp.com/drinks/' + event.target.value)
        .then(
          (response) => {
            forceUpdate()
            getDrinks()
          }
        )
    }

    const index = Math.floor(Math.random() * drinks.length)

    setDrinksJSX (
      <div>
        <h4>{drinks[index].name}</h4>
        <img src={drinks[index].image} alt={drinks[index].name} />
        <h5>Alcohol: {drinks[index].alcohol}</h5>
        <h5>Profile: {drinks[index].profile}</h5>
        <button onClick={deleteDrink} value={drinks[index].id}>Delete Drink</button>
      </div>
    )

  }


  useEffect(() => {
    getDrinks()
  },[])


  useEffect(() => {

    const deleteDrink = (event) => {
      axios
        .delete('https://cocktail-concierge.herokuapp.com/drinks/' + event.target.value)
        .then(
          (response) => {
            getDrinks()
            setNewDrinks(null)
          }
        )
    }

    let drinksMap

    if (newDrinks !== null) {
      drinksMap = newDrinks.map((drink) => {
        return (
          <div key={drink.id}>
            <h4>{drink.name}</h4>
            <img src={drink.image} alt={drink.name} />
            <h5>Alcohol: {drink.alcohol}</h5>
            <h5>Profile: {drink.profile}</h5>
            <button onClick={deleteDrink} value={drink.id}>Delete Drink</button>
          </div>
        )}
      )
      setDrinksJSX(drinksMap)
    } else {
        drinksMap = drinks.map((drink) => {
          return (
            <div key={drink.id}>
              <h4>{drink.name}</h4>
              <img src={drink.image} alt={drink.name} />
              <h5>Alcohol: {drink.alcohol}</h5>
              <h5>Profile: {drink.profile}</h5>
              <button onClick={deleteDrink} value={drink.id}>Delete Drink</button>
            </div>
          )}
        )
        setDrinksJSX(drinksMap)
    }
  },[newDrinks, drinks])


  return (
    <div className="container">
      <h1>The Cocktail Concierge</h1>
      <Filter
      filterByType={filterByType}
      handleChange={handleChange}
      allDrinks={allDrinks}
      feelingLucky={feelingLucky} />
      <AddDrink addDrink={addDrink} />
      <div>
        {drinksJSX}
      </div>
    </div>
  )

}

export default App
