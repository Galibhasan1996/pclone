import { StyleSheet, Text, View, TouchableOpacity, Modal, StatusBar, useColorScheme } from 'react-native'
import React from 'react'
import { AllColor } from '../../util/CommonColor/Color'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const CommonModel = ({ visible, onClickPhoto, onClickVideo }) => {
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
        model: {
            backgroundColor: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.6)"
        },
        border: {
            borderBottomColor: isDark ? AllColor.black : AllColor.white

        }
    }
    return (
        <Modal transparent={true} animationType='slide' visible={visible}>
            {/* -------------StatusBar------------ */}
            <StatusBar backgroundColor={"transparent"} transparent={true} />
            {/* -----------main container ------------- */}
            <View style={[styles.container]}>
                <View style={[styles.ModelContainer, CustomStyle.WhiteBackGround]}>
                    {/* ------------selection photo--------------- */}
                    <TouchableOpacity style={[styles.model_selection_container, CustomStyle.border]} onPress={() => {
                        onClickPhoto()
                    }}>
                        <MaterialIcons name={"photo-library"} size={scale(25)} color={isDark ? AllColor.black : AllColor.white} />
                        <Text style={[styles.model_selection_text, CustomStyle.isWhiteBackGroundBlackText]}>{"Photo"}</Text>
                    </TouchableOpacity>
                    {/* -----------selection video---------------- */}
                    <TouchableOpacity style={[styles.model_selection_container, CustomStyle.border]} onPress={() => {
                        onClickVideo()
                    }}>
                        <MaterialIcons name={"video-library"} size={scale(25)} color={isDark ? AllColor.black : AllColor.white} />
                        <Text style={[styles.model_selection_text, CustomStyle.isWhiteBackGroundBlackText]}>{"Video"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default CommonModel

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ModelContainer: {
        width: responsiveScreenWidth(90),
        borderRadius: scale(15),
        position: "absolute",
        bottom: scale(20),
        padding: scale(15),

    },
    model_selection_container: {
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",
        borderBottomWidth: scale(1),
    },
    model_selection_text: {
        fontSize: scale(15),
        fontWeight: "500",
        marginLeft: scale(10),
        paddingVertical: scale(5),
    }
})