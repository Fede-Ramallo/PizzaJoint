import React, { useState } from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';
import Base from './components/Base';
import Toppings from './components/Toppings';
import Order from './components/Order';
import Home from './components/Home';
import Header from './components/Header';
import Modal from './components/Modal';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  const [pizza, setPizza] = useState({ base: "", toppings: [] });
  const [showModal, setShowModal] = useState(false);

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
    <>
    <Header />
    <Modal showModal={showModal} setShowModal={setShowModal} />
    <AnimatePresence exitBeforeEnter onExitComplete={() => setShowModal(false)} >
      <Routes location={location} key={location.key}>
        <Route path='/base' element={<Base addBase={addBase} pizza={pizza} />} />
        <Route path='/toppings' element={<Toppings addTopping={addTopping} pizza={pizza}/>} />
        <Route path='/order' element={<Order pizza={pizza} setShowModal={setShowModal} />} />
        <Route path='/' element={ <Home />}/>
      </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
