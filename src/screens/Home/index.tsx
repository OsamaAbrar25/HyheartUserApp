import { Avatar, Button, ListItem } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
} from 'react-native-agora';

const appId = '85f097aec84b4d4b8819209632c45e93';
const channelName = 'General';
const token = '007eJxTYJj0fle9Rsy6PP8bXEHbLqflrz/4+NgmkXrDMC4RZ9EPJ2IUGCxM0wwszRNTky1MkkxSTJIsLAwtjQwszYyNkk1MUy2NLxUFpzYEMjIYvlViYIRCEJ+dwT01L7UoMYeBAQCp/h/Z';
const uid = 0;

const getPermission = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
  }
};

const Home = ({ navigation }) => {

  const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user

  useEffect(() => {
    // Initialize Agora engine when the app starts
    setupVoiceSDKEngine();
  });

  const setupVoiceSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') { await getPermission() };
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
      });
      agoraEngine.initialize({
        appId: appId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };


  function showMessage(msg: string) {
    setMessage(msg);
  }

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FADD9A',
          marginBottom: 16,
        }}>
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <Avatar
            rounded
            // showEditButton
            size={'medium'}
            avatarStyle={{ borderWidth: 3, borderColor: 'white' }}
            source={{
              uri: 'https://randomuser.me/api/portraits/men/96.jpg',
            }}
          />
          <View>
            <Text style={{ fontWeight: 'bold', color: 'black' }}>Hi! Osama</Text>
            <Text style={{ fontSize: 12, color: 'gray' }}>Your Credits: 12</Text>
          </View>
        </View>
        <Button
          size={'sm'}
          buttonStyle={{ paddingHorizontal: 20, backgroundColor: '#5E449B' }}
          containerStyle={{ borderRadius: 50 }}
          titleStyle={{ fontSize: 10 }}
          title={'Buy Credits'}
          onPress={() => navigation.navigate('BuyCredits')}
        />
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ color: 'black', fontWeight: '600' }}>Active Users</Text>
      </View>

      <ListItem
        style={{
          paddingVertical: 0,
        }}>
        <Avatar
          rounded
          source={{ uri: 'https://randomuser.me/api/portraits/women/53.jpg' }}
          avatarStyle={{ borderWidth: 3, borderColor: 'gold' }}
          size={50}
        // icon={{
        //   name: 'person-outline',
        //   type: 'material',
        //   size: 26,
        // }}
        // containerStyle={{ backgroundColor: '#c2c2c2' }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
            Vishesh Dubey
          </ListItem.Title>
          <ListItem.Subtitle style={{ fontSize: 11 }}>
            F | 16-22 Years
          </ListItem.Subtitle>
        </ListItem.Content>
        <Icon name="user-large" size={25} color="#5E449B" onPress={() => navigation.navigate('UserProfile')} />
        <Icon name="phone-volume" size={25} color="#7CFC00" style={{ marginLeft: 8 }} />
      </ListItem>

      <ListItem
        style={{
          paddingVertical: 0,
        }}>
        <Avatar
          rounded
          source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
          avatarStyle={{ borderWidth: 3, borderColor: 'gold' }}
          size={50}
        // icon={{
        //   name: 'person-outline',
        //   type: 'material',
        //   size: 26,
        // }}
        // containerStyle={{ backgroundColor: '#c2c2c2' }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
            Osama Abrar
          </ListItem.Title>
          <ListItem.Subtitle style={{ fontSize: 11 }}>
            M | 18-25 Years
          </ListItem.Subtitle>
        </ListItem.Content>
        <Icon name="user-large" size={25} color="#5E449B" onPress={() => navigation.navigate('UserProfile')} />
        <Icon name="phone-volume" size={25} color="#7CFC00" style={{ marginLeft: 8 }} />
      </ListItem>


      <SafeAreaView style={styles.main}>
        <View style={styles.btnContainer}>
          <Text onPress={join} style={styles.button}>
            Join
          </Text>
          <Text onPress={leave} style={styles.button}>
            Leave
          </Text>
        </View>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContainer}>
          {isJoined ? (
            <Text>Local user uid: {uid}</Text>
          ) : (
            <Text>Join a channel</Text>
          )}
          {isJoined && remoteUid !== 0 ? (
            <Text>Remote user uid: {remoteUid}</Text>
          ) : (
            <Text>Waiting for a remote user to join</Text>
          )}
          <Text>{message}</Text>
        </ScrollView>
      </SafeAreaView>

    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: { flex: 1, alignItems: 'center' },
  scroll: { flex: 1, backgroundColor: '#ddeeff', width: '100%' },
  scrollContainer: { alignItems: 'center' },
  videoView: { width: '90%', height: 200 },
  btnContainer: { flexDirection: 'row', justifyContent: 'center' },
  head: { fontSize: 20 },
});

export default Home;
