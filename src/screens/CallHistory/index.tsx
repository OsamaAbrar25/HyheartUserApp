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
      <View style={{ padding: 10 }}>

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
                  <View>
                    <ListItem.Title style={{ fontWeight: "700", fontSize: 12 }}>
                      {item.receiver.firstName}
                    </ListItem.Title>
                    <ListItem.Subtitle style={{ fontSize: 11 }}>
                      {item.pickedAt}
                    </ListItem.Subtitle>
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
