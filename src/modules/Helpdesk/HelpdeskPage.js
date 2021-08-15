import React from "react";
import theme from "../../shared/constants/Theme";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

const HELPDESK_MSG = "*Your query will be replied in 2 working days. Besides sending a query, you can contact admin for more SOP information at +603-8888 2010.";

function HelpdeskPage({ navigation }) {
    const [text, setText] = React.useState("");
    const [selectedLanguage, setSelectedLanguage] = React.useState();

    const dropDownSelections = [
        { label: "PNN Phase 1", value: "pnn phase 1" },
        { label: "PNN Phase 2", value: "pnn phase 2" },
    ];

    const dropDownItems = dropDownSelections.map((element, index) => <Picker.Item key={index} label={element.label} value={element.value} />);

    return (
        <View
            style={{
                height: "100%",
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.dropDown}>
                        <Picker mode="dropdown" selectedValue={selectedLanguage} onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}>
                            {dropDownItems}
                        </Picker>
                    </View>
                    <View style={styles.questionTextFieldContainer}>
                        <TextInput style={styles.questionTextField} label="Question" mode="outlined" dense={false} multiline={true} numberOfLines={20} value={text} onChangeText={(text) => setText(text)} />
                    </View>
                    <Button
                        style={styles.submitButton}
                        mode="contained"
                        onPress={() => {
                            console.log("Submit");
                        }}
                    >
                        Submit
                    </Button>
                    <Text style={styles.noteText}>{HELPDESK_MSG}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "white",
    },
    dropDown: {
        width: "100%",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "gray",
        paddingTop: 8,
        paddingBottom: 8,
    },
    questionTextFieldContainer: {
        height: Dimensions.get("window").height * 0.4,
        width: "100%",
    },
    questionTextField: {
        width: "100%",
        textAlignVertical: "top",
        textAlign: "left",
        marginHorizontal: 0,
        marginVertical: 5,
        padding: 0,
        paddingVertical: 0,
    },
    submitButton: {
        width: "100%",
        marginVertical: 5,
        backgroundColor: theme.colors.primaryBlue,
    },
    noteText: {
        textAlign: "left",
        flexShrink: 50,
        marginVertical: 5,
    },
});

export default HelpdeskPage;
