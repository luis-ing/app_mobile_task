import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Platform, Switch, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
//import DateTimePicker from '@react-native-community/datetimepicker';
//import { useNavigation } from '@react-navigation/native';
//const navigation = useNavigation();

export default function AddTodo({ route, navigation }) {

    const { setDataTask, dataTask } = route.params;

    const [name, setName] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [isToday, setIsToday] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [text, setText] = React.useState('');

    //console.log("TodosData", dataTask);

    const onChange = (event, selectDate) => {
        const currentDate = selectDate;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let temDate = new Date(currentDate);
        let fDate = temDate.getDate() + '/' + (temDate.getMonth() + 1) + temDate.getFullYear();
        let fTime = temDate.getHours() + ':' + temDate.getMinutes();
        setText(fTime);
    }
    const showMode = (currentMode) => {
        setShow(true);
        //setDate(currentMode)
    }
    const addTask = async ()=> {
        console.log(name+" "+text+" "+isToday)
        var count = dataTask.length+1;
        //console.log(count)
        const task = {
            id: count,
            text: name,
            isCompleted: false,
            isToday: isToday,
            hour: text,
        }
        setDataTask([...dataTask, task ]);

        const url_api = "http://192.168.42.120:3001/taskInsert";
        const newTask = await axios.post(url_api, {
            "text": name,
            "isCompleted": false,
            "isToday": isToday,
            "hour": text,
        });

        console.log("Nueva tarea: ", newTask.data);

        // Alert.alert('warning', 'Example', [
        //     {text: 'OK'}
        // ]);

        ToastAndroid.showWithGravityAndOffset(
            'Added Task',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            200
        )
        navigation.goBack();
        //setDataTask(dataTask.sort((a, b) => {return a.isCompleted - b.isCompleted}))
    }
    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>Add Task</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Task"
                    placeholderTextColor="#00000030"
                    onChangeText={(text) => {setName(text)}}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Hour</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Time"
                    placeholderTextColor="#00000030"
                    value={text}
                    onPressIn={showMode}
                />
                {show && <DateTimePicker   
                    value={date}
                    mode={'time'}
                    is24Hour={false}
                    onChange={onChange}
                    style={{width: '80%'}}
                />}
                
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Today</Text>
                <Switch
                    value={isToday}
                    onValueChange={(value) => { setIsToday(value) }}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={addTask}
            >
                <Text style={{color: 'white'}}>Done</Text>
            </TouchableOpacity>
            <Text style={{color: '#00000060'}}>If you disable today, the task will be considered as tomorrow</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    inputTitle: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24,
    },
    textInput: {
        borderBottomColor: '#00000030',
        borderBottomWidth: 1,
        width: '80%',
    },
    inputContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingBottom: 30,
    },
    button: {
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        height: 46,
        borderRadius: 11,
    },
})
