import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Dialog, Paragraph, Portal, Button } from 'react-native-paper';
import { useLocationContext } from '../../contexts/location-context';
import theme from '../constants/Theme';

const HeaderComponent = ({ options, navigation, route }) => {
    const title = options.title || route.params.title;
    const subtitle = options.subtitle;
    const backButtonEnabled = options.backButtonEnabled;
    const color = 'white';

    const _goBack = () => {
        if (options.dialog) {
            showDialog();
        } else {
            navigateToPreviousPage();
        }
    };

    const navigateToPreviousPage = () => {
        console.log('Went back')
        navigation.goBack();
    }

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#32aff9', '#2385de']}>
            <Appbar.Header style={styles.header}>
                {backButtonEnabled && <Appbar.BackAction onPress={_goBack} color={color} />}
                {title && <Appbar.Content title={title} subtitle={subtitle} color={color} />}
                {/* <Appbar.Action icon="magnify" onPress={_handleSearch} color={color} />
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} color={color}/> */}
            </Appbar.Header>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Alert</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Go back to previous page will lose the data on this page. Are you sure to proceed?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>CANCEL</Button>
                        <Button onPress={navigateToPreviousPage}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'transparent',
        // can specify height if we got issue: https://reactnavigation.org/docs/stack-navigator/#header-related-options
    },
    header_content: {
        color: 'white'
    }
});

export default HeaderComponent;