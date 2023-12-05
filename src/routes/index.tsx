import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import CallHistory from "../screens/CallHistory";
import CreditHistory from "../screens/CreditHistory";
import Settings from "../screens/Settings";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Ionicons";
import ProviderProfile from "../screens/ProviderProfile";
import Profile from "../screens/Profile";
import EditProfile from "../screens/Profile/EditProfile";
import BuyCredits from "../screens/BuyCredits";
import Calling from "../screens/Calling";
import * as ZIM from "zego-zim-react-native";
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
  ZegoMenuBarButtonName,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
} from "@zegocloud/zego-uikit-prebuilt-call-rn";
import SignIn from "../screens/SignIn";

type RootStackParamList = {
  HomeTab: undefined;
  CallHistoryTab: undefined;
  CreditHistoryTab: undefined;
  SettingsTab: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

const CallHistoryStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CallHistory" component={CallHistory} />
  </Stack.Navigator>
);

const CreditHistoryStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CreditHistory" component={CreditHistory} />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Settings" component={Settings} />
  </Stack.Navigator>
);

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarIcon: ({ focused, color }) => {
        const size = 22;
        if (route.name === "HomeTab") {
          return <Icon name="home-lightning-bolt" size={30} color={color} />;
        } else if (route.name === "CallHistoryTab") {
          return <Icon name="history" size={25} color={color} />;
        } else if (route.name === "CreditHistoryTab") {
          return <Icon name="credit-card-clock" size={25} color={color} />;
        } else if (route.name === "SettingsTab") {
          return <Icon2 name="settings-sharp" size={25} color={color} />;
        }
      },
      tabBarActiveTintColor: "#5E449B",
      tabBarLabelStyle: {
        fontFamily: "Poppins-Regular",
        fontSize: 10,
      },
    })}
  >
    <Tab.Screen
      name="HomeTab"
      options={{ tabBarLabel: "Home" }}
      component={HomeStack}
    />
    <Tab.Screen
      name="CallHistoryTab"
      options={{ tabBarLabel: "Call History" }}
      component={CallHistoryStack}
    />
    <Tab.Screen
      name="CreditHistoryTab"
      options={{ tabBarLabel: "Credit History" }}
      component={CreditHistoryStack}
    />
    <Tab.Screen
      name="SettingsTab"
      options={{ tabBarLabel: "Settings" }}
      component={SettingsStack}
    />
  </Tab.Navigator>
);

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      <Stack.Screen name="ProviderProfile" component={ProviderProfile} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="BuyCredits" component={BuyCredits} />
      <Stack.Screen name="Calling" component={Calling} />
      <Stack.Screen
        name="ZegoUIKitPrebuiltCallWaitingScreen"
        component={ZegoUIKitPrebuiltCallWaitingScreen}
      />
      <Stack.Screen
        name="ZegoUIKitPrebuiltCallInCallScreen"
        component={ZegoUIKitPrebuiltCallInCallScreen}
      />
    </Stack.Navigator>
  );
};

export default RootStack;

//   const DrawerNavigator = () => (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerStyle: {
//           backgroundColor: '#fff',
//           width: WIDTH,
//         },
//         drawerType: 'slide',
//       }}
//       drawerContent={props => <DrawerContent {...props} />}>
//       <Drawer.Screen name="RootStack" component={RootStack} />
//     </Drawer.Navigator>
//   );

// export default RootStack;
