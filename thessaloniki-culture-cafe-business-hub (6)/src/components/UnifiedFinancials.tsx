import React, { useState, useEffect, useMemo } from "react";
import { 
  Calendar, 
  TrendingUp, 
  Plus, 
  Trash2, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft,
  DollarSign, 
  PieChart as PieIcon, 
  BarChart2, 
  Layers, 
  Info,
  Sparkles,
  ArrowBigUp,
  ArrowBigDown,
  RefreshCw,
  Printer,
  Download,
  BookOpen,
  Check
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Default financials presets for years 2026 - 2030 to serve as initial states
const INITIAL_YEARS_DATA: Record<string, {
  products: Array<{ id: string; name: string; price: number; cogs: number; monthlyVolume: number }>;
  services: Array<{ id: string; name: string; price: number; cogs: number; monthlyVolume: number }>;
  fixedExpenses: Array<{ id: string; name: string; monthlyCost: number }>;
}> = {
  "2026": {
    products: [
      { id: "p1", name: "Specialty Coffee & Beverage", price: 4.50, cogs: 1.05, monthlyVolume: 0 },
      { id: "p2", name: "Artisanal Bakeries & Snacks", price: 5.50, cogs: 1.50, monthlyVolume: 0 },
      { id: "p3", name: "Street Culture Merch & Tees", price: 32.00, cogs: 12.00, monthlyVolume: 0 }
    ],
    services: [
      { id: "s1", name: "Skate Ramp Passes (Day)", price: 5.00, cogs: 0.50, monthlyVolume: 0 },
      { id: "s2", name: "Art Exhibition Comissions", price: 12.50, cogs: 1.50, monthlyVolume: 0 },
      { id: "s3", name: "Creative Art Workshops", price: 18.00, cogs: 3.00, monthlyVolume: 0 }
    ],
    fixedExpenses: [
      { id: "f1", name: "Ενοίκιο Χώρου & ΔΕΚΟ", monthlyCost: 1800 },
      { id: "f2", name: "Μισθοδοσία (2 Baristas/Skate staff)", monthlyCost: 2400 },
      { id: "f3", name: "Marketing & Street PR", monthlyCost: 400 },
      { id: "f4", name: "Λογιστικά & Λειτουργικά", monthlyCost: 500 }
    ]
  },
  "2027": {
    products: [
      { id: "p1", name: "Specialty Coffee & Beverage", price: 4.80, cogs: 1.10, monthlyVolume: 0 },
      { id: "p2", name: "Artisanal Bakeries & Snacks", price: 5.80, cogs: 1.60, monthlyVolume: 0 },
      { id: "p3", name: "Street Culture Merch & Tees", price: 35.00, cogs: 13.00, monthlyVolume: 0 }
    ],
    services: [
      { id: "s1", name: "Skate Ramp Passes (Day)", price: 6.00, cogs: 0.60, monthlyVolume: 0 },
      { id: "s2", name: "Art Exhibition Comissions", price: 15.00, cogs: 1.80, monthlyVolume: 0 },
      { id: "s3", name: "Creative Art Workshops", price: 20.00, cogs: 3.50, monthlyVolume: 0 }
    ],
    fixedExpenses: [
      { id: "f1", name: "Ενοίκιο Χώρου & ΔΕΚΟ", monthlyCost: 1950 },
      { id: "f2", name: "Μισθοδοσία (3 άτομα προσωπικό)", monthlyCost: 3200 },
      { id: "f3", name: "Marketing & Street PR", monthlyCost: 450 },
      { id: "f4", name: "Λογιστικά & Λειτουργικά", monthlyCost: 550 }
    ]
  },
  "2028": {
    products: [
      { id: "p1", name: "Specialty Coffee & Beverage", price: 5.00, cogs: 1.20, monthlyVolume: 0 },
      { id: "p2", name: "Artisanal Bakeries & Snacks", price: 6.00, cogs: 1.70, monthlyVolume: 0 },
      { id: "p3", name: "Street Culture Merch & Tees", price: 38.00, cogs: 14.00, monthlyVolume: 0 }
    ],
    services: [
      { id: "s1", name: "Skate Ramp Passes (Day)", price: 6.00, cogs: 0.60, monthlyVolume: 0 },
      { id: "s2", name: "Art Exhibition Comissions", price: 18.00, cogs: 2.00, monthlyVolume: 0 },
      { id: "s3", name: "Creative Art Workshops", price: 22.00, cogs: 4.00, monthlyVolume: 0 }
    ],
    fixedExpenses: [
      { id: "f1", name: "Ενοίκιο Χώρου & ΔΕΚΟ", monthlyCost: 2100 },
      { id: "f2", name: "Μισθοδοσία (3 άτομα προσωπικό)", monthlyCost: 3400 },
      { id: "f3", name: "Marketing & Street PR", monthlyCost: 500 },
      { id: "f4", name: "Λογιστικά & Λειτουργικά", monthlyCost: 600 }
    ]
  },
  "2029": {
    products: [
      { id: "p1", name: "Specialty Coffee & Beverage", price: 5.20, cogs: 1.25, monthlyVolume: 0 },
      { id: "p2", name: "Artisanal Bakeries & Snacks", price: 6.50, cogs: 1.80, monthlyVolume: 0 },
      { id: "p3", name: "Street Culture Merch & Tees", price: 40.00, cogs: 15.00, monthlyVolume: 0 }
    ],
    services: [
      { id: "s1", name: "Skate Ramp Passes (Day)", price: 7.00, cogs: 0.70, monthlyVolume: 0 },
      { id: "s2", name: "Art Exhibition Comissions", price: 20.00, cogs: 2.20, monthlyVolume: 0 },
      { id: "s3", name: "Creative Art Workshops", price: 25.00, cogs: 4.50, monthlyVolume: 0 }
    ],
    fixedExpenses: [
      { id: "f1", name: "Ενοίκιο Χώρου & ΔΕΚΟ", monthlyCost: 2200 },
      { id: "f2", name: "Μισθοδοσία (4 άτομα προσωπικό)", monthlyCost: 4500 },
      { id: "f3", name: "Marketing & Street PR", monthlyCost: 550 },
      { id: "f4", name: "Λογιστικά & Λειτουργικά", monthlyCost: 650 }
    ]
  },
  "2030": {
    products: [
      { id: "p1", name: "Specialty Coffee & Beverage", price: 5.50, cogs: 1.30, monthlyVolume: 0 },
      { id: "p2", name: "Artisanal Bakeries & Snacks", price: 7.00, cogs: 2.00, monthlyVolume: 0 },
      { id: "p3", name: "Street Culture Merch & Tees", price: 45.00, cogs: 16.00, monthlyVolume: 0 }
    ],
    services: [
      { id: "s1", name: "Skate Ramp Passes (Day)", price: 8.00, cogs: 0.80, monthlyVolume: 0 },
      { id: "s2", name: "Art Exhibition Comissions", price: 22.00, cogs: 2.50, monthlyVolume: 0 },
      { id: "s3", name: "Creative Art Workshops", price: 30.00, cogs: 5.00, monthlyVolume: 0 }
    ],
    fixedExpenses: [
      { id: "f1", name: "Ενοίκιο Χώρου & ΔΕΚΟ", monthlyCost: 2300 },
      { id: "f2", name: "Μισθοδοσία (4 άτομα προσωπικό)", monthlyCost: 4800 },
      { id: "f3", name: "Marketing & Street PR", monthlyCost: 600 },
      { id: "f4", name: "Λογιστικά & Λειτουργικά", monthlyCost: 700 }
    ]
  }
};

const STATS_TIMEFRAMES = [
  { id: "day", label: "Ημέρα", multiplier: 1 / 30, text: "Ημερήσια Ανάλυση" },
  { id: "week", label: "Εβδομάδα", multiplier: 7 / 30, text: "Εβδομαδιαία Ανάλυση" },
  { id: "month", label: "Μήνας", multiplier: 1, text: "Μηνιαία Ανάλυση" },
  { id: "quarter", label: "Τρίμηνο (3Μ)", multiplier: 3, text: "Τριμηνιαία Ανάλυση" },
  { id: "sixMonth", label: "6μηνο (6Μ)", multiplier: 6, text: "Εξαμηνιαία Ανάλυση" },
  { id: "year", label: "Έτος (12Μ)", multiplier: 12, text: "Ετήσια Ανάλυση" }
];

const formatCurrency = (val: number) => {
  return val.toLocaleString("el-GR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const getPeriodMultiplier = (type: string) => {
  switch (type) {
    case 'day': return 1 / 30;
    case 'week': return 7 / 30;
    case 'quarter': return 3;
    case 'sixMonth': return 6;
    case 'year': return 12;
    case 'month':
    default:
      return 1;
  }
};

const getPeriodLabel = (type: string) => {
  switch (type) {
    case 'day': return 'Μέρα';
    case 'week': return 'Εβδομάδα';
    case 'quarter': return 'Τρίμηνο';
    case 'sixMonth': return 'Εξάμηνο';
    case 'year': return 'Έτος';
    case 'month':
    default:
      return 'Μήνας';
  }
};

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"];

export default function UnifiedFinancials() {
  const [yearsData, setYearsData] = useState<Record<string, typeof INITIAL_YEARS_DATA["2026"]>>(() => {
    const saved = localStorage.getItem("thess_cult_hub_unified_years_financials");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse financials, reverting to mock", e);
      }
    }
    return INITIAL_YEARS_DATA;
  });

  const [selectedYear, setSelectedYear] = useState<string>(() => {
    return localStorage.getItem("thess_cult_hub_unified_selected_year") || "2026";
  });
  const [selectedPeriod, setSelectedPeriod] = useState<string>("month");

  // Daily actual records state
  const [dailyActuals, setDailyActuals] = useState<Record<string, {
    products: Record<string, number>; // id -> quantity
    services: Record<string, number>; // id -> quantity
    additionalRevenue: number;
    additionalLoss: number;
    notes: string;
  }>>(() => {
    const saved = localStorage.getItem("thess_cult_hub_unified_daily_actuals");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse daily actuals", e);
      }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_unified_daily_actuals", JSON.stringify(dailyActuals));
  }, [dailyActuals]);

  // Calendar states (synced with selectedYear initially)
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState<number>(5); // Default to June (index 5)
  const [currentCalendarYear, setCurrentCalendarYear] = useState<number>(2026);
  const [selectedDateStr, setSelectedDateStr] = useState<string>("2026-06-18");
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Manual overall revenue recordings state
  const [manualRevenues, setManualRevenues] = useState<Array<{
    id: string;
    date: string;
    periodType: string; // 'day' | 'week' | 'month' | 'quarter' | 'sixMonth' | 'year'
    revenue: number;
    notes?: string;
  }>>(() => {
    const saved = localStorage.getItem("thess_cult_hub_manual_revenues");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse manual revenues", e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_manual_revenues", JSON.stringify(manualRevenues));
  }, [manualRevenues]);

  const [manualFormDate, setManualFormDate] = useState<string>("2026-06-18");
  const [manualFormAmount, setManualFormAmount] = useState<string>("");
  const [manualFormPeriod, setManualFormPeriod] = useState<string>("month");
  const [manualFormNotes, setManualFormNotes] = useState<string>("");
  const [activeSummaryTab, setActiveSummaryTab] = useState<"plan" | "manual">("plan");

  const addManualRevenue = () => {
    const amt = parseFloat(manualFormAmount);
    if (isNaN(amt) || amt < 0) {
      alert("Παρακαλώ εισάγετε ένα έγκυρο θετικό ποσό εσόδων.");
      return;
    }
    const newEntry = {
      id: "man_" + Date.now(),
      date: manualFormDate,
      periodType: manualFormPeriod,
      revenue: amt,
      notes: manualFormNotes || ""
    };
    setManualRevenues(prev => [newEntry, ...prev]);
    setManualFormAmount("");
    setManualFormNotes("");
  };

  const removeManualRevenue = (id: string) => {
    setManualRevenues(prev => prev.filter(r => r.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_unified_selected_year", selectedYear);
    window.dispatchEvent(new Event("financials-updated"));
    const yr = Number(selectedYear);
    if (!isNaN(yr)) {
      setCurrentCalendarYear(yr);
      // Sync default selected date string
      const monthStr = String(currentCalendarMonth + 1).padStart(2, "0");
      setSelectedDateStr(`${yr}-${monthStr}-15`);
    }
  }, [selectedYear]);

  // Save changes to localStorage whenever yearsData updates
  useEffect(() => {
    localStorage.setItem("thess_cult_hub_unified_years_financials", JSON.stringify(yearsData));
    window.dispatchEvent(new Event("financials-updated"));
  }, [yearsData]);

  // Current year data ref
  const activeYearData = useMemo(() => {
    return yearsData[selectedYear] || INITIAL_YEARS_DATA[selectedYear] || INITIAL_YEARS_DATA["2026"];
  }, [yearsData, selectedYear]);

  // Active multiplier
  const periodSpec = STATS_TIMEFRAMES.find(t => t.id === selectedPeriod) || STATS_TIMEFRAMES[0];
  const multiplier = periodSpec.multiplier;

  // Form Handlers to easily update items
  const updateProduct = (id: string, updatedFields: Partial<typeof INITIAL_YEARS_DATA["2026"]["products"][0]>) => {
    setYearsData(prev => {
      const year = prev[selectedYear] || { products: [], services: [], fixedExpenses: [] };
      const updatedProducts = year.products.map(p => p.id === id ? { ...p, ...updatedFields } : p);
      return {
        ...prev,
        [selectedYear]: {
          ...year,
          products: updatedProducts
        }
      };
    });
  };

  const updateService = (id: string, updatedFields: Partial<typeof INITIAL_YEARS_DATA["2026"]["services"][0]>) => {
    setYearsData(prev => {
      const year = prev[selectedYear] || { products: [], services: [], fixedExpenses: [] };
      const updatedServices = year.services.map(s => s.id === id ? { ...s, ...updatedFields } : s);
      return {
        ...prev,
        [selectedYear]: {
          ...year,
          services: updatedServices
        }
      };
    });
  };

  const updateFixedExpense = (id: string, updatedFields: Partial<typeof INITIAL_YEARS_DATA["2026"]["fixedExpenses"][0]>) => {
    setYearsData(prev => {
      const year = prev[selectedYear] || { products: [], services: [], fixedExpenses: [] };
      const updatedExpenses = year.fixedExpenses.map(f => f.id === id ? { ...f, ...updatedFields } : f);
      return {
        ...prev,
        [selectedYear]: {
          ...year,
          fixedExpenses: updatedExpenses
        }
      };
    });
  };

  const addProduct = () => {
    const newId = "product-" + Date.now();
    setYearsData(prev => {
      const year = prev[selectedYear] || { products: [], services: [], fixedExpenses: [] };
      return {
        ...prev,
        [selectedYear]: {
          ...year,
          products: [
            ...year.products,
            { id: newId, name: "Νέο Προϊόν " + (year.products.length + 1), price: 5.00, cogs: 1.50, monthlyVolume: 100 }
          ]
        }
      };
    });
  };

  const addService = () => {
    const newId = "service-" + Date.now();
    setYearsData(prev => {
      const year = prev[selectedYear] || { products: [], services: [], fixedExpenses: [] };
      return {
        ...prev,
        [selectedYear]: {
          ...year,
          services: [
            ...year.services,
            { id: newId, name: "Νέα Υπηρεσία " + (year.services.length + 1), price: 10.00, cogs: 1.00, monthlyVolume: 50 }
          ]
        }
      };
    });
  };

  const addFixedExpense = () => {
    const newId = "fixed-" + Date.now();
    setYearsData(prev => {
      const year = prev[selectedYear] || { products: [], services: [], fixedExpenses: [] };
      return {
        ...prev,
        [selectedYear]: {
          ...year,
          fixedExpenses: [
            ...year.fixedExpenses,
            { id: newId, name: "Νέο Σταθερό Έξοδο", monthlyCost: 200 }
          ]
        }
      };
    });
  };

  const removeProduct = (id: string) => {
    setYearsData(prev => {
      const year = prev[selectedYear];
      if (!year) return prev;
      return {
        ...prev,
        [selectedYear]: {
          ...year,
          products: year.products.filter(p => p.id !== id)
        }
      };
    });
  };

  const removeService = (id: string) => {
    setYearsData(prev => {
      const year = prev[selectedYear];
      if (!year) return prev;
      return {
        ...prev,
        [selectedYear]: {
          ...year,
          services: year.services.filter(s => s.id !== id)
        }
      };
    });
  };

  const removeFixedExpense = (id: string) => {
    setYearsData(prev => {
      const year = prev[selectedYear];
      if (!year) return prev;
      return {
        ...prev,
        [selectedYear]: {
          ...year,
          fixedExpenses: year.fixedExpenses.filter(f => f.id !== id)
        }
      };
    });
  };

  const resetToFactory = () => {
    if (window.confirm("Θέλετε να επαναφέρετε όλα τα οικονομικά δεδομένα στις αρχικές τους τιμές;")) {
      setYearsData(INITIAL_YEARS_DATA);
    }
  };

  // Calculations scaled for active period (Month / Q / 6M / Year) based on actual daily logged sales
  const financialMetrics = useMemo(() => {
    const { products, services, fixedExpenses } = activeYearData;

    const includedDates = new Set<string>();
    const parsedDate = new Date(selectedDateStr);

    if (selectedPeriod === "day") {
      includedDates.add(selectedDateStr);
    } else if (selectedPeriod === "week") {
      const dayOfWeek = parsedDate.getDay(); // 0 = Sunday, 1 = Monday, ...
      const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      const monday = new Date(parsedDate);
      monday.setDate(parsedDate.getDate() + diffToMonday);
      
      for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const yStr = d.getFullYear();
        const mStr = String(d.getMonth() + 1).padStart(2, "0");
        const dStr = String(d.getDate()).padStart(2, "0");
        includedDates.add(`${yStr}-${mStr}-${dStr}`);
      }
    } else if (selectedPeriod === "month") {
      const daysInMonthNum = new Date(currentCalendarYear, currentCalendarMonth + 1, 0).getDate();
      const mStr = String(currentCalendarMonth + 1).padStart(2, "0");
      for (let d = 1; d <= daysInMonthNum; d++) {
        const dStr = String(d).padStart(2, "0");
        includedDates.add(`${currentCalendarYear}-${mStr}-${dStr}`);
      }
    } else if (selectedPeriod === "quarter") {
      const qStartMonth = Math.floor(currentCalendarMonth / 3) * 3;
      for (let m = qStartMonth; m < qStartMonth + 3; m++) {
        const daysInMonthNum = new Date(currentCalendarYear, m + 1, 0).getDate();
        const mStr = String(m + 1).padStart(2, "0");
        for (let d = 1; d <= daysInMonthNum; d++) {
          const dStr = String(d).padStart(2, "0");
          includedDates.add(`${currentCalendarYear}-${mStr}-${dStr}`);
        }
      }
    } else if (selectedPeriod === "sixMonth") {
      const smStartMonth = currentCalendarMonth < 6 ? 0 : 6;
      for (let m = smStartMonth; m < smStartMonth + 6; m++) {
        const daysInMonthNum = new Date(currentCalendarYear, m + 1, 0).getDate();
        const mStr = String(m + 1).padStart(2, "0");
        for (let d = 1; d <= daysInMonthNum; d++) {
          const dStr = String(d).padStart(2, "0");
          includedDates.add(`${currentCalendarYear}-${mStr}-${dStr}`);
        }
      }
    } else if (selectedPeriod === "year") {
      for (let m = 0; m < 12; m++) {
        const daysInMonthNum = new Date(currentCalendarYear, m + 1, 0).getDate();
        const mStr = String(m + 1).padStart(2, "0");
        for (let d = 1; d <= daysInMonthNum; d++) {
          const dStr = String(d).padStart(2, "0");
          includedDates.add(`${currentCalendarYear}-${mStr}-${dStr}`);
        }
      }
    }

    const productQuantities: Record<string, number> = {};
    const serviceQuantities: Record<string, number> = {};
    let totalAdditionalRevenue = 0;
    let totalAdditionalLoss = 0;

    includedDates.forEach(dateKey => {
      const log = dailyActuals[dateKey];
      if (log) {
        totalAdditionalRevenue += Number(log.additionalRevenue || 0);
        totalAdditionalLoss += Number(log.additionalLoss || 0);

        if (log.products) {
          Object.entries(log.products).forEach(([pId, qty]) => {
            productQuantities[pId] = (productQuantities[pId] || 0) + Number(qty || 0);
          });
        }
        if (log.services) {
          Object.entries(log.services).forEach(([sId, qty]) => {
            serviceQuantities[sId] = (serviceQuantities[sId] || 0) + Number(qty || 0);
          });
        }
      }
    });

    // Revenue breakdown
    const productItemsData = products.map(p => {
      const qty = productQuantities[p.id] || 0;
      const revenue = p.price * qty;
      const cogs = p.cogs * qty;
      const profit = revenue - cogs;
      return {
        id: p.id,
        name: p.name,
        revenue,
        cogs,
        profit,
        volume: qty
      };
    });

    const serviceItemsData = services.map(s => {
      const qty = serviceQuantities[s.id] || 0;
      const revenue = s.price * qty;
      const cogs = s.cogs * qty;
      const profit = revenue - cogs;
      return {
        id: s.id,
        name: s.name,
        revenue,
        cogs,
        profit,
        volume: qty
      };
    });

    const fixedItemsData = fixedExpenses.map(f => {
      return {
        id: f.id,
        name: f.name,
        cost: f.monthlyCost * multiplier
      };
    });

    const productRevSum = productItemsData.reduce((acc, curr) => acc + curr.revenue, 0);
    const serviceRevSum = serviceItemsData.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalRevenue = productRevSum + serviceRevSum + totalAdditionalRevenue;

    const productCogsSum = productItemsData.reduce((acc, curr) => acc + curr.cogs, 0);
    const serviceCogsSum = serviceItemsData.reduce((acc, curr) => acc + curr.cogs, 0);
    const totalCOGS = productCogsSum + serviceCogsSum + totalAdditionalLoss;

    const totalFixed = fixedExpenses.reduce((acc, curr) => acc + curr.monthlyCost * multiplier, 0);

    const totalExpenses = totalCOGS + totalFixed;
    const netProfit = totalRevenue - totalExpenses;

    return {
      productItemsData,
      serviceItemsData,
      fixedItemsData,
      productRevSum,
      serviceRevSum,
      totalRevenue,
      productCogsSum,
      serviceCogsSum,
      totalCOGS,
      totalFixed,
      totalExpenses,
      netProfit
    };
  }, [activeYearData, multiplier, dailyActuals, selectedDateStr, selectedPeriod, currentCalendarMonth, currentCalendarYear]);

  // Aggregate stats per year to display on the mini calendar selector buttons
  const yearsAggregates = useMemo(() => {
    const result: Record<string, { totalRevenue: number; netProfit: number }> = {};
    
    Object.keys(yearsData).forEach(yr => {
      result[yr] = { totalRevenue: 0, netProfit: 0 };
    });

    Object.keys(dailyActuals).forEach((dateKey) => {
      const log = dailyActuals[dateKey];
      if (!log) return;
      const yearPart = dateKey.split("-")[0];
      if (result[yearPart]) {
        let revStr = Number(log.additionalRevenue || 0);
        let cogsStr = Number(log.additionalLoss || 0);

        const entry = yearsData[yearPart];
        if (entry) {
          if (log.products) {
            Object.entries(log.products).forEach(([pId, qty]) => {
              const product = entry.products.find(p => p.id === pId);
              if (product) {
                revStr += Number(qty || 0) * product.price;
                cogsStr += Number(qty || 0) * product.cogs;
              }
            });
          }
          if (log.services) {
            Object.entries(log.services).forEach(([sId, qty]) => {
              const service = entry.services.find(s => s.id === sId);
              if (service) {
                revStr += Number(qty || 0) * service.price;
                cogsStr += Number(qty || 0) * service.cogs;
              }
            });
          }
        }

        result[yearPart].totalRevenue += revStr;
        result[yearPart].netProfit += (revStr - cogsStr);
      }
    });

    Object.keys(result).forEach(yr => {
      const entry = yearsData[yr];
      if (entry) {
        const annualFixed = entry.fixedExpenses.reduce((sum, f) => sum + (f.monthlyCost * 12), 0);
        result[yr].netProfit -= annualFixed;
      }
    });

    return result;
  }, [yearsData, dailyActuals]);

  // Chart data 1: P&L Summary
  const plChartData = [
    {
      name: periodSpec.text,
      Έσοδα: Math.round(financialMetrics.totalRevenue),
      "Κόστος (COGS)": Math.round(financialMetrics.totalCOGS),
      "Σταθερά Έξοδα": Math.round(financialMetrics.totalFixed),
      "Καθαρό Κέρδος": Math.round(financialMetrics.netProfit)
    }
  ];

  // Chart data 2: Revenue Pie Chart
  const revenuePieData = useMemo(() => {
    const data: Array<{ name: string; value: number }> = [];
    financialMetrics.productItemsData.forEach(p => {
      if (p.revenue > 0) {
        data.push({ name: `${p.name} (Προϊόν)`, value: Math.round(p.revenue) });
      }
    });
    financialMetrics.serviceItemsData.forEach(s => {
      if (s.revenue > 0) {
        data.push({ name: `${s.name} (Υπηρεσία)`, value: Math.round(s.revenue) });
      }
    });
    return data;
  }, [financialMetrics]);

  // Chart data 3: Cost Distribution Pie Chart
  const costPieData = useMemo(() => {
    const data: Array<{ name: string; value: number }> = [];
    if (financialMetrics.totalCOGS > 0) {
      data.push({ name: "Μεταβλητό Κόστος (COGS)", value: Math.round(financialMetrics.totalCOGS) });
    }
    financialMetrics.fixedItemsData.forEach(f => {
      if (f.cost > 0) {
        data.push({ name: f.name, value: Math.round(f.cost) });
      }
    });
    return data;
  }, [financialMetrics]);

  // --- GREEK CALENDAR HELPERS & ACTUALS LOGIC ---
  const GREEK_MONTHS = [
    "Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος",
    "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
  ];
  const GREEK_WEEKDAYS = ["Δε", "Τρ", "Τε", "Πε", "Πα", "Σα", "Κυ"];

  // Monthly aggregated statistics from daily log entries
  const currentMonthDailyActuals = useMemo(() => {
    const list: Array<{ date: string; dayNum: number; revenue: number; cogs: number; profit: number; note: string; hasData: boolean }> = [];
    const daysInMonthNum = new Date(currentCalendarYear, currentCalendarMonth + 1, 0).getDate();
    
    let totalActRevenue = 0;
    let totalActCogs = 0;
    let entriesCount = 0;
    
    // Detailed list of notes
    const monthNotesList: Array<{ date: string; note: string }> = [];

    for (let d = 1; d <= daysInMonthNum; d++) {
      const dayStr = String(d).padStart(2, "0");
      const monthStr = String(currentCalendarMonth + 1).padStart(2, "0");
      const dateKey = `${currentCalendarYear}-${monthStr}-${dayStr}`;
      
      const log = dailyActuals[dateKey];
      if (log) {
        let dayRevenue = Number(log.additionalRevenue || 0);
        let dayCogs = Number(log.additionalLoss || 0);
        
        if (log.products) {
          Object.entries(log.products).forEach(([pId, qty]) => {
            const product = activeYearData.products.find(p => p.id === pId);
            if (product) {
              dayRevenue += Number(qty || 0) * product.price;
              dayCogs += Number(qty || 0) * product.cogs;
            }
          });
        }
        
        if (log.services) {
          Object.entries(log.services).forEach(([sId, qty]) => {
            const service = activeYearData.services.find(s => s.id === sId);
            if (service) {
              dayRevenue += Number(qty || 0) * service.price;
              dayCogs += Number(qty || 0) * service.cogs;
            }
          });
        }
        
        const dayProfit = dayRevenue - dayCogs;
        totalActRevenue += dayRevenue;
        totalActCogs += dayCogs;
        entriesCount++;
        
        if (log.notes) {
          monthNotesList.push({ date: `${dayStr}/${monthStr}/${currentCalendarYear}`, note: log.notes });
        }

        list.push({
          date: dateKey,
          dayNum: d,
          revenue: dayRevenue,
          cogs: dayCogs,
          profit: dayProfit,
          note: log.notes || "",
          hasData: true
        });
      } else {
        list.push({
          date: dateKey,
          dayNum: d,
          revenue: 0,
          cogs: 0,
          profit: 0,
          note: "",
          hasData: false
        });
      }
    }
    
    return {
      daysList: list,
      totalActualRevenue: totalActRevenue,
      totalActualCogs: totalActCogs,
      totalActualProfit: totalActRevenue - totalActCogs,
      entriesCount,
      monthNotesList
    };
  }, [dailyActuals, currentCalendarMonth, currentCalendarYear, activeYearData]);

  // Aggregate monthly actual items volumes and completion rates vs target monthly volumes
  const monthlyItemizedActuals = useMemo(() => {
    const productQtyMap: Record<string, number> = {};
    const serviceQtyMap: Record<string, number> = {};
    
    // Initialize
    activeYearData.products.forEach(p => { productQtyMap[p.id] = 0; });
    activeYearData.services.forEach(s => { serviceQtyMap[s.id] = 0; });
    
    const daysInMonthNum = new Date(currentCalendarYear, currentCalendarMonth + 1, 0).getDate();
    for (let d = 1; d <= daysInMonthNum; d++) {
      const dayStr = String(d).padStart(2, "0");
      const monthStr = String(currentCalendarMonth + 1).padStart(2, "0");
      const dateKey = `${currentCalendarYear}-${monthStr}-${dayStr}`;
      const log = dailyActuals[dateKey];
      
      if (log) {
        if (log.products) {
          Object.entries(log.products).forEach(([pId, qty]) => {
            productQtyMap[pId] = (productQtyMap[pId] || 0) + Number(qty || 0);
          });
        }
        if (log.services) {
          Object.entries(log.services).forEach(([sId, qty]) => {
            serviceQtyMap[sId] = (serviceQtyMap[sId] || 0) + Number(qty || 0);
          });
        }
      }
    }
    
    const productsDetails = activeYearData.products.map(p => {
      const actualQty = productQtyMap[p.id] || 0;
      const actualRevenue = actualQty * p.price;
      const actualCogs = actualQty * p.cogs;
      const actualProfit = actualRevenue - actualCogs;
      const completionRate = p.monthlyVolume > 0 ? (actualQty / p.monthlyVolume) * 100 : 0;
      return {
        ...p,
        actualQty,
        actualRevenue,
        actualCogs,
        actualProfit,
        completionRate
      };
    });

    const servicesDetails = activeYearData.services.map(s => {
      const actualQty = serviceQtyMap[s.id] || 0;
      const actualRevenue = actualQty * s.price;
      const actualCogs = actualQty * s.cogs;
      const actualProfit = actualRevenue - actualCogs;
      const completionRate = s.monthlyVolume > 0 ? (actualQty / s.monthlyVolume) * 100 : 0;
      return {
        ...s,
        actualQty,
        actualRevenue,
        actualCogs,
        actualProfit,
        completionRate
      };
    });

    const totalFixedExpenses = activeYearData.fixedExpenses.reduce((sum, item) => sum + item.monthlyCost, 0);

    return {
      productsDetails,
      servicesDetails,
      totalFixedExpenses
    };
  }, [dailyActuals, currentCalendarMonth, currentCalendarYear, activeYearData]);

  // Generate grid cells for calendar
  const calendarDaysGrid = useMemo(() => {
    const days: Array<{ dayNum: number | null; dateKey: string | null; isCurrent: boolean; hasData: boolean; dayRevenue: number }> = [];
    const daysInMonthNum = new Date(currentCalendarYear, currentCalendarMonth + 1, 0).getDate();
    
    let tempDay = new Date(currentCalendarYear, currentCalendarMonth, 1).getDay();
    const firstDayIdx = tempDay === 0 ? 6 : tempDay - 1;
    
    // Padding
    for (let i = 0; i < firstDayIdx; i++) {
      days.push({ dayNum: null, dateKey: null, isCurrent: false, hasData: false, dayRevenue: 0 });
    }
    
    // Days
    for (let d = 1; d <= daysInMonthNum; d++) {
      const dayStr = String(d).padStart(2, "0");
      const monthStr = String(currentCalendarMonth + 1).padStart(2, "0");
      const dateKey = `${currentCalendarYear}-${monthStr}-${dayStr}`;
      
      const log = dailyActuals[dateKey];
      let dayRev = 0;
      if (log) {
        dayRev += Number(log.additionalRevenue || 0);
        if (log.products) {
          Object.entries(log.products).forEach(([pId, qty]) => {
            const product = activeYearData.products.find(p => p.id === pId);
            if (product) dayRev += Number(qty || 0) * product.price;
          });
        }
        if (log.services) {
          Object.entries(log.services).forEach(([sId, qty]) => {
            const service = activeYearData.services.find(s => s.id === sId);
            if (service) dayRev += Number(qty || 0) * service.price;
          });
        }
      }
      
      days.push({
        dayNum: d,
        dateKey,
        isCurrent: true,
        hasData: !!log,
        dayRevenue: dayRev
      });
    }
    
    return days;
  }, [currentCalendarMonth, currentCalendarYear, dailyActuals, activeYearData]);

  // Focused day details
  const selectedDayData = useMemo(() => {
    const log = dailyActuals[selectedDateStr] || {
      products: {},
      services: {},
      additionalRevenue: 0,
      additionalLoss: 0,
      notes: ""
    };
    
    let calculatedRevenue = Number(log.additionalRevenue || 0);
    let calculatedCogs = Number(log.additionalLoss || 0);
    
    const prodDetails: Array<{ id: string; name: string; price: number; cogs: number; qty: number }> = [];
    activeYearData.products.forEach(p => {
      const q = log.products?.[p.id] || 0;
      calculatedRevenue += Number(q) * p.price;
      calculatedCogs += Number(q) * p.cogs;
      prodDetails.push({ ...p, qty: q });
    });
    
    const servDetails: Array<{ id: string; name: string; price: number; cogs: number; qty: number }> = [];
    activeYearData.services.forEach(s => {
      const q = log.services?.[s.id] || 0;
      calculatedRevenue += Number(q) * s.price;
      calculatedCogs += Number(q) * s.cogs;
      servDetails.push({ ...s, qty: q });
    });
    
    return {
      dateStr: selectedDateStr,
      products: prodDetails,
      services: servDetails,
      additionalRevenue: Number(log.additionalRevenue || 0),
      additionalLoss: Number(log.additionalLoss || 0),
      notes: log.notes || "",
      totalRevenue: calculatedRevenue,
      totalCogs: calculatedCogs,
      totalProfit: calculatedRevenue - calculatedCogs,
      rawLog: log
    };
  }, [selectedDateStr, dailyActuals, activeYearData]);

  // Mutations
  const updateDailyProductQty = (pId: string, q: number) => {
    setDailyActuals(prev => {
      const day = prev[selectedDateStr] || { products: {}, services: {}, additionalRevenue: 0, additionalLoss: 0, notes: "" };
      const nextProducts = { ...(day.products || {}) };
      if (q <= 0) delete nextProducts[pId];
      else nextProducts[pId] = q;
      
      return {
        ...prev,
        [selectedDateStr]: {
          ...day,
          products: nextProducts
        }
      };
    });
  };

  const updateDailyServiceQty = (sId: string, q: number) => {
    setDailyActuals(prev => {
      const day = prev[selectedDateStr] || { products: {}, services: {}, additionalRevenue: 0, additionalLoss: 0, notes: "" };
      const nextServices = { ...(day.services || {}) };
      if (q <= 0) delete nextServices[sId];
      else nextServices[sId] = q;
      
      return {
        ...prev,
        [selectedDateStr]: {
          ...day,
          services: nextServices
        }
      };
    });
  };

  const updateDailyAdditional = (rev: number, exp: number) => {
    setDailyActuals(prev => {
      const day = prev[selectedDateStr] || { products: {}, services: {}, additionalRevenue: 0, additionalLoss: 0, notes: "" };
      return {
        ...prev,
        [selectedDateStr]: {
          ...day,
          additionalRevenue: rev,
          additionalLoss: exp
        }
      };
    });
  };

  const updateDailyNotes = (text: string) => {
    setDailyActuals(prev => {
      const day = prev[selectedDateStr] || { products: {}, services: {}, additionalRevenue: 0, additionalLoss: 0, notes: "" };
      return {
        ...prev,
        [selectedDateStr]: {
          ...day,
          notes: text
        }
      };
    });
  };

  const clearDailyLog = () => {
    if (window.confirm("Θέλετε να διαγράψετε όλα τα στοιχεία καταγραφής για αυτή τη μέρα;")) {
      setDailyActuals(prev => {
        const next = { ...prev };
        delete next[selectedDateStr];
        return next;
      });
    }
  };

  const fillDailyLogFromAverages = () => {
    const nextProducts: Record<string, number> = {};
    const nextServices: Record<string, number> = {};
    
    activeYearData.products.forEach(p => {
      nextProducts[p.id] = Math.max(1, Math.round(p.monthlyVolume / 30));
    });
    
    activeYearData.services.forEach(s => {
      nextServices[s.id] = Math.max(0, Math.round(s.monthlyVolume / 30));
    });
    
    setDailyActuals(prev => ({
      ...prev,
      [selectedDateStr]: {
        products: nextProducts,
        services: nextServices,
        additionalRevenue: 0,
        additionalLoss: 0,
        notes: "Αυτόματη συμπλήρωση με μέσους όρους σχεδίου."
      }
    }));
  };

  const [activeCalTab, setActiveCalTab] = useState<"calendar" | "monthReport">("calendar");
      
  return (
    <div className="space-y-6">
      
      {/* 1. Year Calendar Navigation / Selector ("ημερολόγιο με όλες τις χρονιές") */}
      <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <span className="font-display font-bold text-sm text-zinc-100 tracking-tight">
              📅 ΗΜΕΡΟΛΟΓΙΟ ΕΤΩΝ & ΠΛΟΗΓΗΣΗ (Yearly Calendar Tracker)
            </span>
          </div>
          <button
            type="button"
            onClick={resetToFactory}
            className="text-[10px] font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800 px-3 py-1 rounded cursor-pointer flex items-center gap-1.5 active:scale-95 transition"
          >
            <RefreshCw className="w-3 h-3 text-amber-500" />
            <span>ΕΠΑΝΑΦΟΡΑ ΑΡΧΙΚΩΝ ΤΙΜΩΝ</span>
          </button>
        </div>
        <p className="text-[11px] text-zinc-500 leading-relaxed">
          Επιλέξτε ένα έτος για να περιηγηθείτε στα οικονομικά δεδομένα. Κάθε έτος αποθηκεύει ξεχωριστά τις τιμές προϊόντων, υπηρεσιών και πάγιων εξόδων ώστε να μπορείτε να προσομοιώσετε την εξέλιξη της επιχείρησης.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
          {Object.keys(INITIAL_YEARS_DATA).sort().map((yr) => {
            const yrStats = yearsAggregates[yr] || { totalRevenue: 0, netProfit: 0 };
            const isActive = selectedYear === yr;
            const isProfitable = yrStats.netProfit >= 0;

            return (
              <button
                type="button"
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  isActive 
                    ? "border-emerald-500 bg-emerald-950/20 shadow-md shadow-emerald-950/10 scale-102"
                    : "border-zinc-800 bg-[#1a1c1e] hover:bg-zinc-800/40 hover:border-zinc-750"
                }`}
              >
                <span className={`text-base font-display font-black tracking-tight ${isActive ? "text-emerald-400" : "text-zinc-200"}`}>
                  {yr}
                </span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase mt-1">Ετήσιο Κέρδος:</span>
                <span className={`text-xs font-mono font-bold mt-0.5 ${isProfitable ? "text-emerald-500" : "text-rose-500"}`}>
                  {isProfitable ? "+" : ""}{Math.round(yrStats.netProfit / 1000)}k €
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- NEW FULL INTERACTIVE CALENDAR & DAILY COMPARES --- */}
      <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-5">
        
        {/* Header with tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-4 gap-3">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 block">
              <Calendar className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-display font-bold text-sm text-zinc-100 tracking-tight">
                📅 ΗΜΕΡΟΛΟΓΙΑΚΟ ΚΕΝΤΡΟ ΚΑΤΑΓΡΑΦΗΣ (Daily actuals & logs tracker)
              </h3>
              <p className="text-[10px] text-zinc-500">
                Καταχωρήστε τις πραγματικές (actual) πωλήσεις ανά ημέρα και συγκρίνετε με το πλάνο.
              </p>
            </div>
          </div>

          <div className="flex bg-[#191b1d] p-0.5 rounded-lg border border-zinc-850 gap-1 text-[11px] font-mono shrink-0">
            <button
              type="button"
              onClick={() => setActiveCalTab("calendar")}
              className={`px-3 py-1.5 font-bold rounded-md transition cursor-pointer ${
                activeCalTab === "calendar" 
                  ? "bg-zinc-850 text-emerald-400 border border-zinc-750" 
                  : "text-zinc-400 hover:text-zinc-250"
              }`}
            >
              📅 Ημερολόγιο
            </button>
            <button
              type="button"
              onClick={() => setActiveCalTab("monthReport")}
              className={`px-3 py-1.5 font-bold rounded-md transition cursor-pointer ${
                activeCalTab === "monthReport" 
                  ? "bg-zinc-850 text-emerald-400 border border-zinc-750" 
                  : "text-zinc-400 hover:text-zinc-250"
              }`}
            >
              📊 Μηνιαία Αναφορά ({GREEK_MONTHS[currentCalendarMonth]} {currentCalendarYear})
            </button>
          </div>
        </div>

        {/* Outer Section depending on current selection */}
        {activeCalTab === "calendar" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Grid 1: The Calendar display (5 cols of 12) */}
            <div className="lg:col-span-5 bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 space-y-4">
              
              {/* Year & Month picker */}
              <div className="flex items-center justify-between gap-2 bg-[#1b1d1f] p-2 rounded-lg border border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    if (currentCalendarMonth === 0) {
                      setCurrentCalendarMonth(11);
                      setCurrentCalendarYear(prev => prev - 1);
                    } else {
                      setCurrentCalendarMonth(prev => prev - 1);
                    }
                  }}
                  className="p-1 hover:bg-zinc-800 rounded transition text-zinc-400 hover:text-zinc-200 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-display font-extrabold text-zinc-200">
                    {GREEK_MONTHS[currentCalendarMonth]}
                  </span>
                  <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">
                    {currentCalendarYear}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (currentCalendarMonth === 11) {
                      setCurrentCalendarMonth(0);
                      setCurrentCalendarYear(prev => prev + 1);
                    } else {
                      setCurrentCalendarMonth(prev => prev + 1);
                    }
                  }}
                  className="p-1 hover:bg-zinc-800 rounded transition text-zinc-400 hover:text-zinc-200 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Grid of days */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {/* Weekday headers */}
                {GREEK_WEEKDAYS.map(day => (
                  <span key={day} className="text-[10px] font-mono text-zinc-500 font-extrabold py-1">
                    {day}
                  </span>
                ))}

                {/* Calendar Days Cells */}
                {calendarDaysGrid.map((cell, idx) => {
                  if (cell.dayNum === null) {
                    return <div key={`empty-${idx}`} className="aspect-square opacity-0 animate-pulse" />;
                  }

                  const dateKey = cell.dateKey || "";
                  const isDaySelected = selectedDateStr === dateKey;
                  const hasData = cell.hasData;

                  return (
                    <button
                      type="button"
                      key={dateKey}
                      onClick={() => setSelectedDateStr(dateKey)}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-between p-1 transition-all cursor-pointer relative group ${
                        isDaySelected 
                          ? "bg-emerald-500 text-zinc-950 font-black shadow-md shadow-emerald-500/10 scale-102 border border-emerald-400"
                          : hasData
                            ? "bg-emerald-950/20 border border-emerald-900/60 text-emerald-300 hover:bg-emerald-900/10"
                            : "bg-zinc-900 hover:bg-zinc-850 text-zinc-400 border border-zinc-850/60"
                      }`}
                    >
                      <span className="text-xs font-mono font-bold leading-none select-none">
                        {cell.dayNum}
                      </span>

                      {/* Display revenue tag if exists */}
                      {hasData ? (
                        <span className={`text-[8px] font-mono leading-none scale-90 ${isDaySelected ? "text-zinc-950 font-black" : "text-emerald-400"}`}>
                          {Math.round(cell.dayRevenue)}€
                        </span>
                      ) : (
                        <span className="w-1 h-1 rounded-full bg-zinc-705 group-hover:bg-zinc-550" />
                      )}

                      {/* Green tiny indicator dot */}
                      {hasData && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Mini Legend / info info info */}
              <div className="bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-850/60 text-[10px] text-zinc-500 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-950/20 border border-emerald-900 text-emerald-400 flex items-center justify-center font-bold text-[8px]">●</span>
                  <span>Οι πράσινες μέρες περιέχουν ενεργές καταχωρήσεις πωλήσεων / συμβάντων.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-zinc-900 border border-zinc-800" />
                  <span>Πατήστε σε οποιαδήποτε μέρα για να καταγράψετε τα πραγματικά (Actual) στοιχεία.</span>
                </div>
              </div>

            </div>

            {/* Grid 2: Day details editor & form panel (7 cols of 12) */}
            <div className="lg:col-span-7 bg-[#17191b] p-5 rounded-xl border border-zinc-800 space-y-4">
              
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 gap-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black block tracking-wider">
                    Ημερήσια Αναφορά Actual
                  </span>
                  <h4 className="text-sm font-sans font-extrabold text-zinc-100 flex items-center gap-2">
                    📅 {selectedDayData.dateStr.split('-')[2]}/{selectedDayData.dateStr.split('-')[1]}/{selectedDayData.dateStr.split('-')[0]}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={fillDailyLogFromAverages}
                    className="text-[9px] font-mono font-bold bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-zinc-800 px-2.5 py-1.5 rounded transition cursor-pointer"
                    title="Συμπληρώνει τη μέρα με τον μέσο ημερήσιο όγκο πωλήσεων του πλάνου"
                  >
                    ⚡ AUTOFILL FORECAST
                  </button>
                  {selectedDayData.rawLog && (selectedDayData.rawLog.notes || selectedDayData.totalRevenue > 0) ? (
                    <button
                      type="button"
                      onClick={clearDailyLog}
                      className="text-[9px] font-mono font-bold hover:bg-rose-950/20 text-rose-500 border border-rose-900/30 px-2.5 py-1.5 rounded transition cursor-pointer"
                    >
                      ΔΙΑΓΡΑΦΗ
                    </button>
                  ) : null}
                </div>
              </div>

              {/* Revenue & Margin Indicators for selected date */}
              <div className="grid grid-cols-3 gap-2.5 font-mono">
                <div className="bg-[#121315] p-2.5 rounded-lg border border-zinc-850 space-y-0.5">
                  <span className="text-[8px] text-zinc-500 uppercase">Ημερ. Έσοδα</span>
                  <div className="text-sm font-bold text-emerald-400">
                    {formatCurrency(selectedDayData.totalRevenue)} €
                  </div>
                </div>
                <div className="bg-[#121315] p-2.5 rounded-lg border border-zinc-850 space-y-0.5">
                  <span className="text-[8px] text-zinc-500 uppercase">Κόστος (COGS)</span>
                  <div className="text-sm font-bold text-rose-400">
                    {formatCurrency(selectedDayData.totalCogs)} €
                  </div>
                </div>
                <div className="bg-[#121315] p-2.5 rounded-lg border border-zinc-850 space-y-0.5">
                  <span className="text-[8px] text-zinc-500 uppercase">Καθαρό</span>
                  <div className={`text-sm font-bold ${selectedDayData.totalProfit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {formatCurrency(selectedDayData.totalProfit)} €
                  </div>
                </div>
              </div>

              {/* Quantities Form Inputs */}
              <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1">
                
                {/* Product quantites */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono text-zinc-500 block font-black uppercase tracking-wider">
                    🛍️ ΠΩΛΗΣΕΙΣ ΠΡΟΪΟΝΤΩΝ (Daily Sales qty)
                  </span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedDayData.products.map(p => (
                      <div key={p.id} className="bg-zinc-900 p-2 rounded-lg border border-zinc-850 flex items-center justify-between gap-1">
                        <span className="text-[10px] text-zinc-300 font-sans truncate pr-1" title={p.name}>
                          <span className="font-semibold">{p.name}</span>
                          <span className="text-[8px] text-zinc-500 font-mono block">({formatCurrency(p.price)}€ / κοστ. {formatCurrency(p.cogs)}€)</span>
                        </span>
                        
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateDailyProductQty(p.id, Math.max(0, p.qty - 1))}
                            className="w-5 h-5 bg-zinc-800 text-zinc-400 rounded hover:bg-zinc-700 flex items-center justify-center font-bold text-xs select-none active:scale-90"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={p.qty || ""}
                            placeholder="0"
                            onChange={(e) => updateDailyProductQty(p.id, Math.max(0, Number(e.target.value)))}
                            className="bg-zinc-950 border border-zinc-800 text-center w-10 text-[11px] font-mono font-bold text-emerald-400 rounded focus:ring-0 p-0.5 pointer-events-auto"
                          />
                          <button
                            type="button"
                            onClick={() => updateDailyProductQty(p.id, p.qty + 1)}
                            className="w-5 h-5 bg-zinc-800 text-zinc-400 rounded hover:bg-zinc-700 flex items-center justify-center font-bold text-xs select-none active:scale-90"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service volumes */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[9px] font-mono text-zinc-500 block font-black uppercase tracking-wider">
                    🛹 ΚΡΑΤΗΣΕΙΣ ΥΠΗΡΕΣΙΩΝ (Daily Service Booking qty)
                  </span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedDayData.services.map(s => (
                      <div key={s.id} className="bg-zinc-900 p-2 rounded-lg border border-zinc-850 flex items-center justify-between gap-1">
                        <span className="text-[10px] text-zinc-300 font-sans truncate pr-1" title={s.name}>
                          <span className="font-semibold">{s.name}</span>
                          <span className="text-[8px] text-zinc-500 font-mono block">({formatCurrency(s.price)}€ / κοστ. {formatCurrency(s.cogs)}€)</span>
                        </span>
                        
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateDailyServiceQty(s.id, Math.max(0, s.qty - 1))}
                            className="w-5 h-5 bg-zinc-800 text-zinc-400 rounded hover:bg-zinc-700 flex items-center justify-center font-bold text-xs select-none active:scale-90"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={s.qty || ""}
                            placeholder="0"
                            onChange={(e) => updateDailyServiceQty(s.id, Math.max(0, Number(e.target.value)))}
                            className="bg-zinc-950 border border-zinc-800 text-center w-10 text-[11px] font-mono font-bold text-emerald-400 rounded focus:ring-0 p-0.5"
                          />
                          <button
                            type="button"
                            onClick={() => updateDailyServiceQty(s.id, s.qty + 1)}
                            className="w-5 h-5 bg-zinc-800 text-zinc-400 rounded hover:bg-zinc-700 flex items-center justify-center font-bold text-xs select-none active:scale-90"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional manual numbers */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[9px] font-mono text-zinc-500 block font-black uppercase tracking-wider">
                    💸 ΕΞΤΡΑ ΕΣΟΔΑ / ΕΞΟΔΑ (Additional Daily Cashflow Adjustments)
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-zinc-900 p-2 rounded-lg border border-zinc-850 space-y-1">
                      <span className="text-[8px] text-zinc-500 font-mono block">Άλλα Έσοδα (€)</span>
                      <input
                        type="number"
                        step="0.01"
                        value={selectedDayData.additionalRevenue || ""}
                        placeholder="0.00"
                        onChange={(e) => updateDailyAdditional(Math.max(0, Number(e.target.value)), selectedDayData.additionalLoss)}
                        className="bg-zinc-950 border border-zinc-800 w-full text-[11px] font-mono text-emerald-400 rounded p-1"
                      />
                    </div>
                    <div className="bg-zinc-900 p-2 rounded-lg border border-zinc-850 space-y-1">
                      <span className="text-[8px] text-rose-500 font-mono block">Λοιπά Έξοδα (€)</span>
                      <input
                        type="number"
                        step="0.01"
                        value={selectedDayData.additionalLoss || ""}
                        placeholder="0.00"
                        onChange={(e) => updateDailyAdditional(selectedDayData.additionalRevenue, Math.max(0, Number(e.target.value)))}
                        className="bg-zinc-950 border border-zinc-800 w-full text-[11px] font-mono text-rose-400 rounded p-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Diary/notes */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[9px] font-mono text-zinc-500 block font-black uppercase tracking-wider">
                    📝 ΗΜΕΡΟΛΟΓΙΟ ΣΥΜΒΑΝΤΩΝ (Daily event & weather record)
                  </span>
                  <textarea
                    rows={2}
                    value={selectedDayData.notes}
                    placeholder="π.χ. 'Skate contest, ηλιόλουστη μέρα, μεγάλη προσέλευση, 2 custom t-shirts sold!'..."
                    onChange={(e) => updateDailyNotes(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 w-full text-xs text-zinc-300 rounded p-2 focus:ring-0"
                  />
                </div>

              </div>

              {/* Informative message */}
              <div className="text-[10px] text-zinc-500 border-t border-zinc-850 pt-2 flex items-center justify-between text-right">
                <span className="italic font-light">Τα στοιχεία αποθηκεύονται αυτόματα στη μνήμη του browser.</span>
                <span className="text-emerald-500 leading-none font-bold font-mono">✓ AUTOSAVED</span>
              </div>

            </div>

          </div>
        ) : (
          /* Month Report / Aggregator view */
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Καταγεγραμμένες Ημέρες</span>
                <div className="mt-2 text-2xl font-mono font-black text-zinc-200">
                  {currentMonthDailyActuals.entriesCount} <span className="text-xs text-zinc-500 font-light font-sans">ημέρες / {currentMonthDailyActuals.daysList.length}</span>
                </div>
                <span className="text-[9px] text-zinc-500 mt-1">Ημέρες στις οποίες έχετε καταγράψει πωλήσεις.</span>
              </div>

              <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Πραγματικά Έσοδα Μηνός</span>
                <div className="mt-2 text-2xl font-mono font-black text-emerald-400">
                  {formatCurrency(currentMonthDailyActuals.totalActualRevenue)} €
                </div>
                <div className="text-[9px] text-zinc-500 mt-1 flex justify-between gap-1 font-mono">
                  <span>Στόχος: {formatCurrency(financialMetrics.totalRevenue / multiplier)} €</span>
                  <span className="text-emerald-400 font-bold">
                    {financialMetrics.totalRevenue > 0 ? Math.round((currentMonthDailyActuals.totalActualRevenue / (financialMetrics.totalRevenue / multiplier)) * 100) : 0}%
                  </span>
                </div>
              </div>

              <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Πραγματικό COGS Μηνός</span>
                <div className="mt-2 text-2xl font-mono font-black text-rose-400">
                  {formatCurrency(currentMonthDailyActuals.totalActualCogs)} €
                </div>
                <div className="text-[9px] text-zinc-555 mt-1 font-sans">
                  Kόστος αναλώσιμων & προϊόντων.
                </div>
              </div>

              <div className="bg-zinc-900 border border-emerald-950/60 p-4 rounded-xl flex flex-col justify-between">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-black block">Μεικτό Κέρδος Καταγραφών</span>
                <div className={`mt-1 text-2xl font-mono font-black ${currentMonthDailyActuals.totalActualProfit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {formatCurrency(currentMonthDailyActuals.totalActualProfit)} €
                </div>
                <button
                  type="button"
                  onClick={() => setIsExportModalOpen(true)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-sans font-bold text-xs py-1.5 px-3 rounded-lg mt-2 flex items-center justify-center gap-1.5 transition select-none active:scale-95 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Εξαγωγή & Εκτύπωση</span>
                </button>
              </div>

            </div>

            {/* Diary notes feed for the month */}
            <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-850 space-y-3">
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-black tracking-widest block border-b border-zinc-850 pb-2">
                📒 ΗΜΕΡΟΛΟΓΙΟ ΣΥΜΒΑΝΤΩΝ ΜΗΝΟΣ (Monthly activity log Feed)
              </span>

              {currentMonthDailyActuals.monthNotesList.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {currentMonthDailyActuals.monthNotesList.map((item, idx) => (
                    <div key={idx} className="bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-850 flex items-start gap-3">
                      <span className="text-[10px] font-mono text-emerald-400 font-extrabold bg-emerald-950/20 px-2 py-0.5 rounded shrink-0">
                        {item.date}
                      </span>
                      <p className="text-xs text-zinc-300 leading-normal italic font-sans">
                        "{item.note}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-zinc-550 italic text-xs py-4 text-center">
                  Δεν υπάρχουν σημειώσεις καταγεγραμμένες για αυτό το μήνα. Πηγαίνετε στην καρτέλα του Ημερολογίου και εισάγετε σημειώσεις σε οποιαδήποτε μέρα.
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* 2. Scaled Period Analyzer & Toggles */}
      <div className="bg-[#141618] border border-zinc-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block tracking-wider">
            ⏱️ ΕΠΙΛΟΓΗ ΧΡΟΝΙΚΟΥ ΟΡΙΖΟΝΤΑ ΑΝΑΛΥΣΗΣ
          </span>
          <p className="text-xs text-zinc-300 font-medium">
            Εξέταση εσόδων, COGS και κερδοφορίας για το έτος <span className="text-emerald-400 font-bold font-mono">{selectedYear}</span>
          </p>
        </div>
        
        <div className="flex bg-[#191b1d] p-1 rounded-xl border border-zinc-800 gap-1 overflow-x-auto shrink-0">
          {STATS_TIMEFRAMES.map((tf) => (
            <button
              type="button"
              key={tf.id}
              onClick={() => setSelectedPeriod(tf.id)}
              className={`px-3 py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedPeriod === tf.id
                  ? "bg-emerald-500 text-zinc-950 shadow-md scale-102"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Detailed editable tables of Products, Services and Fixed Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PRODUCTS SHEET */}
        <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-850">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">🛍️ 1. ΠΡΟΪΟΝΤΑ & ΤΙΜΕΣ (Products)</span>
              <span className="text-[10px] text-zinc-500 block">Επεξεργάσιμος τιμοκατάλογος & μηνιαίοι όγκοι πωλήσεων</span>
            </div>
            <button
              type="button"
              onClick={addProduct}
              className="text-[9px] font-mono font-bold bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-zinc-800 rounded px-2.5 py-1.5 flex items-center gap-1 cursor-pointer transition active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ ΠΡΟΪΟΝ</span>
            </button>
          </div>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {activeYearData.products.map((p, idx) => {
              const itemRevenue = p.price * p.monthlyVolume;
              const itemCogs = p.cogs * p.monthlyVolume;
              const itemProfit = itemRevenue - itemCogs;

              return (
                <div key={p.id} className="bg-zinc-900/60 border border-zinc-850 rounded-xl p-3 space-y-2 relative group hover:border-zinc-750 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-zinc-800 text-zinc-400 font-mono w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => updateProduct(p.id, { name: e.target.value })}
                      className="bg-transparent border-none text-zinc-100 font-sans font-bold text-xs p-0 w-full focus:ring-0 focus:outline-none focus:bg-zinc-800/40 rounded px-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeProduct(p.id)}
                      className="text-rose-500 opacity-60 hover:opacity-100 p-1 rounded hover:bg-rose-950/20 cursor-pointer transition shrink-0"
                      title="Διαγραφή προϊόντος"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[10px] font-mono pt-1">
                    {/* Price Input */}
                    <div className="bg-zinc-950 p-1.5 rounded border border-zinc-850 space-y-0.5">
                      <span className="text-zinc-550 block uppercase text-[8px] font-bold">Τιμή</span>
                      <div className="flex items-center">
                        <input
                          type="number"
                          step="0.1"
                          value={p.price}
                          onChange={(e) => updateProduct(p.id, { price: Math.max(0, Number(e.target.value)) })}
                          className="bg-transparent border-none text-zinc-200 text-right w-full p-0 font-bold font-mono focus:ring-0 text-xs pr-1"
                        />
                        <span className="text-zinc-500">€</span>
                      </div>
                    </div>

                    {/* Unit COGS Input */}
                    <div className="bg-zinc-950 p-1.5 rounded border border-zinc-850 space-y-0.5">
                      <span className="text-zinc-550 block uppercase text-[8px] font-bold">Κόστος (COGS)</span>
                      <div className="flex items-center">
                        <input
                          type="number"
                          step="0.1"
                          value={p.cogs}
                          onChange={(e) => updateProduct(p.id, { cogs: Math.max(0, Number(e.target.value)) })}
                          className="bg-transparent border-none text-zinc-300 text-right w-full p-0 font-mono focus:ring-0 text-xs pr-1"
                        />
                        <span className="text-zinc-500">€</span>
                      </div>
                    </div>

                    {/* Calculated profit per unit */}
                    <div className="bg-zinc-950 p-1.5 rounded border border-zinc-850 space-y-0.5">
                      <span className="text-emerald-400 block uppercase text-[8px] font-black">Κέρδος</span>
                      <div className="flex items-center justify-between text-emerald-400 font-bold text-xs h-5 px-1 font-mono">
                        <span></span>
                        <span>{formatCurrency(p.price - p.cogs)} €</span>
                      </div>
                    </div>
                  </div>

                  {/* Tiny summary line of metrics */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 pt-1.5 border-t border-zinc-850/30">
                    <span>Μεικτό Περιθώριο: <strong className="text-emerald-400">{(p.price > 0) ? Math.round(((p.price - p.cogs)/p.price)*100) : 0}%</strong></span>
                    <span>Καθαρό Κέρδος/Μονάδα: <strong className="text-zinc-300">{formatCurrency(p.price - p.cogs)} €</strong></span>
                  </div>
                </div>
              );
            })}
            
            {activeYearData.products.length === 0 && (
              <div className="py-8 text-center text-zinc-600 italic border border-dashed border-zinc-850 rounded-xl text-xs">
                Δεν υπάρχουν καταχωρημένα προϊόντα. Πατήστε «+ ΠΡΟΪΟΝ» για προσθήκη.
              </div>
            )}
          </div>
        </div>

        {/* SERVICES SHEET */}
        <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-850">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">🎟️ 2. ΥΠΗΡΕΣΙΕΣ & ΤΙΜΕΣ (Services)</span>
              <span className="text-[10px] text-zinc-500 block">Εισιτήρια, προμήθειες, workshops και μεμονωμένα έσοδα</span>
            </div>
            <button
              type="button"
              onClick={addService}
              className="text-[9px] font-mono font-bold bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-zinc-800 rounded px-2.5 py-1.5 flex items-center gap-1 cursor-pointer transition active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ ΥΠΗΡΕΣΙΑ</span>
            </button>
          </div>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {activeYearData.services.map((s, idx) => {
              const itemRevenue = s.price * s.monthlyVolume;
              const itemCogs = s.cogs * s.monthlyVolume;
              const itemProfit = itemRevenue - itemCogs;

              return (
                <div key={s.id} className="bg-zinc-900/60 border border-zinc-850 rounded-xl p-3 space-y-2 relative group hover:border-zinc-750 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-zinc-800 text-zinc-400 font-mono w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={s.name}
                      onChange={(e) => updateService(s.id, { name: e.target.value })}
                      className="bg-transparent border-none text-zinc-100 font-sans font-bold text-xs p-0 w-full focus:ring-0 focus:outline-none focus:bg-zinc-800/40 rounded px-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeService(s.id)}
                      className="text-rose-500 opacity-60 hover:opacity-100 p-1 rounded hover:bg-rose-950/20 cursor-pointer transition shrink-0"
                      title="Διαγραφή υπηρεσίας"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[10px] font-mono pt-1">
                    {/* Price Input */}
                    <div className="bg-zinc-950 p-1.5 rounded border border-zinc-850 space-y-0.5">
                      <span className="text-zinc-550 block uppercase text-[8px] font-bold">Χρέωση</span>
                      <div className="flex items-center">
                        <input
                          type="number"
                          step="0.5"
                          value={s.price}
                          onChange={(e) => updateService(s.id, { price: Math.max(0, Number(e.target.value)) })}
                          className="bg-transparent border-none text-zinc-200 text-right w-full p-0 font-bold font-mono focus:ring-0 text-xs pr-1"
                        />
                        <span className="text-zinc-500">€</span>
                      </div>
                    </div>

                    {/* Unit COGS Input */}
                    <div className="bg-zinc-950 p-1.5 rounded border border-zinc-850 space-y-0.5">
                      <span className="text-zinc-550 block uppercase text-[8px] font-bold">Κόστος/Unit</span>
                      <div className="flex items-center">
                        <input
                          type="number"
                          step="0.5"
                          value={s.cogs}
                          onChange={(e) => updateService(s.id, { cogs: Math.max(0, Number(e.target.value)) })}
                          className="bg-transparent border-none text-zinc-300 text-right w-full p-0 font-mono focus:ring-0 text-xs pr-1"
                        />
                        <span className="text-zinc-500">€</span>
                      </div>
                    </div>

                    {/* Calculated profit per unit */}
                    <div className="bg-zinc-950 p-1.5 rounded border border-zinc-850 space-y-0.5">
                      <span className="text-emerald-400 block uppercase text-[8px] font-black">Κέρδος</span>
                      <div className="flex items-center justify-between text-emerald-400 font-bold text-xs h-5 px-1 font-mono">
                        <span></span>
                        <span>{formatCurrency(s.price - s.cogs)} €</span>
                      </div>
                    </div>
                  </div>

                  {/* Tiny summary line of metrics */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 pt-1.5 border-t border-zinc-850/30">
                    <span>Μεικτό Περιθώριο: <strong className="text-emerald-400">{(s.price > 0) ? Math.round(((s.price - s.cogs)/s.price)*100) : 0}%</strong></span>
                    <span>Καθαρό Κέρδος/Μονάδα: <strong className="text-zinc-300">{formatCurrency(s.price - s.cogs)} €</strong></span>
                  </div>
                </div>
              );
            })}

            {activeYearData.services.length === 0 && (
              <div className="py-8 text-center text-zinc-600 italic border border-dashed border-zinc-850 rounded-xl text-xs">
                Δεν υπάρχουν καταχωρημένες υπηρεσίες. Πατήστε «+ ΥΠΗΡΕΣΙΑ» για προσθήκη.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* FIXED EXPENSES & RATIO SLIDERS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* FIXED EXPENSES SHEET */}
        <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4 lg:col-span-2">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-850">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">🏢 3. ΣΤΑΘΕΡΑ ΜΗΝΙΑΙΑ ΕΞΟΔΑ (Fixed Expenses)</span>
              <span className="text-[10px] text-zinc-500 block">Ενοίκια, μισθοί, ρεύμα, λοιπά πάγια λειτουργικά έξοδα</span>
            </div>
            <button
              type="button"
              onClick={addFixedExpense}
              className="text-[9px] font-mono font-bold bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-zinc-800 rounded px-2.5 py-1.5 flex items-center gap-1 cursor-pointer transition active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ ΠΑΓΙΟ ΕΞΟΔΟ</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
            {activeYearData.fixedExpenses.map((f, idx) => (
              <div key={f.id} className="bg-zinc-900/60 border border-zinc-850 rounded-xl p-3 space-y-2 flex flex-col justify-between hover:border-zinc-750 transition-colors">
                <div className="flex items-start gap-2 justify-between">
                  <input
                    type="text"
                    value={f.name}
                    onChange={(e) => updateFixedExpense(f.id, { name: e.target.value })}
                    className="bg-transparent border-none text-zinc-100 font-sans font-semibold text-xs p-0 w-full focus:ring-0 focus:outline-none focus:bg-zinc-800/40 rounded px-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeFixedExpense(f.id)}
                    className="text-rose-500 opacity-60 hover:opacity-100 p-1 rounded hover:bg-rose-950/20 cursor-pointer transition shrink-0"
                    title="Διαγραφή πάγιου"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-zinc-950 p-2 rounded border border-zinc-850 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase font-black">Μηνιαίο Κόστος</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={f.monthlyCost}
                      onChange={(e) => updateFixedExpense(f.id, { monthlyCost: Math.max(0, Number(e.target.value)) })}
                      className="bg-transparent border-none text-rose-400 font-mono font-bold text-right w-20 p-0 focus:ring-0 text-sm"
                    />
                    <span className="text-zinc-500 font-mono text-xs">€</span>
                  </div>
                </div>
              </div>
            ))}

            {activeYearData.fixedExpenses.length === 0 && (
              <div className="py-8 text-center text-zinc-600 italic border border-dashed border-zinc-850 rounded-xl col-span-2 text-xs">
                Δεν υπάρχουν πάγια έξοδα. Πατήστε «+ ΠΑΓΙΟ ΕΞΟΔΟ» για προσθήκη.
              </div>
            )}
          </div>
        </div>

        {/* TIME PERIOD SUMMARY AND ALERTS */}
        <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            {/* Header Tabs */}
            <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-850 mb-3 gap-1">
              <button
                type="button"
                onClick={() => setActiveSummaryTab("plan")}
                className={`flex-1 py-1.5 px-2 text-[10px] font-mono font-bold rounded cursor-pointer transition ${
                  activeSummaryTab === "plan"
                    ? "bg-emerald-500 text-zinc-950"
                    : "text-zinc-400 hover:text-zinc-300"
                }`}
              >
                🎯 ΣΥΝΟΨΗ ΗΜΕΡΑΣ / ΠΕΡΙΟΔΟΥ
              </button>
              <button
                type="button"
                onClick={() => setActiveSummaryTab("manual")}
                className={`flex-1 py-1.5 px-2 text-[10px] font-mono font-bold rounded cursor-pointer transition ${
                  activeSummaryTab === "manual"
                    ? "bg-emerald-500 text-zinc-950"
                    : "text-zinc-400 hover:text-zinc-300"
                }`}
              >
                ✍️ ΧΕΙΡΟΚΙΝΗΤΑ ΕΣΟΔΑ
              </button>
            </div>

            {activeSummaryTab === "plan" ? (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block pb-2 border-b border-zinc-850">
                  🎯 ΣΥΝΟΨΗ ΠΩΛΗΣΕΩΝ ({periodSpec.label.toUpperCase()})
                </span>
                <div className="space-y-3.5 pt-1">
                  <div className="flex justify-between items-center text-xs border-b border-zinc-900 pb-1.5">
                    <span className="text-zinc-400">Συνολικά Έσοδα ({periodSpec.label}):</span>
                    <span className="font-mono text-zinc-100 font-black">{formatCurrency(financialMetrics.totalRevenue)} €</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-zinc-900 pb-1.5">
                    <span className="text-zinc-400">Συνολικό COGS ({periodSpec.label}):</span>
                    <span className="font-mono text-rose-400 font-bold">{formatCurrency(financialMetrics.totalCOGS)} €</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-zinc-900 pb-1.5">
                    <span className="text-zinc-400">Σταθερά Έξοδα ({periodSpec.label}):</span>
                    <span className="font-mono text-rose-500 font-bold">{formatCurrency(financialMetrics.totalFixed)} €</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-zinc-900 pb-1.5">
                    <span className="text-zinc-400">Συνολικό Κόστος (Expenses):</span>
                    <span className="font-mono text-rose-500 font-black">{formatCurrency(financialMetrics.totalExpenses)} €</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border flex flex-col justify-center mt-4 ${
                  financialMetrics.netProfit >= 0
                    ? "bg-emerald-950/20 border-emerald-900/30 text-emerald-300"
                    : "bg-rose-950/20 border-rose-900/30 text-rose-300"
                }`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    {financialMetrics.netProfit >= 0 ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Info className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold">
                      {financialMetrics.netProfit >= 0 ? "🏆 ΚΑΘΑΡΟ ΚΕΡΔΟΣ" : "⚠️ ΕΛΛΕΙΜΜΑ / ΖΗΜΙΑ"}
                    </span>
                  </div>
                  <strong className="text-xl sm:text-2xl font-mono font-black tracking-tight block">
                    {formatCurrency(financialMetrics.netProfit)} €
                  </strong>
                  <p className="text-[10px] mt-1 text-zinc-400 leading-normal">
                    Για το {periodSpec.text.toLowerCase()} του έτους {selectedYear} με βάση τις πραγματικές πωλήσεις που έχετε προσθέσει εσείς ανά ημέρα.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block pb-2 border-b border-zinc-850">
                  ✍️ ΚΑΤΑΓΡΑΦΗ ΧΕΙΡΟΚΙΝΗΤΩΝ ΕΣΟΔΩΝ
                </span>
                
                {/* Embedded Form */}
                <div className="space-y-2.5 bg-zinc-900/60 p-3 rounded-lg border border-zinc-850 text-[10px]">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-zinc-500 font-mono uppercase block text-[8px]">Ημερομηνία</label>
                      <input
                        type="date"
                        value={manualFormDate}
                        onChange={(e) => setManualFormDate(e.target.value)}
                        className="bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono text-xs p-1.5 rounded w-full focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-zinc-500 font-mono uppercase block text-[8px]">Ορίζοντας</label>
                      <select
                        value={manualFormPeriod}
                        onChange={(e) => setManualFormPeriod(e.target.value)}
                        className="bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono text-xs p-1.5 rounded w-full focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      >
                        <option value="day">Ημέρα</option>
                        <option value="week">Εβδομάδα</option>
                        <option value="month">Μήνας</option>
                        <option value="quarter">Τρίμηνο</option>
                        <option value="sixMonth">Εξάμηνο</option>
                        <option value="year">Έτος</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-emerald-400 font-mono uppercase block font-bold text-[8px]">Συνολικά Έσοδα (€)</label>
                    <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded px-2">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={manualFormAmount}
                        onChange={(e) => setManualFormAmount(e.target.value)}
                        className="bg-transparent border-none text-zinc-100 font-mono text-sm w-full p-1.5 focus:ring-0 focus:outline-none placeholder-zinc-700"
                      />
                      <span className="text-zinc-500 font-mono text-xs">€</span>
                    </div>
                  </div>

                  <div className="space-y-1 flex flex-col">
                    <label className="text-zinc-550 font-mono uppercase block text-[8px]">Σχόλια / Τίτλος</label>
                    <input
                      type="text"
                      placeholder="π.χ. Έσοδα 1ης εβδομάδας"
                      value={manualFormNotes}
                      onChange={(e) => setManualFormNotes(e.target.value)}
                      className="bg-zinc-950 border border-zinc-800 text-zinc-200 font-sans text-xs p-1.5 rounded w-full focus:ring-1 focus:ring-emerald-500 focus:outline-none placeholder-zinc-700"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={addManualRevenue}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-sans font-extrabold text-xs py-2 rounded-lg transition active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Αποθήκευση Καταγραφής</span>
                  </button>
                </div>

                {/* List of Saved Manual Overrides */}
                <div className="space-y-1.5 text-[10px]">
                  <span className="text-[9px] font-mono text-zinc-500 block uppercase font-black">
                    🕒 ΙΣΤΟΡΙΚΟ ΧΕΙΡΟΚΙΝΗΤΩΝ ΚΑΤΑΓΡΑΦΩΝ
                  </span>
                  
                  {manualRevenues.length > 0 ? (
                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                      {manualRevenues.map((r) => {
                        const mul = getPeriodMultiplier(r.periodType);
                        const cogs = (activeYearData.products.reduce((acc, p) => acc + (p.cogs * p.monthlyVolume), 0) + activeYearData.services.reduce((acc, s) => acc + (s.cogs * s.monthlyVolume), 0)) * mul;
                        const fixed = activeYearData.fixedExpenses.reduce((acc, f) => acc + f.monthlyCost, 0) * mul;
                        const calcExpenses = cogs + fixed;
                        const profit = r.revenue - calcExpenses;

                        return (
                          <div key={r.id} className="bg-zinc-950/80 border border-zinc-850 rounded-lg p-2.5 space-y-1 relative group">
                            <div className="flex justify-between items-start gap-1 pr-6">
                              <div>
                                <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded font-mono text-[9px] font-bold">
                                  {getPeriodLabel(r.periodType)}
                                </span>
                                <span className="text-zinc-500 font-mono ml-1.5">
                                  {r.date.split('-')[2]}/{r.date.split('-')[1]}/{r.date.split('-')[0]}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeManualRevenue(r.id)}
                                className="text-rose-500 hover:bg-rose-950/20 p-1 rounded cursor-pointer absolute top-1.5 right-1.5 opacity-60 group-hover:opacity-100 transition-opacity"
                                title="Διαγραφή καταγραφής"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                            
                            <div className="flex justify-between font-mono pt-1 text-[10px]">
                              <span className="text-zinc-400">Έσοδα: <strong className="text-emerald-400 font-bold">{formatCurrency(r.revenue)} €</strong></span>
                              <span className="text-zinc-400">Κόστος: <strong className="text-rose-450 font-medium">{formatCurrency(calcExpenses)} €</strong></span>
                            </div>
                            
                            <div className="flex justify-between font-mono border-t border-zinc-900/60 pt-1 mt-1 items-center text-[9px]">
                              <span className="text-zinc-500 italic truncate max-w-[120px]" title={r.notes}>
                                {r.notes || "Χωρίς σχόλιο"}
                              </span>
                              <span className={`font-bold ${profit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                                Κέρδος: {formatCurrency(profit)} €
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-[10px] text-zinc-650 italic text-center py-4 bg-zinc-950/20 border border-dashed border-zinc-850 rounded-lg">
                      Δεν υπάρχει καταχωρημένο ιστορικό εσόδων.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 4. Interactive Visual Charts illustrating the period summary */}
      <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-zinc-850">
          <BarChart2 className="w-5 h-5 text-emerald-400" />
          <span className="font-display font-bold text-sm text-zinc-100 tracking-tight">
            📊 ΟΙΚΟΝΟΜΙΚΑ ΔΙΑΓΡΑΜΜΑΤΑ ΚΑΙ ΑΝΑΛΥΣΕΙΣ {selectedYear} ({periodSpec.text})
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Chart 1: P&L Columns overview */}
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold block text-center lg:text-left">
              📊 Σχέση Εσόδων, Κοστών & Καθαρού Κέρδους
            </span>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={plChartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                >
                  <XAxis dataKey="name" stroke="#606770" fontSize={11} fontClassName="font-mono" />
                  <YAxis stroke="#606770" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1c1e21", borderColor: "#2d3139", borderRadius: "8px" }}
                    itemStyle={{ fontSize: "12px", fontFamily: "sans-serif" }}
                    labelStyle={{ color: "#9ca3af", fontWeight: "bold" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                  <Bar dataKey="Έσοδα" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Κόστος (COGS)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Σταθερά Έξοδα" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Καθαρό Κέρδος" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Revenue Pie chart showing sources of finances */}
          <div className="lg:col-span-3 space-y-2">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold block text-center">
              🧭 Πού οφείλονται τα Έσοδα (Revenue Sources)
            </span>
            <div className="h-64 sm:h-72 relative flex items-center justify-center">
              {revenuePieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenuePieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {revenuePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} €`, "Έσοδα"]}
                      contentStyle={{ backgroundColor: "#1c1e21", borderColor: "#2d3139", borderRadius: "8px" }}
                      itemStyle={{ fontSize: "10px", fontFamily: "sans-serif" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <span className="text-xs text-zinc-650 italic">Δεν υπάρχουν έσοδα.</span>
              )}
              {/* Legend overlay inside panel */}
              <div className="absolute bottom-0 inset-x-0 max-h-16 overflow-y-auto text-[9px] font-mono text-zinc-500 space-y-1 bg-zinc-950/40 p-1.5 rounded-lg border border-zinc-900">
                {revenuePieData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="truncate">{item.name}</span>
                    </span>
                    <span className="font-bold text-zinc-300 shrink-0">{item.value.toLocaleString()} €</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart 3: Expense/Cost Pie Chart */}
          <div className="lg:col-span-3 space-y-2">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold block text-center">
              💸 Κατανομή Εξόδων (Operating Outflows)
            </span>
            <div className="h-64 sm:h-72 relative flex items-center justify-center">
              {costPieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {costPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} €`, "Κόστος"]}
                      contentStyle={{ backgroundColor: "#1c1e21", borderColor: "#2d3139", borderRadius: "8px" }}
                      itemStyle={{ fontSize: "10px", fontFamily: "sans-serif" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <span className="text-xs text-zinc-650 italic">Δεν υπάρχουν καταγεγραμμένα έξοδα.</span>
              )}
              
              {/* Legend overlay inside panel */}
              <div className="absolute bottom-0 inset-x-0 max-h-16 overflow-y-auto text-[9px] font-mono text-zinc-500 space-y-1 bg-zinc-950/40 p-1.5 rounded-lg border border-zinc-900">
                {costPieData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between gap-1">
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[(index + 3) % COLORS.length] }} />
                      <span className="truncate">{item.name}</span>
                    </span>
                    <span className="font-bold text-zinc-300 shrink-0">{item.value.toLocaleString()} €</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Export & Print Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto print-modal-parent">
          <style>{`
            @media print {
              /* Hide all background layout */
              body > div:not(.print-modal-parent), 
              header, 
              nav, 
              aside, 
              footer,
              button:not(.no-print) {
                display: none !important;
              }
              
              /* Force clean white print style */
              .print-modal-parent {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                height: auto !important;
                background: white !important;
                color: black !important;
                padding: 0 !important;
                margin: 0 !important;
                overflow: visible !important;
              }
              
              .print-modal {
                background: white !important;
                color: black !important;
                border: none !important;
                box-shadow: none !important;
                width: 100% !important;
                max-width: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
                overflow: visible !important;
              }
              
              .p-text-black {
                color: black !important;
              }
              .p-bg-white {
                background-color: white !important;
              }
              .p-border-gray {
                border-color: #cbd5e1 !important;
              }
              .no-print {
                display: none !important;
              }
            }
          `}</style>
          
          <div className="bg-[#121416] border border-zinc-800 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative animate-in fade-in-50 zoom-in-95 duration-150 print-modal overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#202327] flex items-center justify-between bg-zinc-950/40 no-print">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-display font-bold text-sm text-zinc-100 uppercase">ΕΞΑΓΩΓΗ & ΕΚΤΥΠΩΣΗ ΜΗΝΙΑΙΑΣ ΑΝΑΦΟΡΑΣ</h3>
                  <p className="text-[10px] text-zinc-500">Πραγματικά αποτελέσματα καταγραφής βάσει των πωλήσεων που έχετε προσθέσει</p>
                </div>
              </div>
              <button 
                onClick={() => setIsExportModalOpen(false)}
                className="text-xs text-zinc-400 hover:text-zinc-250 bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 transition cursor-pointer"
              >
                Κλείσιμο (ESC)
              </button>
            </div>
            
            {/* Scrollable Printable Container */}
            <div className="p-6 overflow-y-auto space-y-6 text-zinc-350 p-bg-white p-text-black print-container flex-1">
              
              {/* Formal Letterhead block for Print */}
              <div className="border-b p-border-gray pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4 p-text-black">
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-[#10b981] font-extrabold uppercase p-text-black">
                     ΜΗΝΙΑΙΑ ΟΙΚΟΝΟΜΙΚΗ ΑΝΑΦΟΡΑ ΔΡΑΣΤΗΡΙΟΤΗΤΑΣ
                  </div>
                  <h2 className="text-2xl font-display font-black text-zinc-100 tracking-tight p-text-black mt-1">
                    {GREEK_MONTHS[currentCalendarMonth]} {currentCalendarYear}
                  </h2>
                  <div className="text-[11px] text-zinc-550 mt-1 font-mono p-text-black">
                    Έτος Προσομοίωσης: {selectedYear} | Ημερομηνία Αναφοράς: {new Date().toLocaleDateString("el-GR")}
                  </div>
                </div>
                <div className="text-right md:border-l p-border-gray md:pl-6 p-text-black">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase p-text-black">ΣΥΝΟΛΟ ΚΑΤΑΓΡΑΦΩΝ</div>
                  <div className="text-xl font-mono font-black text-zinc-200 p-text-black">
                    {currentMonthDailyActuals.entriesCount} ημέρες
                  </div>
                </div>
              </div>

              {/* KPI Performance Section */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 p-bg-white p-border-gray p-text-black">
                  <span className="text-[10px] font-mono text-zinc-500 block">ΠΡΑΓΜΑΤΙΚΑ ΕΣΟΔΑ</span>
                  <div className="text-xl font-mono font-black text-emerald-400 p-text-black mt-1">
                    {formatCurrency(currentMonthDailyActuals.totalActualRevenue)} €
                  </div>
                </div>
                <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 p-bg-white p-border-gray p-text-black">
                  <span className="text-[10px] font-mono text-zinc-500 block">ΠΡΑΓΜΑΤΙΚΟ COGS</span>
                  <div className="text-xl font-mono font-black text-rose-400 p-text-black mt-1">
                    {formatCurrency(currentMonthDailyActuals.totalActualCogs)} €
                  </div>
                </div>
                <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 p-bg-white p-border-gray p-text-black">
                  <span className="text-[10px] font-mono text-zinc-500 block">ΣΤΑΘΕΡΑ ΕΞΟΔΑ ΜΗΝΟΣ</span>
                  <div className="text-xl font-mono font-black text-amber-500 p-text-black mt-1">
                    {formatCurrency(monthlyItemizedActuals.totalFixedExpenses)} €
                  </div>
                </div>
                <div className={`p-4 rounded-xl border p-bg-white p-border-gray p-text-black ${(currentMonthDailyActuals.totalActualProfit - monthlyItemizedActuals.totalFixedExpenses) >= 0 ? "bg-emerald-950/10 border-emerald-900/40" : "bg-rose-950/10 border-rose-900/40"}`}>
                  <span className="text-[10px] font-mono text-zinc-500 block">ΚΑΘΑΡΟ ΚΕΡΔΟΣ / ΖΗΜΙΑ</span>
                  <div className={`text-xl font-mono font-black p-text-black mt-1 ${(currentMonthDailyActuals.totalActualProfit - monthlyItemizedActuals.totalFixedExpenses) >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {formatCurrency(currentMonthDailyActuals.totalActualProfit - monthlyItemizedActuals.totalFixedExpenses)} €
                  </div>
                </div>
              </div>

              {/* 1st Tabular: Products breakdown */}
              <div className="space-y-2 p-text-black">
                <h4 className="text-xs font-mono font-extrabold uppercase text-[#10b981] p-text-black tracking-wider border-b p-border-gray pb-1">
                  📦 ΠΡΑΓΜΑΤΙΚΕΣ ΠΩΛΗΣΕΙΣ ΠΡΟΪΟΝΤΩΝ
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs border-collapse">
                    <thead>
                      <tr className="border-b p-border-gray text-zinc-400 p-text-black">
                        <th className="py-2 font-bold font-sans">Προϊόν</th>
                        <th className="py-2 text-right font-bold font-sans">Τιμή Μον.</th>
                        <th className="py-2 text-right font-bold font-sans">Actual Πωλ. (Tεμ)</th>
                        <th className="py-2 text-right font-bold font-sans">Έσοδα (€)</th>
                        <th className="py-2 text-right font-bold font-sans">COGS (€)</th>
                        <th className="py-2 text-right font-bold font-sans">Μικτό Κέρδος (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyItemizedActuals.productsDetails.map((p) => (
                        <tr key={p.id} className="border-b p-border-gray text-zinc-300 p-text-black hover:bg-zinc-900/10">
                          <td className="py-2.5 font-bold font-sans">{p.name}</td>
                          <td className="py-2.5 text-right font-mono">{formatCurrency(p.price)} €</td>
                          <td className="py-2.5 text-right font-mono font-extrabold text-emerald-400 p-text-black">{p.actualQty} τεμ</td>
                          <td className="py-2.5 text-right font-mono text-zinc-300 p-text-black">{formatCurrency(p.actualRevenue)} €</td>
                          <td className="py-2.5 text-right font-mono text-rose-400 p-text-black">{formatCurrency(p.actualCogs)} €</td>
                          <td className="py-2.5 text-right font-mono text-emerald-400 p-text-black font-bold">{formatCurrency(p.actualProfit)} €</td>
                        </tr>
                      ))}
                      {monthlyItemizedActuals.productsDetails.length === 0 && (
                        <tr>
                          <td colSpan={8} className="py-4 text-center text-zinc-550 italic">Δεν υπάρχουν ορισμένα προϊόντα.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2nd Tabular: Services breakdown */}
              <div className="space-y-2 p-text-black">
                <h4 className="text-xs font-mono font-extrabold uppercase text-[#10b981] p-text-black tracking-wider border-b p-border-gray pb-1">
                  💼 ΠΡΑΓΜΑΤΙΚΕΣ ΠΩΛΗΣΕΙΣ ΥΠΗΡΕΣΙΩΝ
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs border-collapse">
                    <thead>
                      <tr className="border-b p-border-gray text-zinc-400 p-text-black">
                        <th className="py-2 font-bold font-sans">Υπηρεσία</th>
                        <th className="py-2 text-right font-bold font-sans">Τιμή Μον.</th>
                        <th className="py-2 text-right font-bold font-sans">Actual Πωλ. (Tεμ)</th>
                        <th className="py-2 text-right font-bold font-sans">Έσοδα (€)</th>
                        <th className="py-2 text-right font-bold font-sans">COGS (€)</th>
                        <th className="py-2 text-right font-bold font-sans">Μικτό Κέρδος (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyItemizedActuals.servicesDetails.map((s) => (
                        <tr key={s.id} className="border-b p-border-gray text-zinc-300 p-text-black hover:bg-zinc-900/10">
                          <td className="py-2.5 font-bold font-sans">{s.name}</td>
                          <td className="py-2.5 text-right font-mono">{formatCurrency(s.price)} €</td>
                          <td className="py-2.5 text-right font-mono font-extrabold text-emerald-400 p-text-black">{s.actualQty} τεμ</td>
                          <td className="py-2.5 text-right font-mono text-zinc-300 p-text-black">{formatCurrency(s.actualRevenue)} €</td>
                          <td className="py-2.5 text-right font-mono text-rose-400 p-text-black">{formatCurrency(s.actualCogs)} €</td>
                          <td className="py-2.5 text-right font-mono text-emerald-400 p-text-black font-bold">{formatCurrency(s.actualProfit)} €</td>
                        </tr>
                      ))}
                      {monthlyItemizedActuals.servicesDetails.length === 0 && (
                        <tr>
                          <td colSpan={8} className="py-4 text-center text-zinc-550 italic">Δεν υπάρχουν ορισμένες υπηρεσίες.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3rd Tabular: Fixed Expenses Summary */}
              <div className="space-y-2 p-text-black">
                <h4 className="text-xs font-mono font-extrabold uppercase text-amber-500 p-text-black tracking-wider border-b p-border-gray pb-1">
                  🔧 ΣΤΑΘΕΡΑ ΜΗΝΙΑΙΑ ΕΞΟΔΑ ΛΕΙΤΟΥΡΓΙΑΣ
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeYearData.fixedExpenses.map((f) => (
                    <div key={f.id} className="flex justify-between items-center text-xs py-2 border-b p-border-gray p-text-black">
                      <span className="font-bold text-zinc-300 p-text-black">{f.name}</span>
                      <span className="font-mono text-zinc-200 p-text-black font-extrabold">{f.monthlyCost.toLocaleString()} €</span>
                    </div>
                  ))}
                  {activeYearData.fixedExpenses.length === 0 && (
                    <div className="col-span-2 text-center text-zinc-555 py-2 italic">Δεν υπάρχουν καταγεγραμμένα σταθερά έξοδα.</div>
                  )}
                </div>
              </div>

              {/* Day notes list log */}
              <div className="space-y-3 p-text-black">
                <h4 className="text-xs font-mono font-extrabold uppercase text-zinc-400 p-text-black tracking-wider border-b p-border-gray pb-1">
                  📜 ΗΜΕΡΟΛΟΓΙΑΚΕΣ ΣΗΜΕΙΩΣΕΙΣ & ΣΥΜΒΑΝΤΑ ΜΗΝΟΣ
                </h4>
                {currentMonthDailyActuals.monthNotesList.length > 0 ? (
                  <div className="space-y-2.5">
                    {currentMonthDailyActuals.monthNotesList.map((entry, index) => (
                      <div key={index} className="text-xs flex items-start gap-3 bg-zinc-950/20 p-2.5 rounded-lg border border-[#202327] p-border-gray p-bg-white p-text-black">
                        <span className="font-mono font-bold text-emerald-400 shrink-0 bg-emerald-950/30 px-2 py-0.5 rounded p-text-black border p-border-gray">
                          {entry.date}
                        </span>
                        <p className="italic text-zinc-350 p-text-black">
                          "{entry.note}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs italic text-zinc-550 py-2">Δεν βρέθηκαν σημειώσεις συμβάντων για αυτό το μήνα.</div>
                )}
              </div>

            </div>
            
            {/* Modal Footer Controls */}
            <div className="p-4 border-t border-[#202327] bg-zinc-950/40 flex items-center justify-between no-print">
              <button 
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-900 hover:bg-zinc-850 px-4 py-2 border border-zinc-800 rounded-lg cursor-pointer transition select-none"
              >
                Ακύρωση
              </button>
              
              <button 
                type="button"
                onClick={() => window.print()}
                className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-sans font-extrabold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer transition active:scale-95 shadow-md shadow-emerald-950/20"
              >
                <Printer className="w-4 h-4" />
                <span>Εκτύπωση ή Αποθήκευση σε PDF</span>
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}
