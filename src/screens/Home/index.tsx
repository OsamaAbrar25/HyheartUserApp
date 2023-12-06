import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button, ListItem, Avatar } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome6";
import auth from "@react-native-firebase/auth";
import * as ZIM from "zego-zim-react-native";
import * as ZPNs from "zego-zpns-react-native";
import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
} from "@zegocloud/zego-uikit-prebuilt-call-rn";
import {
  useGetZegoTokenQuery,
  useGetProvidersQuery,
  useGetProfileQuery,
} from "../../apis/user";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { AuthState, storeUserData } from "../../store/slices/authSlice";

interface HomeProps {
  navigation: any;
}

const appID = 1249344658;
const appSign =
  "2ed2bb743e506fe41e001c9a0db1bedb84a7134a6d6808ff544a640fdfa4d181";

const Home: React.FC<HomeProps> = ({ navigation }) => {

  const dispatch = useDispatch();
  const userdata = useSelector((state: { auth: AuthState }) => state.auth.userData);
  console.log("🔴" + JSON.stringify(userdata));

  const userID: string = userdata.id;
  // const userID = longUserID.substring(5); //! JUGAAD

  const name = useSelector((state: RootState) => state.auth.userData.name);
  const photoURL = useSelector((state: RootState) => state.auth.userData.photoURL);
  const jwt = useSelector((state: RootState) => state.auth.jwt);
  const userName = userdata.name;

  const response = useGetZegoTokenQuery();
  const providersListRes = useGetProvidersQuery();
  const { data, isLoading, isSuccess } = useGetProfileQuery();

  const handleLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };
  useEffect(() => {
    if (data) {
      dispatch(
        storeUserData({
          name: data.firstName,
          photoURL: data.pfp,
          id: data.id.substring(0, 8),
          // email: res.data.email,
        })
      );
      userdata && console.log("😂" + JSON.stringify(userdata));
    }
  }, [data, isLoading]);

  // useEffect(() => {
  //   try {
  //     userdata &&
  //       ZegoUIKitPrebuiltCallService.init(
  //         appID, // You can get it from ZEGOCLOUD's console
  //         appSign, // You can get it from ZEGOCLOUD's console
  //         userID, // It can be any valid characters, but we recommend using a phone number.
  //         userName,
  //         [ZIM, ZPNs],
  //         {
  //           ringtoneConfig: {
  //             incomingCallFileName: "rutu.mp3",
  //             outgoingCallFileName: "ringing.mp3",
  //           },
  //           notifyWhenAppRunningInBackgroundOrQuit: true,
  //           androidNotificationConfig: {
  //             channelID: "AudioChannel",
  //             channelName: "CC",
  //           },
  //         }
  //       );
  //   } catch (error) {
  //     console.error("Error initializing ZegoUIKitPrebuiltCallService:", error);
  //   }
  // }, [data]);

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
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Avatar
            rounded
            size={"medium"}
            avatarStyle={{ borderWidth: 3, borderColor: "white" }}
            source={{ uri: data?.pfp }}
          />
          <View>
            <Text style={styles.boldText}>Hi! {data?.firstName}</Text>
            <Text style={styles.greyText}>Your Credits: {0}</Text>
          </View>
        </View>
        <Button
          size={"sm"}
          buttonStyle={styles.buyCreditsButton}
          containerStyle={styles.buyCreditsContainer}
          titleStyle={styles.buyCreditsTitle}
          title={"Buy Credits"}
          onPress={() => handleLogout()}
        />
      </View>

      <View style={styles.activeUsers}>
        <Text style={styles.boldText}>Active Users</Text>
      </View>
      {providersListRes.isSuccess && (
        <FlatList
          data={providersListRes.data}
          renderItem={({ item }) => (
            <ListItem
              style={{
                paddingVertical: 0,
              }}
            >
              <Avatar
                rounded
                source={{ uri: item.pfp }}
                avatarStyle={{ borderWidth: 3, borderColor: "gold" }}
                size={50}
              />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "700", fontSize: 14 }}>
                  {item.firstName}
                </ListItem.Title>
                <ListItem.Subtitle style={{ fontSize: 11 }}>
                  {item.gender}M | {item.dob}18-25 Years
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
                    userID: `${item.id}`,
                    userName: `${item.firstName}`,
                  },
                ]}
                isVideoCall={false}
                resourceID={"zego_data"} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
              />
            </ListItem>
          )}
          keyExtractor={(item) => item.id}
        />
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FADD9A",
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  boldText: {
    fontWeight: "bold",
    color: "black",
  },
  greyText: {
    fontSize: 12,
    color: "gray",
  },
  buyCreditsButton: {
    paddingHorizontal: 20,
    backgroundColor: "#5E449B",
  },
  buyCreditsContainer: {
    borderRadius: 50,
  },
  buyCreditsTitle: {
    fontSize: 10,
  },
  activeUsers: {
    paddingHorizontal: 16,
  },
  listItem: {
    paddingVertical: 0,
  },
});

export default Home;
