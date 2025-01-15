import { StyleSheet, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Text } from "react-native-paper";
import { TRootStackParamList } from "../../types/navigation";
type ProductByIdScreenRouteProp = RouteProp<TRootStackParamList, "ProductById">;

export const ProductById = () => {
  const route = useRoute<ProductByIdScreenRouteProp>();
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text>{id}</Text>
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
});
