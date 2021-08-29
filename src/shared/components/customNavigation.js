import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../../modules/Home/HomePage";
import SOPPage1 from "../../modules/SOP/SOPPage1";
import SOPPage2 from "../../modules/SOP/SOPPage2";
import SOPPage3 from "../../modules/SOP/SOPPage3";
import HelpdeskPage from "../../modules/Helpdesk/HelpdeskPage";
import HospitalPage from "../../modules/Hospital/HospitalPage";
import { Text } from "react-native";
import HeaderComponent from "./headerComponent";
import { title } from "../constants/config";
import AssistancePage from "../../modules/Home/AssistancePage";
import ProfilePage from "../../modules/Profile/ProfilePage";
import AssistancePage2 from "../../modules/Home/AssistancePage2";

const Stack = createStackNavigator();

const FakePage = () => <Text style={{ color: "red" }}>Fake Love</Text>;

const AssistanceScreenNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomePage"
            screenOptions={{
                header: ({ options, navigation, route }) => (
                    <HeaderComponent options={options} navigation={navigation} route={route} />
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
                    backButtonEnabled: true
                }}
            />
            <Stack.Screen
                name="AssistancePage2"
                component={AssistancePage2}
                options={{
                    title: title.AssistancePage2,
                    backButtonEnabled: true,
                    dialog: true
                }}
            />
        </Stack.Navigator>
    );
};

const FakeScreenNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Fake"
            screenOptions={{
                header: ({ options, navigation }) => <HeaderComponent options={options} navigation={navigation} />,
            }}
        >
            <Stack.Screen
                name="Fake"
                component={FakePage}
                options={{
                    title: title.HomePage,
                }}
            />
        </Stack.Navigator>
    );
};

const HelpdeskScreenNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="HelpdeskPage"
            screenOptions={{
                header: ({ options, navigation }) => <HeaderComponent options={options} navigation={navigation} />,
            }}
        >
            <Stack.Screen
                name="HelpdeskPage"
                component={HelpdeskPage}
                options={{
                    title: title.HelpdeskPage,
                }}
            />
        </Stack.Navigator>
    );
};

const HospitalScreenNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="HospitalPage"
            screenOptions={{
                header: ({ options, navigation }) => <HeaderComponent options={options} navigation={navigation} />,
            }}
        >
            <Stack.Screen
                name="HospitalPage"
                component={HospitalPage}
                options={{
                    title: title.HospitalPage,
                }}
            />
        </Stack.Navigator>
    );
};

const SOPScreenNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="SOPPage1"
            screenOptions={{
                header: ({ options, navigation, route }) => <HeaderComponent options={options} navigation={navigation} route={route} />,
            }}
        >
            <Stack.Screen
                name="SOPPage1"
                component={SOPPage1}
                options={{
                    title: title.SOPPage1,
                }}
            />
            <Stack.Screen
                name="SOPPage2"
                component={SOPPage2}
                options={{
                    backButtonEnabled: "true",
                }}
            />
            <Stack.Screen
                name="SOPPage3"
                component={SOPPage3}
                options={{
                    backButtonEnabled: "true",
                }}
            />
        </Stack.Navigator>
    );
};

const ProfileScreenNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="ProfilePage"
            screenOptions={{
                header: ({ options, navigation }) => <HeaderComponent options={options} navigation={navigation} />,
            }}
        >
            <Stack.Screen
                name="ProfilePage"
                component={ProfilePage}
                options={{
                    title: title.ProfilePage,
                }}
            />
        </Stack.Navigator>
    );
};

export { AssistanceScreenNavigator, FakeScreenNavigator, HelpdeskScreenNavigator, HospitalScreenNavigator, SOPScreenNavigator, ProfileScreenNavigator };
