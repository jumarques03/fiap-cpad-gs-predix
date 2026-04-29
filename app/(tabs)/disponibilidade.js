import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { reservasContext } from "../../context/ReservasContext";

LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan.','Fev.','Mar','Abr','Mai','Jun','Jul.','Ago','Set.','Out.','Nov.','Dez.'],
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function Disponibilidade() {
    const router = useRouter();
    const { nome } = useLocalSearchParams();
    const { reservas } = useContext(reservasContext);
    const [dataSelecionada, setDataSelecionada] = useState("");

    const hoje = new Date().toISOString().split('T')[0];
    
    const datasMarcadas = {};
    reservas.filter(res => res.sala === nome).forEach(res => {
        datasMarcadas[res.data] = { marked: true, dotColor: '#FF5252', activeOpacity: 0 };
    });

    if (dataSelecionada) {
        datasMarcadas[dataSelecionada] = { ...datasMarcadas[dataSelecionada], selected: true, selectedColor: '#F23064' };
    }

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>{nome}</Text>
            <Text style={styles.descricao}>Confira a disponibilidade da sala</Text>

            <View style={styles.calendarContainer}>
                <Calendar
                    theme={{
                        backgroundColor: '#262626',
                        calendarBackground: '#262626',
                        textSectionTitleColor: '#8C8C8C',
                        selectedDayBackgroundColor: '#F23064',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#F23064',
                        dayTextColor: '#ffffff',
                        textDisabledColor: '#444',
                        monthTextColor: '#ffffff',
                        indicatorColor: 'white',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300'
                    }}
                    onDayPress={day => setDataSelecionada(day.dateString)}
                    disableArrowLeft={true}
                    disableArrowRight={true}
                    minDate={hoje}
                    markedDates={datasMarcadas}
                />
            </View>

            <View style={styles.legendaContainer}>
                <View style={styles.legendaItem}>
                    <View style={[styles.circulo, { backgroundColor: '#FF5252' }]} />
                    <Text style={styles.legendaTexto}>Indisponível</Text>
                </View>
                <View style={styles.legendaItem}>
                    <View style={[styles.circulo, { backgroundColor: '#F23064' }]} />
                    <Text style={styles.legendaTexto}>Selecionado</Text>
                </View>
            </View>

            <TouchableOpacity 
                style={[styles.botao, !dataSelecionada && { opacity: 0.5 }]} 
                disabled={!dataSelecionada}
                onPress={() => router.push({ pathname: "/reservar", params: { sala: nome, data: dataSelecionada } })}
            >
                <Text style={styles.botaoTexto}>Reservar sala</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#1a1a1a", padding: 20, paddingTop: 60 },
    mainTitle: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF", marginBottom: 5 },
    descricao: { fontSize: 16, color: "#8C8C8C", marginBottom: 30 },
    calendarContainer: { backgroundColor: "#262626", borderRadius: 20, padding: 10, overflow: "hidden", borderWidth: 1, borderColor: "#333" },
    legendaContainer: { flexDirection: "row", marginTop: 20, gap: 20 },
    legendaItem: { flexDirection: "row", alignItems: "center", gap: 8 },
    circulo: { width: 12, height: 12, borderRadius: 6 },
    legendaTexto: { color: "#8C8C8C", fontSize: 14 },
    botao: { backgroundColor: "#F23064", borderRadius: 15, height: 55, alignItems: "center", justifyContent: "center", marginTop: "auto", marginBottom: 20 },
    botaoTexto: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }
});