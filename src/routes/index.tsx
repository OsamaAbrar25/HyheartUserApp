// import { useSelector } from "react-redux";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import CallHistory from '../screens/CallHistory';
import CreditHistory from '../screens/CreditHistory';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

const CallHistoryStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="CallHistory" component={CallHistory} />
  </Stack.Navigator>
);

const CreditHistoryStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="CreditHistory" component={CreditHistory} />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Settings" component={Settings} />
  </Stack.Navigator>
);

const MainStack = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarHideOnKeyboard: true,
      // tabBarIcon: ({focused, color}) => {
      //   const size = 22;
      //   if (route.name === 'HomeTab') {
      //     return <HomeIcon size={size} color={color} />;
      //   } else if (route.name === 'TransactionsTab') {
      //     return <ArrowLeftRightIcon size={size} color={color} />;
      //   } else if (route.name === 'HeadsTab') {
      //     return <FolderInputIcon size={size} color={color} />;
      //   }
      //   return <UsersIcon size={size} color={color} />;
      // },
      tabBarActiveTintColor: '#0050DD',
      tabBarInactiveTintColor: '#64748B',
      tabBarLabelStyle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
      },
      tabBarStyle: {
        height: 60,
        paddingTop: 10,
        paddingBottom: 5,
        position: 'absolute',
      },
    })}>
    <Tab.Screen
      name="HomeTab"
      options={{tabBarLabel: 'Home'}}
      component={HomeStack}
    />
    <Tab.Screen
      name="CallHistoryTab"
      options={{tabBarLabel: 'Call History'}}
      component={CallHistoryStack}
    />
    <Tab.Screen
      name="CreditHistoryTab"
      options={{tabBarLabel: 'Credit History'}}
      component={CreditHistoryStack}
    />
    <Tab.Screen
      name="SettingsTab"
      options={{tabBarLabel: 'Settings'}}
      component={SettingsStack}
    />
  </Tab.Navigator>
);

const RootStack = () => {
  // const userData = useSelector(state => state.Auth.userData);
  // const dispatch = useDispatch();
  // dispatch(setDefaultBook(userData?.defaultBook));
  // const isLoggedIn = userData.jwt;

  return (
    <Stack.Navigator>
      {/* // <Stack.Screen name="AuthStack" component={AuthStack} /> */}
      <Stack.Screen name="MainStack" component={MainStack} />
      {/* // <Stack.Screen name="ProfileStack" component={ProfileStack} /> */}
    </Stack.Navigator>
  );
};

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

export default RootStack;
