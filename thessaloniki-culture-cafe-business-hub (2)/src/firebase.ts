import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, doc, getDoc, setDoc, onSnapshot, Firestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../firebase-applet-config.json";

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with custom databaseId. We do not use persistent offline caching to ensure absolute real-time cloud data dependency as requested by the user, and fallback specifically to the user's provisioned FireStore DB ID to avoid default DB missing error.
const db: Firestore = initializeFirestore(
  app,
  {},
  firebaseConfig.firestoreDatabaseId || "ai-studio-7885ce2e-e3f2-46c2-bd39-b032a43d0d9c"
);

export { app, db };

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

/**
 * Handles Firestore permissions and missing data errors gracefully, reporting JSON context.
 */
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const auth = getAuth();
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Checks if a given error is due to being offline or having network issues.
 */
export function isOfflineError(err: any): boolean {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return true;
  }
  if (!err) return false;
  const msg = (err.message || String(err)).toLowerCase();
  const code = err.code || "";
  return (
    msg.includes("offline") ||
    msg.includes("network") ||
    msg.includes("failed to get document") ||
    code === "unavailable" ||
    code === "failed-precondition"
  );
}

/**
 * Checks if a given error is due to Firestore quota exhaustion.
 */
export function isQuotaError(err: any): boolean {
  if (!err) return false;
  const msg = (err.message || String(err)).toLowerCase();
  const code = String(err.code || "").toLowerCase();
  
  if (
    code === "resource-exhausted" ||
    code.includes("quota") ||
    code.includes("exhausted") ||
    msg.includes("quota") ||
    msg.includes("exhausted") ||
    msg.includes("billing") ||
    msg.includes("resource-exhausted")
  ) {
    return true;
  }
  
  // Also check if it's a JSON-wrapped FirestoreError (e.g. from handleFirestoreError)
  try {
    const parsed = JSON.parse(err.message || String(err));
    if (parsed && parsed.error) {
      const innerMsg = String(parsed.error).toLowerCase();
      if (
        innerMsg.includes("quota") ||
        innerMsg.includes("exhausted") ||
        innerMsg.includes("billing") ||
        innerMsg.includes("resource-exhausted")
      ) {
        return true;
      }
    }
  } catch (e) {
    // ignore parsing failure
  }

  return false;
}

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
  morningTicks?: any;
  busyTicks?: any;
  closingTicks?: any;
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
  questionnaireAnswers?: any;
  questionnaireSchema?: any;
  financialResults?: any;
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
  const path = `hubs/${hubId || DEFAULT_HUB_ID}`;
  try {
    const docRef = doc(db, "hubs", hubId || DEFAULT_HUB_ID);
    const payload = {
      ...dataBundle,
      updatedAt: new Date().toISOString(),
      updatedBy: "user_session"
    };
    await setDoc(docRef, payload, { merge: true });
  } catch (error) {
    if (isOfflineError(error)) {
      throw error;
    }
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Fetches the hub data bundle from Firestore.
 */
export async function fetchHubData(hubId: string): Promise<HubDataBundle | null> {
  const path = `hubs/${hubId || DEFAULT_HUB_ID}`;
  try {
    const docRef = doc(db, "hubs", hubId || DEFAULT_HUB_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as HubDataBundle;
    }
    return null;
  } catch (error) {
    if (isOfflineError(error)) {
      throw error;
    }
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
}

/**
 * Sets up a real-time listener for the hub data.
 */
export function subscribeToHubData(
  hubId: string, 
  callback: (data: HubDataBundle) => void,
  onError?: (err: any) => void
) {
  const path = `hubs/${hubId || DEFAULT_HUB_ID}`;
  const docRef = doc(db, "hubs", hubId || DEFAULT_HUB_ID);
  
  return onSnapshot(
    docRef, 
    (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as HubDataBundle);
      }
    },
    (error) => {
      if (isOfflineError(error)) {
        if (onError) onError(error);
        else console.info("Firebase: real-time subscription is offline.");
      } else {
        try {
          handleFirestoreError(error, OperationType.GET, path);
        } catch (wrappedError) {
          if (onError) onError(wrappedError);
        }
      }
    }
  );
}
