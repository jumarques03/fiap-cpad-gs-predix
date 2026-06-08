import { Slot, useRouter, useSegments } from "expo-router";
import { useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { authContext, AuthProvider } from "../context/AuthContext";
import { MissionProvider } from "../context/MissionContext";

function RootNavigator() {
  const { sessao, usuarios } = useContext(authContext);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!usuarios) return;

    const estaNaAuth = segments[0] === "(auth)";

    if (!sessao && !estaNaAuth) {
      router.replace("/(auth)/login");
    } else if (sessao && estaNaAuth) {
      router.replace("/(mission)/entrarMissao");
    }
  }, [sessao, segments, usuarios]);

  if (usuarios === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#311f7b" }}>
        <ActivityIndicator size="large" color="#4030f2" />
      </View>
    );
  }

  return <Slot/>;
}

export default function Layout() {
  return (
    <AuthProvider>
      <MissionProvider>
        <RootNavigator/>
      </MissionProvider>
    </AuthProvider>
  );
}