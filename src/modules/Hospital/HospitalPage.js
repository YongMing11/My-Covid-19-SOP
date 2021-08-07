import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { Searchbar, Chip, List, Divider } from "react-native-paper";
import HeaderComponent from "../../shared/components/headerComponent";
import { title } from "../../shared/constants/config";

function HospitalPage(props) {
    const [searchQuery, setSearchQuery] = React.useState("");
    const onChangeSearch = (query) => setSearchQuery(query);

    const chipOptions = ["Clinic", "Hospital", "COVID-19 Screening & Treatment", "Vaccines Administration Center"];

    const chipFilter = chipOptions.map((element) => (
        <Chip style={styles.chip} mode={"outlined"} selected={true} onPress={() => console.log("Pressed")}>
            {element}
        </Chip>
    ));

    const searchResultItems = [
        { title: "Hospital Sungai Buloh", description: "10mins - 5km", icon: "hospital-building" },
        { title: "Kelana Jaya Medical Centre", description: "10mins - 5km", icon: "hospital-building" },
        { title: "Ara Damansara Medical Centre", description: "10mins - 5km", icon: "hospital-building" },
        { title: "Hospital Sungai Buloh", description: "10mins - 5km", icon: "hospital-building" },
        { title: "Kelana Jaya Medical Centre", description: "10mins - 5km", icon: "hospital-building" },
        { title: "Ara Damansara Medical Centre", description: "10mins - 5km", icon: "hospital-building" },
        { title: "Hospital Sungai Buloh", description: "10mins - 5km", icon: "hospital-building" },
        { title: "Kelana Jaya Medical Centre", description: "10mins - 5km", icon: "hospital-building" },
        { title: "Ara Damansara Medical Centre", description: "10mins - 5km", icon: "hospital-building" },
        { title: "Hospital Sungai Buloh 1", description: "10mins - 5km", icon: "hospital-building" },
        { title: "Hospital Sungai Buloh 2", description: "10mins - 5km", icon: "hospital-building" },
        { title: "Hospital Sungai Buloh 3", description: "10mins - 5km", icon: "hospital-building" },
        { title: "Hospital Sungai Buloh 4", description: "10mins - 5km", icon: "hospital-building" },
    ];

    const searchResult = searchResultItems.map((element) => (
        <View>
            <List.Item style={styles.resultItem} title={element.title} description={element.description} left={(props) => <List.Icon {...props} style={{ marginRight: 0 }} icon={element.icon} />} />
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end" }}>
                <View style={{ width: 56 }}></View>
                <Divider style={{ height: 1, flex: 1 }} />
            </View>
        </View>
    ));

    return (
        <View style={styles.scene}>
            <HeaderComponent title={title.HospitalPage} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Searchbar style={styles.searchBar} placeholder="Search clinic or hospital" onChangeText={onChangeSearch} value={searchQuery} />
                    <View style={styles.chipContainer}>{chipFilter}</View>
                </View>
            </TouchableWithoutFeedback>
            <ScrollView style={styles.resultView}>{searchResult}</ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scene: {
        height: "100%",
        backgroundColor: "white",
    },
    container: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "white",
    },
    searchBar: {
        marginVertical: 5,
    },
    chipContainer: {
        marginVertical: 5,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        alignContent: "flex-start",
    },
    chip: {
        marginHorizontal: 2,
        marginVertical: 2,
    },
    resultView: {
        width: "100%",
        paddingRight: 16,
        margin: 0,
    },
    resultItem: {
        width: "100%",
        padding: 0,
        margin: 0,
    },
});

export default HospitalPage;
