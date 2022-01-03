import Modal from "../UI/Modal";
import React, { useContext } from "react";
import classes from "./Cart.module.css";
import CartContext from "../Store/CartContext";
import CartItem from "./CartItem";


const Cart = (props) => {
  const ctx = useContext(CartContext);

  const CartItemremoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const CartAddItemHandler = (item) => {
    ctx.addItem(item);
  };
  const cartItems = (
    <ul className={classes['cart-items']}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={CartItemremoveHandler.bind(null,item.id)}
          onAdd={CartAddItemHandler.bind(null,item)}
        />
      ))}
    </ul>
  );
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItem = ctx.items.length>0;
  return (
    <Modal onclick={props.onHideCart}>
      <div>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {hasItem && <button className={classes.button}>Order</button>}
        </div>
      </div>
    </Modal>
  );
};

export default Cart;