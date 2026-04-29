import { Slot, useRouter, useSegments } from "expo-router";
import { useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { authContext, AuthProvider } from "../context/AuthContext";
import { ReservasProvider } from "../context/ReservasContext";
import { SalasProvider } from "../context/SalasContext";

function RootNavigator() {
  const { sessao, usuarios } = useContext(authContext);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Se os usuários ainda não foram carregados do Storage, aguarda
    if (!usuarios) return;

    const estaNaAuth = segments[0] === "(auth)";

    if (!sessao && !estaNaAuth) {
      // Sem sessão e fora da pasta auth -> vai para Login
      router.replace("/(auth)/login");
    } else if (sessao && estaNaAuth) {
      // Com sessão e tentando entrar na pasta auth -> vai para Salas
      router.replace("/(tabs)/salas");
    }
  }, [sessao, segments, usuarios]);

  // Enquanto a lista de usuários ou a sessão estão sendo lidas do AsyncStorage
  if (!usuarios) {
    return (
      <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#262626" }}>
        <ActivityIndicator size="large" color="#F23064" />
      </View>
    );
  }

  return <Slot />;
}

export default function Layout() {
  return (
    <AuthProvider>
      <ReservasProvider>
        <SalasProvider>
          <RootNavigator />
        </SalasProvider>
      </ReservasProvider>
    </AuthProvider>
  );
}