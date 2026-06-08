import { Stack, Redirect } from "expo-router";


export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="entrarMissao" />
        <Stack.Screen name="cadastrarMissao" />
    </Stack>
  );
}