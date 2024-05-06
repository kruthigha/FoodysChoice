import Modal from "../UI/Modal";
import userProgressContext from "../store/UserProgress";
import { useContext } from "react";
import { currencyFormatter } from "./formatting";
import CartContext from "../store/cartContext";
import Input from "../UI/Input";
import Button from "../UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "../UI/Error";

const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
}

export default function CheckOut() {
  const userProgressCtx = useContext(userProgressContext);
  const cartCtx = useContext(CartContext);
 const {data,loading,err,sendRequest}=useHttp("http://localhost:3000/orders",config)
    
  const totalPrice = cartCtx.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  function handleCheckOutClose() {
    userProgressCtx.closeCart();
  }
  function handleCheckOutSubmitOrder() {
    userProgressCtx.showCart();
  }
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest( JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }))
   console.log(
      customerData,
      "Order Placed... We are heading to ur location..please keep tracking ypur order"
    );
  }
  function finish(){
    userProgressCtx.closeCart();
    cartCtx.clearCart();
  }
  if (data&&!err){
    return <Modal open={userProgressCtx.progress === "checkOut"} onClose={finish}>
    
        <h2>Success!</h2>
        <p>Your order has been Placed</p>
        <p>We will reach back u soon with an email to track the order</p>
        <p className="modal-actions"><Button label="Okay" onClick={finish}/></p>
        
    </Modal>
  }

  let actions =<><Button
  label="Close"
  onClick={handleCheckOutClose}
  type="button"
  textOnly
/>
<Button label="Submit Order" /></> ;
  if(loading){
    actions = <span>Submitting order</span>
  }
  return (
    <Modal
      open={userProgressCtx.progress === "checkOut"}
      onClose={handleCheckOutClose}
    >
      <h2>CheckOut</h2>
      <p>Total Price :{currencyFormatter.format(totalPrice)}</p>
      <form className="control" onSubmit={handleSubmit}>
        <Input type="text" label="Full Name" name="name" id="full-name" />
        <Input type="email" label="Email" name="email" id="email" />
        <Input type="text" label="Street" name="street" id="street" />
        <div className="control-row">
          <Input
            type="text"
            label="Postal Code"
            name="postal-code"
            id="postal-code"
          />
          <Input type="text" label="City" name="city" id="city" />
        </div>
        {err && <Error title="Unable to submit data" message={err}/>}
        <p className="modal-actions">
          {actions}
        </p>
      </form>
    </Modal>
  );
}
