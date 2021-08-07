import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const HeaderComponent = ({ title, subtitle, backButtonEnabled = false }) => {
    console.log(title)
    let color = "white";
    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#32aff9', '#2385de']}>
            <Appbar.Header style={styles.header}>
                {backButtonEnabled && <Appbar.BackAction onPress={_goBack} />}
                {title && <Appbar.Content title={title} subtitle={subtitle} color={color} />}
                {/* <Appbar.Action icon="magnify" onPress={_handleSearch} color={color} />
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} color={color}/> */}
            </Appbar.Header>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'transparent',
    },
    header_content: {
        color: 'white'
    }
});

export default HeaderComponent;