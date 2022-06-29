import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function Checkbox({
    id, text, isCompleted, isToday, hour, cambio, setLocal
}) {
    const onPress = () => {
        setCheck(!check);

        //cambio(isCompleted => !isCompleted)
        //setLocal(prevState => ({...prevState, isCompleted: estado }))
    };
    //console.log("estado: ", estado);

    return isToday ? (
        <TouchableOpacity onPress={onPress} style={ !!isCompleted ? styles.checked: styles.unChecked}>
            <Text>{!!isCompleted && <Entypo name="check" size={16} color="#FAFAFA" /> }</Text>
        </TouchableOpacity>
    ): (
        <View style={styles.isToday}>
            
        </View>
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