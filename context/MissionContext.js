// context/MissionContext.js
import { createContext, useState, useEffect, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const missaoContext = createContext();

export function MissionProvider({ children }) {
    const [missoes, setMissoes] = useState([]);
    const [sessaoMissao, setSessaoMissao] = useState(null);

    const [telemetriaAtual, setTelemetriaAtual] = useState({
        combustivel: 25.0,
        temperatura: -12.0,
        pressao: 980.0,
        radiacao: 0.2,
        umidade: 42.0,
        desvioOrbital: 4.2,
        velocidade: "27.560 km/h",
        altitude: "420 km",
        sensoresAtivos: 24
    });

    const [telemetriaPassada, setTelemetriaPassada] = useState({
        descricao: "Séries históricas completas enviadas ao PredixAI para análises de tendência e previsões",
        consumo_semanal_combustivel: [42, 55, 68, 55, 30, 60, 80],
        historico_estabilidade_orbital_km_min: [458, 462, 460, 464, 461, 459, 463, 462, 460, 461],
        historico_temperatura_24h: [-15.0, -14.2, -13.5, -13.0, -12.5, -12.0, -11.8, -12.2, -12.8, -13.1]
    });

    // dados dinâmicos
    const filasDinamicas = useRef({
            combustivel: [80, 50, 24.2, 23.5, 23.0, 22.1, 77, 20.8, 19.2, 18.0, 9.5, 8.2, 7.5, 6.1, 99, 443.8, 3.8, 15.0, 20.5, 22.0],
            temperatura: [-12.0, -5.5, 14.2, 32.8, 365, 42.1, 177.6, -8.9, -24.3, -45.0, -30.2, -12.1, 3.8, 18.9, -100, 11.0, -5.2, -18.7, -22.1, -15.8],
            pressao: [980.0, 952.0, 890.0, 710.0, 450.0, 520.0, 780.0, 910.0, 985.0, 1050.0, 1250.0, 1120.0, 990.0, 974.0, 965.0, 978.0, 982.0, 950.0, 920.0, 975.0],
            radiacao: [0.2, 0.25, 0.52, 1.8, 4.5, 8.5, 12.4, 6.2, 3.1, 1.4, 0.5, 0.2, 0.18, 0.45, 2.3, 7.8, 10.1, 4.9, 1.2, 0.3],
            umidade: [42.0, 38.5, 29.1, 18.4, 12.0, 15.2, 28.0, 40.5, 55.2, 78.9, 95.0, 82.3, 64.1, 50.0, 44.7, 41.2, 42.8, 45.1, 43.5, 42.2],
            desvioOrbital: [4.2, 5.8, 8.1, 12.5, 18.4, 14.2, 9.5, 6.7, 5.1, 4.2, 8.9, 15.3, 22.0, 26.9, 19.1, 11.3, 6.2, 4.5, 4.2, 4.1]
    });

    useEffect(() => {
        carregarMissoes();
        carregarSessaoMissao();
    }, []);

    // Simulação temporal em tempo real
    useEffect(() => {
        if (!sessaoMissao) return;

        const interval = setInterval(() => {
            setTelemetriaAtual((prev) => {
                const proximoCombustivel = filasDinamicas.current.combustivel.shift();
                filasDinamicas.current.combustivel.push(proximoCombustivel);

                const proximaTemperatura = filasDinamicas.current.temperatura.shift();
                filasDinamicas.current.temperatura.push(proximaTemperatura);

                const proximaPressao = filasDinamicas.current.pressao.shift();
                filasDinamicas.current.pressao.push(proximaPressao);

                const proximaRadiacao = filasDinamicas.current.radiacao.shift();
                filasDinamicas.current.radiacao.push(proximaRadiacao);

                const proximaUmidade = filasDinamicas.current.umidade.shift();
                filasDinamicas.current.umidade.push(proximaUmidade);

                const proximoDesvio = filasDinamicas.current.desvioOrbital.shift();
                filasDinamicas.current.desvioOrbital.push(proximoDesvio);

                return {
                    ...prev,
                    combustivel: proximoCombustivel,
                    temperatura: proximaTemperatura,
                    pressao: proximaPressao,
                    radiacao: proximaRadiacao,
                    umidade: proximaUmidade,
                    desvioOrbital: proximoDesvio
                };
            });
        }, 7000);

        return () => clearInterval(interval);
    }, [sessaoMissao]);

    const carregarMissoes = async () => {
        const dados = await AsyncStorage.getItem('missoes');
        if (dados) {
            const listaMissoes = JSON.parse(dados);
            setMissoes(listaMissoes);
            return listaMissoes;
        }
        setMissoes([]);
        return [];
    };

    const salvarListaMissoes = async (lista) => {
        await AsyncStorage.setItem('missoes', JSON.stringify(lista));
    };

    const cadastrarMissao = async (novaMissao) => { 
        const missoesAtuais = await carregarMissoes();
        const missaoExistente = missoesAtuais.find(missao => missao.id === novaMissao.id);

        if (!missaoExistente) {
            const novaListaMissoes = [...missoesAtuais, novaMissao];
            setMissoes(novaListaMissoes);
            await salvarListaMissoes(novaListaMissoes);
            return true;
        }
        return false;
    };

    const carregarSessaoMissao = async () => {
        const dados = await AsyncStorage.getItem('missao');
        if (dados) {
            const sessaoAtual = JSON.parse(dados);
            setSessaoMissao(sessaoAtual);
            return sessaoAtual;
        }
        return null;
    };

    const salvarSessaoMissao = async (dadosParaSalvar) => {
        await AsyncStorage.setItem('missao', JSON.stringify(dadosParaSalvar));
        setSessaoMissao(dadosParaSalvar);
    };

    const entrarNaMissao = async (idMissao) => {
        const missoesAtuais = await carregarMissoes();
        const missaoEncontrada = missoesAtuais.find(missao => missao.id === idMissao);

        if (missaoEncontrada) {
            await salvarSessaoMissao(missaoEncontrada);
            return true;
        }
        return false;
    };

    const sairDaMissao = async () => {
        await AsyncStorage.removeItem('missao');
        setSessaoMissao(null);
    };

    return (
        <missaoContext.Provider
            value={{
                missoes,
                sessaoMissao,
                telemetriaAtual,
                telemetriaPassada,
                cadastrarMissao,
                entrarNaMissao,
                sairDaMissao,
                salvarSessaoMissao
            }}
        >
            {children}
        </missaoContext.Provider>
    );
}