import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() { 
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F23064', 
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#1a1a1a', 
          borderTopWidth: 0,        
          height: 60,               
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="salas"
        options={{
          title: 'Salas',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "grid" : "grid-outline"} size={24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="reservar"
        options={{
          title: 'Reservar',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "calendar" : "calendar-outline"} size={24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="disponibilidade"
        options={{
          href: null
        }}
      />
      
      <Tabs.Screen
        name="minhas-reservas"
        options={{
          title: 'Minhas Reservas',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "list" : "list-outline"} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}