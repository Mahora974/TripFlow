import { Platform, StatusBar, Text, useColorScheme } from 'react-native';
import { Redirect, Stack, Tabs } from 'expo-router';

import { useSession } from '../../ctx';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

export default function AppLayout() {
  const colorScheme = useColorScheme();

    return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack>
      <Stack.Screen name="add" options={{ headerShown: false }} />
      <Stack.Screen name="update" options={{ headerShown: false }} />
    </Stack>
  </ThemeProvider>
  );
}
