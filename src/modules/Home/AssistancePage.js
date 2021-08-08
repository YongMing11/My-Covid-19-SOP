import React, { useState } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '../../shared/constants/Theme';

const AssistancePage = ({ navigation, route }) => {
    const { selectedAction } = route.params
    const [selectedLanguage, setSelectedLanguage] = useState(0);

    console.log(selectedAction)

    return (
        <View style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* <MapView style={styles.map} /> */}

            <Button style={styles.actionButton} mode="contained" onPress={() => navigation.navigate('AssistancePage2')}>
                Confirm
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    actionButton: {
        position: 'absolute',
        bottom: 10,
        backgroundColor: theme.colors.primaryBlue,
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
})

export default AssistancePage
