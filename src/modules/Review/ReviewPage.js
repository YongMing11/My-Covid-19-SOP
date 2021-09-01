import React, { Component } from "react";
import { Text, StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { withTheme, Button, Card, Title, Paragraph, Surface, List } from "react-native-paper";
import sop_index from "@mock/sop_index.json";

class ReviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [
              {
              title: '1 Utama Shopping Centre',
              subtitle:'Elevating the ideals of shopping, entertainment and dining, 1 Utama Shopping Centre is the largest shopping mall in Malaysia.',
              uri:'https://drive.google.com/uc?id=1XodF8wFQthHaM_4z7Ao3UYm16r66V61-'
            },
            {
            title: 'Mid Valley Megamall',
            subtitle:'Located strategically in the city of Kuala Lumpur, Mid Valley Megamall is a shopping mall surrounded with hotels and offices.',
            uri:'https://drive.google.com/uc?id=1Yw7ykbqghp03SIV0ZGljcF9SaPeCCsZ3'
          },
              {
              title: 'DinnerDate Malaysia',
              subtitle:'Guests of DinnerDate can choose between three exclusive themed rooms: Tropical Summer, Colourful Dreams, or Mediterranean Memories.',
              uri:'https://drive.google.com/uc?id=1Ym9uUwApPORd2MtD9CuvP6uvwLtRfvzv'
            },
          ],
        };
    }

    render() {
        const { colors } = this.props.theme;
        const { places } = this.state;
        const { navigation, route } = this.props;

        const onPressAction = (title, index) => {
            // navigation.navigate("ReviewDetail", { title: title, index: index });
            console.log('Navigate to review detail');
        };

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.view}>
                        {places.map((place, index) => (
                            <Card style={styles.card} key={index} onPress={() => onPressAction(place.title, index)}>
                                <Card.Cover source={{ uri: place.uri }} />
                                <Card.Title title={place.title} subtitle={place.subtitle} />
                                <Card.Content>
                                  <Text>Overall SOP Rating</Text>
                                </Card.Content>
                                <Card.Actions style={styles.flexSpaceBetween}>
                                  <View style={styles.icons}>
                                    {
                                      [1,2,3,4].map(star => {
                                        return <List.Icon key={star} style={styles.rating} icon="star" color="blue" />
                                      })
                                    }
                                    {
                                      [5].map(star => {
                                        return <List.Icon key={star} style={styles.rating} icon="star-outline" color="blue" />
                                      })
                                    }
                                  </View>
                                </Card.Actions>
                                  <Button color="white" style={styles.button}>View Reviews</Button>
                            </Card>
                        ))}
                </ScrollView>
            </SafeAreaView>
        );
    }
}
export default withTheme(ReviewPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    card: {
        // flexDirection: "row",
        width: "96%",
        marginBottom: 10,
        left: 10,
        right: 10,
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
        // justifyContent: "center",
        // alignItems: "center",
        marginTop: 15,
        width: '90%'
    },
    rating:{
      fontWeight: 'bold',
      height: 10,
      width: 25,
      padding: 0,
      color: '#3677D9',
    },
    flexSpaceBetween:{
      // flex:1,
      flexDirection: "row",
      justifyContent:"space-between",
    },
    icons:{
      flex:1,
      flexDirection: "row"
    },
    button:{
      backgroundColor: '#3677D9',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    whiteText:{
      color: 'white'
    }
});
