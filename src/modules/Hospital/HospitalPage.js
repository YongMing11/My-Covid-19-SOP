import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, FlatList, Text, Linking, Alert, Platform } from "react-native";
import { Modal, Portal, Searchbar, Chip, List, Divider, TouchableRipple, Title, IconButton, Colors } from "react-native-paper";
import hospital_data from "@mock/hospital.json";
import * as Clipboard from "expo-clipboard";

const RESULT_ITEM_HEIGHT = 57;

const cal_dist = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
};

const get_KM = (dist) => {
    if (dist !== Infinity) {
        return (dist / 1000).toFixed(1).toString() + "KM";
    }
    return "";
};

const copy_clipboard = (title) => {
    console.log(title);
    Clipboard.setString(title);
};

const callNumber = (phoneNum) => {
    let phoneNumber = phoneNum;
    if (Platform.OS !== "android") {
        phoneNumber = `telprompt:${phoneNum}`;
    } else {
        phoneNumber = `tel:${phoneNum}`;
    }
    Linking.canOpenURL(phoneNumber)
        .then((supported) => {
            if (!supported) {
                Alert.alert("Phone number is not available");
            } else {
                return Linking.openURL(phoneNumber);
            }
        })
        .catch((err) => console.log(err));
};

const HospitalList = React.memo(function HospitalList({ filteredData, onItemPress }) {
    // console.log("Rendering HospitalList :" + filteredData.length);

    const ItemView = ({ item }) => {
        return (
            <TouchableRipple
                onPress={() => {
                    onItemPress(item);
                }}
                rippleColor="rgba(0, 0, 0, .1)"
            >
                <List.Item style={styles.resultItem} title={item.Name} description={get_KM(item.Dist)} left={(props) => <List.Icon {...props} style={{ marginRight: 0 }} icon={"hospital-building"} />} />
            </TouchableRipple>
        );
    };

    const memoizedItemView = React.useMemo(() => ItemView, []);

    const ItemSeparatorView = () => {
        return (
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end" }}>
                <View style={{ width: 56 }}></View>
                <Divider style={{ height: 1, flex: 1 }} />
            </View>
        );
    };

    const getItemLayout = React.useCallback(
        (data, index) => ({
            length: RESULT_ITEM_HEIGHT,
            offset: RESULT_ITEM_HEIGHT * index,
            index,
        }),
        []
    );

    return (
        <View style={styles.hospitalList}>
            <FlatList data={filteredData} removeClippedSubviews={true} maxToRenderPerBatch={2} updateCellsBatchingPeriod={50} initialNumToRender={10} windowSize={5} keyExtractor={(item, index) => index.toString()} ItemSeparatorComponent={ItemSeparatorView} renderItem={memoizedItemView} extraData={onItemPress} getItemLayout={getItemLayout} />
        </View>
    );
});

