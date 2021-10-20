import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, PermissionsAndroid, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import imageAssets from '../../../assets/imageAssets';
import Geolocation from '@react-native-community/geolocation';
import BtnWrapper from '../../../shared/components/btnWrapper';
import * as Work from '../../../shared/exporter';
import SaveBtn from './components/SaveBtn';
import StreetInput from './components/StreetInput';
import InputContainer from './components/InputContainer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import SafeWrapper from '../../../shared/components/safeWrapper';
import BackButton from './components/BackButton';
import Loader from '../../../shared/components/Loader';
import * as Jobs from '../../../store/actions/auth.action';
import * as Yup from 'yup';
import { color } from 'react-native-reanimated';
import { colors } from 'react-native-elements';

const AddAddress = ({ navigation, route }) => {
  // console.log("house No " + Object.entries(route?.params?.addInfo));
  const dispatch = useDispatch();
  const loader = useSelector((state) => state?.auth?.userLoader);
  const user = useSelector((state) => state?.auth);
  const mapRef = useRef(null);
  const searchBoxRef = useRef();
  const [address, setAddress] = useState('');
  const [text, onChangeText] = useState("");
  const [floorUnit, setFloorUnit] = useState(
    route?.params?.addInfo?.house_no ? route?.params?.addInfo?.house_no : '',
  );
  const [noteForRider, setNoteForRider] = useState(
    route?.params?.addInfo?.notes ? route?.params?.addInfo?.notes : '',
  );
  const [error, setError] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(
    route?.params?.addInfo?.title ? route?.params?.addInfo?.title : 'home',
  );
  const [currentLocation, setCurrentLocation] = useState({
    latitude: route?.params?.addInfo?.lat
      ? route?.params?.addInfo?.lat
      : 1.3521,
    longitude: route?.params?.addInfo?.lng
      ? route?.params?.addInfo?.lng
      : 103.8198,
    latitudeDelta: 0.004,
    longitudeDelta: 0.004,
  });

  let schema = Yup.object().shape({
    floor: Yup.number().test('len', 'Invalid Floor/Unit #', (val) => {
      if (val) return val.toString().length < 7;
    }),
  });

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Buey Tahan',
          message: 'Buey Tahan access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition((info) => {
          setCurrentLocation({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004,
          });
          mapAnimateToLocation(info);
        });
      } else {
        // alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onRegionChangeComplete = (region) => {
    setCurrentLocation(region);
    _reverseGeocode();
  };

  const _reverseGeocode = async () => {
    try {
      const checkInternet = await Work.checkInternetConnection();
      if (checkInternet) {
        await fetch(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          currentLocation.latitude +
          ',' +
          currentLocation.longitude +
          `&key=${Work.mapAPIKey}`,
        )
          .then((res) => res.json())
          .then((res) => {
            let address = res.results[0].formatted_address.replace(/"/g, ' ');
            setAddress(address);
            searchBoxRef.current.setAddressText(address);
          });
      } else {
        Work.showToast(Work.INTERNET_CONNECTION_ERROR);
      }
    } catch (error) {
      Work.showToast(Work.GENERAL_ERROR_MSG);
    }
  };

  const mapAnimateToLocation = (info) => {
    mapRef.current.animateToRegion(
      {
        latitude: info.coords.latitude || 31.5204,
        longitude: info.coords.longitude || 74.3587,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      },
      2000,
    );
  };

  const addAddressAPI = () => {
    let addressToSend = route.params
      ? {
        is_default: 0,
        id: route?.params?.addInfo?.id,
        lat: currentLocation?.latitude,
        lng: currentLocation?.longitude,
        address,
        title: selectedLabel === "other" ? text : selectedLabel,
        floor_or_unit: floorUnit,
        note_for_rider: noteForRider,
      }
      : {
        is_default: 0,
        lat: currentLocation?.latitude,
        lng: currentLocation?.longitude,
        address,
        title: selectedLabel === "other" ? text : selectedLabel,
        floor_or_unit: floorUnit,
        note_for_rider: noteForRider,
      };
    console.log('addressToSend', addressToSend);
    dispatch(Jobs.addAddress(addressToSend, navigation));
  };

  const selectLabel = (label) => {
    setSelectedLabel(label);
  };

  const onOtherSelect = (label) => {
    setSelectedLabel(label);
  };


  useEffect(() => {
    route.params === undefined && requestLocationPermission();
  }, []);

  return (
    <SafeWrapper>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
        <Loader visible={loader} />
        <MapView.Animated
          ref={mapRef}
          style={styles.map}
          initialRegion={{ ...currentLocation }}
          onRegionChangeComplete={onRegionChangeComplete}>
          <Marker
            draggable={true}
            onDragEnd={(e) => {
              setCurrentLocation({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004,
              });
              _reverseGeocode();
            }}
            coordinate={currentLocation}
          />
        </MapView.Animated>
        <BackButton />
        <View style={styles.bodyContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.h1}>Add New Address</Text>
            <StreetInput
              searchBoxRef={searchBoxRef}
              setCurrentLocation={setCurrentLocation}
              mapAnimateToLocation={mapAnimateToLocation}
            />
            <InputContainer>
              <TextInput
                placeholder="Floor / Unit #"
                onEndEditing={() => setError(false)}
                onChangeText={(text) => {
                  schema
                    .isValid({
                      floor: text,
                    })
                    .then(function (valid) {
                      if (valid) {
                        setFloorUnit(text);
                        setError(false);
                      } else {
                        setError(true);
                      }
                    });
                  setFloorUnit(text);
                }}
                value={String(floorUnit)}
                keyboardType="numeric"
                style={{ padding: 0, marginLeft: Work.WP('5') }}
              />
            </InputContainer>

            {error && (
              <Text style={{ color: 'red' }}>Invalid Floor / Unit #</Text>
            )}
            <InputContainer>
              <View style={{ height: Work.WP('19') }}>
                <TextInput
                  multiline
                  placeholder="(Optional) Note to Rider"
                  onChangeText={setNoteForRider}
                  style={{ padding: 0, marginLeft: Work.WP('5') }}
                  value={noteForRider}
                />
              </View>
            </InputContainer>
            <View style={{ marginTop: Work.WP('4'), marginBottom: Work.WP('6') }}>
              <Text style={styles.labelHeading}>Label as</Text>
              <View style={styles.selectLabel}>
                <BtnWrapper onPress={() => selectLabel('home')}>
                  <View
                    style={[
                      styles.labelBox,
                      selectedLabel == 'home'
                        ? { backgroundColor: Work.THEME.colors.primary }
                        : null,
                    ]}>
                    <Text style={styles.labelTitle}>Home</Text>
                  </View>
                </BtnWrapper>
                <BtnWrapper onPress={() => selectLabel('work')}>
                  <View
                    style={[
                      styles.labelBox,
                      selectedLabel == 'work'
                        ? { backgroundColor: Work.THEME.colors.primary }
                        : null,
                    ]}>
                    <Text style={styles.labelTitle}>Work</Text>
                  </View>
                </BtnWrapper>
                <BtnWrapper onPress={() => onOtherSelect("other")}>
                  <View
                    style={[
                      styles.labelBox,
                      selectedLabel == 'other'
                        ? { backgroundColor: Work.THEME.colors.primary }
                        : null,
                    ]}>
                    <Text style={styles.labelTitle}>Other</Text>
                  </View>
                </BtnWrapper>
              </View>
              {selectedLabel == 'other'
                ?
                <View>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Enter Any Label"
                  />
                </View>
                : null}
            </View>
          </View>
          {route?.params ? (
            <SaveBtn onPress={addAddressAPI} text="Update Address" />
          ) : (
            <SaveBtn onPress={addAddressAPI} />
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeWrapper>
  );
};

export default React.memo(AddAddress);

const styles = StyleSheet.create({
  map: {
    width: Work.WP('100'),
    height: Work.HP('35'),
    alignSelf: 'center',
  },
  bodyContainer: {
    flex: 1,
    alignSelf: 'center',
    width: '95%',
    marginTop: Work.WP('2'),
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  h1: {
    color: Work.THEME.colors.black,
    fontWeight: 'bold',
    fontSize: Work.WP('6'),
  },
  selectLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelBox: {
    width: '31%',
    borderWidth: 0.5,
    borderColor: Work.THEME.colors.text,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelTitle: {
    fontSize: Work.WP('5'),
    fontWeight: 'bold',
    color: Work.THEME.colors.black,
    paddingVertical: Work.WP('1'),
  },
  labelHeading: {
    fontSize: Work.WP('6'),
    fontWeight: 'bold',
    color: Work.THEME.colors.black,
    marginLeft: Work.WP('3'),
    marginBottom: Work.WP('2'),
  },
  input: {
    height: Work.WP('12'),
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.greyOutline,
    marginVertical: 10
  },
});
