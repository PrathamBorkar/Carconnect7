import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="s1" options={{ headerShown: false }} />
      <Stack.Screen name="s2" options={{ headerShown: false }} />
      <Stack.Screen name="s3" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;