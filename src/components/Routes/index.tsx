import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../../screens/Home";
import { ProductsPage } from "../../screens/Products";
import { TRootStackParamList } from "../../types/navigation";
import { ProductById } from "../../screens/ProductById";
import { enableScreens } from "react-native-screens";
import { AddProductsPage } from "../../screens/AddProduct";
import { EditProductsPage } from "../../screens/EditProduct";
enableScreens();

export const Routes = () => {
  const Stack = createNativeStackNavigator<TRootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Products" component={ProductsPage} />
        <Stack.Screen name="ProductById" component={ProductById} />
        <Stack.Screen name="AddProduct" component={AddProductsPage} />
        <Stack.Screen name="EditProduct" component={EditProductsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
