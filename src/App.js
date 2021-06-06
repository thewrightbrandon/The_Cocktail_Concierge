import React from 'react'
import axios from 'axios'

class App extends React.Component {

  state = {
    drinks: [],
  }


  getDrinks = () => {
    axios
      .get('https://cocktail-concierge.herokuapp.com/drinks')
      .then(
        (response) => {
          this.setState({ drinks: response.data })
        },
        (error) => {
          console.error(error)
        }
      )
      .catch((error) => {
        console.error(error)
      })
  }


componentDidMount = () => {
  this.getDrinks()
}


  render = () => {
    return (
      <div>
        <h1>The Cocktail Concierge</h1>
        {this.state.drinks.map((drink) => {
          return (
            <div key={drink.id}>
              <h4>{drink.name}</h4>
              <img src={drink.image} alt={drink.name} />
              <h5>Main-Alcohol: {drink.alcohol}</h5>
              <h5>Profile: {drink.profile}</h5>
            </div>
          )
        })}
      </div>
    )
  }
}

export default App
