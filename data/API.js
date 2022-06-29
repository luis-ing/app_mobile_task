import axios from 'axios';

const list_todo_function = async (setLocalData) => {
    const url_api = "http://192.168.42.120:3001/taskAll";

    // const respond = fetch(url_api, {
    //     method: 'GET',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    // })

    // .then(response => {
    //     // console.log(
    //     //     `Response: ${response.status} ${response.statusText}`
    //     // );
    //     return response.text();
    // })
    // .then(text => {return text})
    // .catch(err => console.error(err))

    // const data = await respond;
    // console.log(data);
    // return data;

    const task = await axios.get(url_api)
    console.log(task.data);

    //
    //setLocalData(task.data)
    // .then(({data}) => {
    //     setLocalData(data);
    // })
    // .catch(({response}) => {
    //     console.log(response.status)
    // });
}
//const list_todo = list_todo_function();
//console.log(list_todo);
//const todo = list_todo['_W'];
export {list_todo_function};