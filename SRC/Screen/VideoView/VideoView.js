import { StyleSheet, Text, View, StatusBar, useColorScheme } from 'react-native'
import React from 'react'
import { AllColor } from '../../util/CommonColor/Color'
import { useNavigation, useRoute } from '@react-navigation/native'
import { responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import CommonHeader from '../../component/header/CommonHeader'
import Share from 'react-native-share';
import RNFS from "react-native-fs"
import Video from 'react-native-video';
import { showToastRN } from '../../API/Constent/Constent'

const VideoView = () => {
    // ---------navigation------------
    const navigation = useNavigation()
    // -------------route-----------
    const video = useRoute().params.item.video_files[0].link
    const name = useRoute().params.item.user.name





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
            title: name,
            url: video
        })
            .then((res) => {
                showToastRN("success", "Success", "Video Share Successfully")

            })
            .catch((err) => {
                console.log("🚀 ~ file: VideoView.js:50 ~ ImageShare ~ err:", err)
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

        const path = RNFS.DownloadDirectoryPath + "/image_" + (date < 10 ? "0" + date : date) + "-" + (month < 10 ? "0" + month : month) + "-" + year + "_" + (hours < 10 ? "0" + hours : hours) + "-" + (minutes < 10 ? "0" + minutes : minutes) + "-" + (seconds < 10 ? "0" + seconds : seconds) + ".mp4";

        RNFS.downloadFile({
            fromUrl: video,
            toFile: path
        }).promise.then((result) => {
            console.log("🚀 ~ file: VideoView.js:87 ~ downloadFile ~ result:", result)
            showToastRN('success', 'Download', 'Download Successfully')
        })
            .catch((e) => {
                console.log("🚀 ~ file: VideoView.js:91 ~ downloadFile ~ e:", e)
            })
    }


    return (
        <View style={[styles.container, CustomStyle.BlackBackGround]}>
            {/* ----------StatusBar--------------- */}
            <StatusBar translucent={true} backgroundColor={"transparent"}></StatusBar>
            {/* -------------main video-------------- */}
            <Video source={{ uri: video }}
                style={styles.Video_Player}
                controls={true}
                repeat={true}
                resizeMode={'cover'}
                pictureInPicture={true}
                playInBackground={true}
            />
            {/* -------------photographer name------------ */}
            <Text style={styles.photographer_name}>{name}</Text>
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

export default VideoView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    Video_Player: {
        width: responsiveScreenWidth(100),
        height: scale(200),
    }
})

