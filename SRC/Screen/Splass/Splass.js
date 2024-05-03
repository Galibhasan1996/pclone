import { StyleSheet, View, useColorScheme } from 'react-native'
import React, { useEffect } from 'react'
import { AllColor } from '../../util/CommonColor/Color'
import { scale } from 'react-native-size-matters'
import * as Animatable from 'react-native-animatable';
const Splass = ({ navigation }) => {
    const isDark = useColorScheme() === 'dark'
    const isWhite = useColorScheme() === 'light'
    // ------------custom Style--------------
    const CustomStyle = {
        BlackBackGround: {
            backgroundColor: isDark ? AllColor.black : AllColor.white
        },
        isWhiteText: {
            color: isDark ? AllColor.white : AllColor.black
        }
    }
    // --------------navigate to home screen -----------
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        }, 3000);
    }, [])

    return (
        <View style={[styles.container, CustomStyle.BlackBackGround]}>
            <Animatable.Text animation="pulse" easing="ease-out" iterationCount={5} style={[styles.SplassText, CustomStyle.isWhiteText]}>💖 P Clone 💖</Animatable.Text>
        </View>
    )
}

export default Splass

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    SplassText: {
        fontSize: scale(40),
        fontWeight: "500"
    }
})