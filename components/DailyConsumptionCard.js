import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DailyConsumptionCard({ dados = [40, 50, 65, 55, 30, 60, 80] }) {
  const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const alturaMaximaBarra = 100;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitulo}>Consumo diário</Text>
      
      <View style={styles.barrasContainer}>
        {dados.map((valor, indice) => {
          // Calcula a altura proporcional baseada na porcentagem do valor
          const alturaBarra = (valor / 100) * alturaMaximaBarra;
          
          return (
            <View key={indice} style={styles.coluna}>
              <View style={styles.wrapperBarra}>
                <View style={[styles.barra, { height: alturaBarra }]} />
              </View>
              <Text style={styles.diaTexto}>{dias[indice]}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(78, 33, 202, 0.15)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  cardTitulo: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  barrasContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 120,
    paddingHorizontal: 4,
  },
  coluna: {
    alignItems: "center",
    flex: 1,
  },
  wrapperBarra: {
    height: 100,
    justifyContent: "flex-end",
    width: 14,
    backgroundColor: "rgba(253, 182, 182, 0.14)",
    borderRadius: 4,
  },
  barra: {
    backgroundColor: "#4dff50",
    width: "100%",
    borderRadius: 4,
    opacity: 0.8,
  },
  diaTexto: {
    color: "#ffffff",
    fontSize: 11,
    marginTop: 8,
  },
});