import React, {useState, useEffect } from 'react'

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import axios from 'axios'

import AddDrink from './components/AddDrink'
// import DeleteDrink from './components/DeleteDrink'
import Filter from './components/Filter'

const App = () => {


  const [drinks, setDrinks] = useState([])
  const [newDrinks, setNewDrinks] = useState(null)
  const [filterType, setFilterType] = useState('')
  const [drinksJSX, setDrinksJSX] = useState(null)


  const filterByType = (event) => {
    event.preventDefault()
    const filteredDrinks = []
    for (let i = 0; i < drinks.length; i++) {
      if (filterType.filterType === "") {
        return allDrinks()
      } else if (drinks[i].alcohol === filterType.filterType) {
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
        <div key={drink.id} className="card mt-4 mb-4">
          <h4 className="card-header">{drink.name}</h4>
          {drink.image.includes('https://') ? <img className="card-img" src={drink.image} alt={drink.name} />
           : <img className="card-img" src="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg" alt="Not Found" />}
          <div className="card-body">
            <h5 className="card-text">Alcohol: {drink.alcohol}</h5>
            <h5 className="card-text">Profile: {drink.profile}</h5>
          </div>
          {/*<DeleteDrink
          getDrinks={getDrinks}
          drink={drink} />*/}
        </div>
      )}
    ))
  }


  const feelingLucky = () => {

    // const deleteDrink = (event) => {
    //   axios
    //     .delete('https://cocktail-concierge.herokuapp.com/drinks/' + event.target.value)
    //     .then(
    //       (response) => {
    //         forceUpdate()
    //         getDrinks()
    //       }
    //     )
    // }

    const index = Math.floor(Math.random() * drinks.length)

    setDrinksJSX (
      <div className="card lucky-card mt-4 mb-4">
        <h4 className="card-header">{drinks[index].name}</h4>
        {drinks[index].image.includes('https://') ? <img className="card-img lucky-card-img" src={drinks[index].image} alt={drinks[index].name} />
        : <img className="card-img lucky-card-img" src="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg" alt="Not Found" />}
        <div className="card-body">
          <h5 className="card-text">Alcohol: {drinks[index].alcohol}</h5>
          <h5 className="card-text">Profile: {drinks[index].profile}</h5>
        </div>
        {/*<button onClick={deleteDrink} value={drinks[index].id}>Delete Drink</button>*/}
      </div>
    )

  }


  useEffect(() => {
    getDrinks()
  },[])


  useEffect(() => {

    // const deleteDrink = (event) => {
    //   axios
    //     .delete('https://cocktail-concierge.herokuapp.com/drinks/' + event.target.value)
    //     .then(
    //       (response) => {
    //         getDrinks()
    //         setNewDrinks(null)
    //       }
    //     )
    // }

    let drinksMap

    if (newDrinks !== null) {
      drinksMap = newDrinks.map((drink) => {
        return (
          <div key={drink.id} className="card mt-4 mb-4">
            <h4 className="card-header">{drink.name}</h4>
            {drink.image.includes('https://') ? <img className="card-img" src={drink.image} alt={drink.name} />
             : <img className="card-img" src="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg" alt="Not Found" />}
             <div className="card-body">
               <h5 className="card-text">Alcohol: {drink.alcohol}</h5>
               <h5 className="card-text">Profile: {drink.profile}</h5>
             </div>
            {/*<button onClick={deleteDrink} value={drink.id}>Delete Drink</button>*/}
          </div>
        )}
      )
      setDrinksJSX(drinksMap)
    } else {
        drinksMap = drinks.map((drink) => {
          return (
            <div key={drink.id} className="card mt-4 mb-4">
              <h4 className="card-header">{drink.name}</h4>
              {drink.image.includes('https://') ? <img className="card-img" src={drink.image} alt={drink.name} />
               : <img className="card-img" src="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg" alt="Not Found" />}
              <div className="card-body">
                <h5 className="card-text">Alcohol: {drink.alcohol}</h5>
                <h5 className="card-text">Profile: {drink.profile}</h5>
              </div>
              {/*<button onClick={deleteDrink} value={drink.id}>Delete Drink</button>*/}
            </div>
          )}
        )
        setDrinksJSX(drinksMap)
    }
  },[newDrinks, drinks])


  return (
    <BrowserRouter>
      <div>
        <nav className="navbar">
          <ul className="container-fluid navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to='/'>Find a Drink</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/AddDrink'>Add a Drink</Link>
            </li>
          </ul>
        </nav>
        <div className="container">
          <Switch>
            <Route exact path='/'>
              <h1>The Cocktail Concierge</h1>
              <Filter
              filterByType={filterByType}
              handleChange={handleChange}
              allDrinks={allDrinks}
              feelingLucky={feelingLucky} />
              <div className="container-fluid drinksDiv">
                <div className="row flex-row flex-nowrap overflow-auto">
                  {drinksJSX}
                </div>
              </div>
            </Route>
            <Route path='/AddDrink'>
              <AddDrink addDrink={addDrink} />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>  
  )

}

export default App
