import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Work from '../../../../shared/exporter';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
navigator.geolocation = require('@react-native-community/geolocation');
import SearchLocation from './SearchLocation';
const StreetInput = ({
  setCurrentLocation,
  mapAnimateToLocation,
  searchBoxRef,
}) => {
  return (
    <View style={styles.streetContainer}>
      <View style={styles.streetInnerContainer}>
        {/* <View style={styles.locationName}>
          <View>
            <Ionicons
              name="ios-location-sharp"
              size={Work.WP('8.5')}
              color={'red'}
            />
          </View>
          <View>
            <Text style={styles.locName}>XYZ Plaza</Text>
            <Text style={styles.country}>Singapore</Text>
          </View>
        </View>
        <Text style={styles.missingTitle}>We are missing your street</Text> */}
        <View style={styles.streetInput}>
          <SearchLocation
            searchBoxRef={searchBoxRef}
            setCurrentLocation={setCurrentLocation}
            mapAnimateToLocation={mapAnimateToLocation}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(StreetInput);

const styles = StyleSheet.create({
  streetContainer: {
    marginTop: Work.WP('4'),
    borderRadius: 4,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // elevation: 2,
    borderWidth: 0.5,
    paddingVertical: 15,
    borderColor: Work.THEME.colors.text,
  },
  locationName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Work.WP('4'),
  },
  streetInnerContainer: {
    paddingHorizontal: Work.WP('3'),
  },
  streetInput: {
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: Work.THEME.colors.text,
    marginTop: Work.WP('2'),
  },
  locName: {
    color: Work.THEME.colors.black,
  },
  country: {
    fontSize: Work.WP('4'),
  },
  missingTitle: {
    color: Work.THEME.colors.black,
    fontSize: Work.WP('4.2'),
    marginLeft: Work.WP('3'),
  },
});
