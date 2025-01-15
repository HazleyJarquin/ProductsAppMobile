export type TRootStackParamList = {
  Home: undefined; // La pantalla Home no recibe parámetros
  Products: undefined; // La pantalla Products no recibe parámetros
  ProductById: { id: string }; // La pantalla ProductById recibe un parámetro llamado id de tipo string
  AddProduct: undefined; // La pantalla AddProduct no recibe parámetros
  EditProduct: { id: string }; // La pantalla EditProduct recibe un parámetro llamado id de tipo string
};
