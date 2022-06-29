import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeP from "./screens/HomeP";
import Home from "./screens/Home";
import AddTodo from './screens/AddTodo';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name='Home'
            component={HomeP}
            options={{headerShown: false}}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen
            name="Add"
            component={AddTodo}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
