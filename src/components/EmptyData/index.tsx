import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  message: string;
}

export const EmptyData = ({ message }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
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
  message: {
    fontSize: 24,
    color: "#000000",
    fontWeight: "bold",
  },
});
