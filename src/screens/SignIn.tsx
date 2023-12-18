import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Input, Button  } from '@rneui/themed';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useValidateFirebaseTokenMutation, useValidateMutation } from "../apis/user";
import { useDispatch, useSelector } from "react-redux";
import { storeJwt, storeUserData } from "../store/slices/authSlice";

const SignIn: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | undefined>();
  const [validateFirebaseToken] = useValidateFirebaseTokenMutation();
  const jwt = useSelector((state: any) => state.auth.jwt);
  const [responseState, setResponseState] = useState<string[]>([])
  const [text, setText] = useState('')
  const [validate, validateRes] = useValidateMutation()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "464645337735-ffkhbmdnod8uc9084pvtj0di82ins1tk.apps.googleusercontent.com",
    });
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber();
  }, []);

  // console.log(validateRes);

  useEffect(() => {
    console.log("🔴" + token);
    if (!initializing && token) {
      handleFirebaseTokenValidation();
    }
  }, [token]);

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  // const handleLB = () => {
  //   validate({email: text})
  //   // console.log(text);

  // }

  if (validateRes.isSuccess) {
    dispatch(storeJwt(validateRes.data.jwt))
  }

  const onGoogleSignIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );
      const response = await auth().signInWithCredential(googleCredential);
      const tokenres = await response.user.getIdToken();
      if (tokenres) {
        setResponseState((prev) => [...prev, tokenres])
        setToken(tokenres);
        setLoading(false);
        console.log("🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️🤷‍♂️", tokenres);

      }
    } catch (error) {
      console.log(error);
      setResponseState((prev) => [...prev, JSON.stringify(error)])
    }
  };

  const handleFirebaseTokenValidation = async () => {
    try {
      const res = await validateFirebaseToken({ token });
      setResponseState((prev) => [...prev, JSON.stringify(res)])
      if (res.data) {
        console.log("😂" + JSON.stringify(res.data));
        dispatch(storeJwt(res.data.token));

        jwt && console.log("😂" + jwt);
      } else {
        console.error("Failed to validate Firebase token");
        setResponseState((prev) => [...prev, "Failed to validate Firebase token"])
      }
    } catch (error) {
      console.error("Error while validating Firebase token", error);
      setResponseState((prev) => [...prev, JSON.stringify(error)])
    }
  };

  if (initializing) return null;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{ height: "100%", paddingVertical: 100, justifyContent: "flex-end", alignItems: "center" }}
      >
        {/* {responseState.map(item => <Text style={{ color: "black" }}>{item}</Text>)} */}
        {!jwt ? (
          <>
            <Button
              title="Continue with Google"
              loading={loading}
              onPress={onGoogleSignIn}
              icon={ <Image resizeMode="contain" source={require('../assets/images/google.png')} style={{width: 30}} />}
              buttonStyle={{ borderRadius: 30, width: 300, height: 40, backgroundColor: 'rgba(255, 193, 7, 1)' }}
            />
          </>
        ) : (
          navigation.reset({
            index: 0,
            routes: [{ name: "MainTabNavigator" }],
          })
        )}
        {/* <Text style={{ color: "black" }}>JWT: {jwt}</Text> */}
        {/* <DisplayAsyncStorageValues /> */}
      </View>
    </ScrollView>
  );
};

export default SignIn;

