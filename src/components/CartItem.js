
import { ChevronDown, ChevronUp } from "../icons"
import { removeItem, increaseItem, decreaseItem } from "../features/cart/cartSlice"
import { useDispatch, useSelector } from "react-redux"

const CartItem = ({ id, img, title, price, amount }) => {

    const dispatch = useDispatch()
    const basket = useSelector(store => store.cart)

    return (
        <article className="cart-item">
            <img src={img} alt={title} />
            <div>
                <h4>{title}</h4>
                <h4 className="item-price">£{price}</h4>
                <button className="remove-btn" onClick={() => dispatch(removeItem(id))}>Remove</button>
            </div>
            <div>
                <button className="amount-btn" onClick={() => dispatch(increaseItem(id))}>
                    <ChevronUp />
                </button>
                <p className="amount">{amount}</p>
                <button className="amount-btn" onClick={() => {
                    if (amount === 1) {
                        dispatch(removeItem(id))
                        return 
                    }    
                    dispatch(decreaseItem(id)) }}>
                    <ChevronDown />
                </button>
            </div>
        </article>
    )
}

export default CartItem