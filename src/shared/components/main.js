import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as React from 'react';
import theme from '../constants/Theme';
import { AssistanceScreenNavigator, FakeScreenNavigator } from './customNavigation';

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Assistance"
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
        component={FakeScreenNavigator}
        options={{
          tabBarIcon: 'information-outline',
        }}
      />
      <Tab.Screen
        name="Helpdesk"
        component={FakeScreenNavigator}
        options={{
          tabBarIcon: 'comment-question-outline'
        }}
      />
      <Tab.Screen
        name="Assistance"
        component={AssistanceScreenNavigator}
        options={{
          tabBarIcon: 'lifebuoy'
        }}
      />
      <Tab.Screen
        name="Hospital"
        component={FakeScreenNavigator}
        options={{
          tabBarIcon: 'hospital-box-outline'
        }}
      />
      <Tab.Screen
        name="Profile"
        component={FakeScreenNavigator}
        options={{
          tabBarIcon: 'account-cog-outline'
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;