/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

// // Import Firebase modules
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

ZegoUIKitPrebuiltCallService.useSystemCallingUI([ZIM, ZPNs]);

AppRegistry.registerComponent(appName, () => App);
