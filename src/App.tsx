import "./App.css";
import Navbar from "./components/navbar";
import { CartProvider } from "./context/context";
import StorePage from "./pages/storepage";

function App() {
  return (
    <>
      <Navbar />
      <CartProvider>
        <StorePage />
      </CartProvider>
    </>
  );

}


export default App;
