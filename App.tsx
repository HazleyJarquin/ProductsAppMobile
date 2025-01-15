import { PaperProvider } from "react-native-paper";
import { Routes } from "./src/components/Routes";

export default function App() {
  return (
    <PaperProvider>
      <Routes />
    </PaperProvider>
  );
}
