import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { TRootStackParamList } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { buttonStyles } from "../../styles/buttonStyles";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  "Home"
>;
export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Bienvenido a mi App</Text>
      <Button
        style={buttonStyles.primary}
        onPress={() => navigation.navigate("Products")}
      >
        <Text style={buttonStyles.primaryText}>Ver productos</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 24,
    marginBottom: 16,
    color: "#000000",
    fontWeight: "bold",
  },
});
