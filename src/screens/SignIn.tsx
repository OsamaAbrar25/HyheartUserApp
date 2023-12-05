import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button } from "@rneui/themed";
import {
    GoogleSignin,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useValidateFirebaseTokenMutation } from "../apis/user";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { storeJwt, storeUserData } from "../store/slices/authSlice";

const SignIn = ({ navigation }) => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const [validateFirebaseToken, validateFirebaseTokenRes] = useValidateFirebaseTokenMutation();
    const dispatch = useDispatch();
    const jwt2 = useSelector((state) => state.auth.jwt);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                "464645337735-ffkhbmdnod8uc9084pvtj0di82ins1tk.apps.googleusercontent.com",
        });
    }, []);

    useEffect(() => {
        if (validateFirebaseTokenRes.isSuccess) {
            dispatch(storeJwt(validateFirebaseTokenRes.data.jwt));
            console.log("JWT333😊" + JSON.stringify(validateFirebaseTokenRes.data.jwt));
        }
    }, [validateFirebaseTokenRes.isSuccess]);

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const onGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(
                userInfo.idToken
            );

            const response = await auth().signInWithCredential(googleCredential);

            dispatch(storeUserData({
                name: response.user.displayName,
                photoURL: response.user.photoURL,
                email: response.user.email,
            }))

            // });

            const token = await response.user.getIdToken();
            const validateTokenResponse = await validateFirebaseToken({ token });
            //   console.log("00000000000000000000000000", token);
            console.log("🍎🍎 ", JSON.stringify(validateTokenResponse));
            if (validateTokenResponse.data) {
                dispatch(storeJwt(validateTokenResponse.data.jwt));
                console.log("JWT333333333333333333333😊 " + JSON.stringify(jwt2));
            } else {
                console.error("Failed to validate Firebase token");
            }

            // console.log(JSON.stringify(response.user.getIdTokenResult()));
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // User canceled the sign-in process
                console.log(error);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // Operation (e.g., sign in) is in progress already
                console.log(error);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // Play services not available or outdated
                console.log(error);
            } else {
                // Some other error happened
                console.log(error);
            }
        }
    };

    if (initializing) return null;

    return (
        <View
            style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
        >
            {user ? (
                navigation.reset({
                    index: 0,
                    routes: [{ name: "MainTabNavigator" }],
                })
            ) : (
                <Button
                    ViewComponent={LinearGradient} // Don't forget this!
                    linearGradientProps={{
                        colors: ["#FF84A7", "#E03368"],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                    buttonStyle={{ width: 200, borderRadius: 4 }}
                    title="Sign in with Google"
                    onPress={onGoogleSignIn}
                />
            )}
        </View>
    );
};

export default SignIn;
