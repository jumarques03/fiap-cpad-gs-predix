import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SalasContext } from '../../context/SalasContext'; 

const ReservaCard = ({ reserva }) => {
  return (
    <View style={styles.card}>
      <View style={styles.contentLeft}>
        <View style={styles.iconCircle}>
          <Ionicons name="apps" size={24} color="#FF385C" />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.cardRoomName}>{reserva.sala}</Text>
          
          <View style={styles.dateTimeRow}>
            <MaterialIcons name="date-range" size={14} color="#AAAAAA" />
            <Text style={styles.cardDate}>{reserva.data}</Text>
          </View>
          
          <View style={styles.dateTimeRow}>
            <MaterialIcons name="schedule" size={14} color="#AAAAAA" />
            <Text style={styles.cardTime}>{reserva.horaEntrada}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.statusBadge}>
        <Text style={styles.statusBadgeText}>{reserva.status}</Text>
      </View>
    </View>
  );
};

export default function MinhasReservasScreen() {
  const { reservas } = useContext(SalasContext); 

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Minhas reservas</Text>
      <Text style={styles.subtitle}>Gerencie suas reservas ativas</Text>

      {reservas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Você ainda não tem reservas ativas</Text>
          <Text style={styles.emptySubtitleText}>Vá para a aba "Reservar" para agendar uma sala</Text>
        </View>
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReservaCard reserva={item} />}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', 
    padding: 20,
    paddingTop: 60, 
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#AAAAAA',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 25,
  },
  flatListContent: {
    paddingBottom: 100, 
  },
  card: {
    backgroundColor: '#262626', 
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    borderColor: '#333',
    borderWidth: 1,
  },
  contentLeft: {
    flexDirection: 'row',
    alignItems: 'center', 
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  cardRoomName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  cardDate: {
    color: '#AAAAAA',
    fontSize: 13,
    marginLeft: 5,
  },
  cardTime: {
    color: '#AAAAAA',
    fontSize: 13,
    marginLeft: 5,
  },
  statusBadge: {
    backgroundColor: 'rgba(30, 56, 31, 0.5)', 
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderColor: '#39ff14', 
    borderWidth: 1,
  },
  statusBadgeText: {
    color: '#39ff14', 
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  emptySubtitleText: {
    color: '#888',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});