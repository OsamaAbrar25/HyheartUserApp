import React from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { ListItem } from '@rneui/themed';
import { useGetCallHistoryQuery } from '../../apis/user';
import moment from "moment";

interface CallHistoryProps {
  navigation: any
}

const CallHistory: React.FC<CallHistoryProps> = ({ navigation }) => {

  const callHistoryRes = useGetCallHistoryQuery();

  const formatTime = (seconds) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
      return "Invalid input. Please provide a numeric value.";
    }

    // Calculate minutes and remaining seconds
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    // Format the result
    var formattedTime = minutes + " min " + remainingSeconds + " sec";

    return formattedTime;
  }

  return (
    <View>
      <Header title={"Call History"} />
      <View style={{ padding: 10, height: '100%', justifyContent: 'center' }}>

        {callHistoryRes.isLoading && <ActivityIndicator size="large" />}

        {callHistoryRes.isSuccess &&
          <FlatList
            data={callHistoryRes.data.filter((item) => item.status === "COMPLETED")}
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
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Image resizeMode="contain" source={require('../../assets/images/call.png')} style={{ width: 16, height: 16 }} />
                    <View>
                      <ListItem.Title style={{ fontWeight: "700", fontSize: 12 }}>
                        {item.receiver.firstName}
                      </ListItem.Title>
                      <ListItem.Subtitle style={{ fontSize: 11 }}>
                        {moment(item.created_at).format('lll')}
                      </ListItem.Subtitle>
                    </View>
                  </View>
                  <ListItem.Subtitle>{formatTime(item.duration)}</ListItem.Subtitle>
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
