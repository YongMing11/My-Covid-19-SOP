import React, { Fragment, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Searchbar, List } from "react-native-paper";
import info from '@mock/sop.json';

const SOPPage3 = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAccordians, setActiveAccordians] = useState(info.activities);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if(query === ''){setActiveAccordians(info.activities); return;}
    const result = info.activities.filter(s => {
      let isIncluded = s.title.toLowerCase().includes(query.toLowerCase());
      isIncluded = isIncluded || s.content.filter(c => {
        return c.toLowerCase().includes(query.toLowerCase());
      }).length !==0;
      return isIncluded;
    });
    console.log(result);
    setActiveAccordians(result);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <View>
        <Searchbar
          placeholder="Search in page"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>
      <List.Section>
        {activeAccordians.map((a, index) => (
          <List.Accordion
            title={a.title}
            titleStyle={styles.accordianTitle}
            style={styles.header}
            key={index}
          >
            <View style={styles.activity}>
              {a.content.map((c, index) => {
                return <View style={styles.bulletItem} key={index}>
                  <Text style={styles.content}>{`\u2022  `}</Text>
                  <Text style={styles.content}>{c}</Text>
                </View>
                })
              }
            </View>
          </List.Accordion>
        ))}
      </List.Section>
      {/* </ScrollView> */}
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  content: {
    fontSize: 14,
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
    paddingHorizontal: 10
  },
  accordianTitle: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
});
