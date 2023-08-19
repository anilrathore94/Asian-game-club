import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ColorsConstant } from "../constants/Colors.constant";
import HomeScreen from "../Screen/HomeScreen";
import Account from "../Screen/Account";
import Enquiry from "../Screen/Enquiry";
import Recharge from "../Screen/Recharge";

function BottomTabs() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{
            headerShown: false,
            tabBarStyle: { height: 55, backgroundColor: ColorsConstant.hadercolor },
            tabBarActiveTintColor: ColorsConstant.White,
            tabBarInactiveTintColor:c.gary
        }}
        >
            <Tab.Screen name="Recharge" component={Recharge}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <Image source={require('../asstes/images/rupee.png')} style={styles.images} />
                        );
                    },
                }}
            />
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <Image source={require('../asstes/images/home.png')} style={styles.images} />
                        );
                    },
                }}
            />
            <Tab.Screen name="Enquiry" component={Enquiry}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <Image source={require('../asstes/images/question.png')} style={styles.images} />
                        );
                    },
                }}
            />
            <Tab.Screen name="Account" component={Account}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <Image source={require('../asstes/images/profile.png')} style={styles.images} />
                        );
                    },
                }} />


        </Tab.Navigator>
    )
}
const c = ColorsConstant, styles = StyleSheet.create({
    images: {
        height: 25,
        width: 25,
        tintColor:c.White
    }
})
export default BottomTabs;