
import { useEffect } from 'react'

import Navbar from "./components/Navbar";
import CartContainer from './components/CartContainer'
import Modal from './components/Modal';

import { useDispatch, useSelector } from "react-redux";

import { calculateTotal, getCartItems } from "./features/cart/cartSlice";

function App() {

  const { cartItems, isLoading } = useSelector((store) => store.cart)
  const { isOpen } = useSelector((store) => store.modal)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems])

  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      { isOpen ? <Modal /> : null }
      <Navbar />
      <CartContainer />
    </>
  )
}
export default App;
