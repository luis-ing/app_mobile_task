import * as React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import List_Task from '../components/List_Task';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

function HomeP() {
    const [dataTask, setDataTask] = React.useState([]);
    const [dataTaskHidden, setDataTaskHidden] = React.useState([]);
    const [isHidden, setIsHidden] = React.useState(false);
    const navigation = useNavigation();

    React.useEffect(() => {
        getTask();
    }, []);

    const getTask = async () => {
        const url_api = "http://192.168.42.120:3001/taskAll";
        const task = await axios.get(url_api)
        console.log(task.data);
        setDataTask(task.data)
    }

    const listTask = ({ item }) => (
        <View style={styles.list_data}>
            <Text>{item.text}</Text>
        </View>
    )

    const handleHidePress = () => {
        if (isHidden) {
            getTask();
            setIsHidden(false);
            //setLocalData(localData.sort((a, b) => { return a.isCompleted - b.isCompleted }))
            return;
        }
        setIsHidden(!isHidden);
        setDataTask(dataTask.filter(todo => !todo.isCompleted))
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.pic}
                source={{
                    uri: 'https://scontent.fmty1-1.fna.fbcdn.net/v/t1.18169-9/11145211_1132221140127289_3547105479262852043_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=174925&_nc_ohc=1M_EQTw9lAgAX-bknwB&_nc_ht=scontent.fmty1-1.fna&oh=00_AT83v3J1IiiSySHoTIO4VjEp5383HzLfIRaYJjgF4choQQ&oe=62C6D8A6',
                }}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.title}>Today</Text>
                <TouchableOpacity onPress={handleHidePress}>
                    <Text style={{ color: '#3478f6' }}>{isHidden ? 'Show Completed' : 'Hide Completed'}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={dataTask.filter(todo => !!todo.isToday)}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <List_Task {...item} dataTask={dataTask} setDataTaskk={(e) => setDataTask(e)} />}
            />
            <Text style={styles.title}>Tomorrow</Text>
            <FlatList
                data={dataTask.filter(todo => !todo.isToday)}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <List_Task {...item} />}
            />

            <TouchableOpacity onPress={() => navigation.navigate('Add', { setDataTask: (e) => setDataTask(e), dataTask })} style={styles.button}>
                <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight <= 30 ? StatusBar.currentHeight + 10 : 70 - 20,
        paddingHorizontal: 15
    },
    pic: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignSelf: 'flex-end'
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 25,
        marginTop: 10,
    },
    button: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 50,
        right: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .5,
        shadowRadius: 5,
        elevation: 5,
    },
    plus: {
        fontSize: 40,
        color: '#fff',
        position: 'absolute',
        top: -8,
        left: 9,
    },
    list_data: {
        backgroundColor: '#2196f3',
        padding: 5,
        margin: 2,
    },
    container_list: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
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
    }
});


export default HomeP;