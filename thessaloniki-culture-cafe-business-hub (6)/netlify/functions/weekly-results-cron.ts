import { Handler } from "@netlify/functions";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Lazy initialize Firebase Admin
const initFirebaseAdmin = () => {
  if (getApps().length === 0) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccountKey) {
      initializeApp({
        credential: cert(JSON.parse(serviceAccountKey))
      });
    } else {
      initializeApp();
    }
  }
  return getFirestore();
};

export const handler: Handler = async (event, context) => {
  console.log("Weekly CRON trigger: Generating weekly results email...");

  try {
    const db = initFirebaseAdmin();
    const hubsSnap = await db.collection("hubs").get();
    let emailContent = `
      <div style="font-family: sans-serif; color: #1f2937; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h1 style="color: #d97706; border-bottom: 2px solid #f59e0b; padding-bottom: 8px;">Weekly Performance Review - Thess Cult Hub</h1>
        <p style="font-size: 14px; text-align: right; color: #6b7280;">Ημερομηνία: ${new Date().toLocaleDateString("el-GR")}</p>
        <p>Αγαπητέ διαχειριστή,</p>
        <p>Ακολουθεί η εβδομαδιαία αναφορά των οικονομικών αποτελεσμάτων και προβλέψεων του Thess Cult Hub από τη βάση δεδομένων Firestore.</p>
    `;

    let reportFound = false;

    hubsSnap.forEach((doc) => {
      const data = doc.data();
      const hubId = doc.id;
      
      // Look for custom financialResults or fallback calculation schema
      const results = data.financialResults || {};
      const actualSales = results.actualSum || 0;
      const targetSales = results.targetSum || 0;
      const profit = results.netProfit || 0;
      const breakEven = results.breakEvenPoint || 0;
      
      reportFound = true;
      
      emailContent += `
        <div style="background-color: #fcfbf7; border: 1px solid #fef3c7; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <h2 style="margin-top: 0; color: #111827; font-size: 16px;">Κανάλι / Hub ID: <strong>${hubId}</strong></h2>
          <table width="100%" cellpadding="6" style="border-collapse: collapse; font-size: 13px;">
            <tr>
              <td style="border-bottom: 1px solid #f3f4f6;">📊 <strong>Εβδομαδιαίος Τζίρος:</strong></td>
              <td style="border-bottom: 1px solid #f3f4f6; text-align: right; font-weight: bold;">${actualSales.toLocaleString("el-GR")} €</td>
            </tr>
            <tr>
              <td style="border-bottom: 1px solid #f3f4f6;">🎯 <strong>Στόχος Εβδομάδας:</strong></td>
              <td style="border-bottom: 1px solid #f3f4f6; text-align: right; color: #4b5563;">${targetSales.toLocaleString("el-GR")} €</td>
            </tr>
            <tr>
              <td style="border-bottom: 1px solid #f3f4f6;">⚖️ <strong>Κατάσταση Στόχου:</strong></td>
              <td style="border-bottom: 1px solid #f3f4f6; text-align: right; font-weight: bold; color: ${actualSales >= targetSales ? '#10b981' : '#ef4444'};">
                ${actualSales >= targetSales ? '🏆 ΜΠΡΟΣΤΑ (Ahead)' : '⚠️ ΠΙΣΩ (Behind)'}
              </td>
            </tr>
            <tr>
              <td style="border-bottom: 1px solid #f3f4f6;">💸 <strong>Καθαρό Κέρδος:</strong></td>
              <td style="border-bottom: 1px solid #f3f4f6; text-align: right; font-weight: bold; color: ${profit >= 0 ? '#10b981' : '#ef4444'};">${profit.toLocaleString("el-GR")} €</td>
            </tr>
            <tr>
              <td style="border-bottom: 1px solid #f3f4f6;">📉 <strong>Νεκρό Σημείο (Break-even):</strong></td>
              <td style="border-bottom: 1px solid #f3f4f6; text-align: right; color: #2563eb;">${breakEven.toLocaleString("el-GR")} € / μήνα</td>
            </tr>
          </table>
        </div>
      `;
    });

    if (!reportFound) {
      emailContent += `
        <p style="color: #9ca3af; font-style: italic;">Δεν ανιχνεύθηκαν ενεργά οικονομικά δεδομένα για αυτή την εβδομάδα.</p>
      `;
    }

    emailContent += `
        <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 24px; border-top: 1px solid #f3f4f6; padding-top: 12px;">
          Thessaloniki Culture Cafe Business Hub Engine • Powered by Netlify Scheduled Functions
        </p>
      </div>
    `;

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: "Thess Cult Hub <reports@cult-hub.gr>",
          to: ["iliasmav6@gmail.com"],
          subject: `Weekly Financial Statement - Thess Cult Hub`,
          html: emailContent
        })
      });
      console.log(`Weekly email sent. Status code: ${response.status}`);
    } else {
      console.warn("⚠️ RESEND_API_KEY lacks. Simulated weekly email preview:");
      console.log(emailContent);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Weekly CRON executed successfully" })
    };
  } catch (err: any) {
    console.error("Weekly cron processing error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

// Execute every Sunday night at 23:59
export const config = {
  schedule: "59 23 * * 0"
};
