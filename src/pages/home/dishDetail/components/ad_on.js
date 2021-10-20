import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import Line from '../../../../shared/components/Line';

import * as Work from '../../../../shared/exporter';

const {
    WP,
    THEME: { colors },
} = Work;
const AddOns = ({ dishAddons, addons, setAddons }) => {

    return (
        <View>
            <FlatList
                contentContainerStyle={{ marginTop: WP('2') }}
                data={dishAddons}
                renderItem={(item) => <AddOnItem addons={addons} setAddons={setAddons} item={item} />}
                keyExtractor={(item) => item.id + item.ad_on}
            />
        </View>
    );
};

const AddOnItem = ({ item, addons, setAddons }) => {
    const [selected, setSelected] = useState(false)
    const onPress = () => {
        const check = addons.includes(item.item.id);
        if (selected) {
            if (check) {
                const newAddOns = addons.filter(addon_id => addon_id != item.item.id)
                setAddons(newAddOns)
                setSelected(false)
            }
        } else if (!selected) {
            if (!check) {
                setAddons([...addons, item.item.id])
                setSelected(true)
            }
        }
    }

    const findAddOn = () => {
        const check = addons.includes(item.item.id);
        check ? setSelected(true) : setSelected(false);
    }

    useEffect(() => {
        findAddOn();
    }, [addons])

    return (
        item.item.is_active ?
            <View style={{ width: '100%', marginTop: WP('2') }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginHorizontal: WP('2'),
                        marginBottom: WP('1'),
                    }}>
                    <CheckBox
                        containerStyle={{ padding: 0, flex: 0.4 }}
                        size={WP('6')}
                        checked={selected}
                        onPress={onPress}
                        checkedColor={Work.THEME.colors.primary}
                    />
                    <Text style={{ flex: 2 }}>{item.item.ad_on}</Text>
                    <Text style={{ flex: 1, textAlign: 'right' }}>
                        {item.item.prize ? '$ ' + item.item.prize.toFixed(2) : ''}
                    </Text>
                </View>
                <Line />
            </View> : null
    );
}

export default React.memo(AddOns);

const styles = StyleSheet.create({});
