import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, useColorScheme } from 'react-native'
import React from 'react'
import { AllColor } from '../../util/CommonColor/Color'
import { responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import Fontisto from "react-native-vector-icons/Fontisto"
import PhotoList from '../../list/PhotoList/PhotoList'
import VideoList from '../../list/VideoList/VideoList'
import RandomUserList from '../randomuser/RandomUserList'

const Home = ({ navigation }) => {
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
        <View style={[styles.container, CustomStyle.BlackBackGround]}>
            {/* ---------background image--------------- */}
            <Image source={require('../../Image/flower.jpg')} style={styles.main_Image} />
            {/* ------------pclone text------------ */}
            <Text style={[styles.PCloneText, CustomStyle.isWhiteText]}>P Clone</Text>
            {/* -----------------Search Button------------- */}
            <View style={[styles.SearchButtonContainer, CustomStyle.WhiteBackGround]}>
                {/* -----------search Icon ------------- */}
                <View style={styles.searchButtonInside}>
                    <Fontisto name="search" size={scale(25)} color={isDark ? AllColor.black : AllColor.white} />
                </View>
                {/* --------------input----------------- */}
                <TouchableOpacity style={styles.main_input_container} onPress={() => {
                    navigation.navigate('Search_Photo_Video')
                }}>
                    <Text style={CustomStyle.isWhiteBackGroundBlackText}>{"Search Photo / Videos Here ....."}</Text>
                </TouchableOpacity>
            </View>
            {/* -------------tegline text----------------- */}
            <Text style={[styles.tegList_text, CustomStyle.isWhiteText]}>{"Search 1000+ Photos & Videos Here"}</Text>
            {/* ----------------card list ------------------ */}
            <FlatList
                data={[1, 1, 1]}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ width: "100%", }}>
                            {
                                index === 0 && <PhotoList></PhotoList>
                            }
                            {
                                index === 1 && <VideoList />
                            }
                            {/* {
                                index === 2 && <RandomUserList />
                            } */}
                        </View>
                    )
                }}
            ></FlatList>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main_Image: {
        width: responsiveScreenWidth(100),
        height: scale(200),
        opacity: 0.3
    },
    PCloneText: {
        fontSize: scale(30),
        fontWeight: "500",
        position: "absolute",
        marginTop: scale(20),
        marginLeft: scale(20)
    },
    SearchButtonContainer: {
        width: responsiveScreenWidth(95),
        height: scale(40),
        alignSelf: 'center',
        borderRadius: scale(10),
        position: "absolute",
        marginTop: scale(100),
        marginLeft: scale(20),
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchButtonInside: {
        height: "100%",
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: scale(5)
    },
    main_input_container: {
        height: "100%",
        justifyContent: 'center',
        width: responsiveScreenWidth(80),
    },
    tegList_text: {
        position: "absolute",
        position: "absolute",
        marginTop: scale(150),
        alignSelf: 'center',

    }
})