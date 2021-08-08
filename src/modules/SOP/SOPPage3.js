import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Searchbar, List } from "react-native-paper";
import Accordion from "react-native-collapsible/Accordion";

const SECTIONS = [
  {
    title: "First",
    content: "the first",
  },
  {
    title: "Second",
    content: "Lorem ipsum...",
  },
];

const SOPPage2 = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const icon = "chevron-down";

  const onChangeSearch = (query) => setSearchQuery(query);
  const onPressFunction = () => {
    console.log("Pressed hoho");
  };
  const [activeSections, setActiveSections] = useState([]);

  _renderSectionTitle = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _renderHeader = (section) => {
    return (
      // <View style={styles.header}>
      //   <Text style={styles.headerText}>{section.title}</Text>
      // </View>
      // <TouchableOpacity onPress={onPressFunction}>
          <List.Item
            key={section.title}
            style={styles.header}
            title={section.title}
            right={(props) => (
              <List.Icon
                {...props}
                style={{ marginRight: 0 }}
                icon={icon}
              />
            )}
          />
        // </TouchableOpacity>
    );
  };

  _renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _updateSections = (activeSections) => {
    console.log(activeSections);
    setActiveSections([...activeSections]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <View>
        <Searchbar
          placeholder="Search in page 3"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        expandMultiple={true}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default SOPPage2;

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
  actionItem: {
    color: "#0E4DA4",
    backgroundColor: "#fff",
    height: 65,
    // alignItems: "center",
    justifyContent: "center",
    width: "100%",
    elevation: 4,
    textAlign: "left",
    paddingLeft: 10,
  },
  header: {
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  headerText: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    padding: 20,
    marginHorizontal: 15,
    backgroundColor: "#fff",
  },
});
