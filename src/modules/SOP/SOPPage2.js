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
import { useRoute } from '@react-navigation/native';

const SOPPage2 = ({navigation}) => {
  const route = useRoute();
// console.log(route.name);
  const [searchQuery, setSearchQuery] = React.useState("");
  const sectors = [
    "General SOP Activity",
    "Communication Sector",
    "Agribultural Commodities Sector",
  ];
  const icon = 'chevron-right';

  const onChangeSearch = (query) => setSearchQuery(query);
  const onPressAction = (sector) => {
    navigation.navigate('SOPPage3',{title:sector});
  };
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
      {sectors.map((sector, index) => (
        <TouchableOpacity onPress={()=>onPressAction(sector)}>
          <List.Item
            key={index}
            style={styles.actionItem}
            title={sector}
            right={(props) => (
              <List.Icon
                {...props}
                style={{ marginRight: 0 }}
                icon={icon}
              />
            )}
          />
        </TouchableOpacity>
      ))}
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
});
