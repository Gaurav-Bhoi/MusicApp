import React from 'react';
import Home from './Home Page/home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Play_Music from './Play Music Screen/playMusic';
import Settings from '../Components/Settings Screen/settings';
import videos from './Videos/videos';

export default function Index() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="play-music"
          component={Play_Music}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="play-video"
          component={videos}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
