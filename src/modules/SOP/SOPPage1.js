import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import { withTheme, Button, Card, Title, Paragraph } from "react-native-paper";
import theme from "../../shared/constants/Theme";

class SOPPage1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statePNN1: ["Selangor", "Kuala Lumpur"],
    };
  }
  render() {
    const { colors } = this.props.theme;
    const { statePNN1 } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <Card style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>PNN Phase 1</Text>
            </View>
            <Card.Content>
              <Paragraph style={styles.textCenter}>
                National Recovery Plan
              </Paragraph>
              <View style={styles.states}>
                {statePNN1.map((state) => (
                  <Text key={state} style={styles.state}>
                    {`\u2022 ${state}`}
                  </Text>
                ))}
              </View>
            </Card.Content>
          </Card>
        </View>
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
    width: "95%",
    backgroundColor: "#DCDCDC",
    marginTop: 10,
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
  },
  states: {
    flexDirection: "row",
  },
  state: {
    flex: 1,
    fontSize: 20,
  },
});
