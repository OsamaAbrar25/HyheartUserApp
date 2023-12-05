import { Avatar, Button, ListItem } from "@rneui/themed";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { PermissionsAndroid, Platform } from "react-native";
import auth from "@react-native-firebase/auth";
import * as ZIM from "zego-zim-react-native";
import * as ZPNs from "zego-zpns-react-native";

import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
  ZegoMenuBarButtonName,
  ZegoUIKitPrebuiltCallFloatingMinimizedView,
} from "@zegocloud/zego-uikit-prebuilt-call-rn";
import { useGetProvidersQuery, useGetZegoTokenQuery } from "../../apis/user";
import { useSelector } from "react-redux";

// import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VOICE_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'

const appID = 1249344658;
const appSign =
  "2ed2bb743e506fe41e001c9a0db1bedb84a7134a6d6808ff544a640fdfa4d181";
const userID = "1";
const userName = "Test User";

const Home = ({ navigation }) => {
  const name = useSelector((state) => state.auth.userData.name);
  const photoURL = useSelector((state) => state.auth.userData.photoURL);
  const jwt2 = useSelector((state) => state.auth.jwt);

  const response = useGetZegoTokenQuery();
  const providersListRes = useGetProvidersQuery();

  // console.log("Zego LOG: ", response.data);

  useEffect(() => {
    console.log("Providers List:", providersListRes);
    console.log("jwt2222222222", jwt2);
  }, [providersListRes.isSuccess]);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      // Do something after successful logout, e.g., navigate to login screen
      // navigation.navigate('Login'); // If using navigation
    } catch (error) {
      // Handle logout error
      console.error("Error while logging out:", error);
    }
  };

  useEffect(() => {
    try {
      ZegoUIKitPrebuiltCallService.init(
        appID, // You can get it from ZEGOCLOUD's console
        appSign, // You can get it from ZEGOCLOUD's console
        userID, // It can be any valid characters, but we recommend using a phone number.
        userName,
        [ZIM, ZPNs],
        {
          ringtoneConfig: {
            incomingCallFileName: "rutu.mp3",
            outgoingCallFileName: "ringing.mp3",
          },
          notifyWhenAppRunningInBackgroundOrQuit: true,
          androidNotificationConfig: {
            channelID: "AudioChannel",
            channelName: "CC",
          },
        }
      );
    } catch (error) {
      console.error("Error initializing ZegoUIKitPrebuiltCallService:", error);
    }
  }, []);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          padding: 16,
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#FADD9A",
          marginBottom: 16,
        }}
      >
        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
          <Avatar
            rounded
            // showEditButton
            size={"medium"}
            avatarStyle={{ borderWidth: 3, borderColor: "white" }}
            source={{
              uri: photoURL,
            }}
          />
          <View>
            <Text style={{ fontWeight: "bold", color: "black" }}>
              Hi! {name}
            </Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
              Your Credits: 12
            </Text>
          </View>
        </View>
        <Button
          size={"sm"}
          buttonStyle={{ paddingHorizontal: 20, backgroundColor: "#5E449B" }}
          containerStyle={{ borderRadius: 50 }}
          titleStyle={{ fontSize: 10 }}
          title={"Buy Credits"}
          onPress={() => handleLogout()} //navigation.navigate('BuyCredits')}
        />
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ color: "black", fontWeight: "600" }}>Active Users</Text>
      </View>

      <ListItem
        style={{
          paddingVertical: 0,
        }}
      >
        <Avatar
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
          avatarStyle={{ borderWidth: 3, borderColor: "gold" }}
          size={50}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "700", fontSize: 14 }}>
            Osama Abrar
          </ListItem.Title>
          <ListItem.Subtitle style={{ fontSize: 11 }}>
            M | 18-25 Years
          </ListItem.Subtitle>
        </ListItem.Content>
        <Icon
          name="user-large"
          size={25}
          color="#5E449B"
          onPress={() => navigation.navigate("UserProfile")}
        />
        <ZegoSendCallInvitationButton
          invitees={[
            {
              userID: "2",
              userName: "Provider User",
            },
          ]}
          isVideoCall={false}
          resourceID={"zego_data"} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
        />
      </ListItem>

      {providersListRes.isSuccess && (
        <FlatList
          data={providersListRes.data}
          renderItem={
            ({ item }) => 

            <ListItem
              style={{
                paddingVertical: 0,
              }}>
              <Avatar
                rounded
                source={{ uri: item.pfp }}
                avatarStyle={{ borderWidth: 3, borderColor: 'gold' }}
                size={50}
              />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
                  {item.firstName}
                </ListItem.Title>
                <ListItem.Subtitle style={{ fontSize: 11 }}>
                  {item.gender}M | {item.dob}18-25 Years
                </ListItem.Subtitle>
              </ListItem.Content>
              <Icon name="user-large" size={25} color="#5E449B" onPress={() => navigation.navigate('UserProfile')} />
              <ZegoSendCallInvitationButton
                invitees={[{
                  userID: `${item.id}`, userName: `${item.firstName}`
                }]}
                isVideoCall={false}
                resourceID={"zego_data"} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
              />
            </ListItem>
          }
          keyExtractor={(item) => item.id}
        />
      )}

      {/* <ZegoUIKitPrebuiltCall
        appID={appID}
        appSign={appSign}
        userID={userID} // userID can be something like a phone number or the user id on your own user system. 
        userName={userName}
        callID={callID} // callID can be any unique string. 

        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...ONE_ON_ONE_VOICE_CALL_CONFIG,
          onOnlySelfInRoom: () => { navigation.navigate('Home') },
          onHangUp: () => { navigation.navigate('Home') },
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#0055cc",
    margin: 5,
  },
  main: { flex: 1, alignItems: "center" },
  scroll: { flex: 1, backgroundColor: "#ddeeff", width: "100%" },
  scrollContainer: { alignItems: "center" },
  videoView: { width: "90%", height: 200 },
  btnContainer: { flexDirection: "row", justifyContent: "center" },
  head: { fontSize: 20 },
});

export default Home;
