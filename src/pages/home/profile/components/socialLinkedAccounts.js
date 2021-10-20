import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, } from 'react-native';
import SwitchToggle from '@dooboo-ui/native-switch-toggle';
import imageAssets from '../../../../assets/imageAssets'
import Line from '../../../../shared/components/Line'
import { THEME, WP } from '../../../../shared/exporter'

const socialLinkedAccounts = () => {
    const [switchOn1, setSwitchOn1] = useState(false);
    const [switchOn2, setSwitchOn2] = useState(false);
    const [switchOn3, setSwitchOn3] = useState(false);
    return (
        <View style={styles.container}>
            <View style={[styles.innnerContainer]}>
                <Text style={styles.h1}>Linked Accounts</Text>
            </View>
            <View style={[styles.innnerContainer, { height: 50 }, styles.flexRow]}>
                <View style={[styles.flexRow, { flex: 0.8 }]}>
                    <Image source={imageAssets.google} resizeMode='contain' style={styles.socialIcon} />
                    <Text style={{ textAlign: 'left', width: '55%' }}>Google</Text>
                </View>
                <View style={styles.switch}>
                    <View />
                    <SwitchToggle
                        containerStyle={styles.switchContainerStyle}
                        circleStyle={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: switchOn1 ? '#00A54F' : '#D1D2D4',
                            backgroundColor: 'white', 
                        }}
                        backgroundColorOn="#00A54F"
                        backgroundColorOff="#D1D2D4"
                        switchOn={switchOn1}
                        onPress={() => setSwitchOn1(!switchOn1)}
                        circleColorOff="white"
                        circleColorOn="white"
                        duration={200}
                    />
                </View>
            </View>
            <Line />
            <View style={[styles.innnerContainer, { height: 50 }, styles.flexRow]}>
                <View style={[styles.flexRow, { flex: 0.8 }]}>
                    <Image source={imageAssets.facebook} resizeMode='contain' style={styles.socialIcon} />
                    <Text style={{ textAlign: 'left', width: '55%' }}>Facebook</Text>
                </View>
                <View style={styles.switch}>
                    <View />
                    <SwitchToggle
                        containerStyle={styles.switchContainerStyle}
                        circleStyle={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: switchOn2 ? '#00A54F' : '#D1D2D4',
                            backgroundColor: 'white', 
                        }}
                        backgroundColorOn="#00A54F"
                        backgroundColorOff="#D1D2D4"
                        switchOn={switchOn2}
                        onPress={() => setSwitchOn2(!switchOn2)}
                        circleColorOff="white"
                        circleColorOn="white"
                        duration={200}
                    />
                </View>
            </View>
            <Line />
            <View style={[styles.innnerContainer, { height: 50 }, styles.flexRow]}>
                <View style={[styles.flexRow, { flex: 0.8 }]}>
                    <Image source={imageAssets.apple} resizeMode='contain' style={styles.socialIcon} />
                    <Text style={{ textAlign: 'left', width: '55%' }}>Apple</Text>
                </View>
                <View style={styles.switch}>
                    <View />
                    <SwitchToggle
                        containerStyle={styles.switchContainerStyle}
                        circleStyle={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: switchOn3 ? '#00A54F' : '#D1D2D4',
                            backgroundColor: 'white', 
                        }}
                        backgroundColorOn="#00A54F"
                        backgroundColorOff="#D1D2D4"
                        switchOn={switchOn3}
                        onPress={() => setSwitchOn3(!switchOn3)}
                        circleColorOff="white"
                        circleColorOn="white"
                        duration={200}
                    />
                </View>
            </View>
        </View>
    )
}



export default React.memo(socialLinkedAccounts);



const styles = StyleSheet.create({
    container: {
        width: '95%',
        alignSelf: 'center'
    },
    innnerContainer: {
        width: '80%',
        alignSelf: 'center',
    },
    h1: {
        fontSize: WP('6'),
        fontWeight: 'bold',
        color: THEME.colors.black
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    switch: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    socialIcon: {
        width: WP('8'),
        height: WP('8')
    },
    switchContainerStyle: {
        width: 50,
        height: 20,
        borderRadius: 25,
        backgroundColor: 'yellow',
        padding: 0,
    }
})
