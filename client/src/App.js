import FlippedJob from "components/form/FlippedJob";
import { AuthProvider } from "contexts/AuthContext";
import ScrollToTop from "routes/ScrollToTop";
import AppRoutes from "./routes";

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <AppRoutes />
    </AuthProvider>
    // <FlippedJob />
  );
}

export default App;
