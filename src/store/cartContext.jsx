import React, { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart :()=>{}
});

function cartReducer(state, action) {
  const { items } = state;

  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = items.findIndex(
      (item) => action.id === item.id
    );

    const updatedItems = [...items];

    if (existingCartItemIndex > -1) {
      updatedItems[existingCartItemIndex] = {
        ...updatedItems[existingCartItemIndex],
        quantity: updatedItems[existingCartItemIndex].quantity + 1
      };
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = items.findIndex(
      (item) => action.id === item.id
    );

    const updatedItems = [...items];

    if (existingCartItemIndex > -1) {
      if (updatedItems[existingCartItemIndex].quantity === 1) {
        updatedItems.splice(existingCartItemIndex, 1);
      } else {
        updatedItems[existingCartItemIndex] = {
          ...updatedItems[existingCartItemIndex],
          quantity: updatedItems[existingCartItemIndex].quantity - 1
        };
      }
    }

    return { ...state, items: updatedItems };
  }
  if(action.type==="CLEAR_CART"){
    return {...state,items:[]}
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, cartDispatch] = useReducer(cartReducer, {
    items: []
  });

  function addItem(item) {
    cartDispatch({
      type: "ADD_ITEM",
      item: item
    });
  }

  function removeItem(id) {
    cartDispatch({
      type: "REMOVE_ITEM",
      id: id
    });
  }
  function clearCart(){
    cartDispatch({
      type: "CLEAR_CART",
    })

  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
