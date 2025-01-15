import { StyleSheet, View } from "react-native";

import { AddProductForm } from "../Products/components/AddProductForm";

export const AddProductsPage = () => {
  return (
    <View style={styles.container}>
      <AddProductForm />
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
