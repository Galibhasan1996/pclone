import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, TextInput, Alert, ActivityIndicator, Modal, Dimensions, StatusBar, useColorScheme, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AllColor } from '../../util/CommonColor/Color'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { scale } from 'react-native-size-matters'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import SearchInput from '../../component/input/SearchInput'
import CommonModel from '../../component/model/CommonModel'
import CommonButton from '../../component/button/CommonButton'
import { BASE_URL, SEARCH_PHOTO, SearchData, showToastRN, SEARCH_VIDEO } from '../../API/Constent/Constent'
import ImageLoad from 'react-native-image-placeholder';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const Search_Photo_Video = () => {
    // ----------navigation-------------
    const navigation = useNavigation()
    // -------------state---------------
    const [InputData, setInputData] = useState("");
    const [Change, setChange] = useState(0);
    const [visible, setvisible] = useState(false);
    const [SearchImageData, setSearchImageData] = useState([]);
    const [SearchVideoData, setSearchVideoData] = useState([]);

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
    // ------------seach photo--------------
    const getImageData = () => {
        SearchData(BASE_URL, SEARCH_PHOTO, InputData, 50)
            .then((data) => {
                // console.log(data);
                setSearchImageData(data.photos);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    // ---------seach video------------

    const getVideoData = () => {
        SearchData(BASE_URL, SEARCH_VIDEO, InputData, 50)
            .then((data) => {
                // console.log("🚀 ~ file: Search_Photo_Video.js:54 ~ .then ~ data:", data)
                setSearchVideoData(data.videos);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const choosePhotoAndVideo = () => {
        if (Change == 0) {
            getImageData()
        } else {
            getVideoData()
        }
    }



    return (
        <View style={[styles.container, CustomStyle.BlackBackGround]}>
            {/* -------------back button----------- */}
            <TouchableOpacity style={styles.backButton} onPress={() => {
                navigation.goBack()
            }}>
                <MaterialCommunityIcons name="keyboard-backspace" size={scale(25)} color={isDark ? AllColor.white : AllColor.black} />
            </TouchableOpacity>
            {/* -----------common Input------------ */}
            <SearchInput
                PhotoIcon={"photo-library"}
                DownIcon={"keyboard-double-arrow-down"}
                CloseIcon={"close"}
                PlaceHolder={"Search Photo or Video"}
                VideoIcon={"video-library"}
                Value={InputData}
                onChangeText={(text) => setInputData(text)}
                onClickClose={() => {
                    setInputData("")
                }}
                onClickDown={() => {
                    setvisible(true)
                }}
                changePhoto={Change}
            />
            {/* --------------model----------------- */}
            <CommonModel
                visible={visible}
                onClickPhoto={() => {
                    setChange(0)
                    setvisible(false)
                }}
                onClickVideo={() => {
                    setChange(1)
                    setvisible(false)
                }}
            />
            {/* -------------search button--------------- */}
            {
                InputData && <CommonButton
                    title={"Search"}
                    onClickButton={() => {
                        choosePhotoAndVideo()
                        showToastRN("success", "Search", "Search Successfully")
                        setInputData("")
                        Keyboard.dismiss()
                    }}
                />
            }
            {/* ------------photo list------------ */}

            {
                Change == 0 ? <View style={styles.FlatListContainer}>
                    <FlatList data={SearchImageData} numColumns={2} renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity key={item.id} onPress={() => {
                                navigation.navigate("PhotoView", { item: item })
                            }}>
                                <ImageLoad borderRadius={scale(10)} source={{ uri: item.src.original }} style={styles.Image_List} />
                            </TouchableOpacity>
                        )
                    }} />
                </View>
                    // ------------video list--------------
                    : <View style={styles.FlatListContainer}>
                        <FlatList data={SearchVideoData} numColumns={2} renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity key={item.id} onPress={() => {
                                    navigation.navigate("VideoView", { item: item })
                                }}>
                                    <ImageLoad borderRadius={scale(10)} source={{ uri: item.image }} style={styles.Image_List} />
                                    <View style={styles.playIconContainer}>
                                        <Ionicons name="play-outline" size={scale(25)} color={AllColor.white} />
                                    </View>
                                </TouchableOpacity>
                            )
                        }} />
                    </View>
            }
        </View>
    )
}

export default Search_Photo_Video

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    backButton: {
        width: responsiveScreenWidth(100),
        paddingLeft: scale(10)
    },
    Image_List: {
        width: responsiveScreenWidth(47),
        height: scale(100),
        marginVertical: scale(5),
        marginHorizontal: scale(5)
    },
    FlatListContainer: {
        width: "100%",
        alignItems: 'center',
        marginTop: scale(10),
        paddingBottom: scale(75)
    },
    playIconContainer: {
        width: "100%",
        height: "100%",
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0,0,0,0.5)"
    }
})