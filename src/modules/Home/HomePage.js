import React from 'react'
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import theme from '../../shared/constants/Theme';

function HomePage({ navigation }) {
    const actionButtons = [
        { label: 'I want to go out to eat', shortLabel: 'Go out to eat' },
        { label: 'I want to go out to buy things', shortLabel: 'Go out to buy things' },
        { label: 'I want to open my store', shortLabel: 'Open my store' },
        { label: 'I want to go somewhere else', shortLabel: 'Go somewhere else' },
        { label: 'I have emergency', shortLabel: 'Emergency' },
    ]

    const onPressAction = (selectedAction) => {
        navigation.navigate('AssistancePage', { title: selectedAction })
    }

    return (
        <View style={styles.scene}>
            <ScrollView style={styles.scrollView}>
                <ImageBackground source={require('../../../assets/HomePage_bg.png')} style={styles.imgBackground}>
                    <TouchableOpacity onPress={() => console.log('Area Status Bar tapped')}>
                        <View style={styles.areaStatusBar}>
                            <Text style={styles.areaStatusBar_description}>Your area is currently under</Text>
                            <Text style={styles.areaStatusBar_phase}>PPN Phase 1</Text>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
                <Image source={require('../../../assets/HomePage_car.png')} style={styles.carImg}></Image>
                <View style={styles.actionButton_Group}>
                    <Text style={styles.actionTitle}>What do you want to do?</Text>
                    {actionButtons.map((buttonContent, index) =>
                        <TouchableOpacity key={index} onPress={() => onPressAction(buttonContent.shortLabel)}>
                            <View style={styles.actionButton}>
                                <Text style={styles.actionButton_text}>{buttonContent.label}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
            <FAB
                style={styles.fab}
                small
                icon="microphone"
                onPress={() => console.log('Pressed')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    scene: {
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    scrollView: {
        // flex: 1,
        backgroundColor: 'white'
    },
    imgBackground: {
        width: Dimensions.get('window').width,
        height: 120,
    },
    header: {
        padding: 15,
        fontSize: 25,
        color: '#FFF',
    },
    areaStatusBar: {
        backgroundColor: '#023E90',
        margin: 15,
        marginTop: 5,
        padding: 10,
        alignItems: 'center',
        borderRadius: 8
    },
    areaStatusBar_description: {
        color: '#FFF',
        fontSize: 18,
    },
    areaStatusBar_phase: {
        color: '#FFF',
        fontSize: 35,
        fontWeight: 'bold',
        includeFontPadding: false
    },
    carImg: {
        width: Dimensions.get('window').width,
        height: 120,
        resizeMode: 'contain',
    },
    actionButton_Group: {
        padding: 15,
        width: '100%',
    },
    actionTitle: {
        fontSize: 22,
        textAlign: 'center',
        padding: 5
    },
    actionButton: {
        color: '#0E4DA4',
        backgroundColor: '#fff',
        borderRadius: 8,
        height: 65,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    actionButton_text: {
        color: 'black',
        fontSize: 18,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.primaryBlue,
        color: 'white',
        padding: 5
    }

});

export default HomePage;
