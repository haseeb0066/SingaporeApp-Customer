import React from 'react'
import { StyleSheet, Text, View, ScrollView, Modal } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { WP, mapAPIKey } from '../../../../shared/exporter';

navigator.geolocation = require('@react-native-community/geolocation');

const SearchLocation = ({ setCurrentLocation, mapAnimateToLocation, searchBoxRef }) => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Street'
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
                let info = {
                    coords: {
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng
                    }
                }
                setCurrentLocation({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    latitudeDelta: 0.004,
                    longitudeDelta: 0.004,
                });
                mapAnimateToLocation(info);
            }}
            ref={searchBoxRef}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_2']}
            query={{
                key: mapAPIKey,
                language: 'en',
            }}
        />
    )
}

export default React.memo(SearchLocation);

const styles = StyleSheet.create({
    textInputContainer: {
    },
    textInput: {
        padding: 0,
        height: 38,
        // color: '#5d5d5d',
        color: 'black',
        fontSize: WP('5'),
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
