import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, TextInput, Alert, ActivityIndicator, Modal, Dimensions, StatusBar, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AllColor } from '../../util/CommonColor/Color'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const SearchInput = ({ onChangeText, Value, PhotoIcon, CloseIcon, PlaceHolder, DownIcon, onClickClose, onClickDown, VideoIcon, changePhoto = 0 }) => {
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
        border: {
            borderColor: isDark ? AllColor.white : AllColor.black
        }
    }
    return (
        <View style={[styles.container, CustomStyle.border]}>
            <View style={styles.IconContainer}>
                {/* ----------------photo icon------------- */}
                {
                    changePhoto === 0 ?
                        <View>
                            <MaterialIcons name={PhotoIcon} size={scale(25)} color={isDark ? AllColor.white : AllColor.black} />
                        </View>
                        :
                        // ------------------video icon----------------
                        <View>
                            <MaterialIcons name={VideoIcon} size={scale(25)} color={isDark ? AllColor.white : AllColor.black} />
                        </View>
                }
                {/* -----------down botton------------------ */}
                <TouchableOpacity onPress={() => {
                    onClickDown()
                }}>
                    <MaterialIcons name={DownIcon} size={scale(25)} color={isDark ? AllColor.white : AllColor.black} />
                </TouchableOpacity>
            </View>
            {/* ----------------input----------------- */}
            <View>
                <TextInput
                    placeholder={PlaceHolder}
                    style={styles.main_Input}
                    color={isDark ? AllColor.white : AllColor.black}
                    onChangeText={onChangeText}
                    value={Value}
                />
            </View>
            {/* --------------close button------------ */}
            {
                Value !== "" ? <TouchableOpacity onPress={() => {
                    onClickClose()
                }}>
                    <MaterialIcons name={CloseIcon} size={scale(25)} color={isDark ? AllColor.white : AllColor.black} />
                </TouchableOpacity>
                    : <View style={{ width: scale(25), height: scale(25), }}></View>
            }
        </View>
    )
}

export default SearchInput

const styles = StyleSheet.create({
    container: {
        width: responsiveScreenWidth(98),
        height: scale(40),
        alignSelf: 'center',
        marginTop: scale(10),
        borderRadius: scale(10),
        flexDirection: "row",
        alignItems: 'center',
        borderWidth: scale(1),
        justifyContent: 'space-between',
    },
    IconContainer: {
        flexDirection: "row",
        backgroundColor: "rgba(255,255,255,0.2)",
        height: "100%",
        borderBottomLeftRadius: scale(10),
        borderTopLeftRadius: scale(10),
        alignItems: 'center',
    },
    main_Input: {
        // backgroundColor: "red",
        width: responsiveScreenWidth(75),
    }
})