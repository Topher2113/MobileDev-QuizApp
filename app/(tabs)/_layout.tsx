import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFCB05',
        tabBarInactiveTintColor: '#8A8AAA',
        tabBarStyle: {
          backgroundColor: '#0D0D1A',
          borderTopColor: '#1A1A2E',
          borderTopWidth: 1,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Quiz',
          tabBarIcon: ({ color }) => (
            <Ionicons name="help-circle" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
