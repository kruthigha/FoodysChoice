import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../store/cartContext";
import { currencyFormatter } from "./formatting";
import Button from "../UI/Button";
import userProgressContext from "../store/UserProgress";
import CartItem from "./cartItem";

export default function Cart(){
  const cartCtx= useContext(CartContext);
  const userProgressCtx= useContext(userProgressContext);
  const cartTotal = cartCtx.items.reduce((totalPrice,item)=>{
    return totalPrice+item.quantity*item.price;
  },0)
  function handleAdd(){
   cartCtx.addItem();
  }
  function handleRemove(){
    cartCtx.removeItem();
  }
  function handleClose(){
    userProgressCtx.hideCart();
  }
  function handleShowCheckOut(){
   userProgressCtx.checkOutCart();
  }
  return (
    <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleClose : null}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem className="cart-item" item={item} key={item.id} name={item.name} qty={item.quantity} price={item.price} onIncrease={()=>{cartCtx.addItem(item)} }onDecrease={()=>{cartCtx.removeItem(item.id)}}/>
          
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button label="close" textOnly onClick={handleClose} />
        { cartCtx.items.length > 0 && <Button label="go to checkOut" onClick={handleShowCheckOut}  />}
      </p>
    </Modal>
  );
}
