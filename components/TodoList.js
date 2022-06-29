import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import Todo from './Todo';

const TodoList = ({ TodosData, setLocal }) => {
    //console.log(TodosData);
    return (
        <FlatList
            data={TodosData} setLocal={(e)=>setLocal(e)} TodosData={TodosData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Todo {...item} />}
        />
    );
}

export default TodoList;