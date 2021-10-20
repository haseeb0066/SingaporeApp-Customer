import * as Types from '../action.types';
import axios from 'axios';
import * as Work from '../../shared/exporter';
import OneSignal from 'react-native-onesignal';

//Simple Actions
const pendingSignUp = () => {
  return {
    type: Types.USER_LOADER,
  };
};

const closeLoader = () => {
  return {
    type: Types.USER_LOADER_FALSE,
  };
};

const saveUser = (user) => {
  return {
    type: Types.SAVE_USER,
    payload: user,
  };
};

const saveAddAddress = (addresses) => {
  return {
    type: Types.USER_ADDRESS,
    payload: addresses,
  };
};
const saveAddState = (current_state) => {
  return {
    type: Types.SAVE_ADD_STATE,
    payload: current_state,
  };
};

const saveAddID = (addresses) => {
  return {
    type: Types.SAVE_ADD_ID,
    payload: addresses,
  };
};

const saveAdd = (address) => {
  return {
    type: Types.SAVE_ADD,
    payload: address,
  };
};

const delAdd = () => {
  return {
    type: Types.DEL_ADD,
  };
};

const delHomeAdd = (data) => {
  return {
    type: Types.DEL_HOME_ADD,
    payload: data,
  };
};

const saveSearchedArea = (data) => {
  return {
    type: Types.AREA_SEARCHED,
    payload: data,
  };
};

const resetState = () => {
  return {
    type: Types.RESET_STATE,
  };
}

// Thunk Actions
const signUp = (data, navigation) => {
  return async (dispatch) => {
    const checkInernet = await Work.checkInternetConnection();
    if (checkInernet) {
      dispatch(pendingSignUp());
      try {
        const response = await axios.post('/register', { ...data });
        console.log('resSign', response?.data);

        if (response?.data.status == 'error') {
          navigation.navigate('phoneverification', {
            user: response?.data?.data?.user,
          });

          dispatch(saveUser(null));
        } else {
          dispatch(saveUser(null));
        }
      } catch (error) {
        Work.showToast(Work.INTERNET_CONNECTION_ERROR);
      }
    } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
  };
};

const login = (data, navigation) => {
  return async (dispatch) => {
    const checkInernet = await Work.checkInternetConnection();
    if (checkInernet) {
      dispatch(pendingSignUp());
      try {
        const response = await axios.post('/login', data);
        console.log('res', response?.data);
        if (response?.data.status == 'error') {
          dispatch(saveUser(null));
          Work.showToast(response?.data.errorMessage);
        } else {
          if (response?.data.status == 'success') {

            OneSignal.sendTag(
              'user_type',
              response?.data?.successData?.user?.role[0],
            );
            OneSignal.sendTag(
              'user_id',
              String(response?.data?.successData?.user.id),
            );
            dispatch(saveUser(response.data));
            navigation.navigate('dashboard');
          } else {
            if (!response?.data?.data?.user?.is_verified) {
              dispatch(saveUser(null));
              navigation.navigate('phoneverification', {
                user: response?.data?.data?.user,
              });
            } else {
              dispatch(saveUser(null));
              response?.data.errorMessage &&
                Work.showToast(response?.data.errorMessage);
            }
          }
        }
      } catch (error) {
        Work.showToast(Work.GENERAL_ERROR_MSG);
      }
    } else Work.showToast(Work.GENERAL_ERROR_MSG);
  };
};

const socialLogin = (data, navigation) => {
  return async (dispatch) => {
    const checkConnection = await Work.checkInternetConnection();
    if (checkConnection) {
      dispatch(pendingSignUp());
      try {
        const response = await axios.post('/social_login', data);
        console.log('login', response?.data);
        if (response?.data) {
          if (response.data.status == 'success') {
            OneSignal.sendTag('user_type', 'Customer');
            OneSignal.sendTag(
              'user_id',
              String(response?.data?.successData?.user.id),
            );
            dispatch(saveUser(response.data));
          } else if (response.data.status == 'error') {
            dispatch(saveUser(null));
            navigation.navigate('phoneverification', {
              user: response?.data.data.user,
            });
          }
        }
      } catch (error) {
        dispatch(saveUser(null));
        Work.showToast(Work.GENERAL_ERROR_MSG);
      }
    } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
  };
};

