import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authContext = createContext();

export function AuthProvider({ children }) {
    const [usuarios, setUsuarios] = useState(null); // Lista de usuários cadastrados no app
    const [sessao, setSessao] = useState(null); 

    // Carregar ao abrir o app
    useEffect(() => {
        carregarUsuarios();
        carregarSessao();
    }, []);

    // Carrega lista de usuários cadastrados ---> serve para ver se usuário já possui conta
    const carregarUsuarios = async () => {
        const dados = await AsyncStorage.getItem('usuarios');
        if (dados) {
            const listaUsuarios = JSON.parse(dados); 
            setUsuarios(listaUsuarios);
            return listaUsuarios;
        }
        return [];
    };

    const cadastrarUsuario = async (novoUsuario) => {
        const usuariosAtuais = await carregarUsuarios();

        const usuariosExistente = usuariosAtuais.find(usuario => usuario.email === novoUsuario.email || usuario.rm === novoUsuario.rm);

            if (!usuariosExistente) {
                const novaListaUsuarios = [...usuariosAtuais, novoUsuario];
                setUsuarios(novaListaUsuarios);
                salvarListaUsuarios(novaListaUsuarios); 
                return true;
            }
            return false;
    };

    // Salva usuário --> serve para cadastro, recebe o objeto usuário {nome, email, rm, senha}
    const salvarListaUsuarios = async (lista) => {    
        await AsyncStorage.setItem('usuarios', JSON.stringify(lista));
    };

    // Carrega a sessão (pode retornar o usuário logado ou null) ---> serve para ver se entra primeiro na aba de login ou se vai direto para a tela de salas
    const carregarSessao = async () => {
        const dados = await AsyncStorage.getItem('sessao');
        if (dados) {
            const sessaoAtual = JSON.parse(dados);
            setSessao(sessaoAtual)
            return sessaoAtual;
        }
        return null;
    };

    const salvarSessao = async (usuarioLogado) => { 
        await AsyncStorage.setItem('sessao', JSON.stringify(usuarioLogado));
        setSessao(usuarioLogado);
    };

    // Remove o usuário da sessão  ---> deve ser chamado assim que o usuário apertar o botão de logout
    const logoutUsuario = async () => {
        await AsyncStorage.removeItem('sessao');
        setSessao(null);
    };

    return (
        <authContext.Provider 
            value={{ 
                usuarios,
                sessao,
                cadastrarUsuario,
                logoutUsuario,
                salvarSessao
            }}>
            {children}
        </authContext.Provider>
    );
}