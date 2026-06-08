import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function DetailsAlertsInput({ 
  valores, 
  onChangeValor,
  erros 
}) {
  
  // Função interna auxiliar para renderizar cada campo de forma padronizada
  const renderCampoMinimo = (label, chave, placeholder) => (
    <View style={styles.campoContainer}>
      <Text style={styles.labelCampo}>{label}</Text>
      <View style={[styles.inputContainer, erros?.[chave] && styles.inputErro]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#dadada"
          keyboardType="numeric"
          value={valores[chave] || ""}
          onChangeText={(text) => onChangeValor(chave, text)}
        />
      </View>
      {erros?.[chave] && <Text style={styles.erroTexto}>{erros[chave]}</Text>}
    </View>
  );

  return (
    <View style={styles.containerAlertas}>
      <Text style={styles.textoInterno}>Configuração de Alertas Críticos:</Text>
      <Text style={styles.subtextoInformativo}>
        Defina os limiares abaixo. Estes valores servirão como base para a geração da análise automática feita por nossa Inteligência Artificial, a PredixAI.
      </Text>

      {/* Subgrupo: Propulsão e Energia */}
      <Text style={styles.tituloSecao}> Energia & Combustível</Text>
      <View style={styles.linhaCampos}>
        {renderCampoMinimo("Combustível Mín (%):", "minCombustivel", "Ex: 20")}
        {renderCampoMinimo("Energia Mín (%):", "minEnergia", "Ex: 15")}
      </View>

      {/* Subgrupo: Sensores Ambientais */}
      <Text style={styles.tituloSecao}> Limites de Sensores</Text>
      <View style={styles.linhaCampos}>
        {renderCampoMinimo("Temp. Mín (°C):", "minTemperatura", "Ex: -10")}
        {renderCampoMinimo("Temp. Máx (°C):", "maxTemperatura", "Ex: 50")}
      </View>

      <View style={styles.linhaCampos}>
        {renderCampoMinimo("Radiação Máx (mSv):", "maxRadiacao", "Ex: 5")}
        {renderCampoMinimo("Umidade Mín (%):", "minUmidade", "Ex: 20")}
      </View>

      <View style={styles.linhaCampos}>
        {renderCampoMinimo("Pressão Mín (hPa):", "minPressao", "Ex: 900")}
      </View>

      {/* Subgrupo: Mecânica Orbital */}
      <Text style={styles.tituloSecao}> Estabilidade Orbital</Text>
      <View style={styles.linhaCampos}>
        {renderCampoMinimo("Desvio Máx (km):", "maxDesvioOrbital", "Ex: 15")}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerAlertas: {
    backgroundColor: "rgba(22, 13, 60, 0.65)",
    width: "100%",
    padding: 16,   
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "rgba(78, 33, 202, 0.15)",
  },
  textoInterno: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtextoInformativo: {
    color: "#dadada",
    fontSize: 14,
    marginBottom: 16,
  },
  tituloSecao: {
    color: "rgba(130, 101, 255, 0.96)",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#1825b040",
    paddingBottom: 2,
  },
  linhaCampos: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  campoContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  labelCampo: {
    color: "#FFFFFF",
    fontSize: 12,
    marginBottom: 4,
  },
  inputContainer: {
    backgroundColor: "rgb(22, 13, 60)",
    borderWidth: 1,
    borderColor: "rgba(78, 33, 202, 0.79)",
    borderRadius: 8,
  },
  inputErro: {
    borderColor: "#FF4D4D",
  },
  input: {
    padding: 8,
    fontSize: 14,
    color: "#FFFFFF",
  },
  erroTexto: {
    color: "#FF4D4D",
    fontSize: 10,
    marginTop: 2,
  }
});