import { StyleSheet, Text, View, TouchableOpacity, FlatList, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AllColor } from '../../util/CommonColor/Color'
import { getData } from '../../API/Constent/Constent'
import ImageLoad from 'react-native-image-placeholder';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';

const RandomUserList = () => {
    // ----------navigation-----------
    const navigation = useNavigation()
    // ----------state--------------
    const [FlatlistRandomData, setFlatlistRandomData] = useState([]);
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
    const photoData = async () => {
        const { data } = await axios("https://randomuser.me/api/?results=50")
        setFlatlistRandomData(data.results)
    }


    useEffect(() => {
        photoData()
    }, [])


    return (
        <View style={[styles.container, CustomStyle.BlackBackGround]}>
            <View style={styles.Photo_Heading_Container}>
                <View>
                    <Text style={[styles.new_photo_text, CustomStyle.isWhiteText]}>Random Photo</Text>
                </View>
                <TouchableOpacity>
                    <Text style={[styles.new_photo_text, CustomStyle.isWhiteText]}>View All</Text>
                </TouchableOpacity>
            </View>
            {
                <FlatList data={FlatlistRandomData}
                    // horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    renderItem={({ item, index }) => {

                        return (
                            <TouchableOpacity key={index} style={styles.listone} onPress={() => {
                                navigation.navigate('VideoView', { item: item })
                            }}>
                                <ImageLoad borderRadius={scale(10)} source={{ uri: item.picture.large === "" || item.picture.large === null ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaRqIvGBskHV94V3Ek6uWUKlzKS2pY1jJTfw&s" : item.picture.large }} style={styles.all_image}></ImageLoad>
                            </TouchableOpacity>
                        )
                    }}
                >
                </FlatList>
            }
        </View>
    )
}

export default RandomUserList

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
        marginVertical: scale(10),
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








