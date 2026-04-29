import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SalasContext } from '../../context/SalasContext'; 

const salasDisponiveis = ['Sala 101', 'Sala 202', 'Sala 507', 'Sala 305'];
const horariosEntrada = ['09:00', '10:00', '13:00', '15:00'];
const horariosSaida = ['11:00', '14:00', '17:00', '22:00'];

export default function ReservarScreen() {
  const { salas, adicionarReserva } = useContext(SalasContext);
  const [salaSelecionada, setSalaSelecionada] = useState(null);
  const [horaEntrada, setHoraEntrada] = useState(null);
  const [horaSaida, setHoraSaida] = useState(null);

  const handleConfirmarReserva = () => {
    if (!salaSelecionada || !horaEntrada || !horaSaida) {
      alert('Por favor, selecione a sala, entrada e saída.');
      return;
    }

    const novaReserva = {
      id: Date.now().toString(), 
      sala: salaSelecionada,
      data: new Date().toLocaleDateString('pt-BR'), 
      horaEntrada,
      horaSaida,
      status: 'Confirmada',
    };
    adicionarReserva(novaReserva); 
    alert(`Reserva confirmada para a ${salaSelecionada}!`);
 
    setSalaSelecionada(null);
    setHoraEntrada(null);
    setHoraSaida(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Reservar sala</Text>
      <Text style={styles.subtitle}>Escolha uma sala e o horário desejado</Text>

      <View style={styles.sectionHeader}>
        <Ionicons name="apps" size={24} color="#FF385C" style={styles.iconCircle} />
        <Text style={styles.sectionTitle}>Selecione a sala</Text>
      </View>
      <View style={styles.optionsGrid}>
        {salasDisponiveis.map(sala => (
          <TouchableOpacity
            key={sala}
            style={[styles.optionButton, salaSelecionada === sala && styles.optionButtonSelected]}
            onPress={() => setSalaSelecionada(sala)}
          >
            <Text style={[styles.optionText, salaSelecionada === sala && styles.optionTextSelected]}>{sala}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <MaterialIcons name="schedule" size={24} color="#FF385C" style={styles.iconCircle} />
        <Text style={styles.sectionTitle}>Horário de entrada</Text>
      </View>
      <View style={styles.optionsGrid}>
        {horariosEntrada.map(hora => (
          <TouchableOpacity
            key={hora}
            style={[styles.optionButton, horaEntrada === hora && styles.optionButtonSelected]}
            onPress={() => setHoraEntrada(hora)}
          >
            <Text style={[styles.optionText, horaEntrada === hora && styles.optionTextSelected]}>{hora}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <MaterialIcons name="schedule" size={24} color="#FF385C" style={styles.iconCircle} />
        <Text style={styles.sectionTitle}>Horário de saída</Text>
      </View>
      <View style={styles.optionsGrid}>
        {horariosSaida.map(hora => (
          <TouchableOpacity
            key={hora}
            style={[styles.optionButton, horaSaida === hora && styles.optionButtonSelected]}
            onPress={() => setHoraSaida(hora)}
          >
            <Text style={[styles.optionText, horaSaida === hora && styles.optionTextSelected]}>{hora}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmarReserva}>
        <Text style={styles.confirmButtonText}>Confirmar reserva</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', 
    padding: 20,
    paddingTop: 50, 
  },
  breadcrumbTitle: {
    color: '#888',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    color: '#AAAAAA',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, 
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionButton: {
    width: '48%', 
    backgroundColor: '#333333',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  optionButtonSelected: {
    backgroundColor: '#444444', 
    borderColor: '#FF385C',
    borderWidth: 1,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#FF385C',
    fontWeight: '700',
  },
  confirmButton: {
    backgroundColor: '#FF385C',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 30,
    marginBottom: 60, 
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});