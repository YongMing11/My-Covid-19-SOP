import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Portal, Modal, Title, IconButton, DataTable, Button, Avatar } from 'react-native-paper';
import theme from '../constants/Theme';

function ModalComponent({ visible, onDismiss, icon, iconColor, title, text, location = null, destination = null, showPageButton = false, navigationAction = null }) {
    return (
        <Portal>
            <Modal visible={visible}
                onDismiss={onDismiss} contentContainerStyle={styles.modal}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton
                        icon={icon}
                        color={iconColor}
                        size={40}
                    />
                    <Title style={styles.title}>{title}</Title>
                    <Text style={styles.text}>{text}</Text>
                    {location && destination &&
                        <DataTable>
                            <DataTable.Row>
                                <DataTable.Cell style={{ flex: 2 }}>From</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 8 }}>
                                    {/* {location && location.name && location.name !== "" ?
                                        location.name : location.address} */}
                                    {location}
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell style={{ flex: 2 }}>To</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 8 }}>
                                    {/* {destination.name || destination.address} */}
                                    {destination}
                                </DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>}
                    {showPageButton &&
                        <React.Fragment>
                            <Button color={theme.colors.primaryBlue}
                                onPress={() => navigationAction("SOP Info")}>SOP Info</Button>
                            <Button color={theme.colors.primaryBlue}
                                onPress={() => navigationAction("Hospital")}>Hospital</Button>
                            <Button color={theme.colors.primaryBlue}
                                onPress={() => navigationAction("Profile")}>Profile</Button>
                        </React.Fragment>}
                </View>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        padding: 25,
        margin: 25
    },
    title: {
        textAlign: 'center'
    },
    text: {
        textAlign: 'center'
    }
});

export default ModalComponent
