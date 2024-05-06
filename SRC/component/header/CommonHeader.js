import { StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native'
import React from 'react'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import { AllColor } from '../../util/CommonColor/Color'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

const CommonHeader = ({ onClickBackButton, onClickDownloadButton, onClickShareButton }) => {
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
        <View style={styles.container}>
            {/* ----------back icon--------------- */}
            <TouchableOpacity onPress={() => {
                onClickBackButton()
            }}>
                <MaterialIcons name="keyboard-backspace" size={scale(30)} color={AllColor.black} />
            </TouchableOpacity>

            <View style={styles.two_icon_container}>
                {/* ----------------------donwload icon-------------- */}
                <TouchableOpacity onPress={() => {
                    onClickDownloadButton()
                }}>
                    <Ionicons name="cloud-download-outline" size={scale(30)} color={AllColor.black} />
                </TouchableOpacity>
                {/* ----------------share icon------------ */}
                <TouchableOpacity onPress={() => {
                    onClickShareButton()
                }}>
                    <AntDesign name="sharealt" size={scale(30)} color={AllColor.black} style={styles.share_button} />
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default CommonHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(255,255,255,0.2)",
        position: "absolute",
        width: responsiveScreenWidth(100),
        height: scale(50),
        top: scale(30),
        alignSelf: 'center',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(20)
    },
    two_icon_container: {
        flexDirection: "row"
    },
    share_button: {
        marginLeft: scale(10)
    }
})