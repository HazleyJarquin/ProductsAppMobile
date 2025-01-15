import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import { AnimatedFAB, Button, FAB, Text } from "react-native-paper";
import { TRootStackParamList } from "../../types/navigation";
import { useProductStore } from "../../store/useProductsStore";
import { EmptyData } from "../../components/EmptyData";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ProductCard } from "../../components/ProductCard";
import Constants from "expo-constants";
type ProductsScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  "Products"
>;

export const ProductsPage = () => {
  const [isExtended, setIsExtended] = useState(true);
  const navigation = useNavigation<ProductsScreenNavigationProp>();
  const { products, setIsEditing } = useProductStore();

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <EmptyData message={"No hay productos"} />
      ) : (
        <FlatList
          onScroll={onScroll}
          style={styles.flatListContainer}
          data={products}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id}
        />
      )}

      <AnimatedFAB
        icon={"plus"}
        label={"Agregar producto"}
        extended={isExtended}
        onPress={() => {
          setIsEditing(false);
          navigation.navigate("AddProduct");
        }}
        visible={true}
        animateFrom={"right"}
        iconMode={"dynamic"}
        style={styles.fab}
      />
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
  fab: {
    position: "absolute",
    right: 18,
    bottom: 50,
    shadowColor: "transparent",
  },
  flatListContainer: {
    width: "100%",
    display: "flex",
    padding: 16,
  },

  modalContainer: {
    width: "90%",
    margin: "auto",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
});
