import React, { Fragment, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Searchbar, List } from "react-native-paper";
import sop_details from "@mock/sop_details.json";
import sop_index from "@mock/sop_index.json";

const SOPPage3 = ({ route, navigation }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeAccordions, setActiveAccordions] = useState(sop_details[sop_index.phases[route.params.sopPhaseIndex].title][route.params.title]);

    const onChangeSearch = (query) => {
        setSearchQuery(query);
        if (query === "") {
            setActiveAccordions(sop_details[route.params.title]);
            return;
        }
        const result = sop_details[route.params.title].filter((s) => {
            let isIncluded = s.title.toLowerCase().includes(query.toLowerCase());
            // isIncluded =
            //     isIncluded ||
            //     s.content.filter((c) => {
            //         return c.toLowerCase().includes(query.toLowerCase());
            //     }).length !== 0;
            return isIncluded;
        });
        setActiveAccordions(result);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <Searchbar placeholder="Search in page" onChangeText={onChangeSearch} value={searchQuery} style={styles.searchBar} />
                </View>
                <List.Section>
                    {activeAccordions.map((item, index) => (
                        <List.Accordion title={item.title} titleStyle={styles.accordianTitle} titleNumberOfLines={4} style={styles.header} key={index}>
                            <View style={styles.activity}>
                                {item.content.map((detail_item, index) => {
                                    if (typeof detail_item === "string") {
                                        return (
                                            <View style={styles.bulletItem} key={index}>
                                                <Text style={styles.content}>{`\u2022  `}</Text>
                                                <Text style={styles.content}>{detail_item}</Text>
                                            </View>
                                        );
                                    } else {
                                        return (
                                            <View key={index}>
                                                <Text style={styles.subheader}>{detail_item.title}</Text>
                                                {detail_item.content.map((nested_detail_item, nested_index) => {
                                                    return (
                                                        <View style={styles.bulletItem} key={nested_index}>
                                                            <Text style={styles.content}>{`\u2022  `}</Text>
                                                            <Text style={styles.content}>{nested_detail_item}</Text>
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                        );
                                    }
                                })}
                            </View>
                        </List.Accordion>
                    ))}
                </List.Section>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SOPPage3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#fff",
    },
    searchBar: {
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    header: {
        backgroundColor: "#fff",
        padding: 10,
        marginHorizontal: 15,
        marginVertical: 5,
        shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        borderWidth: 0.5,
        borderColor: "#000",
        // elevation: 4,
    },
    subheader: {
        fontSize: 15,
        textAlign: "justify",
        fontWeight: "bold",
        paddingTop: 3,
        paddingBottom: 3,
    },
    content: {
        fontSize: 14,
        textAlign: "justify",
    },
    activity: {
        marginHorizontal: 15,
        marginBottom: 15,
        backgroundColor: "#fff",
        padding: 10,
    },
    bulletItem: {
        flexDirection: "row",
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    accordianTitle: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
    },
});
