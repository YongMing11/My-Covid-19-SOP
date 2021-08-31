import React, { Component } from "react";
import { Text, StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { withTheme, Button, Card, Title, Paragraph, Surface, List } from "react-native-paper";
import sop_index from "@mock/sop_index.json";

class ReviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [{
              title: 'Pulau Redang',
              subtitle:'One of the largest islands off the east coast of Peninsular Malaysia. It is famous for its crystal clear waters and white sandy beaches.',
              uri:'https://picsum.photos/700'
            }],
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
                {/* <List> */}
                    <View style={styles.view}>
                        {places.map((place, index) => (
                            <Card style={styles.card} key={index} onPress={() => onPressAction(place.title, index)}>
                                <Card.Cover source={{ uri: place.uri }} />
                                <Card.Title title={place.title} subtitle={place.subtitle} />
                                <Card.Content style={styles.bg}>
                                  <Text style={styles.whiteText}>Overall SOP Rating</Text>
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
                                  <Button color="blue">View Reviews</Button>
                                </Card.Actions>
                            </Card>
                        ))}
                    </View>
                {/* </List> */}
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
        // width: "96%",
        marginBottom: 10,
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
      height: 20,
      width: 20,
      padding: 0,
      color: '#3677D9'
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
    bg:{
      backgroundColor: '#3677D9',
    },
    whiteText:{
      color: 'white'
    }
});