const ResultListView = React.memo(function ResultListView({ query, filters, areaState, coord }) {
    // console.log("Rendering ResultListView");

    const [detailVisible, setDetailVisible] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState({});

    const hideModal = () => setDetailVisible(false);

    const onItemPress = React.useCallback((data) => {
        setDetailVisible(true);
        setSelectedData(data);
    }, []);

    const filterCount = Object.values(filters).reduce((accumulator, currentValue) => accumulator + currentValue);

    let filteredData = React.useMemo(() => {
        let filteringData = hospital_data;
        if (query == null || query.trim() === "") {
            filteringData = filteringData.filter((item) => item.State === areaState);
        }
        if (filterCount > 0) {
            if (filters["Hospital"]) {
                filteringData = filteringData.filter((item) => filters["Hospital"] === item.Hospital);
            }
            if (filters["Clinic"]) {
                filteringData = filteringData.filter((item) => filters["Clinic"] === item.Clinic);
            }
            if (filters["COVID-19 Screening & Treatment"]) {
                filteringData = filteringData.filter((item) => filters["COVID-19 Screening & Treatment"] === item.ST);
            }
            if (filters["Vaccines Administration Center"]) {
                filteringData = filteringData.filter((item) => filters["Vaccines Administration Center"] === item.VAC);
            }
        }
        if (query != null && query.trim() !== "") {
            filteringData = filteringData.filter((item) => String(item.Name).toLocaleLowerCase().includes(query.toLocaleLowerCase()));
        }
        return filteringData;
    }, [query, filters, areaState, filterCount]);

    filteredData = filteredData.map((item) => {
        let dist = Infinity;
        if (item.Latitude !== "") {
            dist = cal_dist(coord[0], coord[1], parseFloat(item.Latitude), parseFloat(item.Longitude));
        }
        return {
            Name: item.Name,
            Address: item.Address,
            Contact: item.Contact,
            Dist: dist,
        };
    });
    filteredData = filteredData.sort((a, b) => a.Dist >= b.Dist).slice(0, 50);

    // console.log(cal_dist(coord[0], coord[1], 3.1130947804875007, 101.65285567571348));

    const HospitalDetailModel = () => {
        return (
            <Portal>
                <Modal visible={detailVisible} onDismiss={hideModal} contentContainerStyle={styles.detailModel}>
                    <View style={styles.modelTitleContainer}>
                        <Title style={styles.modelTitle}>{selectedData.Name}</Title>
                        <IconButton style={styles.copyButton} icon="content-copy" color={Colors.grey700} size={20} onPress={() => copy_clipboard(selectedData.Name)} />
                    </View>
                    <Text>{selectedData.Address}</Text>
                    <Text style={styles.clickableText} onPress={() => callNumber(selectedData.Contact)}>
                        {selectedData.Contact}
                    </Text>
                </Modal>
            </Portal>
        );
    };

    return (
        <View style={styles.resultView}>
            <HospitalDetailModel />
            <HospitalList filteredData={filteredData} onItemPress={onItemPress} />
        </View>
    );
});

function HospitalPage(props) {
    const [searchQuery, setSearchQuery] = React.useState("");
    const onChangeSearch = (query) => setSearchQuery(query);
    const [areaState, setAreaState] = React.useState("SELANGOR");
    const [coord, setCpord] = React.useState([3.1153454798849145, 101.56581231664666]);
    const [filterOptions, setFilterOptions] = React.useState({ Clinic: false, Hospital: true, "COVID-19 Screening & Treatment": false, "Vaccines Administration Center": false });

    const chipOptions = ["Clinic", "Hospital", "COVID-19 Screening & Treatment", "Vaccines Administration Center"];

    const chipFilter = chipOptions.map((element, index) => (
        <Chip
            key={index}
            style={styles.chip}
            mode={"outlined"}
            selected={filterOptions[element]}
            onPress={() => {
                setFilterOptions((prevState) => ({ ...prevState, [element]: !prevState[element] }));
            }}
        >
            {element}
        </Chip>
    ));

    return (
        <View style={styles.scene}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Searchbar style={styles.searchBar} placeholder="Search clinic or hospital" onChangeText={onChangeSearch} value={searchQuery} />
                    <View style={styles.chipContainer}>{chipFilter}</View>
                </View>
            </TouchableWithoutFeedback>
            <ResultListView filters={filterOptions} areaState={areaState} query={searchQuery} coord={coord} />
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
        height: "100%",
        padding: 0,
        margin: 0,
    },
    hospitalList: {
        width: "100%",
        height: "100%",
        padding: 0,
        paddingBottom: 180,
    },
    resultItem: {
        width: "100%",
        height: 56,
        padding: 0,
        margin: 0,
    },
    detailModel: {
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 14,
        marginHorizontal: 20,
    },
    modelTitleContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    clickableText: {
        fontWeight: "bold",
        color: "#4D9BEC",
    },
    modelTitle: {
        flexGrow: 1,
        flexShrink: 1,
    },
    copyButton: {
        padding: 0,
        margin: 0,
        flexShrink: 0,
    },
});

export default HospitalPage;
