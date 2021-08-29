import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Portal, Modal, Title, IconButton, DataTable } from 'react-native-paper';

function ModalComponent({ visible, onDismiss, icon, iconColor, title, text, location = null, destination = null }) {
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
                                    {location && location.name && location.name !== "" ?
                                        location.name : location.address}
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell style={{ flex: 2 }}>To</DataTable.Cell>
                                <DataTable.Cell style={{ flex: 8 }}>
                                    {destination.name || destination.address}
                                </DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>}
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
