import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CriticalSensorsCard({ dadosSensores }) {
  
  // Função auxiliar para definir os estilos de cor de cada badge de status
  const obterEstiloStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "crítico":
        return { cor: "#e7d7d7", fundo: "rgba(255, 77, 77, 0.72)" };
      case "atenção":
        return { cor: "#ded2c2", fundo: "rgba(255, 145, 0, 0.7)" };
      default:
        return { cor: "#cbe4d6", fundo: "rgba(0, 200, 83, 0.7)" };
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitulo}>Valores dos Sensores</Text>

      {/* Linha 1: Temperatura */}
      <View style={styles.linhaSensor}>
        <View style={styles.infoEsquerda}>
          <MaterialCommunityIcons name="temperature-celsius" size={16} color="#00C853" style={styles.icone}/>
          <Text style={styles.nomeSensor}>Temperatura</Text>
        </View>
        <View style={styles.infoDireita}>
          <View style={[styles.badge, { backgroundColor: obterEstiloStatus(dadosSensores.temperatura.status).fundo }]}>
            <Text style={[styles.statusTexto, { color: obterEstiloStatus(dadosSensores.temperatura.status).cor }]}>
              {dadosSensores.temperatura.status}
            </Text>
          </View>
          <Text style={styles.valorTexto}>{dadosSensores.temperatura.valor}°C</Text>
        </View>
      </View>

      {/* Linha 2: Pressão */}
      <View style={styles.linhaSensor}>
        <View style={styles.infoEsquerda}>
          <MaterialCommunityIcons name="gauge" size={18} color="#FF9100" style={styles.icone} />
          <Text style={styles.nomeSensor}>Pressão</Text>
        </View>
        <View style={styles.infoDireita}>
          <View style={[styles.badge, { backgroundColor: obterEstiloStatus(dadosSensores.pressao.status).fundo }]}>
            <Text style={[styles.statusTexto, { color: obterEstiloStatus(dadosSensores.pressao.status).cor }]}>
              {dadosSensores.pressao.status}
            </Text>
          </View>
          <Text style={styles.valorTexto}>{dadosSensores.pressao.valor} bar</Text>
        </View>
      </View>

      {/* Linha 3: Radiação */}
      <View style={styles.linhaSensor}>
        <View style={styles.infoEsquerda}>
          <MaterialCommunityIcons name="radioactive" size={18} color="#FF4D4D" style={styles.icone} />
          <Text style={styles.nomeSensor}>Radiação</Text>
        </View>
        <View style={styles.infoDireita}>
          <View style={[styles.badge, { backgroundColor: obterEstiloStatus(dadosSensores.radiacao.status).fundo }]}>
            <Text style={[styles.statusTexto, { color: obterEstiloStatus(dadosSensores.radiacao.status).cor }]}>
              {dadosSensores.radiacao.status}
            </Text>
          </View>
          <Text style={styles.valorTexto}>{dadosSensores.radiacao.valor} mSv</Text>
        </View>
      </View>

      {/* Linha 4: Umidade */}
      <View style={[styles.linhaSensor, styles.ultimaLinha]}>
        <View style={styles.infoEsquerda}>
          <MaterialCommunityIcons name="water-percent" size={20} color="#00C853" style={styles.icone} />
          <Text style={styles.nomeSensor}>Umidade</Text>
        </View>
        <View style={styles.infoDireita}>
          <View style={[styles.badge, { backgroundColor: obterEstiloStatus(dadosSensores.umidade.status).fundo }]}>
            <Text style={[styles.statusTexto, { color: obterEstiloStatus(dadosSensores.umidade.status).cor }]}>
              {dadosSensores.umidade.status}
            </Text>
          </View>
          <Text style={styles.valorTexto}>{dadosSensores.umidade.valor}%</Text>
        </View>
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
    marginBottom: 16,
  },
  linhaSensor: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  ultimaLinha: {
    borderBottomWidth: 0,
    paddingBottom: 4,
  },
  infoEsquerda: {
    flexDirection: "row",
    alignItems: "center",
  },
  icone: {
    width: 24,
    textAlign: "center",
    marginRight: 8,
  },
  nomeSensor: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  infoDireita: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
    minWidth: 65,
    alignItems: "center",
  },
  statusTexto: {
    fontSize: 12,
    fontWeight: "bold",
  },
  valorTexto: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "right",
    minWidth: 60,
  },
});