import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Main tab navigator — no header, tabs handle their own chrome */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Modal screen */}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />

        {/* Cheat screen — pushed as a Stack screen so the back button
            works automatically on both iOS (header + swipe) and Android
            (hardware back button). */}
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
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
