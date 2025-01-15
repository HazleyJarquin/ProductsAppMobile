import { useForm, Controller } from "react-hook-form";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { IProduct } from "../../../../interfaces/IProduct";
import { useProductStore } from "../../../../store/useProductsStore";
import { FormInput } from "../../../../components/FormInput";
import { ImagePicker } from "../../../../components/ImagePicker";
import { buttonStyles } from "../../../../styles/buttonStyles";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TRootStackParamList } from "../../../../types/navigation";

interface Props {
  productId?: string;
}

type AddProductFormCardScreenNavigationProp =
  NativeStackNavigationProp<TRootStackParamList>;
export const AddProductForm = ({ productId }: Props) => {
  const [show, setShow] = useState(false);
  const { addProduct, isEditing, getProductById, updateProduct } =
    useProductStore();

  const navigation = useNavigation<AddProductFormCardScreenNavigationProp>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProduct>({
    defaultValues: {
      name: isEditing ? getProductById(productId || "")?.name : "",
      expirationDate: isEditing
        ? getProductById(productId || "")?.expirationDate
        : "",
      id: isEditing ? getProductById(productId || "")?.id : "",
      image: isEditing ? getProductById(productId || "")?.image : "",
      price: isEditing ? getProductById(productId || "")?.price : undefined,
      quantity: isEditing
        ? getProductById(productId || "")?.quantity
        : undefined,
    },
  });

  const onSubmit = (data: IProduct) => {
    const id = Math.random().toString(36).substring(7);
    isEditing
      ? updateProduct(productId || "", data)
      : addProduct({
          ...data,
          id,
        });
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Controller
          control={control}
          name={"image"}
          rules={{ required: "Imagen es requerida" }}
          render={({ field: { onChange, value } }) => (
            <>
              <ImagePicker
                watchImage={value}
                sendImage={(image) => {
                  onChange(image);
                }}
              />
              {errors.image && (
                <Text style={styles.errorText}>
                  {errors.image?.message ? String(errors.image?.message) : ""}
                </Text>
              )}
            </>
          )}
        />

        <FormInput
          control={control}
          formKey="name"
          keyboardType="default"
          placeholder="Nombre del producto"
        />
        <Controller
          control={control}
          name="expirationDate"
          rules={{ required: "Fecha de expiración es requerida" }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text>Fecha de expiración</Text>

              {Platform.OS === "ios" ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  is24Hour={true}
                  onChange={(_event, date) => {
                    onChange(date?.toISOString().split("T")[0] || "");
                  }}
                />
              ) : (
                <>
                  {!value ? (
                    <Button onPress={() => setShow(true)}>
                      Seleccionar fecha
                    </Button>
                  ) : (
                    <TouchableOpacity onPress={() => setShow(true)}>
                      <Text style={{ marginLeft: 5 }}>{value}</Text>
                    </TouchableOpacity>
                  )}
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={value ? new Date(value) : new Date()}
                      mode="date"
                      is24Hour={true}
                      onChange={(_event, date) => {
                        onChange(date?.toISOString().split("T")[0] || "");
                        setShow(false);
                      }}
                      display="default"
                    />
                  )}
                </>
              )}
            </View>
          )}
        />

        <FormInput
          control={control}
          formKey="price"
          keyboardType="numeric"
          placeholder="Precio"
        />

        <FormInput
          control={control}
          formKey="quantity"
          keyboardType="numeric"
          placeholder="Cantidad"
        />

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={[buttonStyles.primary, styles.submitButton]}
        >
          <Text style={buttonStyles.primaryText}>Guardar</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    width: "100%",
    padding: 20,
  },
  formInput: {
    width: "100%",
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 20,
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  errorText: {
    color: "red",
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
  },
});
