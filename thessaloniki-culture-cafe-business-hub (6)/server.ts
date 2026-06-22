import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Parse json bodies
app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// AI analysis and commentary generator endpoint
app.post("/api/generate-commentary", async (req, res) => {
  try {
    const {
      weekdayTarget,
      weekendTarget,
      fixedExpenses = [],
      extraServicesRevenue = [],
      includeExtraSales,
      monthlyCoffeeSalesRevenue,
      monthlyExtraRevenue,
      monthlyCoffeeCostOfGoodsSold,
      netMonthlyProfitPreTax,
      monthlyBreakEvenInEuro,
      dailyBreakEvenInEuro
    } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        success: false,
        commentary: "⚠️ Για να λάβετε ρεαλιστική ανάλυση μέσω AI, παρακαλούμε προσθέστε ένα GEMINI_API_KEY στις Ρυθμίσεις (Settings > Secrets) της εφαρμογής. Η εφαρμογή θα ενημερωθεί αυτόματα!"
      });
    }

    const expensesList = fixedExpenses
      .map((e: any) => `- ${e.label || "Έξοδο"}: ${e.amount}€`)
      .join("\n");

    const extraRevenueList = extraServicesRevenue
      .map((r: any) => `- ${r.name || r.title || "Υπηρεσία"}: ${r.estimate}€`)
      .join("\n");

    const prompt = `
Είσαι ένας ρεαλιστής, έμπειρος και ευφυής σύμβουλος επιχειρήσεων με εξειδίκευση σε εναλλακτικά καφέ-μπαρ, πολυχώρους τέχνης (art hubs), street wear brands και skate structures, ειδικά για την αγορά της Θεσσαλονίκης.

Με βάση τα ακόλουθα τρέχοντα οικονομικά και λειτουργικά στοιχεία του "Thessaloniki Culture Cafe & Mini-Ramp Hub" (που βρίσκεται Ερμού & Δραγούμη), κάνε μια ρεαλιστική, διεισδυτική και αυστηρή επιχειρηματική αξιολόγηση.

ΛΕΙΤΟΥΡΓΙΚΑ ΔΕΔΟΜΕΝΑ & ΤΑΡΓΚΕΤ:
- Στόχος Κατανάλωσης Καφέ τις Καθημερινές (Weekday Target): ${weekdayTarget} κούπες/ημέρα
- Στόχος Κατανάλωσης Καφέ τα Σαββατοκύριακα (Weekend Target): ${weekendTarget} κούπες/ημέρα

ΟΙΚΟΝΟΜΙΚΑ ΣΤΟΙΧΕΙΑ ΜΗΝΙΑΙΩΣ:
- Μηνιαία Έσοδα από Specialty Coffee: ${monthlyCoffeeSalesRevenue}€
- Συμπερίληψη Έξτρα Υπηρεσιών: ${includeExtraSales ? "ΝΑΙ" : "ΟΧΙ"}
- Μηνιαία Έσοδα από Έξτρα Υπηρεσίες/Δράσεις: ${monthlyExtraRevenue}€
- Κόστος Καφέ (Coffee COGS): -${monthlyCoffeeCostOfGoodsSold}€
- Καθαρό Μηνιαίο Κέρδος προ Φόρων: ${netMonthlyProfitPreTax}€

ΣΤΑΘΕΡΑ ΜΗΝΙΑΙΑ ΕΞΟΔΑ:
${expensesList}

ΕΚΤΙΜΗΣΕΙΣ ΕΞΤΡΑ ΕΣΟΔΩΝ (ΑΠΟ ΥΠΗΡΕΣΙΕΣ/EVENTS):
${extraRevenueList}

ΑΝΑΛΥΣΗ ΝΕΚΡΟΥ ΣΗΜΕΙΟΥ (BREAK-EVEN):
- Μηνιαίος Κύκλος Εργασιών για Break-Even: ${monthlyBreakEvenInEuro}€
- Ημερήσιος Κύκλος Εργασιών για Break-Even: ${dailyBreakEvenInEuro}€

Σύνταξε μια ρεαλιστική και δομημένη ανάλυση στα ΕΛΛΗΝΙΚΑ (έως 250-300 λέξεις συνολικά για να είναι ευανάγνωστη), αποφεύγοντας γενικόλογα και κλισέ. Χώρισε την ανάλυση σε 3 σαφείς παραγράφους, καθεμία με έναν έντονο καλαίσθητο τίτλο:

1. **Ρεαλιστική Βιωσιμότητα & Break-Even**: Αξιολόγησε αν οι ημερήσιοι στόχοι καφέ (${weekdayTarget} & ${weekendTarget} κούπες) σε συνδυασμό με τα σταθερά έξοδα είναι ρεαλιστικοί για το κέντρο της Θεσσαλονίκης. Πες αν το break-even (${dailyBreakEvenInEuro}€ ημερησίως) απαιτεί εξαιρετικά υψηλή πίεση ή αν είναι εφικτό, λαμβάνοντας υπόψη το rental cost (1.500€ στην Ερμού) και τις μισθοδοσίες.
2. **Η Σημασία των Έξτρα Υπηρεσιών**: Σχολίασε το κατά πόσο τα έσοδα από τις έξτρα υπηρεσίες (${monthlyExtraRevenue}€) είναι η "σανίδα σωτηρίας" για το καθαρό κέρδος (${netMonthlyProfitPreTax}€). Ποιες από τις 23 διαθέσιμες υπηρεσίες (π.χ. Paint & Sip, Merchandise, Clothing Pop-ups, LEGO) έχουν το υψηλότερο καθαρό περιθώριο και πώς πρέπει να τις διαχειριστεί ο Ηλίας και η Στέλλα.
3. **Operational & Marketing Next Steps**: Δώσε 2 συγκεκριμένες, «street-smart» guerilla marketing ή λειτουργικές συμβουλές για τη Θεσσαλονίκη (π.χ. προσέγγιση ΑΠΘ, micro-partnerships με skaters/tattoo artists) που θα ανεβάσουν άμεσα τη μέση απόδειξη και θα φέρουν σταθερή ροή χωρίς ακριβές διαφημίσεις.

Μην χρησιμοποιείς φανταχτερό marketing hype ή αυτο-έπαινο, γίνε αυστηρός αλλά εποικοδομητικός σύμβουλος.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({
      success: true,
      commentary: response.text || "Δεν στάθηκε δυνατή η λήψη σχολίου από το AI. Δοκιμάστε ξανά."
    });
  } catch (error: any) {
    console.error("Gemini Commentary API error:", error);
    res.status(500).json({
      success: false,
      commentary: `⚠️ Σφάλμα κατά την επικοινωνία με το AI: ${error.message || error}`
    });
  }
});

// AI Period Closure Analysis endpoint
app.post("/api/generate-closure-analysis", async (req, res) => {
  try {
    const {
      periodType,
      totalSales,
      totalCogs,
      totalExpenses,
      netProfit,
      chartData = []
    } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        success: false,
        commentary: "⚠️ Για να λάβετε ρεαλιστική ανάλυση μέσω AI, παρακαλούμε προσθέστε ένα GEMINI_API_KEY στις Ρυθμίσεις (Settings > Secrets) της εφαρμογής. Η εφαρμογή θα ενημερωθεί αυτόματα!"
      });
    }

    const typeLabels: Record<string, string> = {
      month: "Μηνιαίο Κλείσιμο (1 Μήνας)",
      quarter: "Κλείσιμο Τριμήνου (3 Μήνες)",
      sixMonth: "Κλείσιμο 6μήνου (6 Μήνες)",
      year: "Ετήσιο Κλείσιμο (12 Μήνες)"
    };

    const pointsList = chartData
      .map((item: any) => `- ${item.name}: Έσοδα ${item.sales}€ | COGS ${item.cogs}€ | Πάγια ${item.expenses}€ | Καθαρό ${item.profit}€`)
      .join("\n");

    const prompt = `
