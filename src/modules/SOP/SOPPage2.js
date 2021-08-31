import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { Searchbar, List, Menu, Button } from "react-native-paper";
import sop_index from "@mock/sop_index.json";

const SOPPage2 = ({ route, navigation }) => {
    const index = route.params.index;
    const icon = "chevron-right";
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSectors, setActiveSectors] = useState(sop_index.phases[index].sectors);

    const onChangeSearch = (query) => {
        setSearchQuery(query);
        if (query === "") {
            setActiveSectors(sop_index.sectors);
            return;
        }
        const sectorsResult = sop_index.sectors.filter((s) => {
            return s.toLowerCase().includes(query.toLowerCase());
        });
        setActiveSectors(sectorsResult);
    };

    const onPressAction = (sector) => {
        navigation.navigate("SOPPage3", { title: sector });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} style={styles.searchBar} />
                </View>
                {activeSectors.map((sector, index) => (
                    <List.Item key={index} style={styles.actionItem} onPress={() => onPressAction(sector)} title={sector} right={(props) => <List.Icon {...props} style={{ marginRight: 0 }} icon={icon} />} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SOPPage2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    actionItem: {
        color: "#0E4DA4",
        backgroundColor: "#fff",
        height: 65,
        justifyContent: "center",
        width: "100%",
        elevation: 4,
        textAlign: "left",
        paddingLeft: 10,
    },
});
