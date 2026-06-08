// app/(tabs)/sensores.js
import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ImageBackground, Platform, ScrollView, Animated, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { authContext } from "../../context/AuthContext";
import { missaoContext } from "../../context/MissionContext";
import LogoutButton from "../../components/LogoutButton";

import SensorStatusCard from "../../components/SensorStatusCard";
import CriticalSensorsCard from "../../components/CriticalSensorsCard";
import SlideAlert from "../../components/SlideAlert";
import AIInterpretation from "../../components/AIInterpretation";

import { analisarTelemetria } from "../../services/groqService";

export default function SensoresTela() {
  const router = useRouter();
  const { logoutUsuario } = useContext(authContext);
  const { sessaoMissao, sairDaMissao, telemetriaAtual, telemetriaPassada } = useContext(missaoContext);

  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [textoIA, setTextoIA] = useState("");
  const [carregandoIA, setCarregandoIA] = useState(true);

  const slideAnim = useRef(new Animated.Value(-300)).current;
  const alertaAtivoRef = useRef(false);

  const handleLogout = async () => {
    await sairDaMissao(); 
    await logoutUsuario(); 
    router.replace("/(auth)/login"); 
  };

  const limites = sessaoMissao?.configuracaoAlertas || {};

  const obterStatusSensor = (valor, minIdeal, maxIdeal) => {
    if (minIdeal !== undefined && valor < Number(minIdeal)) return "Atenção";
    if (maxIdeal !== undefined && valor > Number(maxIdeal)) return "Crítico";
    return "Normal";
  };

  const dadosSensoresDinamicos = {
    temperatura: { valor: telemetriaAtual.temperatura, status: obterStatusSensor(telemetriaAtual.temperatura, limites.minTemperatura, limites.maxTemperatura) },
    pressao: { valor: telemetriaAtual.pressao, status: obterStatusSensor(telemetriaAtual.pressao, limites.minPressao, undefined) },
    radiacao: { valor: telemetriaAtual.radiacao, status: obterStatusSensor(telemetriaAtual.radiacao, undefined, limites.maxRadiacao) },
    umidade: { valor: telemetriaAtual.umidade, status: obterStatusSensor(telemetriaAtual.umidade, limites.minUmidade, undefined) }
  };

  const mostrarPopUp = (msg) => {
    setMensagemAlerta(msg);
    alertaAtivoRef.current = true;
    Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }).start();
  };

  const esconderPopUp = () => {
    Animated.timing(slideAnim, { toValue: -300, duration: 500, useNativeDriver: true }).start(() => {
      setMensagemAlerta("");
      alertaAtivoRef.current = false;
    });
  };

  // 1. CONDICIONAL SÍNCRONA DE ALERTA IMEDIATO
  useEffect(() => {
    let anomaliaDetetada = null;

    if (limites.minTemperatura && limites.maxTemperatura) {
      if (!(Number(limites.minTemperatura) <= telemetriaAtual.temperatura && telemetriaAtual.temperatura <= Number(limites.maxTemperatura))) {
        anomaliaDetetada = `Anomalia Térmica! Temperatura: ${telemetriaAtual.temperatura}°C`;
      }
    }
    if (!anomaliaDetetada && limites.minPressao && telemetriaAtual.pressao < Number(limites.minPressao)) {
      anomaliaDetetada = `Pressão Baixa! Nível Atual: ${telemetriaAtual.pressao} hPa`;
    }
    if (!anomaliaDetetada && limites.maxRadiacao && telemetriaAtual.radiacao > Number(limites.maxRadiacao)) {
      anomaliaDetetada = `Radiação Crítica! Nível: ${telemetriaAtual.radiacao} mSv`;
    }
    if (!anomaliaDetetada && limites.minUmidade && telemetriaAtual.umidade < Number(limites.minUmidade)) {
      anomaliaDetetada = `Umidade Crítica! Atual: ${telemetriaAtual.umidade}%`;
    }

    if (anomaliaDetetada) {
      if (!alertaAtivoRef.current || mensagemAlerta !== anomaliaDetetada) {
        mostrarPopUp(`⚠️ CRÍTICO: ${anomaliaDetetada}`);
      }
    } else {
      if (alertaAtivoRef.current) esconderPopUp();
    }
  }, [telemetriaAtual.temperatura, telemetriaAtual.pressao, telemetriaAtual.radiacao, telemetriaAtual.umidade]);

  // 2. CHAMADA ASSÍNCRONA DA IA
  useEffect(() => {
    async function obterAnaliseAmbiente() {
      if (!sessaoMissao || !telemetriaAtual || !telemetriaPassada) return;
      try {
        setCarregandoIA(true);
        const resultado = await analisarTelemetria(telemetriaAtual, telemetriaPassada, limites);
        setTextoIA(resultado);
      } catch (error) {
        setTextoIA("⚠️ ANOMALIA: Interrupção no diagnóstico predictivo ambiental.");
      } finally {
        setCarregandoIA(false);
      }
    }
    obterAnaliseAmbiente();
  }, [sessaoMissao]);

  return (
    <ImageBackground source={require('../../assets/background.png')} resizeMode="cover" style={styles.container}>
      <View style={styles.overlay}>
        <SlideAlert slideAnim={slideAnim} message={mensagemAlerta} backgroundColor="#D54040" />

        <SafeAreaView style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.tituloEcra}>Sensores</Text>
              {sessaoMissao && <Text style={styles.subtituloEcra}>{sessaoMissao.nome}</Text>}
            </View>
            <View style={styles.logoutWrapper}>
              <LogoutButton onPress={handleLogout} title="Sair" />
            </View>
          </View>
        </SafeAreaView>

        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <SensorStatusCard quantidadeAtivos={telemetriaAtual.sensoresAtivos} />
          <CriticalSensorsCard dadosSensores={dadosSensoresDinamicos} />
          
          {carregandoIA ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#4e21ca" />
              <Text style={styles.loadingTexto}>IA analisando estabilidade ambiental...</Text>
            </View>
          ) : (
            <AIInterpretation textoAnalise={textoIA} />
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(2, 6, 12, 0.75)" },
  headerContainer: { paddingHorizontal: 24, paddingTop: Platform.OS === "ios" ? 10 : 20, borderBottomWidth: 1, borderBottomColor: "rgba(255, 255, 255, 0.03)" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 16 },
  tituloEcra: { fontSize: 28, fontWeight: "900", color: "#FFFFFF", letterSpacing: 0.5 },
  subtituloEcra: { fontSize: 13, color: "#8a99ad", fontWeight: "500", marginTop: 2 },
  logoutWrapper: { width: 90, height: 40, justifyContent: "center" },
  scrollContainer: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  loadingContainer: { padding: 20, alignItems: "center", justifyContent: "center", flexDirection: "row" },
  loadingTexto: { color: "#8a99ad", fontSize: 13, marginLeft: 10, fontWeight: "500" }
});