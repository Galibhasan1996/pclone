import { StyleSheet, Text, View, TouchableOpacity, FlatList, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AllColor } from '../../util/CommonColor/Color'
import { getData } from '../../API/Constent/Constent'
import ImageLoad from 'react-native-image-placeholder';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

const VideoList = () => {
    // ----------navigation-----------
    const navigation = useNavigation()
    // ----------state--------------
    const [FlatlistVideoData, setFlatlistVideoData] = useState([]);
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
    // ----------get video------------
    const photoData = async () => {
        getData("https://api.pexels.com/videos/popular?per_page=50&min_duration=15&max_duration=100")
            .then((data) => {
                setFlatlistVideoData(data.videos)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // --------------call function------------
    useEffect(() => {
        photoData()
    }, [])

    return (
        <View style={[styles.container, CustomStyle.BlackBackGround]}>
            {/* ---------heading container------------- */}
            <View style={styles.Photo_Heading_Container}>
                {/* ------------new video text--------------- */}
                <View>
                    <Text style={[styles.new_photo_text, CustomStyle.isWhiteText]}>New Videos</Text>
                </View>
                {/* ----------view all text-------------- */}
                <TouchableOpacity>
                    <Text style={[styles.new_photo_text, CustomStyle.isWhiteText]}>View All</Text>
                </TouchableOpacity>
            </View>
            {/* -----------video flatlist----------------- */}
            {
                <FlatList data={FlatlistVideoData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.listone} onPress={() => {
                                navigation.navigate('VideoView', { item: item })
                            }}>
                                <ImageLoad borderRadius={scale(10)} source={{ uri: item.image === "" || item.image === null ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaRqIvGBskHV94V3Ek6uWUKlzKS2pY1jJTfw&s" : item.image }} style={styles.all_image}></ImageLoad>
                                <View style={styles.playButtonOverLay}>
                                    <Entypo name="controller-play" size={scale(25)} color={AllColor.white} />
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                >
                </FlatList>
            }
        </View>
    )
}

export default VideoList

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Photo_Heading_Container: {
        width: responsiveScreenWidth(100),
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(15),
        paddingVertical: scale(3),
        marginVertical: scale(10),
    },
    new_photo_text: {
        fontSize: scale(15),
        fontWeight: '500',
    },
    all_image: {
        width: "100%",
        height: "100%",
    },
    listone: {
        flex: 1,
        width: responsiveScreenWidth(95),
        height: 200,
        marginHorizontal: scale(10),
        alignSelf: 'center',
    },
    playButtonOverLay: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "absolute"
    }
})

