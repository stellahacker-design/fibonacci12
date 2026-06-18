import { Handler } from "@netlify/functions";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Lazy-initialize Firebase Admin SDK inside handler to prevent build-time crashes if environment variables are missing
const initFirebaseAdmin = () => {
  if (getApps().length === 0) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccountKey) {
      initializeApp({
        credential: cert(JSON.parse(serviceAccountKey))
      });
    } else {
      // Fallback/Local development mode using environmental client config or log placeholder
      initializeApp();
    }
  }
  return getFirestore();
};

export const handler: Handler = async (event, context) => {
  console.log("Daily CRON trigger: Generating daily orders email...");

  try {
    const db = initFirebaseAdmin();
    // Fetch active business plan hubs to gather daily stats
    const hubsSnap = await db.collection("hubs").get();
    let emailContent = "<h1>Καθημερινή Αναφορά Παραγγελιών & Στοκ - Thess Cult Hub</h1>";
    let ordersReportFound = false;

    hubsSnap.forEach((doc) => {
      const data = doc.data();
      const hubId = doc.id;
      if (data.stockProducts && data.stockProducts.length > 0) {
        ordersReportFound = true;
        emailContent += `<h2>Hub ID: ${hubId}</h2>`;
        emailContent += `<table border="1" cellpadding="5" style="border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th>Προϊόν</th>
              <th>Κατηγορία</th>
              <th>Τρέχον Στοκ</th>
              <th>Ελλάχιστο Όριο</th>
              <th>Κατάσταση Παραγγελίας</th>
            </tr>
          </thead>
          <tbody>`;

        data.stockProducts.forEach((p: any) => {
          const needsOrder = p.currentStock <= p.minStock;
          emailContent += `<tr>
            <td>${p.label}</td>
            <td>${p.category === "bar" ? "Μπαρ" : "Κουζίνα"}</td>
            <td>${p.currentStock} ${p.unit}</td>
            <td>${p.minStock} ${p.unit}</td>
            <td style="color: ${needsOrder ? 'red' : 'green'}; font-weight: bold;">
              ${needsOrder ? '⚠️ ΧΡΕΙΑΖΕΤΑΙ ΠΑΡΑΓΓΕΛΙΑ' : '✅ ΕΠΑΡΚΕΣ'}
            </td>
          </tr>`;
        });
        emailContent += `</tbody></table><br/>`;
      }
    });

    if (!ordersReportFound) {
      emailContent += "<p>Δεν βρέθηκαν καταχωρημένα προϊόντα στοκ ή ενεργά Hubs στη βάση δεδομένων.</p>";
    }

    // Email delivery mockup - using Resend API or any standard email transport
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
          to: ["iliasmav6@gmail.com"], // Thess Cult Hub team admin email
          subject: `Daily Orders Plan - ${new Date().toLocaleDateString("el-GR")}`,
          html: emailContent
        })
      });
      console.log(`Email dispatched successfully to team admin. Status: ${response.status}`);
    } else {
      console.warn("⚠️ RESEND_API_KEY is not defined in environment variables. Outputting generated email content mock:");
      console.log(emailContent);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Daily process completed successfully", ordersProcessed: ordersReportFound })
    };
  } catch (err: any) {
    console.error("Error running daily cron handler:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

// Netlify configuration syntax for scheduled background execution (every night at 23:30)
export const config = {
  schedule: "30 23 * * *"
};
