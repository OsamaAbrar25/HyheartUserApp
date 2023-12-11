import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { Button, ListItem, Avatar } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome6";
import auth from "@react-native-firebase/auth";
import * as ZIM from "zego-zim-react-native";
import * as ZPNs from "zego-zpns-react-native";
import ZegoUIKitPrebuiltCallService, {
  ZegoSendCallInvitationButton,
} from "@zegocloud/zego-uikit-prebuilt-call-rn";
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
  UIKitConfig,
} from "@zegocloud/zego-uikit-prebuilt-call-rn";
import {
  useGetZegoTokenQuery,
  useGetProvidersQuery,
  useGetProfileQuery,
  useCreateCallMutation,
  useUpdateCallHistoryMutation,
} from "../../apis/user";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { AuthState, removeJwt, storeCallHistoryId, storeDuration, storeProviderCallId, storeUserData } from "../../store/slices/authSlice";
import { APP_ID, APP_SIGN } from "../../constants";

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {

  const [callID, setCallID] = useState('');
  const [duration, setDuration] = useState(0);

  const response = useGetZegoTokenQuery();
  const providersListRes = useGetProvidersQuery();
  const profileRes = useGetProfileQuery();
  const [createCall, createCallRes] = useCreateCallMutation();
  const [updateCallHistory, updateCallHistoryRes] = useUpdateCallHistoryMutation();

  const dispatch = useDispatch();
  const userdata = useSelector((state: { auth: AuthState }) => state.auth.userData);
  const userID: string = userdata.id;
  const name = useSelector((state: RootState) => state.auth.userData.name);
  const photoURL = useSelector((state: RootState) => state.auth.userData.photoURL);
  const jwt = useSelector((state: RootState) => state.auth.jwt);
  const userName = userdata.name;
  const callHistoryId = useSelector((state: { auth: AuthState }) => state.auth.callHistoryId);
  // const duration = useSelector((state: { auth: AuthState }) => state.auth.duration);

  // if (createCallRes.isSuccess) {
  //   console.log("😁😁😁❤️❤️❤️", JSON.stringify(createCallRes.data));
  // }

  console.log("😁😁😁❤️❤️❤️", jwt);

  const handleCall = () => {
    // console.log("🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️");
    createCall({
      recieverId: "31d5c34f-02e5-4ddb-8b47-94c88fcce95f"
    })
  }

  const handleLogout = async () => {
    try {
      await auth().signOut();
      dispatch(removeJwt())
      // return ZegoUIKitPrebuiltCallService.uninit()
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  // useEffect(() => {
  //   // console.log("😘😘😘😘😘😘😘😘😘😘😘😘😘😘😘", createCallRes.data);
  // }, [createCallRes.isSuccess])

  // const config: UIKitConfig = {
  //   ...ONE_ON_ONE_VOICE_CALL_CONFIG,
  //   onOnlySelfInRoom: () => {
  //     navigation.navigate("Home");
  //   },
  //   onHangUp: () => {
  //     console.log("😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁❤️");

  //     if (createCallRes.data.id) {
  //       const res = 
  //        updateCallHistory(
  //         {
  //           id: createCallRes.data.id,
  //           status: "CONNECTED",
  //           duration: duration,
  //         })
  //         console.log("❤️❤️❤️❤️❤️😘😘😘😘🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️",JSON.stringify(res));

  //     }
  //     navigation.navigate("Home");
  //   },
  // };

  useEffect(() => {
    if (createCallRes.isSuccess && callID) {
      // console.log("❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️");
      updateCallHistory(
        {
          id: createCallRes.data.id,
          status: "CONNECTED"
        })
      dispatch(storeCallHistoryId(createCallRes.data.id))
      dispatch(storeDuration(duration))
    }
  }, [createCallRes.isSuccess, callID])

  useEffect(() => {
    if (createCallRes.isSuccess && duration > 0) {
      updateCallHistory(
        {
          id: createCallRes.data.id,
          status: "CONNECTED",
          duration: duration,
        })
    }
  }, [createCallRes.isSuccess, duration])

  useEffect(() => {
    if (profileRes.data) {
      dispatch(
        storeUserData({
          name: profileRes.data.firstName,
          photoURL: profileRes.data.pfp,
          id: profileRes.data.id.substring(0, 8),
          // email: res.data.email,
        })
      );
      userdata && console.log("😂" + JSON.stringify(userdata));
    }
  }, [profileRes.data, profileRes.isLoading]);


  // useEffect(() => {
  try {
    ZegoUIKitPrebuiltCallService.init(
      APP_ID, // You can get it from ZEGOCLOUD's console
      APP_SIGN, // You can get it from ZEGOCLOUD's console
      userID, // It can be any valid characters, but we recommend using a phone number.
      userName,
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: "rutu.mp3",
          outgoingCallFileName: "ringing.mp3",
        },
        onOutgoingCallAccepted: (callID, invitee) => {
          console.log("💕Call Id: " + callID + ", 👌Invitee: " + JSON.stringify(invitee));
          setCallID("123");
        },
        requireConfig: (data) => {
          const callConfig = ONE_ON_ONE_VOICE_CALL_CONFIG;
          return {
            durationConfig: {
              isVisible: true,
              onDurationUpdate: (duration) => {
                console.log("🙌🙌🙌", data);
                setDuration(duration);
                if (duration === 0.1 * 60) {
                  ZegoUIKitPrebuiltCallService.hangUp();
                }
              },
            },
            ...callConfig,
            onHangUp: () => {
              console.log("🙌🙌🙌🙌🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️");
              navigation.navigate("Home");
            },
          };
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
  // }, []);


  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>

      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Avatar
            rounded
            size={"medium"}
            avatarStyle={{ borderWidth: 3, borderColor: "white" }}
            source={{ uri: profileRes.data?.pfp }}
          />
          <View>
            <Text style={styles.boldText}>Hi! {profileRes.data?.firstName}</Text>
            <Text style={styles.greyText}>Your Credits: {0}</Text>
          </View>
        </View>
        <Button
          size={"sm"}
          buttonStyle={styles.buyCreditsButton}
          containerStyle={styles.buyCreditsContainer}
          titleStyle={styles.buyCreditsTitle}
          title={"Buy Credits"}
          // onPress={() => handleLogout()}
          onPress={() => navigation.navigate("BuyCredits")}
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
              {/* <Button title='Call' onPress={() => {
                // const newInvitees = invitees.map((inviteeID) => {
                //   return { userID: inviteeID, userName: 'user_' + inviteeID };
                // });
                ZegoUIKitPrebuiltCallService
                  .sendCallInvitation(
                    [{
                      userID: `${item.id.substring(0, 8)}`,
                      userName: `${item.firstName}`,
                    }],
                    false,
                    navigation,
                    {
                      resourceID: 'zego_data',
                      timeout: 60,
                      callID: '123',
                      notificationTitle: 'Title',
                      notificationMessage: 'Message',
                      customData: '',
                    }
                  );
              }} /> */}
              <ZegoSendCallInvitationButton
                invitees={[
                  {
                    userID: `${item.id.substring(0, 8)}`,
                    userName: `${item.firstName}`,
                  },
                ]}
                isVideoCall={false}
                resourceID={"zego_data"} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
                onPressed={() => handleCall()}
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
