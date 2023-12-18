import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import Header from "../../components/Header";
import { Button, ListItem } from "@rneui/themed";
import { useGetCreditHistoryQuery, useGetTotalCreditQuery } from "../../apis/user";

interface CreditHistoryProps {
  navigation: any;
}

const CreditHistory: React.FC<CreditHistoryProps> = ({ navigation }) => {

  const creditHistoryRes = useGetCreditHistoryQuery();
  const totalCreditRes = useGetTotalCreditQuery();

  return (
    <View>
      <Header title={"Credit History"} />
      <View style={{ padding: 10 }}>
        <View
          style={{
            backgroundColor: "#5E449B",
            padding: 16,
            borderRadius: 15,
            gap: 6,
          }}
        >
          {
            totalCreditRes.isSuccess &&
            <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "black", flexDirection: "row" }}>
              <Image resizeMode="contain" source={require('../../assets/images/coin.png')} style={{ width: 20, marginRight: 4 }} />
              <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
                {totalCreditRes.data.creditsAfter.toFixed(1)}
              </Text>
            </View>
          }

          <Text style={{ textAlign: "center", color: "white", fontSize: 11 }}>
            Total Credits Balance
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button
              size={"sm"}
              buttonStyle={{
                paddingHorizontal: 20,
                backgroundColor: "#FADD9A",
              }}
              containerStyle={{ borderRadius: 50 }}
              titleStyle={{ fontSize: 10, color: "black" }}
              title={"Buy Credits"}
            />
          </View>
        </View>
        <View style={{ marginVertical: 32 }}>
          {/* <Text style={{ marginBottom: 8, color: "gray" }}>02 Nov, 2023</Text> */}
          {creditHistoryRes.isSuccess &&
            <FlatList
              data={creditHistoryRes.data}
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
                      {
                        (item.creditsAfter > item.creditsBefore)
                          ?
                          <ListItem.Title style={{ fontWeight: "700", fontSize: 12 }}>
                            Credit
                          </ListItem.Title>
                          :
                          <ListItem.Title style={{ fontWeight: "700", fontSize: 12 }}>
                            Debit
                          </ListItem.Title>
                      }

                      <ListItem.Subtitle style={{ fontSize: 11 }}>
                        {item.created_at}
                      </ListItem.Subtitle>
                    </View>
                    {
                      (item.creditsAfter > item.creditsBefore)
                        ?
                        <ListItem.Subtitle>+{item.creditsChange}</ListItem.Subtitle>
                        :
                        <ListItem.Subtitle>{item.creditsChange}</ListItem.Subtitle>
                    }
                  </ListItem.Content>
                </ListItem>
              )}
              keyExtractor={(item) => item.id}
            />
          }

        </View>
      </View>
    </View>
  );
};

export default CreditHistory;
