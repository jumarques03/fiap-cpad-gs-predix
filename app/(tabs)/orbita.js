// app/(tabs)/orbita.js
import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ImageBackground, Platform, ScrollView, Animated, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { authContext } from "../../context/AuthContext";
import { missaoContext } from "../../context/MissionContext";
import LogoutButton from "../../components/LogoutButton";

import TrajectoryCard from "../../components/TrajectoryCard";
import OrbitalStabilityChart from "../../components/OrbitalStabilityChart";
import SlideAlert from "../../components/SlideAlert";
import AIInterpretation from "../../components/AIInterpretation";

import { analisarTelemetria } from "../../services/groqService";

export default function OrbitaTela() {
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
    const desvioAtual = telemetriaAtual.desvioOrbital;
    const limiteMaxDesvio = Number(limites.maxDesvioOrbital);

    if (limiteMaxDesvio && desvioAtual > limiteMaxDesvio) {
      if (!alertaAtivoRef.current) {
        mostrarPopUp(`⚠️ TRAJETÓRIA: Desvio orbital crítico! Atual: ${desvioAtual} km (Máximo: ${limiteMaxDesvio} km)`);
      }
    } else {
      if (alertaAtivoRef.current) esconderPopUp();
    }
  }, [telemetriaAtual.desvioOrbital, limites.maxDesvioOrbital]);

  // 2. CHAMADA ASSÍNCRONA DA IA
  useEffect(() => {
    async function obterAnaliseOrbita() {
      if (!sessaoMissao || !telemetriaAtual || !telemetriaPassada) return;
      try {
        setCarregandoIA(true);
        const resultado = await analisarTelemetria(telemetriaAtual, telemetriaPassada, limites);
        setTextoIA(resultado);
      } catch (error) {
        setTextoIA("⚠️ ANOMALIA: Falha nos computadores de navegação orbital.");
      } finally {
        setCarregandoIA(false);
      }
    }
    obterAnaliseOrbita();
  }, [sessaoMissao]);

  return (
    <ImageBackground source={require('../../assets/background.png')} resizeMode="cover" style={styles.container}>
      <View style={styles.overlay}>
        <SlideAlert slideAnim={slideAnim} message={mensagemAlerta} backgroundColor="#D54040" />

        <SafeAreaView style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.tituloEcra}>Estabilidade{"\n"}Orbital</Text>
              {sessaoMissao && <Text style={styles.subtituloEcra}>{sessaoMissao.nome}</Text>}
            </View>
            <View style={styles.logoutWrapper}>
              <LogoutButton onPress={handleLogout} title="Sair" />
            </View>
          </View>
        </SafeAreaView>

        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <TrajectoryCard velocidade={telemetriaAtual.velocidade} altitude={telemetriaAtual.altitude} desvioAtual={telemetriaAtual.desvioOrbital} />
          <OrbitalStabilityChart />
          
          {carregandoIA ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#4e21ca" />
              <Text style={styles.loadingTexto}>IA calculando janelas de correção orbital...</Text>
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