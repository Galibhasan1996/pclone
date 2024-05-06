import { StyleSheet, Text, View, Image, StatusBar, useColorScheme } from 'react-native'
import React from 'react'
import { AllColor } from '../../util/CommonColor/Color'
import { useNavigation, useRoute } from '@react-navigation/native'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import CommonHeader from '../../component/header/CommonHeader'
import Share from 'react-native-share';
import Toast from 'react-native-toast-message'
import RNFS from "react-native-fs"

const PhotoView = () => {
    // ---------navigation------------
    const navigation = useNavigation()
    // -------------route-----------
    const { original } = useRoute().params.item.src
    const { photographer } = useRoute().params.item



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
    // --------------share image function----------------
    const ImageShare = () => {
        Share.open({
            title: photographer,
            url: original
        })
            .then((res) => {
                showToast("success", "Success", "Image Share Successfully")
            })
            .catch((err) => {
                console.log("🚀 ~ file: PhotoView.js:45 ~ ImageShare ~ err:", err)
            });
    }

    // -----------toast message------------

    const showToast = (title, text1, text2) => {
        Toast.show({
            type: title,
            text1: text1,
            text2: text2
        });
    }
    // ------------download photo ----------
    const downloadFile = () => {
        // Create a new Date object
        var currentDate = new Date();
        // Get the current date
        var date = currentDate.getDate();
        // Get the current month
        // Note: January is 0, February is 1, and so on...
        var month = currentDate.getMonth() + 1;
        // Get the current year
        var year = currentDate.getFullYear();
        // Get the current hours
        var hours = currentDate.getHours();
        // Get the current minutes
        var minutes = currentDate.getMinutes();
        // Get the current seconds
        var seconds = currentDate.getSeconds();

        const path = RNFS.DownloadDirectoryPath + "/image_" + (date < 10 ? "0" + date : date) + "-" + (month < 10 ? "0" + month : month) + "-" + year + "_" + (hours < 10 ? "0" + hours : hours) + "-" + (minutes < 10 ? "0" + minutes : minutes) + "-" + (seconds < 10 ? "0" + seconds : seconds) + ".jpg";

        RNFS.downloadFile({
            fromUrl: original,
            toFile: path
        }).promise.then((result) => {
            console.log("🚀 ~ file: PhotoView.js:85 ~ downloadFile ~ result:", result)
            showToast('success', 'Download', 'Download Successfully')
        })
            .catch((e) => {
                console.log("🚀 ~ file: PhotoView.js:95 ~ downloadFile ~ e:", e)
            })
    }


    return (
        <View style={[styles.container, CustomStyle.BlackBackGround]}>
            {/* ----------StatusBar--------------- */}
            <StatusBar translucent={true} backgroundColor={"transparent"}></StatusBar>
            {/* -------------main image-------------- */}
            <Image source={{ uri: original }} style={styles.Main_image}></Image>
            {/* -------------photographer name------------ */}
            <Text style={styles.photographer_name}>{photographer}</Text>
            {/* ---------common header----------- */}
            <CommonHeader
                onClickBackButton={() => {
                    navigation.goBack()
                }}
                onClickShareButton={() => {
                    ImageShare()
                }}
                onClickDownloadButton={() => {
                    downloadFile()
                }}
            />
        </View>
    )
}

export default PhotoView

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Main_image: {
        width: responsiveScreenWidth(100),
        height: responsiveScreenHeight(100),
    },
    photographer_name: {
        position: 'absolute',
        bottom: scale(30),
        alignSelf: 'center',
        fontWeight: 'bold',
        color: AllColor.white,
        fontSize: scale(15)
    }
})