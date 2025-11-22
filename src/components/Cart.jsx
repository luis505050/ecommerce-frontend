import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div className="cart-box">
      <h3>🛒 Carrito</h3>

      {cart.length === 0
        ? <p>Carrito vacío</p>
        : cart.map((item, i) => (
            <p key={i}>{item.name} - S/ {item.price}</p>
          ))
      }
    </div>
  );
}
