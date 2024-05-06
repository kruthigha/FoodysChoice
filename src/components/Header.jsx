import { useContext ,useState} from "react";
import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button";
import CartContext from "../store/cartContext";
import userProgressContext from "../store/UserProgress";

export default function Header(){
    const cartCount = useContext(CartContext);
    const userProgressCtx =useContext(userProgressContext);

    
    const val = cartCount.items.reduce((n,item)=>{
       return n+item.quantity;
    },0)
    function handleShowCart(){
        userProgressCtx.showCart();
    }
    
  
    return (<header id="main-header">
        <div id="title" >
            <img src={logoImg} alt="Unavagam App"/>
            <h1 >Unavagam</h1>
        </div>
        <nav>
        <Button label={`Cart(${val})`}  textOnly onClick={handleShowCart}  />
        </nav>
    </header>)
}