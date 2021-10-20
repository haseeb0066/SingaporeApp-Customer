import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import BtnWrapper from '../../../../shared/components/btnWrapper';
import { THEME, WP } from '../../../../shared/exporter';
import ComboDetail from './comboDetail';
import { useDispatch, useSelector } from 'react-redux';
const combMenuCard = ({
  image,
  price,
  dish,
  comboName,
  restaurantID,
  comboDealID,
  comboStall,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const store = useSelector((state) => state?.cart);
  const [dishInCart, setDishInCart] = useState(false);


  // console.log("Image is ---->>> " + image);
  // console.log("price is ---->>> " + price);
  // console.log("dish ---->>> " + dish);
  // console.log("comboName ---->>> " + comboName);
  // console.log("restaurantID ---->>> " + restaurantID);
  // console.log("comboDealID ---->>> " + comboDealID);
  // console.log("comboStall ---->>> " + comboStall);
  var dishQuant = dish.length;

  const checkItemInCart = () => {
    const item = store.comboItems.find((element) => {
      return element.combo_id == comboDealID;
    });
    if (item) {
      setDishInCart(true);
    }
  };
  const toggleModal = () => {
    setModalVisible(true);
  };
  useEffect(() => {
    checkItemInCart();
  }, []);
  return (
    <>
      <ComboDetail
        isVisible={isModalVisible}
        setVisible={(show) => setModalVisible(show)}
        comboTitle={comboName}
        comboPrice={price}
        img={image}
        dish={dish}
        restID={restaurantID}
        comboID={comboDealID}
        dishInCart={dishInCart}
        comboStallID={comboStall}
      />
      <BtnWrapper onPress={toggleModal}>
        <View style={styles.itemCardContainer}>
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={{ uri: image }} />
          </View>
          <View style={styles.detailContainer}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.title}>{comboName}</Text>
              {/* <View style={styles.name}>
                {dish.map((data) => {
                  dishQuant--;
                  return (
                    <View key={data.dish.title}>
                      <Text
                        style={{
                          fontSize: WP('3.5'),
                        }}>
                        {data.dish.title} {dishQuant != 0 && '+ '}
                      </Text>
                    </View>
                  );
                })}
              </View> */}
            </View>
            <View>
              <Text style={styles.price}>$ {parseInt(price).toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </BtnWrapper>
    </>
  );
};

export default combMenuCard;
const styles = StyleSheet.create({
  img: {
    width: WP('26'),
    height: WP('26'),
  },
  itemCardContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    height: WP('35'),
    backgroundColor: THEME.colors.white,
  },
  imgContainer: {
    elevation: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  detailContainer: {
    marginLeft: WP('1.5'),
    flexDirection: 'row',
    width: WP('65'),
    height: WP('30'),
    justifyContent: 'space-between'
  },
  title: {
    fontSize: WP('4.5'),
    fontWeight: 'bold',
  },
  name: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  price: {
    fontSize: WP('4'),
  },
});
