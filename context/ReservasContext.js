import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const reservasContext = createContext();

export function ReservasProvider({ children }) {
    const [reservas, setReservas] = useState([]); // Lista de reservas

    // Carregar ao abrir o app
    useEffect(() => {
        carregarReservas();
    }, []);

    // Carrega lista de reservas salvas no storage
    const carregarReservas = async () => {
        const dados = await AsyncStorage.getItem('reservas');
        if (dados) {
            const listaReservas = JSON.parse(dados); 
            setReservas(listaReservas);
            return listaReservas;
        }
        return [];
    };

    // Adiciona lista de reservas no storage
    const adicionarReserva = async (novaReserva) => {
        const reservasAtuais = await carregarReservas();

        const reservasExistente = reservasAtuais.find(reserva => reserva.data === novaReserva.data && reserva.sala === novaReserva.sala);

        if (!reservasExistente) {
            const novaListaReservas = [...reservasAtuais, novaReserva];
            setReservas(novaListaReservas);
            salvarReservas(novaListaReservas); 
            return true;
        }

        return false;
    };

    // Salva lista de reservas no storage
    const salvarReservas = async (lista) => {    
        await AsyncStorage.setItem('reservas', JSON.stringify(lista));
    };

    // Remove reserva do storage
    const removerReserva = async (id) => {
        const listaReservas = await carregarReservas()
        const novaListaReservas = listaReservas.filter((t) => t.id !== id);
        setReservas(novaListaReservas);
        salvarReservas(novaListaReservas);
    };

    return (
        <reservasContext.Provider 
        value={{ 
            reservas,
            adicionarReserva,
            removerReserva
        }}>
            {children}
        </reservasContext.Provider>
    );
}