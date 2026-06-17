import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, doc, getDoc, setDoc, onSnapshot, Firestore } from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with custom databaseId if provided
const db: Firestore = initializeFirestore(app, {
  databaseId: firebaseConfig.firestoreDatabaseId || "(default)"
} as any);

export { app, db };

/**
 * Interface representing the complete business plan bundle to be saved in Firebase.
 */
export interface HubDataBundle {
  customTabs?: any;
  closureData?: any;
  execSummary?: any;
  swot?: any;
  pest?: any;
  industry?: any;
  tows?: any;
  stratChoices?: any;
  funcStrats?: any;
  timeline?: any;
  risks?: any;
  porter?: any;
  customValues?: any;
  customGoals?: any;
  customCapabilities?: any;
  customFuncStrats?: any;
  marketing?: any;
  services?: any;
  chapters?: any;
  visualSystem?: any;
  weekdayTarget?: number;
  weekendTarget?: number;
  sundayTarget?: number;
  operatingZones?: any;
  productCategories?: any;
  stockProducts?: any;
  baristaWorkflow?: any;
  staffEvaluation?: any;
  financialProducts?: any;
  financialTitle?: string;
  shopHours?: string;
  fixedExpenses?: any;
  extraServicesRevenue?: any;
  aiCommentary?: string;
  sitePassword?: string;
  updatedAt?: string;
  updatedBy?: string;
}

// Default Hub ID for the Thess Cult Hub
export const DEFAULT_HUB_ID = "thess_cult_hub";

/**
 * Saves the entire hub data bundle to Firestore.
 */
export async function saveHubData(hubId: string, dataBundle: HubDataBundle): Promise<void> {
  const docRef = doc(db, "hubs", hubId || DEFAULT_HUB_ID);
  const payload = {
    ...dataBundle,
    updatedAt: new Date().toISOString(),
    updatedBy: "user_session"
  };
  await setDoc(docRef, payload, { merge: true });
}

/**
 * Fetches the hub data bundle from Firestore.
 */
export async function fetchHubData(hubId: string): Promise<HubDataBundle | null> {
  const docRef = doc(db, "hubs", hubId || DEFAULT_HUB_ID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as HubDataBundle;
  }
  return null;
}

/**
 * Sets up a real-time listener for the hub data.
 */
export function subscribeToHubData(hubId: string, callback: (data: HubDataBundle) => void) {
  const docRef = doc(db, "hubs", hubId || DEFAULT_HUB_ID);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as HubDataBundle);
    }
  });
}
