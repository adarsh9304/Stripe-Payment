import React, { useState, useEffect } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Stubborn Attachments",
    price: 20.00,
    image: "https://i.imgur.com/toQtUgH.jpeg"
  },
  {
    id: 2,
    name: "Product 2",
    price: 30.00,
    image: "https://i.imgur.com/toQtUgH.jpeg"
  },
  {
    id: 3,
    name: "Product 3",
    price: 40.00,
    image: "https://i.imgur.com/toQtUgH.jpeg"
  }
];

const ProductDisplay = ({ products, addToCart }) => (
  <section className="product-display">
    {products.map((product) => (
      <div className="product" key={product.id}>
        <img src={product.image} alt={`The cover of ${product.name}`} />
        <div className="description">
          <h3>{product.name}</h3>
          <h5>${product.price.toFixed(2)}</h5>
        </div>
        <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    ))}
  </section>
);

const Cart = ({ cartItems, handleCheckout, total }) => (
  <section className="cart">
    <h2>Shopping Cart</h2>
    {cartItems.map((item, index) => (
      <div key={index} className="cart-item">
        <h3>{item.name}</h3>
        <h5>${item.price.toFixed(2)} x {item.quantity}</h5>
      </div>
    ))}
    <h3>Total: ${total.toFixed(2)}</h3>
    <form onSubmit={handleCheckout}>
      <button className="checkout-button" type="submit">Checkout</button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section className="message">
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
      setCartItems([]);  // Clear cart after successful order
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4242/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        }))
      }),
    });
    const url = await response.text();  // Get URL from response
     console.log(url)
    window.location.href = url;
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return message ? (
    <Message message={message} />
  ) : (
    <div className="app-container">
      <ProductDisplay products={products} addToCart={addToCart} />
      <Cart cartItems={cartItems} handleCheckout={handleCheckout} total={total} />
    </div>
  );
}
