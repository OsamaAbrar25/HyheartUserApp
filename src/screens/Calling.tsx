import React, { useEffect } from "react";
import { View } from "react-native";
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
  UIKitConfig,
} from "@zegocloud/zego-uikit-prebuilt-call-rn";
import { useSelector } from "react-redux";
import { AuthState } from "../store/slices/authSlice";

interface CallingProps {
  navigation: { navigate: (route: string) => void };
}

const appID = 1249344658;
const appSign =
  "2ed2bb743e506fe41e001c9a0db1bedb84a7134a6d6808ff544a640fdfa4d181";
const callID = (Math.random() * 10000000).toString();

const Calling: React.FC<CallingProps> = ({ navigation }) => {
  const userdata = useSelector(
    (state: { auth: AuthState }) => state.auth.userData
  );
  useEffect(() => {
    console.log(JSON.stringify(userdata));
  }, [userdata]);

  const config: UIKitConfig = {
    ...ONE_ON_ONE_VOICE_CALL_CONFIG,
    onOnlySelfInRoom: () => {
      navigation.navigate("Home");
    },
    onHangUp: () => {
      navigation.navigate("Home");
    },
  };

  return (
    <View style={{ height: "100%" }}>
      {userdata && (
        <ZegoUIKitPrebuiltCall
          appID={appID}
          appSign={appSign}
          userID={userdata.id}
          userName={userdata.name}
          callID={callID}
          config={config}
        />
      )}
    </View>
  );
};

export default Calling;
