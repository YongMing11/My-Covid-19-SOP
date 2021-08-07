import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';

const AssistancePage = ({ navigation, route }) => {
    const { selectedAction } = route.params
    const [selectedLanguage, setSelectedLanguage] = useState();

    console.log(selectedAction)

    return (
        <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
        </Picker>
    )
}

export default AssistancePage
