import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Searchbar } from "react-native-paper";

const SOPPage2 = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
          />
        </View>
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
  },
});
