import * as Types from '../action.types';
import axios from 'axios';
import * as Work from '../../shared/exporter';


// Simple actions
const pendingHomeData = () => {
  return {
    type: Types.PENDING_HOME_DATA,
  };
};

const successHomeData = (payload) => {
  return {
    type: Types.SUCCESS_HOME_DATA,
    payload,
  };
};

const getCurrentLatLng = (payload) => {
  return {
    type: Types.SAVE_LAT_LNG,
    payload,
  };
};

// const getHomeData = (data) => {
//   //console.log(data.user,'.......pass data object');
// //     const Data={
// //     lat: data.lat,
// //     lng: data.lng
// //  }
//   return async (dispatch) => {
//     const checkInernet = await Work.checkInternetConnection();
//     if (checkInernet) {
//       dispatch(pendingHomeData());
//       try {
//         const response = await axios.post('/nearby_resturants', { ...data });
//         console.log(data,'--- home data ----');
//         if (response?.data) {
//           dispatch(successHomeData(response?.data));
//         } else {
//           dispatch(successHomeData(null));
//         }
//       } catch (error) {
//         Work.showToast(Work.GENERAL_ERROR_MSG);
//         dispatch(successHomeData(null));
//       }
//     } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
//   };
// };

const getHomeData =(data)=>  {

  //const {user} = data.user;
  console.log(data,'.......pass data object........');
  const Data={
    lat: data.lat,
    lng: data.lng
  }
  console.log(Data,'.......  data object');
  return async (dispatch) => {
    const checkInernet = await Work.checkInternetConnection();
    if (checkInernet) {
      dispatch(pendingHomeData());

      if(data.user)
      {
        try {
          const response = await axios.post('/nearby_resturants', { ...Data });
          console.log(data.user,'--- Real user ----');
          if (response?.data) {
            dispatch(successHomeData(response?.data));
          } else {
            dispatch(successHomeData(null));
          }
        } catch (error) {
          Work.showToast(Work.GENERAL_ERROR_MSG);
          dispatch(successHomeData(null));
        }

      }
      else
      {
        try {
          const response = await axios.post('https://buey.shifuge.com/api/explore_resturants', { ...Data });
          console.log(data.user ,'--- explore user ----');
          if (response?.data) {
            dispatch(successHomeData(response?.data));
          } else {
            dispatch(successHomeData(null));
          }
        } catch (error) {
          Work.showToast(Work.GENERAL_ERROR_MSG);
          dispatch(successHomeData(null));
        }

      }

    }
    else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
  };
};



export { getHomeData, getCurrentLatLng };
