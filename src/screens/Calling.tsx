import React, { useEffect } from "react";
import { View } from "react-native";
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
  UIKitConfig,
} from "@zegocloud/zego-uikit-prebuilt-call-rn";
import { useSelector } from "react-redux";
import { AuthState } from "../store/slices/authSlice";
import { APP_ID, APP_SIGN } from "../constants";

interface CallingProps {
  navigation: { navigate: (route: string) => void };
}

// const callID = (Math.random() * 10000000).toString();
const callID = "123";

const Calling: React.FC<CallingProps> = ({ navigation }) => {

  const userdata = useSelector((state: { auth: AuthState }) => state.auth.userData);
  // const callID = useSelector((state: any) => state.auth.callId);

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
      {userdata && callID && (
        <ZegoUIKitPrebuiltCall
          appID={APP_ID}
          appSign={APP_SIGN}
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
