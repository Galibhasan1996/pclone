import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { AllColor } from '../../util/CommonColor/Color'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'

const CommonButton = ({ title, onClickButton }) => {
    const isDark = useColorScheme() === 'dark'
    const isWhite = useColorScheme() === 'light'
    // ------------custom Style--------------
    const CustomStyle = {
        BlackBackGround: {
            backgroundColor: isDark ? AllColor.black : AllColor.white
        },
        isWhiteText: {
            color: isDark ? AllColor.white : AllColor.black
        },
        isWhiteBackGroundBlackText: {
            color: isDark ? AllColor.black : AllColor.white
        },
        WhiteBackGround: {
            backgroundColor: isDark ? AllColor.white : AllColor.black
        },
    }
    return (
        <TouchableOpacity style={[styles.container, CustomStyle.WhiteBackGround]} onPress={() => {
            onClickButton()
        }}>
            <Text style={[styles.button_title, CustomStyle.isWhiteBackGroundBlackText]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CommonButton

const styles = StyleSheet.create({
    container: {
        width: responsiveScreenWidth(95),
        height: scale(40),
        alignSelf: 'center',
        marginVertical: scale(10),
        borderRadius: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_title: {
        fontSize: scale(18),
        fontWeight: "500"
    }
})