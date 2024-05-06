import { useEffect } from "react";
import Meals from "./components/Meals.jsx";
import logo from "./assets/logo.jpg";
import Header from "./components/Header.jsx";
import { CartContextProvider } from "./store/cartContext.jsx";
import { UserProgressProvider } from "./store/UserProgress.jsx";
import Cart from "./components/cart.jsx";
import CheckOut from "./components/checkOutForm.jsx";

function App() {
  const data = useEffect(() => {
    fetch("http://localhost:3000/meals")
      .then((res) => res.json())
      .then(console.log);
  }, []);
  console.log(data);

  return (
    <UserProgressProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <CheckOut />
      </CartContextProvider>
    </UserProgressProvider>
  );
}

export default App;
