import React, { useState, useMemo } from "react";
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle, 
  HelpCircle,
  Plus,
  Trash2,
  PieChart
} from "lucide-react";

interface FinancialResultsProps {
  editMode: boolean;
  fixedExpenses: any[];
  financialProducts: any[];
  initialFinancialResults?: any;
  onResultsChange: (updatedResults: any) => void;
}

export default function FinancialResults({
  editMode,
  fixedExpenses = [],
  financialProducts = [],
  initialFinancialResults = {},
  onResultsChange
}: FinancialResultsProps) {
  
  // Time Toggle Selection State
  const [timePeriod, setTimePeriod] = useState<string>("week"); // day | week | month | quarter | half-year | year

  // Main financial metrics state
  const [prodRevenues, setProdRevenues] = useState<Record<string, number>>(() => {
    return initialFinancialResults.prodRevenues || {
      "Espresso & Specialty": 1250,
      "Filters & Cold Brews": 650,
      "Artisanal Snacks": 480,
      "Local Street Merch": 950
    };
  });

  const [serviceRevenues, setServiceRevenues] = useState<Record<string, number>>(() => {
    return initialFinancialResults.serviceRevenues || {
      "Skate Ramp entry & passes": 380,
      "Art Exhibition commissions": 750,
      "Creative Workshops / Events": 450
    };
  });

  const [baseTarget, setBaseTarget] = useState<number>(() => {
    return initialFinancialResults.baseTarget || 4500;
  });

  const [prodCogsPercent, setProdCogsPercent] = useState<number>(() => {
    return initialFinancialResults.prodCogsPercent !== undefined ? initialFinancialResults.prodCogsPercent : 22;
  });

  const [serviceCogsPercent, setServiceCogsPercent] = useState<number>(() => {
    return initialFinancialResults.serviceCogsPercent !== undefined ? initialFinancialResults.serviceCogsPercent : 5;
  });

  const [contributionMarginPercent, setContributionMarginPercent] = useState<number>(() => {
    return initialFinancialResults.contributionMarginPercent !== undefined ? initialFinancialResults.contributionMarginPercent : 75;
  });

  const [growthAheadPercent, setGrowthAheadPercent] = useState<number>(() => {
    return initialFinancialResults.growthAheadPercent !== undefined ? initialFinancialResults.growthAheadPercent : 5;
  });

  const [growthBehindPercent, setGrowthBehindPercent] = useState<number>(() => {
    return initialFinancialResults.growthBehindPercent !== undefined ? initialFinancialResults.growthBehindPercent : 10;
  });

  const [useCustomFixedExpenses, setUseCustomFixedExpenses] = useState<boolean>(() => {
    return !!initialFinancialResults.useCustomFixedExpenses;
  });

  const [customFixedExpensesMonthly, setCustomFixedExpensesMonthly] = useState<number>(() => {
    return initialFinancialResults.customFixedExpensesMonthly || 4850;
  });

  // Calculate total monthly fixed expenses from fixedExpenses array
  const totalMonthlyFixedExpenses = useMemo(() => {
    return fixedExpenses.reduce((sum, item) => sum + (item.cost || 0), 0);
  }, [fixedExpenses]);

  const activeMonthlyFixedExpenses = useCustomFixedExpenses ? customFixedExpensesMonthly : totalMonthlyFixedExpenses;

  // Adjust values based on the time period multiplier
  const timePeriodMultiplier = useMemo(() => {
    switch (timePeriod) {
      case "day": return 1 / 7;
      case "week": return 1;
      case "month": return 4.33;
      case "quarter": return 13;
      case "half-year": return 26;
      case "year": return 52;
      default: return 1;
    }
  }, [timePeriod]);

  // Helper labels
  const timePeriodLabels: Record<string, string> = {
    day: "Ημέρας",
    week: "Εβδομάδας",
    month: "Μήνα",
    quarter: "Τριμήνου",
    "half-year": "6μήνου",
    year: "Έτους"
  };

  // Raw totals for the current base week
  const rawProductSum = useMemo(() => {
    return Object.values(prodRevenues).reduce((sum: number, val: any) => sum + Number(val || 0), 0);
  }, [prodRevenues]);

  const rawServiceSum = useMemo(() => {
    return Object.values(serviceRevenues).reduce((sum: number, val: any) => sum + Number(val || 0), 0);
  }, [serviceRevenues]);

  const rawTotalSum = rawProductSum + rawServiceSum;

  // Render/Computed stats mapped to the selected time filter
  const currentProductSum = rawProductSum * timePeriodMultiplier;
  const currentServiceSum = rawServiceSum * timePeriodMultiplier;
  const currentTotalRevenue = rawTotalSum * timePeriodMultiplier;
  const currentTarget = baseTarget * timePeriodMultiplier;

  // Expenses for the selected time period
  const currentFixedExpenses = (activeMonthlyFixedExpenses / 4.33) * timePeriodMultiplier;
  
  // COGS fallback estimated at custom percentages of product revenues + service revenues
  const currentEstimatedCogs = (rawProductSum * (prodCogsPercent / 100) + rawServiceSum * (serviceCogsPercent / 100)) * timePeriodMultiplier;

  const currentTotalExpenses = currentFixedExpenses + currentEstimatedCogs;
  const currentNetProfit = currentTotalRevenue - currentTotalExpenses;

  // Target Indicator
  const isAheadOfTarget = currentTotalRevenue >= currentTarget;
  const targetVariancePercentage = currentTarget > 0 
    ? Math.round(((currentTotalRevenue - currentTarget) / currentTarget) * 100)
    : 0;

  // 1. Forecasting: Automatically calculate next week's revenue target based on actual performance (weekly)
  const nextWeekExpectedTarget = useMemo(() => {
    const growthPremium = isAheadOfTarget ? (1 + growthAheadPercent / 100) : (1 + growthBehindPercent / 100);
    return Math.round(rawTotalSum * growthPremium);
  }, [rawTotalSum, isAheadOfTarget, growthAheadPercent, growthBehindPercent]);

  // 2. Break-Even tracker based on active monthly total fixed expenses
  const weeklyBreakEvenRevenue = useMemo(() => {
    const marginRatio = contributionMarginPercent / 100;
    const weeklyFixed = activeMonthlyFixedExpenses / 4.33;
    return Math.round(weeklyFixed / (marginRatio || 0.75));
  }, [activeMonthlyFixedExpenses, contributionMarginPercent]);

  const isBreakEvenMet = rawTotalSum >= weeklyBreakEvenRevenue;

  // Bubble up results state to parent bundle for real-time Firebase syncing
  React.useEffect(() => {
    const dataBundle = {
      prodRevenues,
      serviceRevenues,
      baseTarget,
      timePeriod,
      prodCogsPercent,
      serviceCogsPercent,
      contributionMarginPercent,
      growthAheadPercent,
      growthBehindPercent,
      useCustomFixedExpenses,
      customFixedExpensesMonthly,
      actualSum: rawTotalSum,
      targetSum: baseTarget,
      netProfit: rawTotalSum - ((activeMonthlyFixedExpenses / 4.33) + (rawProductSum * (prodCogsPercent / 100) + rawServiceSum * (serviceCogsPercent / 100))),
      breakEvenPoint: activeMonthlyFixedExpenses,
      nextWeekTarget: nextWeekExpectedTarget
    };
    onResultsChange(dataBundle);
  }, [
    prodRevenues,
    serviceRevenues,
    baseTarget,
    timePeriod,
    prodCogsPercent,
    serviceCogsPercent,
    contributionMarginPercent,
    growthAheadPercent,
    growthBehindPercent,
    useCustomFixedExpenses,
    customFixedExpensesMonthly,
    rawTotalSum,
    activeMonthlyFixedExpenses,
    nextWeekExpectedTarget
  ]);

  // Modify revenues
  const handleProductRevChange = (key: string, value: number) => {
    const updated = { ...prodRevenues, [key]: value };
    setProdRevenues(updated);
  };

  const handleServiceRevChange = (key: string, value: number) => {
    const updated = { ...serviceRevenues, [key]: value };
    setServiceRevenues(updated);
  };

  const handleAddProductRev = () => {
    const label = prompt("Παρακαλώ εισάγετε όνομα νέου προϊόντος/κατηγορίας:");
    if (label && label.trim()) {
      setProdRevenues({ ...prodRevenues, [label.trim()]: 300 });
    }
  };

  const handleAddServiceRev = () => {
    const label = prompt("Παρακαλώ εισάγετε όνομα νέας υπηρεσίας:");
    if (label && label.trim()) {
      setServiceRevenues({ ...serviceRevenues, [label.trim()]: 200 });
    }
  };

  const handleDeleteProductRev = (key: string) => {
    const updated = { ...prodRevenues };
    delete updated[key];
    setProdRevenues(updated);
  };

  const handleDeleteServiceRev = (key: string) => {
    const updated = { ...serviceRevenues };
    delete updated[key];
    setServiceRevenues(updated);
  };

  return (
    <div className="space-y-6">
      
      {/* Time Toggle Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#111214] border border-zinc-850 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-bold text-zinc-300 uppercase">Περίοδος Αναφοράς:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "day", label: "Ημέρα" },
            { id: "week", label: "Εβδομάδα" },
            { id: "month", label: "Μήνας" },
            { id: "quarter", label: "Τρίμηνο" },
            { id: "half-year", label: "Εξάμηνο" },
            { id: "year", label: "Χρόνος" }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTimePeriod(item.id)}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium border transition cursor-pointer ${
                timePeriod === item.id
                  ? "bg-emerald-950/50 border-emerald-500 text-emerald-400 font-bold"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Columns for Products and Services input */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Product Revenue column */}
        <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-850">
            <h4 className="text-xs font-mono uppercase tracking-wider font-extrabold text-amber-500">
              ☕ Έσοδα ανά Προϊόν (Weekly Base)
            </h4>
            {editMode && (
              <button
                type="button"
                onClick={handleAddProductRev}
                className="text-amber-400 hover:text-amber-300 font-bold font-mono text-[10px] cursor-pointer flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded border border-zinc-800 active:scale-95 transition-transform"
              >
                <Plus className="w-3 h-3" />
                <span>+ ΠΡΟΣΘΗΚΗ</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {Object.entries(prodRevenues).map(([key, rawVal]) => {
              const displayVal = Math.round(Number(rawVal || 0) * timePeriodMultiplier);
              return (
                <div key={key} className="flex items-center justify-between gap-4 bg-zinc-900/40 p-3 rounded-lg border border-zinc-850">
                  <span className="text-xs font-medium text-zinc-350">{key}</span>
                  <div className="flex items-center gap-2">
                    {editMode ? (
                      <div className="flex items-center">
                        <input
                          type="number"
                          value={Number(rawVal || 0)}
                          onChange={(e) => handleProductRevChange(key, Math.max(0, Number(e.target.value)))}
                          className="w-20 bg-zinc-950 font-mono text-xs text-amber-400 font-extrabold text-right border border-zinc-800 p-1 rounded"
                        />
                        <span className="text-[10px] text-zinc-500 font-mono ml-1">€ /wk</span>
                      </div>
                    ) : (
                      <span className="text-xs font-mono font-bold text-amber-500">{displayVal.toLocaleString("el-GR")} €</span>
                    )}

                    {editMode && (
                      <button
                        type="button"
                        onClick={() => handleDeleteProductRev(key)}
                        className="text-rose-500 hover:text-rose-400 p-1 cursor-pointer transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Service Revenue column */}
        <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-850">
            <h4 className="text-xs font-mono uppercase tracking-wider font-extrabold text-purple-400">
              🖼️ Έσοδα ανά Υπηρεσία (Weekly Base)
            </h4>
            {editMode && (
              <button
                type="button"
                onClick={handleAddServiceRev}
                className="text-purple-400 hover:text-purple-300 font-bold font-mono text-[10px] cursor-pointer flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded border border-zinc-800 active:scale-95 transition-transform"
              >
                <Plus className="w-3 h-3" />
                <span>+ ΠΡΟΣΘΗΚΗ</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {Object.entries(serviceRevenues).map(([key, rawVal]) => {
              const displayVal = Math.round(Number(rawVal || 0) * timePeriodMultiplier);
              return (
                <div key={key} className="flex items-center justify-between gap-4 bg-zinc-900/40 p-3 rounded-lg border border-zinc-850">
                  <span className="text-xs font-medium text-zinc-350">{key}</span>
                  <div className="flex items-center gap-2">
                    {editMode ? (
                      <div className="flex items-center">
                        <input
                          type="number"
                          value={Number(rawVal || 0)}
                          onChange={(e) => handleServiceRevChange(key, Math.max(0, Number(e.target.value)))}
                          className="w-20 bg-zinc-950 font-mono text-xs text-purple-400 font-extrabold text-right border border-zinc-800 p-1 rounded"
                        />
                        <span className="text-[10px] text-zinc-500 font-mono ml-1">€ /wk</span>
                      </div>
                    ) : (
                      <span className="text-xs font-mono font-bold text-purple-400">{displayVal.toLocaleString("el-GR")} €</span>
                    )}

                    {editMode && (
                      <button
                        type="button"
                        onClick={() => handleDeleteServiceRev(key)}
                        className="text-rose-500 hover:text-rose-400 p-1 cursor-pointer transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Advanced Financial Control Panel (Edit Mode only) */}
      {editMode && (
        <div className="bg-[#111214] border border-zinc-800 p-5 rounded-xl space-y-4">
          <div className="border-b border-zinc-850 pb-2">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block tracking-wider">
              ⚙️ ΡΥΘΜΙΣΕΙΣ ΚΑΙ ΠΑΡΑΜΕΤΡΟΙ ΥΠΟΛΟΓΙΣΜΩΝ (Advanced Parameters)
            </span>
            <p className="text-[11px] text-zinc-500">Προσαρμόστε τους συντελεστές και τις τιμές για ολόκληρο το Κεφάλαιο 8.1.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Control 1: Base Target */}
            <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-850 space-y-1">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase block">Βασικός Εβδομαδιαίος Στόχος</label>
              <div className="flex items-center justify-between bg-zinc-950 p-1 rounded border border-zinc-800">
                <input
                  type="number"
                  value={baseTarget}
                  onChange={(e) => setBaseTarget(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-transparent border-none text-amber-500 font-mono font-black text-right pr-2 focus:outline-none focus:ring-0 text-xs"
                />
                <span className="text-[10px] font-mono text-zinc-500 px-2 border-l border-zinc-800">€/wk</span>
              </div>
            </div>

            {/* Control 2: Product COGS % */}
            <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-850 space-y-1">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase block">Κόστος Πωληθέντων Προϊόντων (COGS %)</label>
              <div className="flex items-center justify-between bg-zinc-950 p-1 rounded border border-zinc-800">
                <input
                  type="number"
                  value={prodCogsPercent}
                  onChange={(e) => setProdCogsPercent(Math.max(0, Math.min(100, Number(e.target.value))))}
                  className="w-full bg-transparent border-none text-zinc-100 font-mono font-bold text-right pr-2 focus:outline-none focus:ring-0 text-xs"
                />
                <span className="text-[10px] font-mono text-zinc-500 px-2 border-l border-zinc-800">%</span>
              </div>
            </div>

            {/* Control 3: Service COGS % */}
            <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-850 space-y-1">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase block">Κόστος Παροχής Υπηρεσιών (COGS %)</label>
              <div className="flex items-center justify-between bg-zinc-950 p-1 rounded border border-zinc-800">
                <input
                  type="number"
                  value={serviceCogsPercent}
                  onChange={(e) => setServiceCogsPercent(Math.max(0, Math.min(100, Number(e.target.value))))}
                  className="w-full bg-transparent border-none text-zinc-100 font-mono font-bold text-right pr-2 focus:outline-none focus:ring-0 text-xs"
                />
                <span className="text-[10px] font-mono text-zinc-500 px-2 border-l border-zinc-800">%</span>
              </div>
            </div>

            {/* Control 4: Contribution Margin % (Break-Even) */}
            <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-850 space-y-1">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase block">Περιθώριο Συνεισφοράς (Break-Even %)</label>
              <div className="flex items-center justify-between bg-zinc-950 p-1 rounded border border-zinc-800">
                <input
                  type="number"
                  value={contributionMarginPercent}
                  onChange={(e) => setContributionMarginPercent(Math.max(1, Math.min(100, Number(e.target.value))))}
                  className="w-full bg-transparent border-none text-zinc-100 font-mono font-bold text-right pr-2 focus:outline-none focus:ring-0 text-xs"
                />
                <span className="text-[10px] font-mono text-zinc-500 px-2 border-l border-zinc-800">%</span>
              </div>
            </div>

            {/* Control 5: Forecast parameters */}
            <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-850 space-y-1">
              <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase block">Πρόβλεψη: Στόχος Growth Ahead / Behind</label>
              <div className="flex items-center gap-1">
                <div className="flex items-center bg-zinc-950 p-1 rounded border border-zinc-800 w-1/2">
                  <input
                    type="number"
                    value={growthAheadPercent}
                    onChange={(e) => setGrowthAheadPercent(Math.max(0, Math.min(100, Number(e.target.value))))}
                    className="w-full bg-transparent border-none text-emerald-400 font-mono font-bold text-right pr-1 focus:outline-none text-xs"
                    title="Όταν είστε μπροστά από το στόχο"
                  />
                  <span className="text-[9px] font-mono text-zinc-600 pl-1 uppercase">A%</span>
                </div>
                <div className="flex items-center bg-zinc-950 p-1 rounded border border-zinc-800 w-1/2">
                  <input
                    type="number"
                    value={growthBehindPercent}
                    onChange={(e) => setGrowthBehindPercent(Math.max(0, Math.min(100, Number(e.target.value))))}
                    className="w-full bg-transparent border-none text-rose-500 font-mono font-bold text-right pr-1 focus:outline-none text-xs"
                    title="Όταν είστε πίσω από το στόχο"
                  />
                  <span className="text-[9px] font-mono text-zinc-600 pl-1 uppercase">B%</span>
                </div>
              </div>
            </div>

            {/* Control 6: Custom Fixed Expenses Override */}
            <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-850 space-y-1.5 md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase block">Σταθερά Έξοδα Override</label>
                <button
                  type="button"
                  onClick={() => setUseCustomFixedExpenses(!useCustomFixedExpenses)}
                  className={`text-[9px] font-mono font-black px-1.5 py-0.5 rounded transition ${
                    useCustomFixedExpenses 
                      ? "bg-amber-950 text-amber-400 border border-amber-800 cursor-pointer" 
                      : "bg-zinc-800 text-zinc-400 border border-zinc-750 cursor-pointer text-zinc-500"
                  }`}
                >
                  {useCustomFixedExpenses ? "OVERRIDE ACTIVE" : "OFF (AUTO)"}
                </button>
              </div>
              <div className={`flex items-center justify-between p-1 rounded border transition ${
                useCustomFixedExpenses ? "bg-zinc-950 border-amber-950" : "bg-zinc-950/20 border-zinc-850 opacity-40"
              }`}>
                <input
                  type="number"
                  disabled={!useCustomFixedExpenses}
                  value={customFixedExpensesMonthly}
                  onChange={(e) => setCustomFixedExpensesMonthly(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-transparent border-none text-zinc-100 font-mono font-extrabold text-right pr-2 focus:outline-none focus:ring-0 text-xs disabled:cursor-not-allowed"
                />
                <span className="text-[10px] font-mono text-zinc-500 px-2 border-l border-zinc-800">€/mo</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Summary report table & dashboards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Dashboard Block 1: Target Variance Indicators */}
        <div className="bg-[#141618] border border-zinc-800 rounded-xl p-4 space-y-3.5 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">ΣΤΟΧΟΙ & ΠΡΟΒΛΕΨΕΙΣ</span>
            <h5 className="text-xs font-bold text-zinc-300">Πορεία προς το Στόχο ({timePeriodLabels[timePeriod]})</h5>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-end">
              <span className="text-2xl font-mono font-black text-zinc-100">
                {Math.round(currentTotalRevenue).toLocaleString("el-GR")} €
              </span>
              <span className="text-zinc-500 text-xs font-mono">
                Στόχος: {Math.round(currentTarget).toLocaleString("el-GR")} €
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className={`px-2 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 border ${
                isAheadOfTarget 
                  ? "bg-emerald-950/50 border-emerald-800 text-emerald-400" 
                  : "bg-rose-950/50 border-rose-800 text-rose-400"
              }`}>
                {isAheadOfTarget ? "🏆 ΜΠΡΟΣΤΑ (Ahead)" : "⚠️ ΠΙΣΩ (Behind)"}
              </div>
              <span className={`text-xs font-mono font-bold ${isAheadOfTarget ? "text-emerald-400" : "text-rose-400"}`}>
                {isAheadOfTarget ? "+" : ""}{targetVariancePercentage}% από το στόχο
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Block 2: Automatically calculate next week's revenue target */}
        <div className="bg-[#141618] border border-zinc-800 rounded-xl p-4 space-y-3.5 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block">DYNAMIC COMPLIANCE FORECAST</span>
            <h5 className="text-xs font-bold text-zinc-300">Πρόβλεψη Επόμενης Εβδομάδας</h5>
          </div>

          <div className="space-y-2.5">
            <div className="text-2xl font-mono font-black text-amber-400">
              {nextWeekExpectedTarget.toLocaleString("el-GR")} €
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-400">
              Υπολογίζεται αυτόματα με βάση την απόδoση της τρέχουσας εβδομάδας ({rawTotalSum.toLocaleString("el-GR")} €) με συντελεστή προσαρμογής {isAheadOfTarget ? `+${growthAheadPercent}%` : `+${growthBehindPercent}%`}.
            </p>
          </div>
        </div>

        {/* Dashboard Block 3: Break-Even Point tracker */}
        <div className="bg-[#141618] border border-zinc-800 rounded-xl p-4 space-y-3.5 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block">BREAK-EVEN TRACKER</span>
            <h5 className="text-xs font-bold text-zinc-300">Νεκρό Σημείο (Weekly Rate)</h5>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-end">
              <span className="text-2xl font-mono font-black text-blue-400">
                {weeklyBreakEvenRevenue.toLocaleString("el-GR")} €
              </span>
              <span className="text-zinc-500 text-xs font-mono">
                Σταθερά: {Math.round(activeMonthlyFixedExpenses).toLocaleString("el-GR")} €/mo
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <div className={`w-2.5 h-2.5 rounded-full ${isBreakEvenMet ? "bg-emerald-500" : "bg-zinc-700 animate-pulse"}`}></div>
              <span className={isBreakEvenMet ? "text-emerald-400 font-bold" : "text-zinc-400"}>
                {isBreakEvenMet ? "✅ Το Break-Even Καλύφθηκε!" : `⚠️ Χρειάζονται ακόμη ${(weeklyBreakEvenRevenue - rawTotalSum).toLocaleString("el-GR")} €`}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Summary and Net Profit computation sheet */}
      <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4">
        <h4 className="text-xs font-mono uppercase tracking-wider font-extrabold text-emerald-400 flex items-center gap-2 pb-2 border-b border-zinc-850">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <span>Συνοπτική Κατάσταση Αποτελεσμάτων ({timePeriodLabels[timePeriod]})</span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 uppercase font-mono text-[9px] tracking-wider">
                <th className="py-2.5">Κατηγορία</th>
                <th className="py-2.5 text-right">Συνεισφορά (€)</th>
                <th className="py-2.5 text-right">Ποσοστό / Παρατηρήσεις</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-zinc-300">
              
              {/* Product revenue */}
              <tr>
                <td className="py-3 font-medium">🛍️ Έσοδα από Πώληση Προϊόντων (Retail / Drop / Bakery / Café)</td>
                <td className="py-3 text-right font-mono text-emerald-400 font-bold">
                  {Math.round(currentProductSum).toLocaleString("el-GR")} €
                </td>
                <td className="py-3 text-right text-zinc-500 font-mono">
                  {Math.round((currentProductSum / (currentTotalRevenue || 1)) * 100)}%
                </td>
              </tr>

              {/* Service revenue */}
              <tr>
                <td className="py-3 font-medium">🎨 Έσοδα από Παροχή Υπηρεσιών (Skate tickets, Curations, Workshops)</td>
                <td className="py-3 text-right font-mono text-emerald-400 font-bold">
                  {Math.round(currentServiceSum).toLocaleString("el-GR")} €
                </td>
                <td className="py-3 text-right text-zinc-500 font-mono">
                  {Math.round((currentServiceSum / (currentTotalRevenue || 1)) * 100)}%
                </td>
              </tr>

              {/* Total revenue */}
              <tr className="bg-zinc-950/40">
                <td className="py-3 font-extrabold text-zinc-100 uppercase tracking-tight">💰 Συνολικά Έσοδα (Gross Revenue)</td>
                <td className="py-3 text-right font-mono text-emerald-400 font-black text-sm">
                  {Math.round(currentTotalRevenue).toLocaleString("el-GR")} €
                </td>
                <td className="py-3 text-right text-emerald-500 font-mono font-bold">100%</td>
              </tr>

              {/* Estimated COGS */}
              <tr>
                <td className="py-3 font-medium text-zinc-400">📉 Κόστος Πωληθέντων (COGS)</td>
                <td className="py-3 text-right font-mono text-rose-500">
                  - {Math.round(currentEstimatedCogs).toLocaleString("el-GR")} €
                </td>
                <td className="py-3 text-right text-zinc-500 font-mono">
                  {prodCogsPercent}% Προϊόντα / {serviceCogsPercent}% Υπηρεσίες
                </td>
              </tr>

              {/* Fixed Expenses */}
              <tr>
                <td className="py-3 font-medium text-zinc-400">🏢 Σταθερά Λειτουργικά Έξοδα (Ενοίκια, Μισθοί, Ρεύμα)</td>
                <td className="py-3 text-right font-mono text-rose-500">
                  - {Math.round(currentFixedExpenses).toLocaleString("el-GR")} €
                </td>
                <td className="py-3 text-right text-zinc-500 font-mono font-bold">
                  {useCustomFixedExpenses ? "Χειροκίνητη Παράκαμψη" : `${fixedExpenses.length} ενεργά πάγια`}
                </td>
              </tr>

              {/* Net profits */}
              <tr className={`font-black ${currentNetProfit >= 0 ? "bg-emerald-950/20 text-emerald-400" : "bg-rose-950/20 text-rose-400"}`}>
                <td className="py-3 px-2 uppercase tracking-wide">🏆 Καθαρό Κέρδος (Net Profit)</td>
                <td className="py-3 text-right font-mono text-sm px-2">
                  {Math.round(currentNetProfit).toLocaleString("el-GR")} €
                </td>
                <td className="py-3 text-right uppercase text-[9px] font-mono pr-2">
                  {currentNetProfit >= 0 ? "📈 ΚΕΡΔΟΦΟΡΙΑ" : "⚠️ ΖΗΜΙΕΣ"}
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
