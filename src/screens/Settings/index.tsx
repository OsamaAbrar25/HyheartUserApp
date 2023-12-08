import React from "react";
import { View, ScrollView } from "react-native";
import { ListItem } from "@rneui/themed";
import { ChevronRight } from "lucide-react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../../components/Header";

interface SettingsProps {
  navigation: any;
}

const Settings: React.FC<SettingsProps> = ({ navigation }) => {
  const renderItem = (icon: string, title: string, onPress: () => void) => (
    <ListItem
      bottomDivider
      style={{
        paddingVertical: 4,
      }}
      onPress={onPress}
    >
      {icon === "FontAwesome6" ? (
        <Icon
          name={icon}
          size={25}
          color="#5E449B"
          style={{ marginRight: 8 }}
        />
      ) : (
        <Icon2
          name={icon}
          size={25}
          color="#5E449B"
          style={{ marginRight: 8 }}
        />
      )}
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "700", fontSize: 14 }}>
          {title}
        </ListItem.Title>
      </ListItem.Content>
      <ChevronRight color="silver" size={18} />
    </ListItem>
  );

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Header title={"Settings"} navigation={navigation} />
      <ScrollView style={{ paddingHorizontal: 32, paddingVertical: 16 }}>
        {renderItem("user-large", "My Profile", () =>
          navigation.navigate("Profile")
        )}
        {renderItem("credit-card-clock", "Credit History", () => { })}
        {renderItem("history", "Call History", () => { })}
        {renderItem("email-open", "Invite", () => { })}
        {renderItem("note-text", "Privacy Policy", () => { })}
        {renderItem("note-text", "Terms & Conditions", () => { })}
        {renderItem("information", "App Info", () => { })}
      </ScrollView>
    </View>
  );
};

export default Settings;
