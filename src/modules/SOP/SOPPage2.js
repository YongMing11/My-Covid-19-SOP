import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Linking } from "react-native";
import { Searchbar, List, Menu, Button } from "react-native-paper";
import sop_index from "@mock/sop_index.json";
import pkpd_sectors from "@mock/PKPD.json";

const browseURL = (URL) => {
    Linking.canOpenURL(URL)
        .then((supported) => {
            if (!supported) {
                Alert.alert("Unable to view the file.");
            } else {
                return Linking.openURL(URL);
            }
        })
        .catch((err) => console.log(err));
};

const SOPPage2 = ({ route, navigation }) => {
    const index = route.params.index;
    const icon = "chevron-right";
    const [searchQuery, setSearchQuery] = useState("");
    const onChangeSearch = (query) => setSearchQuery(query);

    let filteredListComponent = React.useMemo(() => {
        if (index === 4) {
            // generate normalized list
            let sectors = pkpd_sectors;
            // query filter
            if (searchQuery != null && searchQuery.trim() !== "") {
                sectors = sectors.filter((sector) => {
                    return sector.title.toLowerCase().includes(searchQuery.toLowerCase());
                });
            }
            // generate list components
            sectors = sectors.map((sector, index) => {
                return <List.Item key={index} style={styles.actionItem} titleNumberOfLines={4} onPress={() => browseURL(sector.link)} title={sector.title} right={(props) => <List.Icon {...props} style={{ marginRight: 0 }} icon={icon} />} />;
            });
            return sectors;
        } else {
            // generate normalized list
            let sectors = sop_index.phases[index].sectors;
            // query filter
            if (searchQuery != null && searchQuery.trim() !== "") {
                sectors = sectors.filter((sector) => {
                    return sector.toLowerCase().includes(searchQuery.toLowerCase());
                });
            }
            // generate list components
            sectors = sectors.map((sector, index) => <List.Item key={index} style={styles.actionItem} titleNumberOfLines={4} onPress={() => onPressAction(sector, route.params.index)} title={sector} right={(props) => <List.Icon {...props} style={{ marginRight: 0 }} icon={icon} />} />);
            return sectors;
        }
    }, [index, searchQuery]);

    const onPressAction = (sector, index) => {
        navigation.navigate("SOPPage3", { title: sector, sopPhaseIndex: index });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} style={styles.searchBar} />
                </View>
                {filteredListComponent}
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
