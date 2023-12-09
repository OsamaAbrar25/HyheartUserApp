import React from "react";
import { Text, View } from "react-native";
import { Button, ButtonProps } from "@rneui/themed";

interface HeaderProps {
  title: string;
  navigation: {
    navigate: (route: string) => void;
  };
}

const Header: React.FC<HeaderProps> = ({ title, navigation }) => {
  const buttonProps: ButtonProps = {
    size: "sm",
    buttonStyle: {
      paddingHorizontal: 20,
      backgroundColor: "#5E449B",
    },
    containerStyle: {
      borderRadius: 50,
    },
    titleStyle: {
      fontSize: 10,
    },
    title: "Buy Credits",
    onPress: () => navigation.navigate("BuyCredits"),
  };

  return (
    <View
      style={{
        padding: 16,
        backgroundColor: "#FADD9A",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "700", color: "black" }}>{title}</Text>
      {/* <Button {...buttonProps} /> */}
    </View>
  );
};

export default Header;
