import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableHighlight, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function CheckBotton({id, text, isCompleted, isToday, hour}) {
    const [count, setCount] = React.useState(false);
    const onPress = () => setCount(count => !count);

    return (
        <>
            <TouchableHighlight onPress={onPress} style={count ? styles.checked: styles.unChecked}>
                <View >
                    <Text>{ count && <Entypo name="check" size={16} color="#FAFAFA" /> }</Text>
                </View>
            </TouchableHighlight>
        </>
    )
}

const styles = StyleSheet.create({
    checked: {
        width: 20,
        height: 20,
        marginRight: 13,
        borderRadius: 6,
        backgroundColor: '#262626',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .3,
        shadowRadius: 5,
        elevation: 5,
    },
    unChecked: {
        width: 20,
        height: 20,
        marginRight: 13,
        borderRadius: 6,
        backgroundColor: '#E8E8E8',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .3,
        shadowRadius: 5,
        elevation: 5,
    },
    isToday: {
        width: 10,
        height: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#262626',
        marginRight: 13,
        marginLeft: 15,
    }
})