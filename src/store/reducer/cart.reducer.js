import * as Types from '../action.types';

const initialState = {
  cartItems: [],
  cartData: [],
  comboItems: [],
  coffeShop: {},
  onGoingOrderID: null,
  CouponBotton:false,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {

// ---------- coupon -----------

case Types.CHANGE_COUPON_STATE: {
  console.log('///// coupon reducer  //////');
  return {
    ...state,
    CouponBotton: action.payload,
  };
}



    case Types.ADD_ITEM_TO_CART: {
      return {
        ...state,
        cartItems: [action.payload, ...state.cartItems],

      };

    }
    case Types.ADD_COMBO_TO_CART: {
      return {
        ...state,
        comboItems: [action.payload, ...state.comboItems],
      };
    }
    case Types.EDIT_CART_ITEM: {
      const cartItems = state.cartItems;
      cartItems[action.payload.index] = action.payload.item;
      return {
        ...state,
        cartItems: cartItems,
      };
    }
    case Types.CLEAR_CART: {
      return {
        ...state,
        cartItems: [],
        comboItems: [],
        coffeShop: {},
      };
    }
    case Types.DELETE_COMBO_ITEM: {
      return {
        ...state,
        comboItems: action.payload,
      };
    }
    case Types.DELETE_CART_ITEM: {
      return {
        ...state,
        cartItems: action.payload,
      };
    }
    case Types.CHANGE_ITEM_QUANTITY: {
      return {
        ...state,
        cartItems: action.payload,
      };
    }
    case Types.CHANGE_COMBO_ITEM_QUANTITY: {
      return {
        ...state,
        comboItems: action.payload,
      };
    }
    case Types.SINGLE_COFFE_SHOP: {
      return {
        ...state,
        coffeShop: action.payload,
      };
    }
    case Types.ORDER_STATUS: {
      return {
        ...state,
        onGoingOrderID: action.payload,
      };
    }
    default:
      return state;
  }
};

export default CartReducer;