const addAddress = (data, navigation) => {
  return async (dispatch, getState) => {
    let checkInernet = await Work.checkInternetConnection();
    if (checkInernet) {
      try {
        dispatch(pendingSignUp());
        const response = await axios.post('/add_address', data);
        console.log('add address', response?.data);
        console.log('adress param', data);
        if (response?.data) {
          if (response?.data?.status == 'success') {
            dispatch(saveAddAddress(response?.data?.successData?.address));
            navigation.goBack();
          } else if (response?.data?.status == 'error') {
            dispatch(closeLoader());
            Work.showToast(Work.GENERAL_ERROR_MSG);
            console.log('else if');
          }
        } else {
          Work.showToast(Work.GENERAL_ERROR_MSG);
          console.log('else');
        }
      } catch (error) {
        Work.showToast(Work.GENERAL_ERROR_MSG);
      }
    } else {
      Work.showToast(Work.INTERNET_CONNECTION_ERROR);
      console.log('main  else');
    }
  };
};
const addCurrentAddress = (data, navigation) => {
  return async (dispatch, getState) => {
    let checkInernet = await Work.checkInternetConnection();
    if (checkInernet) {
      try {
        console.log(data);
        const response = await axios.post('/add_address', data);
        if (response?.data) {
          console.log('Log Unde', response?.data);
          if (response?.data?.status == 'success') {
            dispatch(saveAddAddress(response?.data?.successData?.address));
            const len = response?.data?.successData?.address.length;
            console.log("The Length of addresses ..?" + len);
            console.log("The ID of address Assigned ..?" + response?.data?.successData?.address[len - 1].id);
            dispatch(
              saveAddID(response?.data?.successData?.address[len - 1].id),
            );
            navigation.navigate('ordersummary');
          } else if (response?.data?.status == 'error') {
            dispatch(closeLoader());
            console.log('Idher');
            Work.showToast(Work.GENERAL_ERROR_MSG);
          }
        } else {
          Work.showToast(Work.GENERAL_ERROR_MSG);
        }
      } catch (error) {
        Work.showToast(Work.GENERAL_ERROR_MSG);
      }
    } else {
      Work.showToast(Work.INTERNET_CONNECTION_ERROR);
    }
  };
};


const getAddress = (data, navigation) => {
  return async (dispatch, getState) => {
    let checkInernet = await Work.checkInternetConnection();
    if (checkInernet) {
      try {
        dispatch(pendingSignUp());
        const response = await axios.get('/get_address');
        if (response?.data) {
          if (response?.data?.status == 'success') {
            dispatch(saveAddAddress(response?.data?.successData?.address));
          } else if (response?.data?.status == 'error') {
            dispatch(closeLoader());
            Work.showToast(Work.GENERAL_ERROR_MSG);
          }
        } else {
          Work.showToast(Work.GENERAL_ERROR_MSG);
        }
      } catch (error) {
        Work.showToast(Work.GENERAL_ERROR_MSG);
      }
    } else {
      Work.showToast(Work.INTERNET_CONNECTION_ERROR);
    }
  };
};

const setSearchingArea = (data, searchCheck, addressToSend, navigation) => {
  return (dispatch) => {
    dispatch(
      saveSearchedArea({
        data,
        searchCheck: searchCheck,
      }),
    );
    addressToSend && dispatch(addCurrentAddress(addressToSend, navigation));
  };
};

const setCurrentArea = (data, searchCheck, addressToSend, navigation) => {
  return (dispatch) => {
    dispatch(
      saveSearchedArea({
        data,
        searchCheck: searchCheck,
      }),
    );
    addressToSend && dispatch(setCurrentAddress(addressToSend, navigation));
  };
};

const setCurrentAddress = (data, navigation) => {
  return async (dispatch) => {
    let checkInernet = await Work.checkInternetConnection();
    if (checkInernet) {
      try {
        navigation.navigate('ordersummary');
      } catch (error) {
        setloader(false);
        Work.showToast(Work.GENERAL_ERROR_MSG);
      }
    } else {
      Work.showToast(Work.INTERNET_CONNECTION_ERROR);
    }
  };
};
export {
  signUp,
  login,
  socialLogin,
  saveUser,
  addAddress,
  getAddress,
  setSearchingArea,
  setCurrentArea,
  addCurrentAddress,
  setCurrentAddress,
  saveAddID,
  saveAddState,
  resetState,
  saveAdd,
  delAdd,
};
