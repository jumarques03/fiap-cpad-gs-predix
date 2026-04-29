import { createContext, useState } from "react";

export const SalasContext = createContext();

export function SalasProvider({ children }) {

    const [listaSalas, setListaSalas] = useState([
        { id: 1, nome: "Sala 101", texto: "Disponível hoje", disponivel: true },
        { id: 2, nome: "Sala 305", texto: "Disponível hoje", disponivel: true },
        { id: 3, nome: "Sala 202", texto: "Disponível hoje", disponivel: true },
        { id: 4, nome: "Maker", texto: "Ocupado hoje", disponivel: false },
        { id: 5, nome: "Sala 507", texto: "Disponível hoje", disponivel: true }
    ]);

    return (

        <SalasContext.Provider value={{ 
            listaSalas, 
            setListaSalas, 
        }}>
            {children}
        </SalasContext.Provider>
    );
}