import React, { Component } from "react";
import { Text, StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { withTheme, Button, Card, Title, Paragraph, Surface } from "react-native-paper";
import sop_index from "@mock/sop_index.json";

class SOPPage1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phases: sop_index["phases"],
        };
    }

    render() {
        const { colors } = this.props.theme;
        const { phases } = this.state;
        const { navigation, route } = this.props;

        const onPressAction = (title, index) => {
            navigation.navigate("SOPPage2", { title: title, index: index });
        };

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.view}>
                        {phases.map((phaseCard, index) => (
                            <Card style={styles.card} key={index} onPress={() => onPressAction(phaseCard.title, index)}>
                                <View>
                                    <Text style={styles.cardTitle}>{phaseCard.title}</Text>
                                </View>
                                <Card.Content>
                                    <Paragraph style={styles.textCenter}>{phaseCard.subtitle}</Paragraph>
                                    <View style={styles.states}>
                                        {phaseCard.areas.length === 0 ? (
                                            <Text style={styles.notAvailableMsg}>{"No state or region under this phase"}</Text>
                                        ) : (
                                            phaseCard.areas.map((state) => (
                                                <Text key={state} style={styles.state}>
                                                    {`\u2022 ${state}`}
                                                </Text>
                                            ))
                                        )}
                                    </View>
                                </Card.Content>
                            </Card>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
export default withTheme(SOPPage1);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    card: {
        flexDirection: "row",
        width: "96%",
        marginBottom: 10,
        elevation: 6,
    },
    textCenter: {
        textAlign: "center",
    },
    cardTitle: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
    },
    view: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    states: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    state: {
        width: "50%",
        fontSize: 20,
    },
    notAvailableMsg: {
        fontSize: 16,
        textAlign: "center",
    },
});
