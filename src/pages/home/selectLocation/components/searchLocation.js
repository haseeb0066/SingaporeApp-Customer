import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { scale, moderateVerticalScale, moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../shared/components/Loader';
import axios from 'axios';
import * as Work from '../../../../shared/exporter';
import * as Jobs from '../../../../store/actions/auth.action';

// navigator.geolocation = require('@react-native-community/geolocation');
// navigator.geolocation = require('react-native-geolocation-service');

const SearchLocation = ({ }) => {
    const dispatch = useDispatch();
    const [loader, setloader] = useState(false);
    const state = useSelector(state => state?.auth);
    const searchBoxRef = useRef();
    const isFocused = useIsFocused();
    const addID = useSelector((state) => state?.auth?.addID);
    const address = useSelector((state) => state?.auth?.add);

    const _reverseGeocode = async (lat, lng) => {
        try {
            const checkInternet = await Work.checkInternetConnection();
            if (checkInternet) {
                setloader(true)
                await fetch('https://maps.googleapis.com/maps/api/geocode/json?address='
                    + lat + ','
                    + lng +
                    `&key=${Work.mapAPIKey}`)
                    .then(res => res.json())
                    .then(res => {
                        let address = (res.results[0].formatted_address).replace(/"/g, ' ');
                        let searchCheck = true;
                        dispatch(Jobs.setSearchingArea({
                            latitude: lat,
                            longitude: lng,
                            address
                        }, searchCheck));
                        setloader(false);
                    })

            } else {
                Work.showToast(Work.INTERNET_CONNECTION_ERROR);
            }
        } catch (error) {
            setloader(false);
            Work.showToast(Work.GENERAL_ERROR_MSG)
        }
    }


    useEffect(() => {
        if (isFocused) {
            if (addID == null) {
                searchBoxRef.current.setAddressText('');
                return;
                // try {
                //     console.log("Now at Geolocation ...");
                //     Geolocation.getCurrentPosition((info) => {
                //         _reverseGeocode(info.coords.latitude, info.coords.longitude);
                //     });
                //     console.log("Now after Geolocation ...");
                // } catch (err) {
                //     console.warn(err);
                // }
            } else {
                searchBoxRef.current.setAddressText(address);
            }
        }
    }, [isFocused, addID]);


    const getAddress = async (id) => {
        console.log("id " + id);
        if (id !== null) {
            try {
                const checkInternet = await Work.checkInternetConnection();
                if (checkInternet) {
                    setloader(true);
                    const response = await axios.get('get_address');
                    const add = response?.data?.successData?.address.find(
                        (ele) => ele.id === id,
                    );
                    if (response?.data.status == 'success') {
                        searchBoxRef.current.setAddressText(add.address);
                        setloader(false);
                    } else {
                        setloader(false);
                        Work.showToast(Work.GENERAL_ERROR_MSG);
                    }
                } else Work.showToast(Work.INTERNET_CONNECTION_ERROR);
            } catch (error) {
                setloader(false);
                Work.showToast(Work.GENERAL_ERROR_MSG);
            }
        }
    };


    const checkSearchedArea = () => state?.searchedArea ?
        searchBoxRef.current.setAddressText(state?.searchingArea?.address) : null

    return (
        <>
            <Loader visible={loader} />
            <GooglePlacesAutocomplete
                placeholder='Search Address'
                minLength={2}
                autoFocus={false}
                returnKeyType={'search'}
                fetchDetails={true}
                selection={{ start: 0 }}
                multiline
                styles={styles}
                listViewDisplayed={false}
                enableHighAccuracyLocation
                enablePoweredByContainer={false}
                onPress={(data, details) => {
                    _reverseGeocode(details.geometry.location.lat, details.geometry.location.lng);
                }}
                ref={searchBoxRef}
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_2']}
                query={{
                    key: Work.mapAPIKey,
                    language: 'en',
                }}
            />
        </>
    )
}

export default React.memo(SearchLocation);

const styles = StyleSheet.create({
    textInputContainer: {
        paddingTop: moderateVerticalScale(5),
        margin: 0,
        height: 40,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        padding: 0,
        height: '100%',
        color: 'black',
        fontSize: scale(15),
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'left',
        marginRight: 0,
        marginLeft: 0,
        padding: 0,
    },
    predefinedPlacesDescription: {
        color: '#1faadb',
    },
})

