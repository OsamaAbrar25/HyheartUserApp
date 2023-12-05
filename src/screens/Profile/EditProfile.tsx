import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Input } from "@rneui/themed";

interface EditProfileProps {
  // Define props here if required
}

const EditProfile: React.FC<EditProfileProps> = () => {
  return (
    <View style={{ height: "100%" }}>
      <View style={{ backgroundColor: "#FADD9A", padding: 16 }}>
        <Text style={{ fontWeight: "700" }}>Edit Profile</Text>
      </View>

      <ScrollView style={{ padding: 32 }}>
        <View style={{ alignItems: "center", marginBottom: 32 }}>
          <Avatar
            size={64}
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <Input
            placeholder="First Name"
            inputStyle={style.inputContainer}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            containerStyle={{ width: "50%" }}
          />

          <Input
            placeholder="Last Name"
            inputStyle={style.inputContainer}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            containerStyle={{ width: "50%" }}
          />
        </View>

        <Input
          placeholder="Date of Birth"
          inputStyle={style.inputContainer}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />

        <Input
          placeholder="Gender"
          inputStyle={style.inputContainer}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />

        <Input
          placeholder="Languages"
          inputStyle={style.inputContainer}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />

        <Input
          placeholder="City"
          inputStyle={style.inputContainer}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />

        <Input
          placeholder="State"
          inputStyle={style.inputContainer}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />

        <Input
          placeholder="Country"
          inputStyle={style.inputContainer}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />

        <Input
          placeholder="Bio"
          inputStyle={style.inputContainer}
          inputContainerStyle={{ borderBottomWidth: 0 }}
        />
      </ScrollView>

      <View style={{ alignItems: "center", marginBottom: 32 }}>
        <Button
          size={"md"}
          buttonStyle={{ backgroundColor: "#5E449B" }}
          containerStyle={{ borderRadius: 50, width: 250 }}
          titleStyle={{ fontSize: 14 }}
          title={"UPDATE"}
          // onPress={() => navigation.navigate('EditProfile')}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "gray",
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
});

export default EditProfile;
