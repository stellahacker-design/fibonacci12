/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PorterForce {
  id: string;
  title: string;
  titleEn: string;
  scale: "ΧΑΜΗΛΗ" | "ΜΕΤΡΙΑ" | "ΥΨΗΛΗ" | "ΧΑΜΗΛΗ ΠΡΟΣ ΜΕΤΡΙΑ" | "ΜΕΤΡΙΑ ΠΡΟΣ ΥΨΗΛΗ";
  scaleColor: string;
  description: string;
  subFactors: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  type: "fixed" | "recurring";
  caption: string;
  revenueDesc: string;
  expenseDesc: string;
  profitDesc: string;
  targetDesc: string;
  partnerApproach: string;
  customerApproach: string;
  workflowSteps: {
    step: number;
    title: string;
    desc: string;
  }[];
}

export interface MarketingCategory {
  id: string;
  title: string;
  implementation: string;
  tools: string[];
  goals: string;
  indicators: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  category: string; // e.g., "custom", "general", etc.
  content: string;
}

export interface FinancialTableItem {
  id: string;
  label: string;
  weekdayVal: number;
  weekendVal: number;
  sundayVal: number;
  monthlyVal: number;
}

export interface ExpenseItem {
  id: string;
  category: string;
  label: string;
  amount: number;
}
