import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Avatar, Caption, DataTable, Headline, IconButton, Surface, Colors } from "react-native-paper";
import { useHistoryContext } from "../../contexts/history-context";

function ProfilePage({ navigation }) {
    const profileDetails = {
        name: "John",
        email: "johntemp@gmail.com",
        area: "Kuala Lumpur",
    };

    const { histories } = useHistoryContext();

    const chartWidth = Dimensions.get("window").width * 1.14;

    const [viewHeight, setViewHeight] = React.useState(0);

    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientTo: "white",
        color: (opacity = 1) => `rgba(151, 151, 151, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: true, // optional
        propsForLabels: {
            fontSize: "12",
        },
    };

    const [chartData, setChartData] = useState({
        labels: ["04/07", "05/07", "06/07", "07/07", "08/07", "09/07", "10/07"],
        datasets: [
            {
                data: [0, 50, 30, 60, 30, 30, 0],
                color: (opacity = 1) => `rgba(14, 77, 164, ${opacity})`,
                strokeWidth: 2,
            },
        ],
    });

    useEffect(() => {
        const today = moment();
        const labels = [];
        const durations = [];
        for (let numberOfDayFromToday = 6; numberOfDayFromToday >= 0; numberOfDayFromToday--) {
            const previousDate = today.clone().subtract(numberOfDayFromToday, 'day');
            const totalDuration = histories.reduce((total, history) => {
                if (previousDate.isSame(moment(history.date, "DD/MM/YY"), 'day')) {
                    return total + history.duration;
                }
                return total;
            }, 0)
            labels.push(previousDate.format("DD/MM"))
            durations.push(totalDuration)
        }
        setChartData((data) => ({
            labels,
            datasets: [{
                ...data['datasets'][0],
                data: durations
            }]
        }))
    }, [histories])

    const historiesRows = histories.map((element, index) => (
        <DataTable.Row style={{ paddingHorizontal: 0 }} key={index}>
            <DataTable.Cell style={styles.locationColumn} numberOfLines={2}>
                <Text>{element.location}</Text>
            </DataTable.Cell>
            <DataTable.Cell style={styles.dateColumn}>{element.date}</DataTable.Cell>
            <DataTable.Cell style={styles.timeColumn}>{element.time}</DataTable.Cell>
            <DataTable.Cell style={styles.durationColumn} numeric>
                {element.duration}
            </DataTable.Cell>
        </DataTable.Row>
    ));

    return (
        <View style={styles.scene}>
            <View style={styles.profileContainer}>
                <View style={styles.avatarContainer}>
                    <Avatar.Text size={90} label="Jo" />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsText}>{profileDetails.name}</Text>
                    <Text style={styles.detailsText}>{profileDetails.email}</Text>
                    <Text style={styles.detailsText}>{profileDetails.area}</Text>
                    <Text style={styles.clickableText}>Edit Profile</Text>
                </View>
            </View>
            <Surface style={styles.durationSurface}>
                <View style={styles.surfaceHeader}>
                    <Headline>Duration at Outside</Headline>
                    <IconButton style={{ margin: 0 }} icon="unfold-more-horizontal" color={Colors.black} size={20} onPress={() => console.log("Pressed")} />
                </View>
                <View
                    style={{ height: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start" }}
                    onLayout={(event) => {
                        var { x, y, width, height } = event.nativeEvent.layout;
                        setViewHeight(height * 0.8);
                    }}
                >
                    <LineChart style={styles.lineChart} data={chartData} width={chartWidth} height={viewHeight} chartConfig={chartConfig} formatYLabel={(label) => Math.trunc(label)} />
                </View>
            </Surface>
            <Surface style={styles.durationSurface}>
                <View style={styles.surfaceHeader}>
                    <Headline>Visited Locations</Headline>
                    <IconButton style={{ margin: 0 }} icon="unfold-more-horizontal" color={Colors.black} size={20} onPress={() => console.log("Pressed")} />
                </View>
                <DataTable style={{ marginTop: -10, paddingHorizontal: 5 }}>
                    <DataTable.Header style={styles.tableHeader}>
                        <DataTable.Title style={styles.locationColumn}>Location</DataTable.Title>
                        <DataTable.Title style={styles.dateColumn}>Date</DataTable.Title>
                        <DataTable.Title style={styles.timeColumn}>Time</DataTable.Title>
                        <DataTable.Title style={styles.durationHeader} numberOfLines={1} numeric>
                            <View style={styles.nestedDurationHeader}>
                                <Caption style={styles.caption}>Duration</Caption>
                                <Caption style={styles.caption}>(min)</Caption>
                            </View>
                        </DataTable.Title>
                    </DataTable.Header>
                </DataTable>
                <ScrollView style={styles.rowScrollView}>{historiesRows}</ScrollView>
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    scene: {
        height: "100%",
        backgroundColor: "white",
    },
    profileContainer: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        height: 98,
    },
    avatarContainer: {
        flexGrow: 1,
        alignItems: "center",
    },
    detailsContainer: {
        flex: 3,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        height: "100%",
    },
    detailsText: {
        fontWeight: "bold",
    },
    clickableText: {
        fontWeight: "bold",
        color: "#4D9BEC",
    },
    durationSurface: {
        marginTop: 4,
        marginBottom: 4,
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        elevation: 2,
    },
    surfaceHeader: {
        width: "100%",
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    lineChart: {
        flex: 1,
        paddingHorizontal: 0,
        marginLeft: -30,
    },
    tableHeader: {
        height: 40,
        paddingVertical: -10,
        paddingHorizontal: 0,
    },
    rowScrollView: {
        width: "100%",
        height: "100%",
        paddingHorizontal: 5
    },
    locationColumn: {
        flex: 2,
        paddingLeft: 4,
        paddingRight: 6,
    },
    dateColumn: {
        flex: 1,
    },
    timeColumn: {
        flex: 1,
    },
    durationColumn: {
        flex: 0.6,
        paddingRight: 6,
    },
    durationHeader: {
        flex: 0.6,
        paddingRight: 6,
        height: "100%",
        paddingTop: 10,
        marginVertical: 0,
    },
    nestedDurationHeader: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingVertical: 0,
        marginVertical: 0,
    },
    caption: {
        flex: 1,
        paddingVertical: 0,
        marginVertical: -4,
    },
});

export default ProfilePage;
