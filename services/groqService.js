// services/groqService.js
import axios from 'axios';

const apiKey = process.env.EXPO_PUBLIC_GROQ_API_KEY;

const GROQ_API_KEY = apiKey; 
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-8b-instant';

const SYSTEM_PROMPT = `
Você é o assistente de ANÁLISE PREDITIVA AEROESPACIAL da plataforma PREDIX.

Sua função NÃO é apenas interpretar os dados atuais.
Sua principal função é PREVER tendências futuras da missão com base em:
- valores atuais de telemetria;
- séries temporais passadas;
- limites críticos configurados para a missão.

OBJETIVO PRINCIPAL:
Gerar uma previsão técnica sobre o comportamento futuro dos sistemas monitorados, indicando se a missão tende a permanecer estável ou se existe risco provável nas próximas janelas de operação.

DIRETRIZES DE ANÁLISE:
1. Analise o histórico enviado e identifique tendências, como queda contínua de combustível, aumento de temperatura, oscilação orbital, variação de pressão, umidade ou radiação.
2. Compare essas tendências com os valores atuais e com os limites críticos configurados.
3. Faça uma projeção futura, indicando o que provavelmente pode acontecer se o comportamento atual continuar.
4. Priorize previsões de risco operacional, como:
   - esgotamento ou queda crítica de combustível;
   - instabilidade orbital crescente;
   - aquecimento ou resfriamento fora do padrão;
   - aumento de radiação;
   - queda de pressão;
   - redução de umidade;
   - aproximação de qualquer limite crítico.
5. Não descreva apenas o valor atual. Sempre relacione o dado atual com uma tendência futura.

REGRAS DE SAÍDA:
- A resposta deve ser uma PREVISÃO, não apenas uma interpretação.
- Foque em tendências futuras e riscos prováveis.
- Não gere alertas de estado atual, pois o sistema local já faz isso.
- Seja técnico, direto e objetivo.
- Use no máximo 3 ou 4 linhas de texto corrido.
- Se houver tendência de risco futuro, inicie com: "⚠️ PROJEÇÃO PREDITIVA DE RISCO:".
- Se os dados indicarem estabilidade futura, inicie com: "✅ TENDÊNCIA HISTÓRICA ESTÁVEL:".
- Não invente dados numéricos que não foram enviados.
- Não cite que faltam dados, a menos que as séries estejam vazias.
- Não fale nomes de variáveis históricas

Retorne EXCLUSIVAMENTE um objeto JSON válido, sem blocos de código markdown ou caracteres extras:
{
  "textoAnalise": "Seu parecer preditivo estruturado aqui."
}
`;

export async function analisarTelemetria(dadosAtuais, dadosPassados, limitesMissao) {
  // Tratamento preventivo para evitar o Erro 400 caso os dados venham nulos ou indefinidos do contexto
  if (!dadosAtuais || !dadosPassados) {
    return "✅ Aguardando carregamento dos dados históricos para análise preditiva...";
  }

  try {
    // Sanitização e garantia de fallback para formatos limpos aceitos pelo JSON da API
    const combustivel = dadosAtuais.combustivel ?? 0;
    const temperatura = dadosAtuais.temperatura ?? 0;
    const pressao = dadosAtuais.pressao ?? 0;
    const radiacao = dadosAtuais.radiacao ?? 0;
    const umidade = dadosAtuais.umidade ?? 0;
    const desvioOrbital = dadosAtuais.desvioOrbital ?? 0;

    const histCombustivel = Array.isArray(dadosPassados.consumo_semanal_combustivel) ? dadosPassados.consumo_semanal_combustivel : [];
    const histOrbita = Array.isArray(dadosPassados.historico_estabilidade_orbital_km_min) ? dadosPassados.historico_estabilidade_orbital_km_min : [];
    const histTemp = Array.isArray(dadosPassados.historico_temperatura_24h) ? dadosPassados.historico_temperatura_24h : [];

    const promptDados = {
      valores_atuais: { combustivel, temperatura, pressao, radiacao, umidade, desvioOrbital },
      series_temporais_passadas: { histCombustivel, histOrbita, histTemp },
      limites_configurados: {
        minCombustivel: limitesMissao?.minCombustivel ?? "0",
        minEnergia: limitesMissao?.minEnergia ?? "0",
        minTemperatura: limitesMissao?.minTemperatura ?? "0",
        maxTemperatura: limitesMissao?.maxTemperatura ?? "0",
        maxRadiacao: limitesMissao?.maxRadiacao ?? "0",
        minUmidade: limitesMissao?.minUmidade ?? "0",
        minPressao: limitesMissao?.minPressao ?? "0",
        maxDesvioOrbital: limitesMissao?.maxDesvioOrbital ?? "0"
      }
    };

    const response = await axios.post(
      GROQ_URL,
      {
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: JSON.stringify(promptDados) } // Enviado como string JSON limpa e estruturada
        ],
        response_format: { type: 'json_object' },
        max_tokens: 350,
        temperature: 0.0
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 7000
      }
    );

    let content = response.data.choices[0].message.content.trim();
    
    // Tratamento caso a IA ignore as diretrizes e devolva o bloco cercado por ```json ... ```
    if (content.startsWith("```")) {
      content = content.replace(/^```json/, "").replace(/```$/, "").trim();
    }

    const jsonFinal = JSON.parse(content);
    return jsonFinal.textoAnalise || "✅ SISTEMA DE TELEMETRIA: Dados operacionais dentro da curva de estabilidade.";

  } catch (error) {
    console.error("Erro na chamada do Groq:", error?.response?.data || error.message);
    return "⚠️ ERRO PREDITIVO: Falha temporária na conexão ou limite de requisições do subsistema PredixAI.";
  }
}