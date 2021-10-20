import React from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
import BtnWrapper from './../../../shared/components/btnWrapper';
import * as Work from './../../../shared/exporter';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { THEME } from '../../../shared/exporter';
const {
    WP,
    THEME: { colors },
} = Work;

const viewCoffeeShops = ({ navigation, route }) => {

    const imgUri = "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"

    console.log("route data  >>>> " + route.params.data);
    return (
        <View style={styles.container}>
            {route.params.data == '' ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.titleTxtNo}>No Coffee Shops Found</Text>
                </View> :
                <FlatList
                    style={{ marginBottom: WP('2'), marginTop: WP('2') }}
                    showsHorizontalScrollIndicator={false}
                    data={route.params.data}
                    renderItem={({ item, index }) => (
                        <BtnWrapper
                            onPress={() =>
                                navigation.navigate('categoryShops', { category: item })
                            }>
                            <View style={{ alignItems: 'center', marginVertical: WP('2') }}>
                                <Image
                                    style={styles.logo}
                                    source={{
                                        uri: item?.cover_image ? item?.cover_image : imgUri,
                                    }}
                                // resizeMode='contain'
                                />
                                <Text style={{ paddingTop: WP('0.8'), fontSize: WP('6') }}>
                                    {/* {item?.name?.length > 12
                                    ? item?.name.substring(0, 12)
                                    : item?.name} */}
                                    {item?.name}
                                </Text>
                            </View>
                        </BtnWrapper>
                    )}
                    keyExtractor={(item, key) => item.id}
                />
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: WP('45'),
        height: WP('50'),
        marginHorizontal: WP('2'),
        borderRadius: WP('1'),
    },
    titleTxtNo: {
        fontSize: scale(20),
        color: THEME.colors.primary,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
});

export default viewCoffeeShops;