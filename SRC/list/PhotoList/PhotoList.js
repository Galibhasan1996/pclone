import { StyleSheet, Text, View, TouchableOpacity, FlatList, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AllColor } from '../../util/CommonColor/Color'
import { getData } from '../../API/Constent/Constent'
import ImageLoad from 'react-native-image-placeholder';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const PhotoList = () => {
    // ----------navigation-----------
    const navigation = useNavigation()
    // ----------state--------------
    const [FlatlistPhotoData, setFlatlistPhotoData] = useState([]);
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
    // ------------get photo data from api -------------
    const photoData = async () => {
        getData('https://api.pexels.com/v1/curated?per_page=50')
            .then((data) => {
                setFlatlistPhotoData(data.photos)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // ------------call api function----------------------
    useEffect(() => {
        photoData()
    }, [])


    return (
        <View style={[styles.container, CustomStyle.BlackBackGround]}>
            {/* -----------heading container----------------- */}
            <View style={styles.Photo_Heading_Container}>
                {/* -------------new photo text-------------- */}
                <View>
                    <Text style={[styles.new_photo_text, CustomStyle.isWhiteText]}>New Photos</Text>
                </View>
                {/* ------------view all photo text-------------- */}
                <TouchableOpacity>
                    <Text style={[styles.new_photo_text, CustomStyle.isWhiteText]}>View All</Text>
                </TouchableOpacity>
            </View>
            {/* --------flatlist for all photo------------- */}
            {
                <FlatList data={FlatlistPhotoData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.listone} onPress={() => {
                                navigation.navigate('PhotoView', { item: item })
                            }}>
                                <ImageLoad borderRadius={scale(10)} source={{ uri: item.src.landscape === "" || item.src.landscape === null ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaRqIvGBskHV94V3Ek6uWUKlzKS2pY1jJTfw&s" : item.src.landscape }} style={styles.all_image}></ImageLoad>
                            </TouchableOpacity>
                        )
                    }}
                >
                </FlatList>
            }
        </View>
    )
}

export default PhotoList

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
})