import { currencyFormatter } from "./formatting";
import { useContext } from "react";
import CartContext from "../store/cartContext";
import Button from "../UI/Button";
export default function CartItem({item,name,qty,price,onIncrease,onDecrease}){
    const cartCtx = useContext(CartContext);
    function handleAdd(){
      cartCtx.addItem(item);
    }
    function handleRemove(){
      cartCtx.removeItem(item.id);
    }

    return <li className="cart-item ">
    <p>{name}-{qty}X{currencyFormatter.format(price)}</p>
    
    <p className="cart-item-actions">
    <Button   label="+" onClick={onIncrease} />
    <span>{qty}</span>
    <Button label="-" onClick={onDecrease}/> 
    </p>
 
  </li>
 
}