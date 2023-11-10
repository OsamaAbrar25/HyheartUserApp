import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header';
import { ListItem } from '@rneui/themed';
import { ChevronRight, UserCircle2Icon } from 'lucide-react-native';

const Settings = () => {
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Header title={"Settings"} />

      <View style={{paddingHorizontal: 32, paddingVertical: 16}}>

        <ListItem
          bottomDivider
          style={{
            paddingVertical: 4,
          }}>
          <UserCircle2Icon color={'black'} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
              My Profile
            </ListItem.Title>
          </ListItem.Content>

          <ChevronRight color='silver' size={"18"} />
        </ListItem>

        <ListItem
          bottomDivider
          style={{
            paddingVertical: 4,
          }}>
          <UserCircle2Icon color={'black'} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
              Credit History
            </ListItem.Title>
          </ListItem.Content>

          <ChevronRight color='silver' size={"18"}/>
        </ListItem>

        <ListItem
          bottomDivider
          style={{
            paddingVertical: 4,
          }}>
          <UserCircle2Icon color={'black'} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
              Call History
            </ListItem.Title>
          </ListItem.Content>

          <ChevronRight color='silver' size={"18"} />
        </ListItem>

        <ListItem
          bottomDivider
          style={{
            paddingVertical: 4,
          }}>
          <UserCircle2Icon color={'black'} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
              Invite
            </ListItem.Title>
          </ListItem.Content>

          <ChevronRight color='silver' size={"18"}/>
        </ListItem>

        <ListItem
          bottomDivider
          style={{
            paddingVertical: 4,
          }}>
          <UserCircle2Icon color={'black'} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
              Privacy Policy
            </ListItem.Title>
          </ListItem.Content>

          <ChevronRight color='silver' size={"18"} />
        </ListItem>

        <ListItem
          bottomDivider
          style={{
            paddingVertical: 4,
          }}>
          <UserCircle2Icon color={'black'} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
              Terms & Conditions
            </ListItem.Title>
          </ListItem.Content>

          <ChevronRight color='silver' size={"18"}/>
        </ListItem>

        <ListItem
          bottomDivider
          style={{
            paddingVertical: 4,
          }}>
          <UserCircle2Icon color={'black'} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: '700', fontSize: 14 }}>
              App Info
            </ListItem.Title>
          </ListItem.Content>

          <ChevronRight color='silver' size={"18"}/>
        </ListItem>

      </View>

    </View>
  );
};

export default Settings;
