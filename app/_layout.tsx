import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="cheat"
        options={{
          title: 'Cheat Mode',
          headerStyle: { backgroundColor: '#0D0D1A' },
          headerTintColor: '#FFCB05',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitle: 'Quiz',
        }}
      />
    </Stack>
  );
}
