import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, TextInput, Alert, ActivityIndicator, Modal, Dimensions, StatusBar, useColorScheme } from 'react-native'
import React, { useState, useEffect } from 'react'

const CommonInput = () => {
    return (
        <View style={styles.container}>
            <Text>CommonInput</Text>
        </View>
    )
}

export default CommonInput

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
})