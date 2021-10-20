import * as Types from '../action.types';

// Simple Actions
const addItemToCart = (cartItem) => {
  return {
    type: Types.ADD_ITEM_TO_CART,
    payload: cartItem,
  };
};

const addComboToCart = (comboItem) => {
  return {
    type: Types.ADD_COMBO_TO_CART,
    payload: comboItem,
  };
};

const orderGoing = (orderID) => {
  return {
    type: Types.ORDER_STATUS,
    payload: orderID,
  };
};

const editCartItem = (updatedItem) => {
  return {
    type: Types.EDIT_CART_ITEM,
    payload: updatedItem,
  };
};

const clearCart = () => {
  return {
    type: Types.CLEAR_CART,
  };
};

const deleteComboItem = (index) => {
  return (dispatch, getState) => {
    if (getState().cart?.comboItems?.length) {
      const cartItems = [...getState().cart?.comboItems];
      const newCartItems = cartItems.filter((item, i) => i != index);
      dispatch(deleteComItem(newCartItems));
    }
  };
};
const deleteComItem = (cart) => {
  return {
    type: Types.DELETE_COMBO_ITEM,
    payload: cart,
  };
};
const deleteItem = (cart) => {
  return {
    type: Types.DELETE_CART_ITEM,
    payload: cart,
  };
};

const changeItemQuantity = (cart) => {
  return {
    type: Types.CHANGE_ITEM_QUANTITY,
    payload: cart,
  };
};

const changeComboItemQuantity = (cart) => {
  return {
    type: Types.CHANGE_COMBO_ITEM_QUANTITY,
    payload: cart,
  };
};

const singleCoffeShop = (coffeShop) => {
  return {
    type: Types.SINGLE_COFFE_SHOP,
    payload: coffeShop,
  };
};

//--------- coupon --------------------------------
const changeCouponState = (CouponBotton) => {
  console.log('////    coupon action     /////');
  return {

    type: Types.CHANGE_COUPON_STATE,
    payload: CouponBotton,
  };
};

// Thunk Actions

const deleteCartItem = (index) => {
  return (dispatch, getState) => {
    if (getState().cart?.cartItems?.length) {
      const cartItems = [...getState().cart?.cartItems];
      const newCartItems = cartItems.filter((item, i) => i != index);
      dispatch(deleteItem(newCartItems));
    }
  };
};

const changeCartItemQuantity = (index, operation) => {
  return (dispatch, getState) => {
    if (getState().cart?.cartItems?.length) {
      const cartItems = [...getState().cart?.cartItems];
      if (operation == 'plus') {
        const item = cartItems.find((item, i) => {
          return i == index;
        });
        console.log(item);
        let newItem = {
          ...item,
          quantity: item.quantity + 1,
          // totalPrice: item.totalPrice + item.completeDish.price
          totalPrice: item.totalPrice + item.singleDishPrice,
        };
        cartItems[index] = newItem;
        dispatch(changeItemQuantity(cartItems));
      } else if (operation == 'minus') {
        const item = cartItems.find((item, i) => {
          return i == index;
        });
        let newItem = {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
          totalPrice:
            item.quantity > 1
              ? item.totalPrice - item.singleDishPrice
              : item.totalPrice,
          // totalPrice: item.quantity > 1 ? item.totalPrice - item.totalPrice : item.totalPrice
        };
        cartItems[index] = newItem;
        dispatch(changeItemQuantity(cartItems));
      }
    }
  };
};

const changeComboCartItemQuantity = (index, operation) => {
  return (dispatch, getState) => {
    if (getState().cart?.comboItems?.length) {
      const cartItems = [...getState().cart?.comboItems];
      if (operation == 'plus') {
        const item = cartItems.find((item, i) => {
          return i == index;
        });
        let newItem = {
          ...item,
          quantity: item.quantity + 1,
          // totalPrice: item.totalPrice + item.completeDish.price
          totalPrice: item.totalPrice + item.singleDishPrice,
        };
        cartItems[index] = newItem;
        dispatch(changeComboItemQuantity(cartItems));
      } else if (operation == 'minus') {
        const item = cartItems.find((item, i) => {
          return i == index;
        });
        let newItem = {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
          totalPrice:
            item.quantity > 1
              ? item.totalPrice - item.singleDishPrice
              : item.totalPrice,
          // totalPrice: item.quantity > 1 ? item.totalPrice - item.totalPrice : item.totalPrice
        };
        cartItems[index] = newItem;
        dispatch(changeComboItemQuantity(cartItems));
      }
    }
  };
};

export {
  addItemToCart,
  editCartItem,
  clearCart,
  deleteCartItem,
  orderGoing,
  changeCartItemQuantity,
  singleCoffeShop,
  addComboToCart,
  deleteComboItem,
  changeComboCartItemQuantity,
  changeCouponState,
};
