import {Avatar, Button} from '@rneui/themed';
import React from 'react';
import {View, Text} from 'react-native';

const Home = () => {
  return (
    <View style={{backgroundColor: 'red'}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', gap: 16, alignItems: 'center'}}>
          <Avatar
            rounded
            // showEditButton
            size={'medium'}
            source={{
              uri: 'https://randomuser.me/api/portraits/men/96.jpg',
            }}
          />
          <View>
            <Text>Hi! Osama</Text>
            <Text style={{fontSize: 12}}>Your Credits: 12</Text>
          </View>
        </View>
        <Button
          size={'sm'}
          buttonStyle={{paddingHorizontal: 20}}
          containerStyle={{borderRadius: 50}}>
          Buy Credits
        </Button>
      </View>
    </View>
  );
};

export default Home;
