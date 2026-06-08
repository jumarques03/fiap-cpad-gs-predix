// app/(tabs)/principal.js
import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Platform, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { authContext } from "../../context/AuthContext";
import { missaoContext } from "../../context/MissionContext";
import LogoutButton from "../../components/LogoutButton";

// Componentes da dashboard principal
import MissionInfoCard from "../../components/MissionInfoCard";
import SensorsSummaryCard from "../../components/SensorsSummaryCard"; 
import AIInterpretation from "../../components/AIInterpretation";

// Serviço da inteligência artificial preditiva
import { analisarTelemetria } from "../../services/groqService";

export default function Principal() {
  const router = useRouter();
  const { logoutUsuario } = useContext(authContext);
  const { sessaoMissao, sairDaMissao, telemetriaAtual, telemetriaPassada } = useContext(missaoContext);

  const [textoIA, setTextoIA] = useState("");
  const [carregandoIA, setCarregandoIA] = useState(true);

  const handleLogout = async () => {
    await sairDaMissao();
    await logoutUsuario();
    router.replace("/(auth)/login");
  };

// Executa a análise preditiva da IA na montagem da tela, com trava de segurança contra dados nulos
  useEffect(() => {
    async function obterAnalisePreditiva() {
      // CONDICIONAL DE GUARDA: Só dispara se a sessão da missão e a telemetria estiverem prontas
      if (!sessaoMissao || !telemetriaAtual || !telemetriaPassada) return;

      try {
        setCarregandoIA(true);

        const resultado = await analisarTelemetria(
          telemetriaAtual, 
          telemetriaPassada, 
          sessaoMissao.configuracaoAlertas
        );
        
        setTextoIA(resultado);
      } catch (error) {
        setTextoIA("⚠️ ALERTA DE ANOMALIA:\n\nFalha crítica de comunicação com o link neural do Predix AI.");
      } finally {
        setCarregandoIA(false);
      }
    }

    obterAnalisePreditiva();
  }, [sessaoMissao, telemetriaPassada]); // Monitora os dados passados para garantir o carregamento inicial completo

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.tituloEcra}>Início</Text>
              {sessaoMissao && <Text style={styles.subtituloEcra}>{sessaoMissao.nome}</Text>}
            </View>
            <View style={styles.logoutWrapper}>
              <LogoutButton onPress={handleLogout} title="Sair" />
            </View>
          </View>
        </SafeAreaView>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {sessaoMissao && (
            <MissionInfoCard 
              descricao={sessaoMissao.descricao}
              inicio={sessaoMissao.inicio}
              fim={sessaoMissao.fim}
            />
          )}

          {/* Sincronização em tempo real do painel resumo com as atualizações de 5s do Context */}
          <SensorsSummaryCard 
            combustivel={telemetriaAtual.combustivel}
            temperatura={telemetriaAtual.temperatura}
            pressao={telemetriaAtual.pressao}
            umidade={telemetriaAtual.umidade}
            radiacao={telemetriaAtual.radiacao}
            desvioOrbital={telemetriaAtual.desvioOrbital}
          />

          {/* Renderização do parecer preditivo focado em histórico e tendências */}
          {carregandoIA ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#4e21ca" />
              <Text style={styles.loadingTexto}>PredixAI gerando análise preditiva de tendências...</Text>
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
  headerContainer: { 
    paddingHorizontal: 24, 
    paddingTop: Platform.OS === "ios" ? 10 : 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.03)"
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 16 },
  tituloEcra: { fontSize: 28, fontWeight: "900", color: "#FFFFFF", letterSpacing: 0.5 },
  subtituloEcra: { fontSize: 13, color: "#8a99ad", fontWeight: "500", marginTop: 2 },
  logoutWrapper: { width: 90, height: 40, justifyContent: "center" },
  scrollContainer: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  loadingContainer: { padding: 20, alignItems: "center", justifyContent: "center", flexDirection: "row" },
  loadingTexto: { color: "#8a99ad", fontSize: 13, marginLeft: 10, fontWeight: "500" }
});