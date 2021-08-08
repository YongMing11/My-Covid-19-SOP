import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomePage from '../../modules/Home/HomePage';
import { Text } from 'react-native';
import HeaderComponent from './headerComponent';
import { title } from '../constants/config';
import AssistancePage from '../../modules/Home/AssistancePage';

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
                component={AssistancePage}
                options={{
                    title: title.AssistancePage,
                    backButtonEnabled: 'true'
                }}
            />
        </Stack.Navigator>
    )
}
const FakeScreenNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Fake"
            screenOptions={{
                header: ({ options, navigation }) => (
                    <HeaderComponent options={options} navigation={navigation} />
                ),
            }}>
            <Stack.Screen
                name="Fake"
                component={FakePage}
                options={{
                    title: title.HomePage,
                }}
            />
        </Stack.Navigator>
    )
}


export { AssistanceScreenNavigator, FakeScreenNavigator };