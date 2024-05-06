import { createContext, useState } from "react";
const userProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  closeCart: () => {},
  checkOutCart: () => {},
});

export function UserProgressProvider({children}) {
  const [userProgress, setUserProgress] = useState("");
  function showCart() {
    setUserProgress("cart");
  }
  function hideCart() {
    setUserProgress("");
  }
  function checkOutCart() {
    setUserProgress("checkOut");
  }
  function closeCart() {
    setUserProgress("");
  }
  const UserProgressContext = {
    progress: userProgress,
    showCart,
    hideCart,
    checkOutCart,
    closeCart,
  };
  console.log(UserProgressContext);
  return (
    <userProgressContext.Provider value={UserProgressContext}>
      {children}
    </userProgressContext.Provider>
  );
}

export default userProgressContext;
