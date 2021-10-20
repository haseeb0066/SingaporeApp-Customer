import * as Types from '../action.types';

const initialState = {
  user: null,
  userLoader: false,
  userAddress: [],
  //addID: null,
  addID: Math.floor((1 + Math.random()) * 0x10000).toString(16),
  searchedArea: false,
  searchingArea: {},
  addState: false,
  add: null,
  couponData:[],
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.USER_LOADER: {
      return {
        ...state,
        userLoader: true,
      };
    }
    case Types.USER_LOADER_FALSE: {
      return {
        ...state,
        userLoader: false,
      };
    }
    case Types.SAVE_ADD_STATE: {
      return {
        ...state,
        addState: action.payload,
      };
    }
    case Types.SAVE_USER: {
      return {
        ...state,
        user: action.payload,
        userLoader: false,
      };
    }
    case Types.USER_ADDRESS: {
      return {
        ...state,
        userAddress: action.payload,
        userLoader: false,
      };
    }
    case Types.SAVE_ADD_ID: {
      return {
        ...state,
        addID: action.payload,
      };
    }
    case Types.SAVE_ADD: {
      return {
        ...state,
        add: action.payload,
      };
    }
    case Types.DEL_ADD: {
      return {
        ...state,
        add: null
      };
    }
    case Types.AREA_SEARCHED: {
      return {
        ...state,
        searchedArea: action.payload.searchCheck,
        searchingArea: action.payload.data,
      };
    }
    case Types.RESET_STATE: {
      return {
        ...state,
        addID: null,
        searchedArea: false,
        userAddress: [],
      };
    }
    case Types.SAVE_COUPON_STATE: {
      return {
        ...state,
        couponData: action.payload,
        //userLoader: false,
      };
    } 
    case Types.DEL_COUPON_STATE: {
      return {
        ...state,
        couponData: null,
        //userLoader: false,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
