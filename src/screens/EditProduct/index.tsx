import { StyleSheet, View } from "react-native";

import { AddProductForm } from "../Products/components/AddProductForm";
import { TRootStackParamList } from "../../types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";

type EditProductScreenRouteProp = RouteProp<TRootStackParamList, "EditProduct">;
export const EditProductsPage = () => {
  const route = useRoute<EditProductScreenRouteProp>();
  const { id } = route.params;
  return (
    <View style={styles.container}>
      <AddProductForm productId={id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
