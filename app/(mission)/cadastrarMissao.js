import { useState, useContext, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  ImageBackground
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { missaoContext } from "../../context/MissionContext";
import GradientButton from "../../components/GradientButton";
import MissionDataCard, { DetailsMissionInput, DateInput } from "../../components/DetailsMissionInput"; // Importação atualizada
import SlideAlert from "../../components/SlideAlert";
import DetailsAlertsInput from "../../components/DetailsAlertsInput";

export default function Cadastrar() {
  const router = useRouter();
  
  const [nome, setNome] = useState("");
  const [id, setID] = useState("");
  const [descricao, setDescricao] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  
  const [alertasConfig, setAlertasConfig] = useState({
    minCombustivel: "",
    minEnergia: "",
    minTemperatura: "",
    maxTemperatura: "",
    maxRadiacao: "",
    minUmidade: "",
    minPressao: "",
    maxDesvioOrbital: ""
  });

  const [erros, setErros] = useState({});
  const { cadastrarMissao } = useContext(missaoContext);

  const slideAnim = useRef(new Animated.Value(-300)).current;
  const [message, setMessage] = useState('');

  useFocusEffect(
    useCallback(() => {
      setErros({}); 
    }, [])
  );

  const handleAlertasChange = (chave, valor) => {
    setAlertasConfig((prev) => ({
      ...prev,
      [chave]: valor
    }));
    if (erros[chave]) {
      setErros((prev) => ({ ...prev, [chave]: null }));
    }
  };

  const showAlert = (msg) => {
    setMessage(msg);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -300,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 3000);
    });
  };

  const validar = () => {
    const novosErros = {};

    if (!nome) novosErros.nome = "O nome da missão é obrigatório"; 
    if (!id) {
      novosErros.id = "O ID é obrigatório"; 
    } else if (id.length < 6) {
      novosErros.id = "O ID deve ter no mínimo 6 caracteres"; 
    }
    if (!descricao) novosErros.descricao = "A descrição da missão é obrigatória"; 
    if (!inicio) novosErros.inicio = "A data de início é obrigatória"; 
    if (!fim) novosErros.fim = "A data de fim é obrigatória"; 

    if (!alertasConfig.minCombustivel) {
      novosErros.minCombustivel = "Obrigatório";
    } else if (isNaN(alertasConfig.minCombustivel) || alertasConfig.minCombustivel < 0 || alertasConfig.minCombustivel > 100) {
      novosErros.minCombustivel = "Porcentagem inválida (0-100)";
    }

    if (!alertasConfig.minEnergia) {
      novosErros.minEnergia = "Obrigatório";
    } else if (isNaN(alertasConfig.minEnergia) || alertasConfig.minEnergia < 0 || alertasConfig.minEnergia > 100) {
      novosErros.minEnergia = "Porcentagem inválida (0-100)";
    }

    if (!alertasConfig.minTemperatura) {
      novosErros.minTemperatura = "Obrigatório";
    } else if (isNaN(alertasConfig.minTemperatura)) {
      novosErros.minTemperatura = "Valor inválido";
    }

    if (!alertasConfig.maxTemperatura) {
      novosErros.maxTemperatura = "Obrigatório";
    } else if (isNaN(alertasConfig.maxTemperatura)) {
      novosErros.maxTemperatura = "Valor inválido";
    }

    if (!alertasConfig.maxRadiacao) {
      novosErros.maxRadiacao = "Obrigatório";
    } else if (isNaN(alertasConfig.maxRadiacao)) {
      novosErros.maxRadiacao = "Valor inválido";
    }

    if (!alertasConfig.minUmidade) {
      novosErros.minUmidade = "Obrigatório";
    } else if (isNaN(alertasConfig.minUmidade) || alertasConfig.minUmidade < 0 || alertasConfig.minUmidade > 100) {
      novosErros.minUmidade = "Porcentagem inválida (0-100)";
    }

    if (!alertasConfig.minPressao) {
      novosErros.minPressao = "Obrigatório";
    } else if (isNaN(alertasConfig.minPressao)) {
      novosErros.minPressao = "Valor inválido";
    }
    if (!alertasConfig.maxDesvioOrbital) {
      novosErros.maxDesvioOrbital = "Obrigatório";
    } else if (isNaN(alertasConfig.maxDesvioOrbital)) {
      novosErros.maxDesvioOrbital = "Valor inválido";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleCadastroMissao = async () => {
    if (validar()) {
      const novaMissao = { 
        nome, 
        id, 
        descricao, 
        inicio, 
        fim,
        configuracaoAlertas: alertasConfig 
      };
      
      const sucesso = await cadastrarMissao(novaMissao);

      if (sucesso) {
        showAlert('✅ Missão cadastrada com sucesso!');
        setTimeout(() => {
          router.replace("/entrarMissao");
        }, 3500);
      } else {
        setErros({ id: "Este ID já está em uso" });
        startShake();
      }
    } else {
      startShake();
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/background.png')} 
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.overlay}>
        <SlideAlert slideAnim={slideAnim} message={message} />

        <KeyboardAvoidingView
          style={{ flex: 1}}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView  
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
          >
            <Text style={styles.titulo}>Cadastre uma missão</Text> 
            <Text style={styles.subtitulo}>Cadastre uma nova missão e seus alertas!</Text> 

            
            <MissionDataCard>
                <DetailsMissionInput tituloInput={"Nome da missão:"} placeholder={"Ex: Exploração de Marte"} value={nome} onChangeText={setNome} keyboardType={"default"} erro={erros.nome}/>
                <DetailsMissionInput tituloInput={"ID da missão:"} placeholder={"Insira o ID da missão"} value={id} onChangeText={setID} keyboardType={"numeric"} erro={erros.id}/>
                <DetailsMissionInput tituloInput={"Descrição:"} placeholder={"Objetivo e detalhes da missão"} value={descricao} onChangeText={setDescricao} keyboardType={"default"} erro={erros.descricao}/>
                
                <DateInput tituloInput="Data de início" placeholder={"Ex: 10/02/2026"} value={inicio} 
                  onChangeText={(masked) => setInicio(masked)} keyboardType={"numeric"} erro={erros.inicio}
                />
                
                <DateInput tituloInput="Data de fim" placeholder={"Ex: 25/12/2026"} value={fim} 
                  onChangeText={(masked) => setFim(masked)} keyboardType={"numeric"} erro={erros.fim}
                />
            </MissionDataCard>

            <DetailsAlertsInput 
              valores={alertasConfig} 
              onChangeValor={handleAlertasChange}
              erros={erros}
            />

            <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
              <GradientButton title="Salvar Missão" onPress={handleCadastroMissao}/>
            </Animated.View>
  
            <Text style={styles.linkCadastro} onPress={() => router.push("/(mission)/entrarMissao")}>
              Entre em uma missão!
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.45)" },
  scrollContainer: { flexGrow: 1, padding: 24, justifyContent: "center" },
  titulo: { fontSize: 36, fontWeight: "bold", color: "#FFFFFF", textAlign: "center", marginBottom: 8, marginTop: 20 },
  subtitulo: { fontSize: 16, color: "#ffffff", textAlign: "center", marginBottom: 40 },
  linkCadastro: { color: "#ffffff", textAlign: "center", marginTop: 24, fontSize: 16, fontWeight: "600", marginBottom: 20 }
});