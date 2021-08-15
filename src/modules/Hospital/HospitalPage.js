import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, FlatList, Text, Linking, Alert, Platform } from "react-native";
import { Modal, Portal, Searchbar, Chip, List, Divider, TouchableRipple, Title } from "react-native-paper";
import hospital_data from "@mock/hospital_data.json";

const RESULT_ITEM_HEIGHT = 57;

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
                <List.Item style={styles.resultItem} title={item.Name} description={"10mins - 5km"} left={(props) => <List.Icon {...props} style={{ marginRight: 0 }} icon={"hospital-building"} />} />
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

const ResultListView = React.memo(function ResultListView({ query, filters, areaState }) {
    // console.log("Rendering ResultListView");

    const [detailVisible, setDetailVisible] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState({});

    const showModal = () => setDetailVisible(true);
    const hideModal = () => setDetailVisible(false);

    const onItemPress = React.useCallback((data) => {
        setDetailVisible(true);
        setSelectedData(data);
    }, []);

    const filteredData = React.useMemo(
        () =>
            hospital_data.filter((item) => {
                if (query == null || query.trim() === "") {
                    return item.State === areaState;
                } else {
                    return String(item.Name).toLocaleLowerCase().includes(query.toLocaleLowerCase());
                }
            }),
        [query, filters, areaState]
    );

    const HospitalDetailModel = () => {
        return (
            <Portal>
                <Modal visible={detailVisible} onDismiss={hideModal} contentContainerStyle={styles.detailModel}>
                    <Title>{selectedData.Name}</Title>
                    <Text>{selectedData.Address}</Text>
                    <Text style={styles.clickableText} onPress={() => callNumber(selectedData.Contact)}>{selectedData.Contact}</Text>
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
    const [areaState, setAreaState] = React.useState("Selangor");
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
            <ResultListView areaState={areaState} query={searchQuery} />
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
    clickableText: {
        fontWeight: "bold",
        color: "#4D9BEC",
    },
});

export default HospitalPage;
