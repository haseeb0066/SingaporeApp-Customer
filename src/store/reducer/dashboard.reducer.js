import * as Types from '../action.types';

const initialState = {
  homeData: null,
  homeDataLoader: false,
  latlngData: {},
};

const HomeReducer = (state = initialState, action) => {

  switch (action.type) {
    case Types.PENDING_HOME_DATA: {
      return {
        ...state,
        homeDataLoader: true,
      };
    }
    case Types.SUCCESS_HOME_DATA: {
      return {
        ...state,
        homeData: action.payload,
        homeDataLoader: false,
      };
    }
    case Types.SAVE_LAT_LNG: {
      return {
        ...state,
        latlngData: action.payload,
        homeDataLoader: false,
      };
    }
    default:
      return state;
  }
};

export default HomeReducer;
