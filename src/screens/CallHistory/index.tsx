import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Header from '../../components/Header';
import { ListItem } from '@rneui/themed';
import { useGetCallHistoryQuery } from '../../apis/user';

interface CallHistoryProps {
  navigation: any
}

const CallHistory: React.FC<CallHistoryProps> = ({ navigation }) => {

  const callHistoryRes = useGetCallHistoryQuery();

  return (
    <View>
      <Header title={"Call History"} />
      <View style={{ padding: 10 }}>

        <ListItem
          containerStyle={{ borderRadius: 6 }}
          style={{
            paddingVertical: 4,
          }}
        >
          <ListItem.Content
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <ListItem.Title style={{ fontWeight: "700", fontSize: 12 }}>
                Provider Name
              </ListItem.Title>
              <ListItem.Subtitle style={{ fontSize: 11 }}>
                09:32 PM
              </ListItem.Subtitle>
            </View>
            <ListItem.Subtitle>24:43</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>

        {callHistoryRes.isSuccess &&
          <FlatList
            data={callHistoryRes.data}
            renderItem={({ item }) => (
              <ListItem
                containerStyle={{ borderRadius: 6 }}
                style={{
                  paddingVertical: 4,
                }}
              >
                <ListItem.Content
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <ListItem.Title style={{ fontWeight: "700", fontSize: 12 }}>
                      Credit
                    </ListItem.Title>
                    <ListItem.Subtitle style={{ fontSize: 11 }}>
                      09:32 PM
                    </ListItem.Subtitle>
                  </View>
                  <ListItem.Subtitle>+12</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )}
            keyExtractor={(item) => item.id}
          />
        }

      </View>
    </View>
  );
};

export default CallHistory;
