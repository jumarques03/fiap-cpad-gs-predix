import { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  SafeAreaView
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { authContext } from "../../context/AuthContext";

export default function Cadastrar() {
  const router = useRouter();
  const { cadastrarUsuario } = useContext(authContext);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [rm, setRM] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erros, setErros] = useState({});


  const validar = () => {
    const novosErros = {};

    if (!nome) novosErros.nome = "Campo obrigatório";
    
    if (!email) {
      novosErros.email = "Campo obrigatório";
    } else if (!email.includes("@")) {
      novosErros.email = "Formato de e-mail inválido";
    }

    if (!rm) {
      novosErros.rm = "Campo obrigatório";
    } else if (rm.length !== 6) {
      novosErros.rm = "RM inválido (deve ter 6 dígitos)";
    }

    if (!senha) {
      novosErros.senha = "Campo obrigatório";
    } else if (senha.length < 6) {
      novosErros.senha = "A senha deve ter no mínimo 6 caracteres";
    }

    if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = "As senhas não coincidem";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const startShake = () => {
    // 2. Configurar a sequência de animação
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const slideAnim = useRef(new Animated.Value(-300)).current;
  const [message, setMessage] = useState('');

  const showAlert = (msg) => {
    setMessage(msg);

    // 2. Configurar a animação de entrada (Slide Down)
    Animated.timing(slideAnim, {
      toValue: 0, // Posição final (aparece)
      duration: 500,
      useNativeDriver: true, // Importante para performance
    }).start(() => {
      // 3. Após 2 segundos, esconder a animação (Slide Up)
      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100, // Posição inicial (some)
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 3000);
    });
  };

  const handleCadastro = async () => {
    if (validar()) {
      const novoUsuario = { nome, email, rm, senha };
      const sucesso = await cadastrarUsuario(novoUsuario);

      if (sucesso) {
        showAlert('✅ Cadastro realizado com sucesso!')
        
        setTimeout(() => {
            router.replace("/login");
        }, 3000);

      } else {
        setErros({ email: "Este e-mail ou RM já está em uso" });
      }
    } else {
      startShake();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.alertBox,
          {
            transform: [{ translateY: slideAnim }], // Vincula a animação
          },
        ]}
      >
        <SafeAreaView>
          <Text style={styles.alertText}>{message}</Text>
        </SafeAreaView>
      </Animated.View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.icone}>
          <Ionicons name="person-add-outline" size={55} color="white" />
        </View>

        <Text style={styles.titulo}>Criar Conta</Text>
        <Text style={styles.subtitulo}>Preencha os dados abaixo</Text>

        <TextInput
          placeholder="Nome Completo"
          placeholderTextColor="#8C8C8C"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />
        {erros.nome && <Text style={styles.erro}>{erros.nome}</Text>}

        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#8C8C8C"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        {erros.email && <Text style={styles.erro}>{erros.email}</Text>}

        <TextInput
          placeholder="RM (6 dígitos)"
          placeholderTextColor="#8C8C8C"
          value={rm}
          onChangeText={setRM}
          keyboardType="number-pad"
          style={styles.input}
        />
        {erros.rm && <Text style={styles.erro}>{erros.rm}</Text>}

        <View style={styles.senhaContainer}>
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#8C8C8C"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!senhaVisivel}
            style={styles.senhaInput}
          />
          <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
            <Text style={styles.olho}>{senhaVisivel ? <Ionicons name="eye-off" color= {"#ffff"} size={24} />: <Ionicons name="eye" color= {"#ffff"} size={24} />}</Text>
          </TouchableOpacity>
        </View>
        {erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}

        <View style={styles.senhaContainer}>
          <TextInput
            placeholder="Confirmar senha"
            placeholderTextColor="#8C8C8C"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={!senhaVisivel}
            style={styles.senhaInput}
          />
          <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
            <Text style={styles.olho}>{senhaVisivel ? <Ionicons name="eye-off" color= {"#ffff"} size={24} />: <Ionicons name="eye" color= {"#ffff"} size={24} />}</Text>
          </TouchableOpacity>
        </View>
        {erros.confirmarSenha && <Text style={styles.erro}>{erros.confirmarSenha}</Text>}

        <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
          <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
            <Text style={styles.botaoTexto}>Cadastrar</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.linkLogin}>Já tem uma conta? Faça login</Text>
          {}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#262626" 
  },
  scrollContainer: { 
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#262626"
  },
  icone: { backgroundColor: "#F23064", padding: 12, borderRadius: 12, alignSelf: "center", marginBottom: 20 },
  titulo: { fontSize: 32, fontWeight: "bold", color: "#FFFFFF", textAlign: "center", marginBottom: 8 },
  subtitulo: { fontSize: 16, color: "#8C8C8C", textAlign: "center", marginBottom: 30 },
  input: { backgroundColor: "#404040", borderRadius: 12, padding: 14, marginBottom: 8, fontSize: 16, color: "#FFFFFF", borderWidth: 1, borderColor: "#555" },
  erro: { color: "#FF4D4D", marginBottom: 10, marginLeft: 4, fontSize: 14 },
  botao: { backgroundColor: "#F23064", borderRadius: 12, padding: 16, marginTop: 20, alignItems: "center" },
  botaoTexto: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  linkLogin: { color: "#F23064", textAlign: "center", marginTop: 24, fontSize: 16, fontWeight: "600" },
  senhaContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#404040", borderWidth: 1, borderColor: "#555", borderRadius: 12, marginBottom: 8, paddingRight: 10 },
  senhaInput: { flex: 1, padding: 14, fontSize: 16, color: "#FFFFFF" },
  olho: { fontSize: 20 },
  alertBox: {
      position: 'absolute', // Fundamental para flutuar sobre o scroll
      top: Platform.OS === 'ios' ? 40 : 20, // Ajuste para não cobrir a status bar
      left: 20,
      right: 20,
      backgroundColor: '#00C853',
      padding: 16,
      borderRadius: 12,
      zIndex: 9999,         // Garante que fique na frente de TUDO
      elevation: 10,        // Sombra para Android
      shadowColor: '#000',  // Sombra para iOS
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
    },
    alertText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 16,
    },
});