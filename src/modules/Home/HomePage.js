import React from 'react'
import { Dimensions, Button, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert, StatusBar, Platform, Image, ScrollView } from 'react-native';
import { useWindowDimensions, useDeviceOrientation } from '@react-native-community/hooks';

function HomePage() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <ImageBackground source={require('./assets/HomePage_bg.png')} style={styles.imgBackground}>
                    <Text style={styles.header}>My COVID-19 SOP</Text>
                    <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
                        <View style={styles.areaStatusBar}>
                            <Text style={styles.areaStatusBar_description}>Your area is currently under</Text>
                            <Text style={styles.areaStatusBar_phase}>PPN Phase 1</Text>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
                <Image source={require('./assets/HomePage_car.png')} style={styles.carImg}></Image>
                <View style={styles.actionButton_Group}>
                    <Text style={styles.actionTitle}>What do you want to do?</Text>
                    <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
                        <View style={styles.actionButton}>
                            <Text style={styles.actionButton_text}>I want to go out to eat</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
                        <View style={styles.actionButton}>
                            <Text style={styles.actionButton_text}>I want to go out to eat</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
                        <View style={styles.actionButton}>
                            <Text style={styles.actionButton_text}>I want to go out to eat</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
                        <View style={styles.actionButton}>
                            <Text style={styles.actionButton_text}>I want to go out to eat</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
                        <View style={styles.actionButton}>
                            <Text style={styles.actionButton_text}>I want to go out to eat</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
                        <View style={styles.actionButton}>
                            <Text style={styles.actionButton_text}>I want to go out to eat</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
                        <View style={styles.actionButton}>
                            <Text style={styles.actionButton_text}>I want to go out to eat</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
                        <View style={styles.actionButton}>
                            <Text style={styles.actionButton_text}>I want to go out to eat</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomePage
