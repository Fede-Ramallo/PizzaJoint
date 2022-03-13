import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Base from './components/base';
import Toppings from './components/toppings';
import Order from './components/order';
import Home from './components/Home';

function App() {
  const location = useLocation();
  const [pizza, setPizza] = useState({ base: "", toppings:[]});

  const addBase = (base) => {
    setPizza({...pizza, base})
  };

  const addTopping = (topping) => {
    let newToppings;
    if(!pizza.toppings.includes(topping)){
      newToppings = [...pizza.toppings, topping];
    } else {
      newToppings = pizza.toppings.filter(item =>  item !== topping);
    }
    setPizza({...pizza, toppings : newToppings});
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='base'>
          <Base addBase={addBase} pizza={pizza} />
        </Route>
        <Route path='toppings'>
          <Toppings addTopping={addTopping} pizza={pizza}/>
        </Route>
        <Route path='order'>
        <Order pizza={pizza}/>
        </Route>
        <Route>
          <Home />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