Είσαι ένας έμπειρος, οξυδερκής και ρεαλιστής σύμβουλος επιχειρήσεων με ειδίκευση σε εναλλακτικά καφέ-μπαρ, διοργάνωση events και hubs στη Θεσσαλονίκη (περιοχή Ερμού & Δραγούμη).

Κάνε μια αυστηρή, αναλυτική και street-smart αξιολόγηση οικονομικού κλεισίματος για το "Thessaloniki Culture Cafe & Mini-Ramp Hub".

ΠΕΡΙΟΔΟΣ ΑΝΑΛΥΣΗΣ: ${typeLabels[periodType] || periodType}

ΣΥΓΚΕΝΤΡΩΤΙΚΑ ΣΤΟΙΧΕΙΑ ΠΕΡΙΟΔΟΥ:
- Συνολικά Έσοδα: ${totalSales}€
- Συνολικό Κόστος Καφέ (COGS): -${totalCogs}€
- Συνολικά Πάγια/Λειτουργικά Έξοδα: ${totalExpenses}€
- Καθαρό Κέρδος (προ φόρων): ${netProfit}€

ΑΝΑΛΥΤΙΚΑ ΣΤΟΙΧΕΙΑ ΠΟΡΕΙΑΣ ΣΕ ΕΠΙΜΕΡΟΥΣ ΣΗΜΕΙΑ (ΕΒΔΟΜΑΔΕΣ/ΜΗΝΕΣ):
${pointsList}

Σύνταξε μια δομημένη ανάλυση στα ΕΛΛΗΝΙΚΑ (έως 250-320 λέξεις συνολικά), αποφεύγοντας γενικόλογα και κλισέ. Χώρισε την απάντηση σε 3 σαφείς παραγράφους με έντονους τίτλους:

1. **Αξιολόγηση Οικονομικής Απόδοσης**: Σχολίασε αν η περίοδος κλείνει με θετική και βιώσιμη τάση, αν τα συνολικά έσοδα δικαιολογούν τα έξοδα και πώς επηρεάζει ο ρυθμός των πωλήσεων.
2. **Σημεία Προσοχής & Διαρροές**: Εντόπισε αν το κόστος COGS ή τα πάγια έξοδα είναι δυσανάλογα υψηλά. Πώς επηρεάζει η διαφορά μεταξύ των επιμέρους σημείων (εβδομάδων/μηνών) το τελικό αποτέλεσμα;
3. **Στρατηγικές Κινήσεις για την Επόμενη Περίοδο**: Δώσε 2 πολύ συγκεκριμένες, "street-smart" συμβουλές (π.χ. αύξηση της μέσης απόδοσης, αύξηση των events, αναπροσαρμογή COGS) που πρέπει να εφαρμόσουν άμεσα ο Ηλίας και η Στέλλα.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({
      success: true,
      commentary: response.text || "Δεν στάθηκε δυνατή η λήψη ανάλυσης από το AI."
    });
  } catch (error: any) {
    console.error("Gemini Closure API error:", error);
    res.status(500).json({
      success: false,
      commentary: `⚠️ Σφάλμα κατά την επικοινωνία με το AI: ${error.message || error}`
    });
  }
});

// Integrate Vite Dev Server or Production Static Files
async function startViteServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production build from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Application successfully listening on port ${PORT}`);
  });
}

startViteServer();
