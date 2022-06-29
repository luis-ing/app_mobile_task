import * as React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';

function List_Task({ id, text, isCompleted, isToday, hour, dataTask, setDataTaskk }) {
    const [check, setCheck] = React.useState(!!isCompleted);

    const onPress = async () => {
        //console.log(" id: ", id, " status: ", Number(check), " ", check);
        setCheck(!check);
        const url_api = "http://192.168.42.120:3001/taskUpdate";
        const task = await axios.post(url_api, {
            "id_Task": id,
            "is_Completed": Number(!check)
        });

        //console.log(task.data);
        console.log(task.data, " id: ", id, " status: ", Number(!check), " ", !check);
        var contador = 0;
        dataTask.map((registro)=>{
            if(id==registro.id){
                dataTask[contador].isCompleted=Number(!check);
            }
            contador++
        })
        setDataTaskk(dataTask);
    };

    return (
        <View style={styles.container}>
            {isToday ? (
                <TouchableOpacity onPress={onPress} style={check ? styles.checked : styles.unChecked}>
                    <Text>{check && <Entypo name="check" size={16} color="#FAFAFA" />}</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.isToday}>

                </View>
            )}

            <View>
                <Text style={
                    check
                        ? [styles.text, { textDecorationLine: 'line-through', color: '#73737330' }]
                        : styles.text
                }>{text}</Text>
                <Text style={
                    check
                        ? [styles.time, { textDecorationLine: 'line-through', color: '#73737330' }]
                        : styles.time
                }>{hour}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 4,
        marginBottom: 4,
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    text: {
        fontSize: 15,
        fontWeight: '500',
        color: '#737373'
    },
    time: {
        fontSize: 13,
        color: '#a3a3a3',
        fontWeight: '500'
    },
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

export default List_Task;