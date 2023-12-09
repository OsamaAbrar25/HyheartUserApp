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
import { useUpdateCallHistoryMutation } from "../apis/user";

interface CallingProps {
    navigation: { navigate: (route: string) => void };
}

// const callID = (Math.random() * 10000000).toString();


const Calling: React.FC<CallingProps> = ({ navigation }) => {

    const [updateCallHistory, updateCallHistoryRes] = useUpdateCallHistoryMutation();

    const userdata = useSelector((state: { auth: AuthState }) => state.auth.userData);
    const callHistoryId = useSelector((state: { auth: AuthState }) => state.auth.callHistoryId);
    const duration = useSelector((state: { auth: AuthState }) => state.auth.duration);
    const callID = "123";
    // const callID = useSelector((state: any) => state.auth.callId);

    // console.log("🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣🤣", callHistoryId);


    // useEffect(() => {
    //     // console.log(JSON.stringify(userdata));
        
    // }, [callHistoryId]);

    const config: UIKitConfig = {
        ...ONE_ON_ONE_VOICE_CALL_CONFIG,
        onOnlySelfInRoom: () => {
            navigation.navigate("Home");
        },
        onHangUp: () => {
            console.log("😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁😁❤️");
            
            navigation.navigate("Home");
            if (callHistoryId) {
                updateCallHistory(
                    {
                        id: callHistoryId,
                        status: "CONNECTED",
                        duration: duration,
                    })
            }
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
