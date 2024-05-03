import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native'
import Splass from '../Screen/Splass/Splass'
import Home from '../Screen/home/Home'
import Search_Photo_Video from '../Screen/search_Photo_Video/Search_Photo_Video'
import PhotoView from '../Screen/PhotoView/PhotoView'
import VideoView from '../Screen/VideoView/VideoView'


const Stack = createNativeStackNavigator()
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splass" component={Splass} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Search_Photo_Video" component={Search_Photo_Video} options={{ headerShown: false }} />
                <Stack.Screen name="PhotoView" component={PhotoView} options={{ headerShown: false }} />
                <Stack.Screen name="VideoView" component={VideoView} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

