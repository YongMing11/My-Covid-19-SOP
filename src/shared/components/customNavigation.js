import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomePage from '../../modules/Home/HomePage';
import { Text } from 'react-native';
import HeaderComponent from './headerComponent';
import { title } from '../constants/config';

const Stack = createStackNavigator();

const FakePage = () => <Text style={{ color: 'red' }}>Fake Love</Text>;


const AssistanceScreenNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomePage"
            screenOptions={{
                header: ({ options, navigation }) => (
                    <HeaderComponent options={options} navigation={navigation} />
                ),
            }}>
            <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{
                    title: title.HomePage,
                }}
            />
            <Stack.Screen
                name="AssistancePage"
                component={FakePage}
                options={{
                    title: title.AssistancePage,
                    backButtonEnabled: 'true'
                }}
            />
        </Stack.Navigator>
    )
}


export { AssistanceScreenNavigator };