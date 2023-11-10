import { Avatar, Button, ListItem } from '@rneui/themed';
import React from 'react';
import { View, Text } from 'react-native';
import { PhoneCall, UserCircle2 } from 'lucide-react-native';

const Home = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'red',
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
            <Text style={{ fontWeight: 'bold' }}>Hi! Osama</Text>
            <Text style={{ fontSize: 12 }}>Your Credits: 12</Text>
          </View>
        </View>
        <Button
          size={'sm'}
          buttonStyle={{ paddingHorizontal: 20, backgroundColor: 'purple' }}
          containerStyle={{ borderRadius: 50 }}
          titleStyle={{ fontSize: 10 }}
          title={'Buy Credits'}
        />
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ color: 'black', fontWeight: '600' }}>Active Users</Text>
      </View>

      <ListItem
        style={{
          paddingVertical: 4,
        }}>
        <Avatar
          rounded
          source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
          avatarStyle={{ borderWidth: 3, borderColor: 'red' }}
          icon={{
            name: 'person-outline',
            type: 'material',
            size: 26,
          }}
          containerStyle={{ backgroundColor: '#c2c2c2' }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
            Vishesh Dubey
          </ListItem.Title>
          <ListItem.Subtitle style={{ fontSize: 11 }}>
            F | 16-22 Years
          </ListItem.Subtitle>
        </ListItem.Content>
        <UserCircle2 color={'black'} onPress={() => navigation.navigate('UserProfile')} />
        <PhoneCall color={'black'} />
      </ListItem>

      <ListItem
        style={{
          paddingVertical: 4,
        }}>
        <Avatar
          rounded
          source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
          avatarStyle={{ borderWidth: 3, borderColor: 'red' }}
          icon={{
            name: 'person-outline',
            type: 'material',
            size: 26,
          }}
          containerStyle={{ backgroundColor: '#c2c2c2' }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
            Osama Abrar
          </ListItem.Title>
          <ListItem.Subtitle style={{ fontSize: 11 }}>
            M | 18-25 Years
          </ListItem.Subtitle>
        </ListItem.Content>
        <UserCircle2 color={'black'} />
        <PhoneCall color={'black'} />
      </ListItem>
    </View>
  );
};

export default Home;
