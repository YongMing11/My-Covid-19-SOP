import React, { Component } from "react";
import { Text, StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { withTheme, Button, Card, Title, Paragraph } from "react-native-paper";
import theme from "../../shared/constants/Theme";

class SOPPage1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [
        {
          areas: ["Selangor", "Kuala Lumpur", "Sarawak", "Malacca", "Johor"],
          title: "PNN Phase 1",
        },
        {
          areas: [
            "Penang",
            "Perlis",
            "Pahang",
            "Terengganu",
            "Kelantan",
          ],
          title: "PNN Phase 2",
        },
        {
          areas: [],
          title: "PNN Phase 3",
        },
        {
          areas: [],
          title: "PNN Phase 4",
        },
        {
          areas: ["Kampuing Murni", "Taman Air Condo Block A"],
          title: "EMCO",
        },
      ],
    };
  }
  render() {
    const { colors } = this.props.theme;
    const { states } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.view}>
            {states.map((stateCard, index) => (
              <Card style={styles.card} key={index}>
                <View>
                  <Text style={styles.cardTitle}>{stateCard.title}</Text>
                </View>
                <Card.Content>
                  <Paragraph style={styles.textCenter}>
                    National Recovery Plan
                  </Paragraph>
                  <View style={styles.states}>
                    {
                    stateCard.areas.length === 0? 
                    <Text style={styles.notAvailableMsg}>{'No state or region under this phase'}</Text>:  
                    stateCard.areas.map((state) => (
                      <Text key={state} style={styles.state}>
                        {`\u2022 ${state}`}
                      </Text>
                    ))
                    }
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
    backgroundColor: "#DCDCDC",
    marginBottom: 10,
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
  notAvailableMsg:{
    fontSize: 16,
    textAlign: "center",
  }
});
