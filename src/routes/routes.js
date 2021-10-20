import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Login from '../pages/auth/login/login';
import OnlyLogin from '../pages/auth/login/onlyLogin';
import Email from '../pages/auth/email/email';
import Phoneverification from '../pages/auth/phoneverification/phoneverification';
import Codeverification from '../pages/auth/phoneverification/codeverification';
import NewPassword from '../pages/auth/phoneverification/newPassword';
import Dashboard from '../pages/home/dashboard/dashboard';
import ViewAllCategories from '../pages/home/dashboard/viewAllCategories';
import ViewCoffeeShops from '../pages/home/dashboard/viewCoffeeShops';
import Confirmation from '../pages/home/confirmation/confirmation';
import FindingRider from '../pages/home/confirmation/findingRider';
import CartPage from '../pages/home/Cart/yourcart';
import MenuPage from '../pages/home/Menu/menu';
import Deliveryaddress from '../pages/home/deliveryaddress/deliveryaddress';
import Trackorder from '../pages/home/trackorder/trackorder';
import OrderDeliver from '../pages/home/Orderdeliver/orderdeliver';
import RestaurantDetail from '../pages/home/restaurantDetail/restaurantDetail';
import DishDetail from '../pages/home/dishDetail/DishDetail';
import OrderSummary from '../pages/home/OrderSummary/OrderSummary';
import imageViewer from '../pages/home/OrderSummary/imageViewer';
import LocationSelect from '../pages/home/selectLocation/locationSelect';
import MenuExtendedList from '../pages/home/Menu/screens/components/menuExtendedList';
import MyProfile from '../pages/home/profile/editProfile';
import OrderHistory from '../pages/home/orderHistory/orderHistory';
import SearchFilter from '../pages/home/searchfilter/searchFilter';
import RestaurantStall from '../pages/home/restaurantStall/restaurantStall';
import CategoryShops from '../pages/home/CategoryShops/categoryShops';
import AddAddress from '../pages/home/AddAddress/AddAddress';
import BarMenu from '../pages/home/barMenu/BarMenu';
import AddPaymentMethod from '../pages/home/AddPaymentMethod/AddPaymentMethod';
import SearchScreen from '../pages/home/SearchScreen/SearchScreen';
import SearchedStallsScreen from '../pages/home/SearchedStalls/SearchedStallsScreen';

const Routes = () => {
  const user = useSelector((state) => state?.auth?.user);
  // const orderId = useSelector((state) => state?.cart?.onGoingOrderID);
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="deliveryaddress">
        {!user &&
          <>
            <Stack.Screen
              name="deliveryaddress"
              component={Deliveryaddress}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="onlyLogin"
              component={OnlyLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="email"
              component={Email}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="phoneverification"
              component={Phoneverification}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="codeverification"
              component={Codeverification}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewPassword"
              component={NewPassword}
              options={{ headerShown: false }}
            />
          </>
        }
           {/* ) : ( */}
          <>
            <Stack.Screen
              name="dashboard"
              component={Dashboard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="viewAllCats"
              component={ViewAllCategories}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="viewCoffeeShops"
              component={ViewCoffeeShops}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="searchScreen"
              component={SearchScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="searchsStallsScreen"
              component={SearchedStallsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="barMenu"
              component={BarMenu}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="orderHistory"
              component={OrderHistory}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="categoryShops"
              component={CategoryShops}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="restaurantStall"
              component={RestaurantStall}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="cartpage"
              component={CartPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="paymentMethod"
              component={AddPaymentMethod}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="menupage"
              component={MenuPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="trackorder"
              component={Trackorder}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="searchfilter"
              component={SearchFilter}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="orderdeliver"
              component={OrderDeliver}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="dishdetail"
              component={DishDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ordersummary"
              component={OrderSummary}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="imageViewer"
              component={imageViewer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="restaurantdetail"
              component={RestaurantDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="selectlocation"
              component={LocationSelect}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddAddress"
              component={AddAddress}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="extendedemnu"
              component={MenuExtendedList}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="myprofile"
              component={MyProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="confirmation"
              component={Confirmation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="findingRider"
              component={FindingRider}
              options={{ headerShown: false }}
            />
          </>
          {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
