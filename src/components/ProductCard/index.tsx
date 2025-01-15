import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Text,
  IconButton,
  Button,
} from "react-native-paper";
import { IProduct } from "../../interfaces/IProduct";
import { useProductStore } from "../../store/useProductsStore";
import { Modal } from "../Modal";
import { buttonStyles } from "../../styles/buttonStyles";
import { TRootStackParamList } from "../../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { DeleteProductModal } from "./components/DeleteProductModal";

interface Props {
  product: IProduct;
}

type ProductCardScreenNavigationProp = NativeStackNavigationProp<
  TRootStackParamList,
  "Products"
>;

export const ProductCard = ({ product }: Props) => {
  const [showAlert, setShowAlert] = useState(false);
  const { deleteProduct, setIsEditing } = useProductStore();
  const navigation = useNavigation<ProductCardScreenNavigationProp>();

  const handleDelete = (id: string) => {
    deleteProduct(id);
  };
  return (
    <>
      {showAlert && (
        <DeleteProductModal
          product={product}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          handleDelete={handleDelete}
        />
      )}
      <Card style={styles.card}>
        <Card.Cover source={{ uri: product.image }} />
        <Card.Content>
          <Title>{product.name}</Title>
          <View style={styles.detailsContainer}>
            <Paragraph style={styles.price}>
              Precio: ${Number(product.price).toFixed(2)}
            </Paragraph>
            <Paragraph>Cantidad: {product.quantity}</Paragraph>
          </View>
          <Text style={styles.expirationDate}>
            Fecha de caducidad: {product.expirationDate}
          </Text>

          <View style={styles.buttonActions}>
            <IconButton
              icon="pencil"
              onPress={() => {
                setIsEditing(true);
                navigation.navigate("EditProduct", {
                  id: product.id,
                });
              }}
              iconColor="blue"
              size={25}
              style={{ alignSelf: "flex-end" }}
            />
            <IconButton
              icon="delete"
              onPress={() => {
                setShowAlert(true);
              }}
              iconColor="red"
              size={25}
              style={{ alignSelf: "flex-end" }}
            />
          </View>
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    elevation: 4,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  price: {
    fontWeight: "bold",
  },
  expirationDate: {
    marginTop: 8,
    color: "gray",
  },

  buttonActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
