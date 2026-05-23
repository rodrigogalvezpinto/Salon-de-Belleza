import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Claudia Andrea data for AI Context
const WEB_CONTEXT = `
Eres la Asistente Capilar de "Claudia Andrea Estilista", una prestigiosa estilista profesional y educadora chilena.
Tu rol es orientar a las clientas con respuestas expertas sobre cuidado del cabello, tendencias de cortes, peinados y coloración (como balayage, babylights, etc.).
Siempre debes sugerir los servicios y cursos de Claudia Andrea para solucionar los problemas del cabello del usuario de forma tierna, profesional y elegante.

Servicios de Claudia Andrea (Precios en Pesos Chilenos CLP):
1. Balayage Premium & Brushing ($95.000): Técnica degradada, incluye diagnóstico, Plex (Olaplex/K18) y ondas finales. (240 min).
2. Babylights & Corrección de Color ($110.000): Reflejos ultra finos desde la raíz para iluminación general y disimular canas. (270 min).
3. Corte de Diseño Claudia Andrea ($35.000): Incluye diagnóstico de visajismo, lavado spa relajante, masaje y peinado final. (60 min).
4. Alisado Orgánico de Keratina ($85.000): Brillo espejo, sin formol, elimina frizz, seguro para embarazadas. Dura 3-4 meses. (180 min).
5. Botox Capilar Ultra Reconstructor ($55.000): Nutrición profunda con colágeno y ácido hialurónico para cabellos secos o procesados. (90 min).
6. Peinado de Novia u Alta Gala ($60.000): Recogidos y ondas de alta fijación para eventos especiales. (90 min).

Cursos dictados por Claudia Andrea:
1. Masterclass: Colorimetría Aplicada y Técnicas de Balayage ($150.000, 16 horas, presencial): Teoría de color avanzada, decoloración segura e incluye materiales y coffe break.
2. Taller de AutoPeinado y Ondeado Express ($45.000, 4 horas, presencial): Para sacarse partido sola, dominar plancha, ondas y trenzas. Máximo 5 clientas.
3. Curso Online: Negocio y Marketing para Estilistas ($80.000, híbrido, 10 hrs): Fotografía capilar, Instagram para estilistas, fijación de precios y rentabilidad.

Directrices de conversación:
- Responde en ESPAÑOL chileno o neutro amigable, de forma refinada, empática y profesional. Sutilmente alegre ("¡Hola! Un gusto saludarte...", "Estaríamos encantadas de recibirte...").
- Mantén las respuestas fluidas y concisas. No abuses de listas eternas.
- Si te consultan algo no relacionado con el cabello o peluquería, responde amablemente que tu especialidad es el cuidado capilar e invítalas a revisar los servicios de Claudia Andrea.
- Integra de forma orgánica los nombres de los servicios/cursos para que puedan agendar en la web.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy Initialization of Google Gemini SDK
  let aiClient: GoogleGenAI | null = null;
  
  function getGeminiClient(): GoogleGenAI | null {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("⚠️ Warning: GEMINI_API_KEY environment variable is not defined.");
        return null;
      }
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  // --- API Routes ---

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // AI Hair Consultant endpoint
  app.post("/api/assistant", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Mensaje requerido" });
      }

      const client = getGeminiClient();
      if (!client) {
        // High quality fallback responses if API Key is not set yet
        const textLower = message.toLowerCase();
        let fallbackResponse = "¡Hola! Soy tu Asistente Capilar de Claudia Andrea. ";
        
        if (textLower.includes("balayage") || textLower.includes("color") || textLower.includes("rubio")) {
          fallbackResponse += "Para lograr ese color radiante que buscas sin maltratar tu cabello, te recomiendo muchísimo agendar nuestro *Balayage Premium & Brushing* ($95.000) o las refinadas *Babylights* ($110.000). Claudia Andrea incluye tratamientos de protección de enlaces (Plex) en todas las decoloraciones para cuidar al máximo tu hebra capilar. ¿Te gustaría agendar una hora para evaluación?";
        } else if (textLower.includes("corte" ) || textLower.includes("pelo" ) || textLower.includes("rostro")) {
          fallbackResponse += "¡Un cambio de corte es fantástico! El de Claudia Andrea es un *Corte de Diseño* ($35.000) basado en visajismo. Ella estudia las facciones de tu rostro para resaltar lo mejor de ti, incluyendo el lavado premium con terapia de masajes capilares. ¿Quieres reservar una cita para esta semana?";
        } else if (textLower.includes("seco" ) || textLower.includes("frizz" ) || textLower.includes("dañado") || textLower.includes("alisado")) {
          fallbackResponse += "Para cabellos debilitados o con frizz rebelde, contamos con dos tratamientos estrellas: el *Alisado Orgánico de Keratina* ($85.000) para un lacio impecable libre de frizz, o el *Botox Capilar Ultra Reconstructor* ($55.000) que inyecta ácido hialurónico y colágeno para curar la fibra. ¿Cuál te llama más la atención?";
        } else if (textLower.includes("curso" ) || textLower.includes("taller" ) || textLower.includes("aprender")) {
          fallbackResponse += "¡Qué maravilloso que quieras capacitación! Claudia Andrea imparte el curso presencial *Masterclass de Colorimetría y Balayage* ($150.000) para profesionales o principiantes intensivos, y el adorable *Taller de AutoPeinado* ($45.000) donde tú misma aprendes a dominar las ondas y peinados en una tarde. Puedes inscribirte directo en la sección academia. ¡Te esperamos!";
        } else {
          fallbackResponse += "Estaré encantada de recomendarte el mejor tratamiento capilar, peinado o corte. Cuéntame un poco sobre la textura actual de tu cabello, si buscas hidratación, un cambio de color brillante, o si deseas matricularte en alguno de los cursos profesionales de Claudia Andrea.";
        }
        
        return res.json({ response: fallbackResponse });
      }

      // Format conversation history for Gemini
      const formattedContents = [];
      
      // Append formatted history
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          formattedContents.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        }
      }
      
      // Append current message
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: WEB_CONTEXT,
          temperature: 0.7,
        },
      });

      return res.json({ response: response.text || "Lo siento, no pude procesar tu solicitud." });

    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ 
        error: "Ocurrió un error al procesar tu solicitud de asistencia capilar.",
        details: error.message 
      });
    }
  });

  // Simulated Webpay Plus initiate transaction
  app.post("/api/pay/initiate-mock-transaction", (req, res) => {
    const { amount, bookingId, itemName, customerName } = req.body;
    
    if (!amount || !bookingId) {
      return res.status(400).json({ error: "Monto y Reserva ID requeridos" });
    }

    const token = "tbk_token_" + Math.random().toString(36).substring(2, 15);
    const orderId = "RESE-" + Math.floor(100000 + Math.random() * 900000);
    
    // Simulate Transbank response redirection
    res.json({
      token,
      orderId,
      amount,
      itemName,
      customerName,
      redirectUrl: `/webpay-portal?token=${token}&amount=${amount}&orderId=${orderId}&itemName=${encodeURIComponent(itemName)}&customerName=${encodeURIComponent(customerName)}`
    });
  });

  // --- Vite Dev Middleware and Static Build Setup ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Claudia Andrea Backend] Server running on http://localhost:${PORT}`);
  });
}

startServer();
