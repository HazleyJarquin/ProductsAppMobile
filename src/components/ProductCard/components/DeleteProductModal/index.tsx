import { StyleSheet, View } from "react-native";
import { IProduct } from "../../../../interfaces/IProduct";
import { Modal } from "../../../Modal";
import { Button, Text } from "react-native-paper";
import { buttonStyles } from "../../../../styles/buttonStyles";

interface Props {
  product: IProduct;
  showAlert: boolean;
  setShowAlert: (show: boolean) => void;
  handleDelete: (id: string) => void;
}

export const DeleteProductModal = ({
  product,
  setShowAlert,
  showAlert,
  handleDelete,
}: Props) => {
  return (
    <Modal
      visible={showAlert}
      hideModal={() => setShowAlert(false)}
      contentContainerStyle={styles.modalContainer}
    >
      <View>
        <Text style={{ textAlign: "center", padding: 10 }}>
          ¿Estás seguro de que deseas eliminar este producto?
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button
            mode="contained"
            style={buttonStyles.danger}
            onPress={() => setShowAlert(false)}
          >
            Cancelar
          </Button>
          <Button
            mode="contained"
            style={buttonStyles.primary}
            onPress={() => {
              handleDelete(product.id);
              setShowAlert(false);
            }}
          >
            Confirmar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: "90%",
    margin: "auto",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
});
