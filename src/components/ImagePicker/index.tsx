import { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePickerExpo from "expo-image-picker";
import { useProductStore } from "../../store/useProductsStore";

import Constants from "expo-constants";
interface Props {
  sendImage: (image: string) => void;
  watchImage?: string;
}

export const ImagePicker = ({ sendImage, watchImage }: Props) => {
  const { isEditing } = useProductStore();
  const [image, setImage] = useState<string | null>(
    isEditing ? watchImage ?? null : null
  );

  const apiKey = Constants.expoConfig?.extra?.apiKey;

  const pickImage = async () => {
    let result = await ImagePickerExpo.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    const apiUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;
    const formData = new FormData();

    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    const file = {
      uri,
      name: `image.${fileType}`,
      type: `image/${fileType}`,
    };

    formData.append("image", file as any);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data?.data?.url) {
        console.log("Imagen subida con éxito:", data.data.url);
        sendImage(data.data.url);
      } else {
        console.log("Error al subir la imagen:", data);
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.placeholderText}>
              Tap para seleccionar una imagen
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  imageContainer: {
    marginTop: 20,
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  placeholderText: {
    color: "#999",
    fontSize: 16,
    textAlign: "center",
  },
});
