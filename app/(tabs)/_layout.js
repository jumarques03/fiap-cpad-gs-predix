import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() { 
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5826e0', 
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#030d1d', 
          borderTopWidth: 0,        
          height: 60,               
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="principal"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <Ionicons name={"stats-chart-outline"} size={24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="energia"
        options={{
          title: 'Combustível e Energia',
          tabBarIcon: ({ color }) => (
            <Ionicons name={"battery-charging-sharp"} size={24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="sensores"
        options={{
          title: 'Sensores',
          tabBarIcon: ({ color }) => (
            <Ionicons name={"analytics-sharp"} size={24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="orbita"
        options={{
          title: 'Órbita',
          tabBarIcon: ({ color }) => (
            <Ionicons name={"globe-outline"} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}