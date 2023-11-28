import React, { useEffect, useState } from 'react'
import { View, Button, Text } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const SignIn = ({ navigation }) => {

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '464645337735-ffkhbmdnod8uc9084pvtj0di82ins1tk.apps.googleusercontent.com',
        });
    }, []);

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
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            // await auth().signInWithCredential(googleCredential);
            const user = auth().currentUser;

            const response = await auth().signInWithCredential(googleCredential)
            .then( (result) => {
                result.user
                .getIdToken()
                .then((token) => {
                    console.log("Token:", token);
                    
                })
            });
            // const token = await user?.getIdToken();
            // console.log(JSON.stringify(token));
            
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
        <View>
            {user ?
                navigation.navigate("MainStack")
                :
                <Button title="Sign in with Google" onPress={onGoogleSignIn} />
            }
        </View>
    );
}

export default SignIn