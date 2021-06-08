import React from 'react'
import axios from 'axios'

// adding props into a functional component allows us to use ANY PROPS passed into this component
const DeleteDrink = (props) => {

  const deleteDrink = (event) => {
    axios
      .delete('https://cocktail-concierge.herokuapp.com/drinks/' + event.target.value)
      .then(
        (response) => {
          props.getDrinks()
        }
      )
  }

  return (
    <div>
      <button onClick={deleteDrink} value={props.drink.id}>Delete Drink</button>
    </div>
  )

}

export default DeleteDrink
