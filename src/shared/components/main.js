import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import * as React from "react";
import theme from "../constants/Theme";
import { AssistanceScreenNavigator, FakeScreenNavigator, HelpdeskScreenNavigator, HospitalScreenNavigator, SOPScreenNavigator, ProfileScreenNavigator, ReviewScreenNavigator } from "./customNavigation";

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator
            initialRouteName="Review"
            shifting={false}
            activeColor={theme.colors.primaryBlue}
            inactiveColor={theme.colors.primaryGrey}
            tabBarOptions={{
                labelStyle: { fontSize: 18 },
            }}
            barStyle={{ backgroundColor: theme.colors.secondaryGrey }}
        >
            <Tab.Screen
                name="SOP Info"
                component={SOPScreenNavigator}
                options={{
                    tabBarIcon: "information-outline",
                }}
            />
            <Tab.Screen
                // name="Helpdesk"
                name="Review"
                // component={HelpdeskScreenNavigator}
                component={ReviewScreenNavigator}
                options={{
                    tabBarIcon: "account-edit",
                }}
            />
            <Tab.Screen
                name="Assistance"
                component={AssistanceScreenNavigator}
                options={{
                    tabBarIcon: "lifebuoy",
                }}
            />
            <Tab.Screen
                name="Hospital"
                component={HospitalScreenNavigator}
                options={{
                    tabBarIcon: "hospital-box-outline",
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreenNavigator}
                options={{
                    tabBarIcon: "account-cog-outline",
                }}
            />
        </Tab.Navigator>
    );
};

export default Main;
