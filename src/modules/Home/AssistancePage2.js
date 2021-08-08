import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import theme from '../../shared/constants/Theme'
import { DataTable, Checkbox } from 'react-native-paper';

function AssistancePage2() {
    const totalDuration = "5 MIN 20 SEC"
    const [checked, setChecked] = React.useState(false);
    const tasks = [
        {
            title: 'Wear Mask',
            checked: false
        },
        {
            title: 'Make sure phone battery is enough',
            checked: false
        },
        {
            title: 'Bring MITI letter',
            checked: false
        },
        {
            title: 'Bring MITI letter',
            checked: false
        }
    ]


    return (
        <View>
            <Text style={styles.totalDurationStatusBar}>Your Total Duration at Outside: {totalDuration}</Text>
            <Text style={styles.checklistHeader}>Before starting your journey</Text>

            <DataTable style={{ width: '100%' }}>
                {tasks.map((task, index) => {
                    return (
                        <DataTable.Row key={index} style={{ borderBottomWidth: 1, backgroundColor: checked ? theme.colors.primaryGreen : 'white' }}>
                            <DataTable.Cell style={styles.task}>{task.title}</DataTable.Cell>
                            <DataTable.Cell>
                                <Checkbox
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                />
                            </DataTable.Cell>
                        </DataTable.Row>
                    )
                })}

            </DataTable>
        </View>
    )
}

const styles = StyleSheet.create({
    totalDurationStatusBar: {
        backgroundColor: theme.colors.primaryBlue,
        color: 'white',
        textAlign: 'center',
        padding: 5
    },
    checklistHeader: {
        backgroundColor: theme.colors.secondaryGrey,
        color: '#616161',
        padding: 10
    },
    task: {
        flex: 9
    }
})

export default AssistancePage2
