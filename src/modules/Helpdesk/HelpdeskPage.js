import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, Provider as PaperProvider, TextInput, Text } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import HeaderComponent from "../../shared/components/headerComponent";
import { title } from "../../shared/constants/config";

function HelpdeskPage(props) {
    const [text, setText] = React.useState("");
    const [selectedLanguage, setSelectedLanguage] = React.useState();

    return (
        <View
            style={{
                height: "100%",
            }}
        >
            <HeaderComponent title={title.HelpdeskPage}></HeaderComponent>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.dropDown}>
                        <Picker mode="dropdown" selectedValue={selectedLanguage} onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}>
                            <Picker.Item label="PNN Phase 1" value="pnn phase 1" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                    </View>
                    <TextInput style={styles.questionTextField} label="Question" mode="outlined" dense={true} multiline={true} numberOfLines={15} value={text} onChangeText={(text) => setText(text)} />
                    <Button
                        style={styles.submitButton}
                        mode="contained"
                        onPress={() => {
                            console.log("Submit");
                        }}
                    >
                        Submit
                    </Button>
                    <Text style={styles.noteText}>*Your query will be replied in 2 working days. Besides sending a query, you can contact admin for more SOP information at +603-8888 2010.</Text>
                    <View
                        style={{
                            backgroundColor: "transparent",
                            height: "30%",
                            width: "100%",
                            flexShrink: 1000,
                        }}
                    ></View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
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
    questionTextField: {
        width: "100%",
        padding: 0,
        textAlignVertical: "top",
    },
    submitButton: {
        width: "100%",
    },
    noteText: {
        textAlign: "left",
        flexShrink: 50,
    },
});

export default HelpdeskPage;
