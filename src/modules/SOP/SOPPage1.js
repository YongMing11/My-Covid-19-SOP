import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, SafeAreaView } from 'react-native'
import { withTheme, Button, Card, Title, Paragraph } from 'react-native-paper';
import theme from '../../shared/constants/Theme';

class SOPPage1 extends Component {
  render() {
    const { colors } = this.props.theme;
    return (
      <SafeAreaView style={styles.container}>
          <View>
            <Card style={styles.card}>
              <Card.Title title="Card Title" subtitle="Card Subtitle" />
              <Card.Content>
                <Title>Card title</Title>
                <Paragraph>Card content</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
              </Card.Actions>
            </Card>
          </View>
      </SafeAreaView>
    )
  }
}
export default withTheme(SOPPage1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: '5px',
    margin: '10px'
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  flex:{
    flex: 1
  },
  card: {
    width: '100%',
    backgroundColor: theme.colors.primary
  },
})
