/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { 
  Coffee, 
  Flame, 
  MapPin, 
  Clock, 
  Users, 
  TrendingUp, 
  Palette, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  ChevronRight, 
  Sliders, 
  ArrowRight, 
  Megaphone, 
  BookOpen, 
  DollarSign,
  Layers,
  Sparkles,
  ClipboardCheck,
  Check,
  RotateCcw,
  Edit3,
  Plus,
  Trash2,
  Save,
  Package,
  ClipboardList
} from "lucide-react";
import { 
  EXECUTVE_SUMMARY, 
  PORTER_FORCES, 
  SERVICES, 
  MARKETING_CAMPAIGNS, 
  HOURLY_ZONES_PRE_CALCULATIONS, 
  BARISTA_WORKFLOW, 
  STAFF_EVALUATION,
  PEST_ANALYSIS,
  INDUSTRY_ANALYSIS,
  SWOT_ANALYSIS,
  TOWS_MATRIX,
  STRATEGY_CHOICES,
  FUNCTIONAL_STRATEGIES,
  IMPLEMENTATION_TIMELINE,
  RISK_ANALYSIS,
  FINANCIAL_PRODUCTS,
  FIXED_EXPENSES,
  EXTRA_SERVICES_REVENUE_ESTIMATES
} from "./data/businessPlanData";
import EditableUnit from "./components/EditableUnit";
import EditableList from "./components/EditableList";

// Types
import { PorterForce, ServiceItem, MarketingCategory, CustomSection, FinancialTableItem, ExpenseItem } from "./types/businessPlan";

export default function App() {
  // Global View/Edit State Toggle
  const [editMode, setEditMode] = useState<boolean>(false);

  // Site password and unlock states (the default password is encoded to prevent plain text display)
  const [sitePassword, setSitePassword] = useState<string>(() => {
    const saved = localStorage.getItem("thess_cult_hub_password");
    return saved ? saved : atob("Y3VsdDIwMjY="); // Default password is "cult2026", decoded on the fly
  });
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem("thess_cult_hub_unlocked") === "true";
  });
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showPasswordInEdit, setShowPasswordInEdit] = useState<boolean>(false);

  // Dynamic Tabs & Sidebar navigation containing default Greek chapters & user-added headings
  const [customTabs, setCustomTabs] = useState<CustomSection[]>(() => {
    const saved = localStorage.getItem("thess_cult_hub_custom_tabs");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState<string>("overview");

  // Save custom tabs to localStorage
  useEffect(() => {
    localStorage.setItem("thess_cult_hub_custom_tabs", JSON.stringify(customTabs));
  }, [customTabs]);

  // Executive Summary State
  const [execSummary, setExecSummary] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_exec_summary");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Safe migration for updated resources and core competencies
        if (parsed.resources && (!parsed.resources.physical || !parsed.resources.physical.includes("Πού βοηθάει"))) {
          parsed.resources.physical = EXECUTVE_SUMMARY.resources.physical;
          parsed.resources.intangible = EXECUTVE_SUMMARY.resources.intangible;
          parsed.resources.competencies = EXECUTVE_SUMMARY.resources.competencies;
          localStorage.setItem("thess_cult_hub_exec_summary", JSON.stringify(parsed));
        }
        return parsed;
      } catch (e) {
        return EXECUTVE_SUMMARY;
      }
    }
    return EXECUTVE_SUMMARY;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_exec_summary", JSON.stringify(execSummary));
  }, [execSummary]);

  // SWOT State
  const [swot, setSwot] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_swot");
    return saved ? JSON.parse(saved) : SWOT_ANALYSIS;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_swot", JSON.stringify(swot));
  }, [swot]);

  // PEST Analysis State
  const [pest, setPest] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_pest");
    return saved ? JSON.parse(saved) : PEST_ANALYSIS;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_pest", JSON.stringify(pest));
  }, [pest]);

  // Industry Analysis State
  const [industry, setIndustry] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_industry");
    return saved ? JSON.parse(saved) : INDUSTRY_ANALYSIS;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_industry", JSON.stringify(industry));
  }, [industry]);

  // TOWS Matrix State
  const [tows, setTows] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_tows");
    return saved ? JSON.parse(saved) : TOWS_MATRIX;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_tows", JSON.stringify(tows));
  }, [tows]);

  // Strategy Choices State
  const [stratChoices, setStratChoices] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_strat_choices");
    return saved ? JSON.parse(saved) : STRATEGY_CHOICES;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_strat_choices", JSON.stringify(stratChoices));
  }, [stratChoices]);

  // Functional Strategies State
  const [funcStrats, setFuncStrats] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_func_strats");
    return saved ? JSON.parse(saved) : FUNCTIONAL_STRATEGIES;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_func_strats", JSON.stringify(funcStrats));
  }, [funcStrats]);

  // Timeline State
  const [timeline, setTimeline] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_timeline");
    return saved ? JSON.parse(saved) : IMPLEMENTATION_TIMELINE;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_timeline", JSON.stringify(timeline));
  }, [timeline]);

  // Risk Analysis State
  const [risks, setRisks] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_risks");
    return saved ? JSON.parse(saved) : RISK_ANALYSIS;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_risks", JSON.stringify(risks));
  }, [risks]);

  // Porter Forces State
  const [porter, setPorter] = useState<PorterForce[]>(() => {
    const saved = localStorage.getItem("thess_cult_hub_porter");
    return saved ? JSON.parse(saved) : PORTER_FORCES;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_porter", JSON.stringify(porter));
  }, [porter]);

  // Core business attributes: values, goals, capabilities and custom functional strategies
  const [customValues, setCustomValues] = useState<string[]>(() => {
    const saved = localStorage.getItem("thess_cult_hub_custom_values");
    return saved ? JSON.parse(saved) : [
      "Αυθεντικότητα στην έκφραση και ειλικρίνεια",
      "Η κοινότητα πάνω από το απρόσωπο κέρδος",
      "Υψηλή αισθητική και street κουλτούρα φιλοξενίας"
    ];
  });

  const [customGoals, setCustomGoals] = useState<string[]>(() => {
    const saved = localStorage.getItem("thess_cult_hub_custom_goals");
    return saved ? JSON.parse(saved) : [
      "150+ καθημερινοί ενεργοί επισκέπτες στο Multi-Hub",
      "10+ μηνιαία skate events και live exhibitions",
      "Εδραίωση ως ο 1ος indoor skate-friendly προορισμός"
    ];
  });

  const [customCapabilities, setCustomCapabilities] = useState<string[]>(() => {
    const saved = localStorage.getItem("thess_cult_hub_custom_capabilities");
    return saved ? JSON.parse(saved) : [
      "Δημιουργική επιμέλεια Multi-Hub concept",
      "Αδιαμεσολάβητη πρόσβαση στην underground κοινότητα",
      "Premium Specialty Coffee με urban culture αισθητική"
    ];
  });

  const [customFuncStrats, setCustomFuncStrats] = useState<Array<{id: string, title: string, content: string}>>(() => {
    const saved = localStorage.getItem("thess_cult_hub_custom_func_strats");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_custom_values", JSON.stringify(customValues));
  }, [customValues]);

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_custom_goals", JSON.stringify(customGoals));
  }, [customGoals]);

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_custom_capabilities", JSON.stringify(customCapabilities));
  }, [customCapabilities]);

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_custom_func_strats", JSON.stringify(customFuncStrats));
  }, [customFuncStrats]);

  // Marketing Campaigns State
  const [marketing, setMarketing] = useState<MarketingCategory[]>(() => {
    const saved = localStorage.getItem("thess_cult_hub_marketing");
    return saved ? JSON.parse(saved) : MARKETING_CAMPAIGNS;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_marketing", JSON.stringify(marketing));
  }, [marketing]);

  // Services State
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem("thess_cult_hub_services");
    return saved ? JSON.parse(saved) : SERVICES;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_services", JSON.stringify(services));
  }, [services]);

  // Chapters State
  const [chapters, setChapters] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_chapters");
    let parsed = saved ? JSON.parse(saved) : null;
    
    const defaults = [
      { id: "overview", label: "1. Εισαγωγή & Όραμα" },
      { id: "internal-prod", label: "2. Εσωτερική Ανάλυση & Προϊόντα" },
      { id: "external-pest", label: "3. Εξωτερική Ανάλυση & Porter" },
      { id: "strategy-swot", label: "4. Στρατηγική & SWOT / TOWS" },
      { id: "operating-workflow", label: "5. Λειτουργικό Πλάνο & Workflows" },
      { id: "marketing-mix", label: "6. Καμπάνιες & Marketing" },
      { id: "timeline-risks", label: "7. Χρονοδιάγραμμα & Κίνδυνοι" },
      { id: "financial-plan", label: "8. Οικονομικό Πλάνο & Break-Even" },
      { id: "stock-orders", label: "9. Στοκ & Ημερήσιες Παραγγελίες" },
      { id: "brand-identity", label: "🎨 10. Ταυτότητα & Visual Studio" }
    ];
    
    if (!parsed) return defaults;
    
    const exists = parsed.some((ch: any) => ch.id === "stock-orders");
    if (!exists) {
      const finIdx = parsed.findIndex((ch: any) => ch.id === "financial-plan");
      if (finIdx !== -1) {
        parsed.splice(finIdx + 1, 0, { id: "stock-orders", label: "9. Στοκ & Ημερήσιες Παραγγελίες" });
      } else {
        parsed.push({ id: "stock-orders", label: "9. Στοκ & Ημερήσιες Παραγγελίες" });
      }
    }
    
    const hasBrand = parsed.some((ch: any) => ch.id === "brand-identity");
    if (!hasBrand) {
      parsed.push({ id: "brand-identity", label: "🎨 10. Ταυτότητα & Visual Studio" });
    }
    
    return parsed;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_chapters", JSON.stringify(chapters));
  }, [chapters]);

  // Visual System Customizer State (Gallery + Street Art aesthetic)
  const [visualSystem, setVisualSystem] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_visual_system");
    let state = saved ? JSON.parse(saved) : null;
    if (!state || !state.mode || state.mode === "stark-beige-punk") {
      state = {
        mode: "minimal-pastel-mural", 
        primaryColor: "#ef876b", // Coral Peach primary accent
        displayFont: "Space Grotesk",
        bodyFont: "Inter",
        textureType: "canvas", // Delicate texture
        textureOpacity: 0.05,
        corners: "sharp", // Clean sharp modernism (0px radius)
        activeDecals: ["pastel-shapes", "mural-stars"] // Mural-inspired decals
      };
    }
    // Backward compatibility: ensure corners property exists
    if (state && !state.corners) {
      state.corners = "sharp";
    }
    return state;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_visual_system", JSON.stringify(visualSystem));
  }, [visualSystem]);

  // Target Configuration Defaults State
  const [weekdayTarget, setWeekdayTarget] = useState<number>(() => {
    const saved = localStorage.getItem("thess_cult_hub_target_weekday");
    return saved ? Number(saved) : 130;
  });
  const [weekendTarget, setWeekendTarget] = useState<number>(() => {
    const saved = localStorage.getItem("thess_cult_hub_target_weekend");
    return saved ? Number(saved) : 200;
  });
  const [sundayTarget, setSundayTarget] = useState<number>(() => {
    const saved = localStorage.getItem("thess_cult_hub_target_sunday");
    return saved ? Number(saved) : 160;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_target_weekday", String(weekdayTarget));
  }, [weekdayTarget]);

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_target_weekend", String(weekendTarget));
  }, [weekendTarget]);

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_target_sunday", String(sundayTarget));
  }, [sundayTarget]);

  // Operating Zones custom state
  const [operatingZones, setOperatingZones] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_operating_zones");
    return saved ? JSON.parse(saved) : HOURLY_ZONES_PRE_CALCULATIONS.sections;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_operating_zones", JSON.stringify(operatingZones));
  }, [operatingZones]);

  // Product categories state
  const [productCategories, setProductCategories] = useState<Array<{id: string, label: string}>>(() => {
    const saved = localStorage.getItem("thess_cult_hub_product_categories");
    return saved ? JSON.parse(saved) : [
      { id: "coffee", label: "Specialty Καφέδες" },
      { id: "snacks", label: "Χειροποίητα Σνακ" },
      { id: "beers", label: "Local Craft Μπύρες" },
      { id: "cocktails", label: "Street-Art Cocktails" }
    ];
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_product_categories", JSON.stringify(productCategories));
  }, [productCategories]);

  // Stock items state
  const [stockProducts, setStockProducts] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_stock_products");
    return saved ? JSON.parse(saved) : [
      { id: "stock-1", name: "Specialty Espresso Blend (House)", category: "coffee", unit: "kg", currentStock: 4.2, dailySales: 3.5, daysToCover: 4, costPerUnit: 22.50 },
      { id: "stock-2", name: "Single Origin Filter Coffee (Kenya)", category: "coffee", unit: "kg", currentStock: 1.5, dailySales: 1.2, daysToCover: 5, costPerUnit: 26.00 },
      { id: "stock-3", name: "Γάλα Φρέσκο Πλήρες (1L)", category: "snacks", unit: "λίτρο", currentStock: 15, dailySales: 18, daysToCover: 2, costPerUnit: 1.15 },
      { id: "stock-4", name: "Φυτικό Ρόφημα Βρώμης (Oat)", category: "snacks", unit: "λίτρο", currentStock: 8, dailySales: 10, daysToCover: 3, costPerUnit: 1.85 },
      { id: "stock-5", name: "Fritz-Cola Classic", category: "beers", unit: "τεμάχιο", currentStock: 30, dailySales: 25, daysToCover: 3, costPerUnit: 1.35 },
      { id: "stock-6", name: "Local Pale Ale Craft Beer", category: "beers", unit: "τεμάχιο", currentStock: 20, dailySales: 15, daysToCover: 4, costPerUnit: 1.95 },
      { id: "stock-7", name: "Skate Griptape Mob", category: "other", unit: "τεμάχιο", currentStock: 6, dailySales: 2, daysToCover: 10, costPerUnit: 4.80 }
    ];
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_stock_products", JSON.stringify(stockProducts));
  }, [stockProducts]);

  // Barista Workflow State
  const [baristaWorkflow, setBaristaWorkflow] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_barista_workflow");
    return saved ? JSON.parse(saved) : BARISTA_WORKFLOW;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_barista_workflow", JSON.stringify(baristaWorkflow));
  }, [baristaWorkflow]);

  // Staff Evaluation State
  const [staffEvaluation, setStaffEvaluation] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_staff_evaluation");
    return saved ? JSON.parse(saved) : STAFF_EVALUATION;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_staff_evaluation", JSON.stringify(staffEvaluation));
  }, [staffEvaluation]);

  // Barista Workflow Ticks Setup
  const [morningTicks, setMorningTicks] = useState<Record<string, boolean>>({});
  const [busyTicks, setBusyTicks] = useState<Record<string, boolean>>({});
  const [closingTicks, setClosingTicks] = useState<Record<string, boolean>>({});

  // Dynamic next hour states for calculations
  const [dayType, setDayType] = useState<"weekday" | "weekend" | "sunday" | "custom">("weekday");
  const [customDailyTarget, setCustomDailyTarget] = useState<number>(150);
  const [selectedZoneIndex, setSelectedZoneIndex] = useState<number>(0);
  const [hoursElapsedInZone, setHoursElapsedInZone] = useState<number>(1);
  const [actualSalesInZone, setActualSalesInZone] = useState<number>(5);

  // Active Service State
  const [selectedServiceId, setSelectedServiceId] = useState<string>("graffiti-wall");

  // Dynamic financial parameters state
  const [financialProducts, setFinancialProducts] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_fin_products");
    return saved ? JSON.parse(saved) : FINANCIAL_PRODUCTS;
  });

  const [financialTitle, setFinancialTitle] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_fin_title");
    return saved ? saved : "5.1 Προϊόντα & 5.2 Τιμές (χωρίς ΦΠΑ)";
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_fin_products", JSON.stringify(financialProducts));
  }, [financialProducts]);

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_fin_title", financialTitle);
  }, [financialTitle]);

  const [shopHours, setShopHours] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_hours");
    return saved ? saved : "07:00 - 24:00";
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_hours", shopHours);
  }, [shopHours]);

  const [fixedExpenses, setFixedExpenses] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_fixed_expenses");
    return saved ? JSON.parse(saved) : FIXED_EXPENSES;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_fixed_expenses", JSON.stringify(fixedExpenses));
  }, [fixedExpenses]);

  const [extraServicesRevenue, setExtraServicesRevenue] = useState(() => {
    const saved = localStorage.getItem("thess_cult_hub_extra_services");
    return saved ? JSON.parse(saved) : EXTRA_SERVICES_REVENUE_ESTIMATES;
  });

  useEffect(() => {
    localStorage.setItem("thess_cult_hub_extra_services", JSON.stringify(extraServicesRevenue));
  }, [extraServicesRevenue]);

  // Extra sales toggle
  const [includeExtraSales, setIncludeExtraSales] = useState<boolean>(true);

  // State to hold dynamic inputs for new dynamic section form
  const [newTabTitle, setNewTabTitle] = useState("");
  const [newTabContent, setNewTabContent] = useState("");
  const [showNewTabForm, setShowNewTabForm] = useState(false);

  // Helper format
  const formatEuro = (value: number) => {
    return new Intl.NumberFormat("el-GR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
  };

  // Resolve daily goal based on type selection
  const dailyTargetGoal = useMemo(() => {
    if (dayType === "weekday") return weekdayTarget;
    if (dayType === "weekend") return weekendTarget;
    if (dayType === "sunday") return sundayTarget;
    return customDailyTarget;
  }, [dayType, weekdayTarget, weekendTarget, sundayTarget, customDailyTarget]);

  // Hourly target division based on zones but reactively scaled
  const activeZoneCalculations = useMemo(() => {
    return operatingZones.map((section: any) => {
      const calculatedDailySales = Math.round((dailyTargetGoal * section.percentage) / 100);
      const calculatedHourlySales = Number((calculatedDailySales / section.duration).toFixed(1));
      
      const taQty = Number(((calculatedDailySales * section.takeAwayPercent) / 100).toFixed(1));
      const sitQty = Number(((calculatedDailySales * section.sitInPercent) / 100).toFixed(1));
      
      return {
        ...section,
        totalSales: calculatedDailySales,
        hourlySales: calculatedHourlySales,
        takeAwayQty: taQty,
        sitInQty: sitQty,
      };
    });
  }, [dailyTargetGoal, operatingZones]);

  const selectedZone = activeZoneCalculations[selectedZoneIndex];

  // Dynamic next hour status check
  const nextHourStatus = useMemo(() => {
    if (!selectedZone) return { requiredNext: 0, status: "Normal", message: "" };
    
    const zoneHourlyTarget = selectedZone.hourlySales;
    const theoreticalTargetSoFar = zoneHourlyTarget * hoursElapsedInZone;
    const difference = actualSalesInZone - theoreticalTargetSoFar;
    const hoursRemaining = selectedZone.duration - hoursElapsedInZone;
    
    let requiredNext = zoneHourlyTarget;
    let status: "ahead" | "on-track" | "behind" = "on-track";
    let message = "";

    if (hoursRemaining > 0) {
      const remainingTargetInZone = selectedZone.totalSales - actualSalesInZone;
      requiredNext = Number((remainingTargetInZone / hoursRemaining).toFixed(1));
      if (requiredNext < 0) requiredNext = 0;
    } else {
      requiredNext = selectedZone.totalSales - actualSalesInZone;
      if (requiredNext < 0) requiredNext = 0;
    }

    if (difference > 2) {
      status = "ahead";
      message = "Εξαιρετική επίδοση! Είστε μπροστά από τους στόχους της ζώνης. Η σύνδεση με την κοινότητα αποδίδει.";
    } else if (difference < -2) {
      status = "behind";
      message = "Είστε πίσω από το στόχο της ζώνης. Προτείνεται: 1) Combo Specialty Espresso με σνακ, 2) Καμπάνια στα social media, 3) Ήπιο Up-selling!";
    } else {
      status = "on-track";
      message = "Σταθερή & υγιής λειτουργία. Η κατανάλωση specialty καφέ κινείται απόλυτα εντός του SMART σχεδιασμού.";
    }

    return {
      requiredNext,
      status,
      message,
      theoreticalTargetSoFar: Number(theoreticalTargetSoFar.toFixed(1))
    };
  }, [selectedZone, hoursElapsedInZone, actualSalesInZone]);

  // Selected service detailed data
  const activeService = useMemo(() => {
    return services.find(s => s.id === selectedServiceId) || services[0];
  }, [selectedServiceId, services]);

  const toggleTick = (phase: "morning" | "busy" | "closing", stepIndex: number) => {
    const key = `${phase}-${stepIndex}`;
    if (phase === "morning") {
      setMorningTicks(prev => ({ ...prev, [key]: !prev[key] }));
    } else if (phase === "busy") {
      setBusyTicks(prev => ({ ...prev, [key]: !prev[key] }));
    } else {
      setClosingTicks(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const getWorkflowProgress = (phase: "morning" | "busy" | "closing") => {
    const total = 4;
    let ticked = 0;
    const ticks = phase === "morning" ? morningTicks : phase === "busy" ? busyTicks : closingTicks;
    ticked = Object.keys(ticks).filter(k => k.startsWith(phase) && ticks[k]).length;
    return Math.round((ticked / total) * 100);
  };

  const resetAllProgress = () => {
    setMorningTicks({});
    setBusyTicks({});
    setClosingTicks({});
  };

  // Add Custom Section to Plan
  const handleAddCustomSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTabTitle.trim() || !newTabContent.trim()) return;

    const newId = "custom-" + Date.now();
    const newSection: CustomSection = {
      id: newId,
      title: newTabTitle,
      category: "custom",
      content: newTabContent
    };

    setCustomTabs(prev => [...prev, newSection]);
    setNewTabTitle("");
    setNewTabContent("");
    setShowNewTabForm(false);
    setActiveTab(newId);
  };

  // Remove custom tab
  const handleRemoveCustomTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την επικεφαλίδα από την πλοήγηση;")) {
      setCustomTabs(prev => prev.filter(t => t.id !== id));
      setActiveTab("overview");
    }
  };

  // Dynamic Financial Simulator Calculations
  const averagePrice = useMemo(() => {
    const sum = financialProducts.reduce((acc: number, p: any) => acc + p.price, 0);
    return Number((sum / financialProducts.length).toFixed(2));
  }, [financialProducts]);

  const averageCost = useMemo(() => {
    const sum = financialProducts.reduce((acc: number, p: any) => acc + p.cost, 0);
    return Number((sum / financialProducts.length).toFixed(2));
  }, [financialProducts]);

  const avgProfitMargin = Number((averagePrice - averageCost).toFixed(2));

  // Regular Coffee & Drinks Revenue per Month (approximate daily sales based on selection)
  // Let's compute average daily sales = (weekdayTarget * 4 (Mon-Thu) + weekendTarget * 2 (Fri-Sat) + sundayTarget * 1) / 7
  const weightedAverageDailySales = useMemo(() => {
    return Math.round((weekdayTarget * 4 + weekendTarget * 2 + sundayTarget) / 7);
  }, [weekdayTarget, weekendTarget, sundayTarget]);

  const monthlyProductsVolume = weightedAverageDailySales * 30; // ~30 days
  const monthlyCoffeeSalesRevenue = monthlyProductsVolume * averagePrice;
  const monthlyCoffeeCostOfGoodsSold = monthlyProductsVolume * averageCost;

  // Monthly Extra revenue
  const monthlyExtraRevenue = useMemo(() => {
    if (!includeExtraSales) return 0;
    return extraServicesRevenue.reduce((acc: number, item: any) => acc + item.estimate, 0);
  }, [includeExtraSales, extraServicesRevenue]);

  const totalMonthlyRevenueCombined = monthlyCoffeeSalesRevenue + monthlyExtraRevenue;

  // Total Fixed Expenses
  const totalMonthlyFixedExpenses = useMemo(() => {
    return fixedExpenses.reduce((acc: number, exp: any) => acc + exp.amount, 0);
  }, [fixedExpenses]);

  const netMonthlyProfitPreTax = totalMonthlyRevenueCombined - monthlyCoffeeCostOfGoodsSold - totalMonthlyFixedExpenses;

  // Break-even Calculations in daily euros
  const monthlyFixedCostCombined = totalMonthlyFixedExpenses;
  const contributionMarginPercent = (averagePrice - averageCost) / averagePrice;
  const monthlyBreakEvenInEuro = monthlyFixedCostCombined / contributionMarginPercent;
  const dailyBreakEvenInEuro = monthlyBreakEvenInEuro / 30;

  // AI COMMENTARY STATES & METHODS
  const [aiCommentary, setAiCommentary] = useState<string>(() => {
    return localStorage.getItem("thess_cult_hub_ai_commentary") || "";
  });
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [isFinancialsDirty, setIsFinancialsDirty] = useState<boolean>(false);
  const isFirstRender = React.useRef(true);

  // Trigger dirty flag on changes to financial inputs after first load
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsFinancialsDirty(true);
  }, [weekdayTarget, weekendTarget, fixedExpenses, extraServicesRevenue, includeExtraSales]);

  const generateNewAiCommentary = async () => {
    setAiLoading(true);
    try {
      const response = await fetch("/api/generate-commentary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weekdayTarget,
          weekendTarget,
          fixedExpenses,
          extraServicesRevenue,
          includeExtraSales,
          monthlyCoffeeSalesRevenue,
          monthlyExtraRevenue,
          monthlyCoffeeCostOfGoodsSold,
          netMonthlyProfitPreTax,
          monthlyBreakEvenInEuro,
          dailyBreakEvenInEuro
        })
      });
      const data = await response.json();
      if (data.success) {
        setAiCommentary(data.commentary);
        localStorage.setItem("thess_cult_hub_ai_commentary", data.commentary);
        setIsFinancialsDirty(false);
      } else {
        setAiCommentary(data.commentary || "Σφάλμα κατά τη λήψη σχολιασμού.");
      }
    } catch (e: any) {
      console.error(e);
      setAiCommentary(`⚠️ Σφάλμα επικοινωνίας με το API: ${e.message || e}`);
    } finally {
      setAiLoading(false);
    }
  };

  const renderCommentaryWithStyle = (text: string) => {
    if (!text) return null;
    return text.split("\n").map((line, idx) => {
      let cleanLine = line.trim();
      if (!cleanLine) return <div key={idx} className="h-2" />;
      const isBullet = cleanLine.startsWith("- ") || cleanLine.startsWith("* ");
      if (isBullet) {
        cleanLine = cleanLine.substring(2);
      }
      const parts = cleanLine.split("**");
      const renderedParts = parts.map((part, i) => {
        if (i % 2 === 1) {
          return <strong key={i} className="text-amber-450 font-bold font-display">{part}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={idx} className="ml-4 list-disc text-zinc-300 mt-1 pl-1">
            {renderedParts}
          </li>
        );
      }
      return (
        <p key={idx} className="text-zinc-300 my-1.5 leading-relaxed font-sans text-xs">
          {renderedParts}
        </p>
      );
    });
  };

  // Reset entire application data back to factory defaults
  const handleFactoryResetWithConfirmation = () => {
    if (confirm("ΠΡΟΣΟΧΗ: Αυτή η ενέργεια θα επαναφέρει όλα τα κείμενα, τις τιμές και τις προσθήκες στις εργοστασιακές ρυθμίσεις του Business Plan. Θέλετε να συνεχίσετε;")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case "minimal-pastel-mural":
        setVisualSystem({
          mode: "minimal-pastel-mural",
          primaryColor: "#ef876b", // Coral Peach
          displayFont: "Space Grotesk",
          bodyFont: "Inter",
          textureType: "canvas",
          textureOpacity: 0.05,
          corners: "sharp",
          activeDecals: ["pastel-shapes", "mural-stars"]
        });
        break;
      case "gallery-white":
        setVisualSystem({
          mode: "gallery-white",
          primaryColor: "#121214",
          displayFont: "Playfair Display",
          bodyFont: "Inter",
          textureType: "canvas",
          textureOpacity: 0.08,
          activeDecals: ["spray-splatter"]
        });
        break;
      case "industrial-concrete":
        setVisualSystem({
          mode: "industrial-concrete",
          primaryColor: "#84cc16",
          displayFont: "Space Grotesk",
          bodyFont: "JetBrains Mono",
          textureType: "concrete",
          textureOpacity: 0.15,
          activeDecals: ["spray-splatter", "skateboard"]
        });
        break;
      case "kraft-cardboard":
        setVisualSystem({
          mode: "kraft-cardboard",
          primaryColor: "#ef4444",
          displayFont: "Oswald",
          bodyFont: "JetBrains Mono",
          textureType: "grunge",
          textureOpacity: 0.22,
          activeDecals: ["spray-drips", "drown-crown"]
        });
        break;
      case "underground-black":
      default:
        setVisualSystem({
          mode: "underground-black",
          primaryColor: "#eab308",
          displayFont: "Unbounded",
          bodyFont: "Inter",
          textureType: "concrete",
          textureOpacity: 0.15,
          activeDecals: ["spray-splatter", "spray-drips", "skateboard", "drown-crown"]
        });
        break;
    }
  };

  // Find active custom tab if any
  const activeCustomTab = customTabs.find(tab => tab.id === activeTab);

  const computedTheme = useMemo(() => {
    const primaryColor = visualSystem.primaryColor;
    let bgs = "#0c0d0e";
    let cards = "#121415";
    let text = "#f4f4f5";
    let border = "#27272a";
    let subtitle = "#a1a1aa";
    let lightText = "#e4e4e7";
    let tagBg = "#1f2022";
    let labelText = "#71717a";
    
    switch (visualSystem.mode) {
      case "minimal-pastel-mural":
        bgs = "#f4f0e6"; // Beautiful warm plaster-beige wall background from the TRUST mural
        cards = "#ffffff"; // Minimal white cards
        text = "#1a1d1e"; // Deep midnight charcoal ink
        border = "#2a2d30"; // Solid clean outline
        subtitle = "#5c5b56"; // Soft gray-brown subtitle ink
        lightText = "#1c1e1f";
        tagBg = "#eae5d8"; // Warm pastel clay beige
        labelText = "#5c5b56";
        break;
      case "gallery-white":
        bgs = "#f6f6f4";
        cards = "#ffffff";
        text = "#121214";
        border = "#e2e2e5";
        subtitle = "#52525b";
        lightText = "#27272a";
        tagBg = "#eaeaea";
        labelText = "#71717a";
        break;
      case "industrial-concrete":
        bgs = "#d3d0ca";
        cards = "#dfded9";
        text = "#1a1b1d";
        border = "#b8b5ac";
        subtitle = "#4e5054";
        lightText = "#252629";
        tagBg = "#c5c2b9";
        labelText = "#636569";
        break;
      case "kraft-cardboard":
        bgs = "#cfc2af";
        cards = "#dad0bf";
        text = "#271c11";
        border = "#bcaea0";
        subtitle = "#483626";
        lightText = "#362719";
        tagBg = "#c5b7a7";
        labelText = "#5e4b39";
        break;
      case "underground-black":
      default:
        bgs = "#0c0d0e";
        cards = "#121415";
        text = "#f4f4f5";
        border = "#27272a";
        subtitle = "#a1a1aa";
        lightText = "#e4e4e7";
        tagBg = "#1f2022";
        labelText = "#71717a";
        break;
    }
    
    let dispFont = "Space Grotesk";
    if (visualSystem.displayFont === "Space Grotesk") dispFont = '"Space Grotesk", sans-serif';
    else if (visualSystem.displayFont === "Syne") dispFont = '"Syne", sans-serif';
    else if (visualSystem.displayFont === "Playfair Display") dispFont = '"Playfair Display", serif';
    else if (visualSystem.displayFont === "Oswald") dispFont = '"Oswald", sans-serif';
    else if (visualSystem.displayFont === "Unbounded") dispFont = '"Unbounded", sans-serif';
    
    let bdFont = "Inter";
    if (visualSystem.bodyFont === "JetBrains Mono") bdFont = '"JetBrains Mono", monospace';
    else bdFont = '"Inter", sans-serif';
    
    return {
      bgs, cards, text, border, subtitle, lightText, tagBg, labelText, dispFont, bdFont, primaryColor
    };
  }, [visualSystem]);

  if (!isUnlocked) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (passwordInput === sitePassword) {
        setIsUnlocked(true);
        sessionStorage.setItem("thess_cult_hub_unlocked", "true");
        setPasswordError("");
      } else {
        setPasswordError("Λανθασμένος κωδικός πρόσβασης! Παρακαλώ δοκιμάστε ξανά.");
      }
    };

    return (
      <div className="min-h-screen bg-[#0c0d0e] flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#121315] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10 transition-all duration-300">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-500 shadow-lg shadow-amber-500/5">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">Thess Cult Hub</h1>
            <p className="text-xs text-zinc-500 mt-1 font-mono uppercase tracking-wider">Σύμβουλος Επιχειρησιακού Σχεδίου</p>
          </div>

          <div className="p-4 bg-zinc-950/40 border border-zinc-900 rounded-xl mb-6 text-center">
            <p className="text-xs text-zinc-400">
              Η εφαρμογή είναι κλειδωμένη για λόγους ασφαλείας. Παρακαλώ εισάγετε τον κωδικό πρόσβασης.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-mono text-zinc-500 tracking-wider mb-1.5 font-bold">
                Κωδικός Πρόσβασης
              </label>
              <input
                type="password"
                placeholder="• • • • • • • •"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-[#1e2022] text-zinc-100 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition font-mono tracking-widest text-center"
                autoFocus
              />
            </div>

            {passwordError && (
              <p className="text-xs text-rose-500 text-center font-semibold bg-rose-500/10 py-2.5 px-3 rounded-lg border border-rose-500/20">
                {passwordError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/10 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Είσοδος</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center mt-6 text-[10px] text-zinc-600 font-mono tracking-widest">
            SECURE ACCESS PORTAL • THESS CULT HUB
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4f4f5] font-sans flex flex-col selection:bg-zinc-800 selection:text-white relative overflow-x-hidden">
      
      {/* Dynamic Theme Styles Injection */}
      <style>{`
        :root {
          --gallery-bg: ${computedTheme.bgs};
          --gallery-card: ${computedTheme.cards};
          --gallery-text: ${computedTheme.text};
          --gallery-border: ${computedTheme.border};
          --gallery-subtitle: ${computedTheme.subtitle};
          --gallery-light-text: ${computedTheme.lightText};
          --gallery-tag-bg: ${computedTheme.tagBg};
          --gallery-label: ${computedTheme.labelText};
          --gallery-primary: ${computedTheme.primaryColor};
          
          --g-font-display: ${computedTheme.dispFont};
          --g-font-body: ${computedTheme.bdFont};
        }
        
        body, .min-h-screen, div.min-h-screen {
          background-color: var(--gallery-bg) !important;
          color: var(--gallery-text) !important;
          font-family: var(--g-font-body), sans-serif !important;
        }
        
        h1, h2, h3, h4, .font-display, .font-heading-theme {
          font-family: var(--g-font-display) !important;
        }
        
        /* Background texture overlay setup */
        .min-h-screen::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 2; 
          opacity: ${visualSystem.textureOpacity};
          mix-blend-mode: ${visualSystem.mode === 'gallery-white' || visualSystem.mode === 'minimal-pastel-mural' ? 'multiply' : 'screen'};
          ${visualSystem.textureType === 'canvas' ? `background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v12H0V0zm1 1v10h10V1H1z' fill='%23111111' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E");` : ''}
          ${visualSystem.textureType === 'concrete' ? `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E");` : ''}
          ${visualSystem.textureType === 'noise' ? `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.25' numOctaves='1'/%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23n)' opacity='0.20'/%3E%3C/svg%3E");` : ''}
          ${visualSystem.textureType === 'grunge' ? `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.95' type='turbulence' numOctaves='3'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E");` : ''}
        }
 
        /* Structural cards & container overrides */
        div.bg-\\[\\#0f1112\\], div.bg-\\[\\#121415\\], div.bg-[#0f1112], div.bg-[#121415], div.bg-zinc-900, div.bg-zinc-950, div.bg-zinc-900\\/40, div.bg-zinc-950\\/40, div.bg-\\[\\#121614\\], div.bg-\\[\\#181a1d\\], div.bg-\\[\\#141618\\], div.bg-zinc-900\\/30, .bg-\\[\\#0f1112\\], .bg-\\[\\#121415\\], .bg-[#0c0d0e], .bg-\\[\\#111914\\], .bg-\\[\\#121614\\], nav div, header, footer, [role="tabpanel"], .modal-container {
          background-color: var(--gallery-card) !important;
          border-color: var(--gallery-border) !important;
          color: var(--gallery-text) !important;
        }
        
        /* Text and details coloring overrides */
        .text-amber-400, .text-amber-500, .text-emerald-450, .text-emerald-400, .text-purple-400, .text-violet-400, .text-rose-400, .text-amber-300, .text-coral-400, .text-sky-400, .text-orange-400, .text-blue-400, .text-pink-400, .text-emerald-500, .text-rose-500 {
          color: var(--gallery-primary) !important;
        }
        
        /* Background coloring adjustments */
        .bg-amber-500, .bg-amber-400, .bg-amber-950\\/40, .bg-emerald-500, .bg-emerald-400, .bg-emerald-950\\/40, .bg-amber-900\\/40, .bg-amber-900\\/20, .bg-emerald-900\\/40, .bg-emerald-900\\/20, .bg-red-500, .bg-rose-500 {
          background-color: var(--gallery-primary) !important;
          color: ${visualSystem.mode === 'gallery-white' || visualSystem.mode === 'kraft-cardboard' || visualSystem.mode === 'minimal-pastel-mural' ? '#ffffff' : '#ffffff'} !important;
        }
        
        /* Specific classes for edit elements and lines */
        .border-amber-500, .border-amber-400, .border-amber-500\\/50, .hover\\:border-amber-500\\/40, .focus\\:border-amber-500, .border-dashed {
          border-color: var(--gallery-primary) !important;
        }
        
        .text-zinc-400, .text-zinc-500, .text-zinc-650 {
          color: var(--gallery-subtitle) !important;
        }
        
        .text-zinc-300, .text-zinc-200, .text-zinc-100, .text-zinc-150 {
          color: var(--gallery-light-text) !important;
        }
        
        .border-zinc-805, .border-zinc-850, .border-zinc-800, .border-zinc-750, .border-zinc-700, .border-zinc-950, .border-emerald-950, .border-emerald-900\\/40, .border-emerald-850, .border-emerald-800, div.border-zinc-800, button.border-zinc-800, input.border-zinc-800 {
          border-color: var(--gallery-border) !important;
        }
        
        /* Style clean outlines for minimalist vibe */
        .shadow-lg, .shadow-xl {
          box-shadow: 0 4px 20px -2px rgba(0,0,0, ${visualSystem.mode === 'gallery-white' || visualSystem.mode === 'minimal-pastel-mural' ? '0.04' : '0.4'}) !important;
        }

        /* Ambient SVG graphics backdrops */
        .ambient-graphic {
          position: fixed;
          pointer-events: none;
          z-index: 0;
          opacity: 0.12;
          color: var(--gallery-primary);
        }

        /* Elements corners controls */
        ${(visualSystem.corners === 'sharp' || !visualSystem.corners) ? `
          *, button, div, nav, select, input, textarea, span, img, svg, canvas, header, footer, a, span.rounded-full, .rounded-xl, .rounded-lg, .rounded-md, .rounded, .rounded-2xl {
            border-radius: 0px !important;
          }
        ` : ''}

        /* High-contrast Minimal Pastel Mural overrides */
        ${visualSystem.mode === 'minimal-pastel-mural' ? `
          body, .min-h-screen, p, span, h1, h2, h3, h4, th, td, label {
            color: #1a1d1e !important;
          }
          .text-zinc-400, .text-zinc-500, .text-zinc-650 {
            color: #5c5b56 !important;
          }
          .text-zinc-300, .text-zinc-200, .text-zinc-150 {
            color: #1a1d1e !important;
          }
          /* Subtle clean black/navy borders for layout */
          .border, .border-b, .border-t, .border-l, .border-r, .border-zinc-805, .border-zinc-850, .border-zinc-800, .border-zinc-750, .border-zinc-700 {
            border-color: #2a2d30 !important;
            border-width: 1px !important;
          }
          /* Custom styled buttons with minimal borders */
          button.bg-zinc-800, button.bg-zinc-900, button.bg-zinc-950, .bg-zinc-900, .bg-zinc-950, .bg-zinc-800, a.bg-zinc-900 {
            background-color: #ffffff !important;
            color: #1a1d1e !important;
            border: 1px solid #2a2d30 !important;
          }
          button.bg-zinc-800:hover, button.bg-zinc-900:hover, .bg-zinc-900:hover {
            background-color: #eae5d8 !important;
            color: #1a1d1e !important;
          }
          input, select, textarea, .bg-zinc-950\\/50 {
            background-color: #ffffff !important;
            color: #1a1d1e !important;
            border: 1px solid #2a2d30 !important;
          }
          /* Highlight state tags using beautiful mural pastel colors */
          .bg-emerald-500, .bg-emerald-400, .bg-emerald-950\\/40, .bg-emerald-900\\/40 {
            background-color: #d1ebd8 !important; /* Sage green pastel */
            color: #1a1d1e !important;
            border: 1px solid #2a2d30 !important;
          }
          .text-emerald-400, .text-emerald-500 {
            color: #2c543a !important;
          }
          .bg-amber-500, .bg-amber-400, .bg-amber-950\\/40, .bg-amber-900\\/40 {
            background-color: #f7dd9d !important; /* Pastel Yellow */
            color: #1a1d1e !important;
            border: 1px solid #2a2d30 !important;
          }
          .text-amber-400, .text-amber-500 {
            color: #705011 !important;
          }
          .bg-rose-500, .bg-red-500, .bg-rose-950\\/40 {
            background-color: #fca890 !important; /* Pastel Coral/Red */
            color: #1a1d1e !important;
            border: 1px solid #2a2d30 !important;
          }
          .text-rose-500, .text-red-500 {
            color: #8f341b !important;
          }
          
          /* Active Selected Tabs have a beautiful custom pastel look */
          button[role="tab"][aria-selected="true"] {
            background-color: #a0d3f2 !important; /* Pastel Sky Blue from Mural */
            color: #1a1d1e !important;
            border: 1.5px solid #2a2d30 !important;
            font-weight: 700 !important;
          }
          button[role="tab"][aria-selected="false"] {
            background-color: #ffffff !important;
            color: #5c5b56 !important;
            border: 1px solid #eae5d8 !important;
          }
          
          p.text-zinc-400, span.text-zinc-500, span.text-zinc-400 {
            color: #5c5b56 !important;
          }
        ` : ''}
      `}</style>

      {/* Ambient Decals Overlays */}
      {visualSystem.activeDecals.includes("spray-splatter") && (
        <svg className="ambient-graphic w-64 h-64 -top-12 -right-12" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="15" opacity="0.6"/>
          <circle cx="35" cy="40" r="6" opacity="0.4"/>
          <circle cx="65" cy="60" r="8" opacity="0.4"/>
          <circle cx="55" cy="30" r="4" opacity="0.5"/>
          <circle cx="45" cy="70" r="5" opacity="0.5"/>
          <circle cx="25" cy="55" r="3" opacity="0.3"/>
          <circle cx="75" cy="45" r="3" opacity="0.3"/>
          <circle cx="38" cy="25" r="2" opacity="0.4"/>
          <circle cx="58" cy="78" r="2.5" opacity="0.4"/>
          {/* smaller splatter dots */}
          <circle cx="48" cy="18" r="1" />
          <circle cx="28" cy="36" r="1" />
          <circle cx="62" cy="22" r="1" />
          <circle cx="72" cy="68" r="1.5" />
          <circle cx="20" cy="72" r="1.5" />
          <circle cx="82" cy="32" r="1.2" />
          <circle cx="12" cy="48" r="1" />
        </svg>
      )}

      {visualSystem.activeDecals.includes("spray-drips") && (
        <svg className="ambient-graphic w-44 h-80 top-0 left-10" viewBox="0 0 50 150" fill="currentColor" opacity="0.15">
          <path d="M 0 0 h 50 v 10 Q 45 20, 42 12 Q 38 30, 36 60 Q 35 62, 34 60 C 33 45, 33 20, 31 15 Q 26 30, 25 85 Q 23 90, 22 85 C 20 50, 19 30, 16 20 Q 11 35, 10 110 Q 8 115, 7 110 C 5 70, 5 40, 0 15 Z" />
          <circle cx="36" cy="75" r="2" />
          <circle cx="25" cy="105" r="2.5" />
          <circle cx="10" cy="130" r="3" />
          <circle cx="10" cy="142" r="1.5" />
        </svg>
      )}

      {visualSystem.activeDecals.includes("skateboard") && (
        <svg className="ambient-graphic w-40 h-96 bottom-10 -right-5" viewBox="0 0 100 250" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.08">
          <rect x="25" y="10" width="50" height="230" rx="25" />
          <line x1="35" y1="45" x2="65" y2="45" strokeDasharray="3,3" />
          <circle cx="45" cy="35" r="2" fill="currentColor" />
          <circle cx="55" cy="35" r="2" fill="currentColor" />
          <circle cx="45" cy="55" r="2" fill="currentColor" />
          <circle cx="55" cy="55" r="2" fill="currentColor" />
          {/* Trucks back */}
          <line x1="35" y1="205" x2="65" y2="205" strokeDasharray="3,3" />
          <circle cx="45" cy="195" r="2" fill="currentColor" />
          <circle cx="55" cy="195" r="2" fill="currentColor" />
          <circle cx="45" cy="215" r="2" fill="currentColor" />
          <circle cx="55" cy="215" r="2" fill="currentColor" />
          {/* graphic pattern */}
          <path d="M 50 80 L 32 110 H 68 Z" />
          <path d="M 50 170 L 68 140 H 32 Z" />
          <circle cx="50" cy="125" r="10" />
        </svg>
      )}

      {visualSystem.activeDecals.includes("drown-crown") && (
        <svg className="ambient-graphic w-48 h-48 bottom-5 -left-10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.1">
          <path d="M 20 80 L 15 40 L 35 55 L 50 30 L 65 55 L 85 40 L 80 80 Z" />
          <line x1="30" y1="88" x2="70" y2="88" strokeWidth="3" />
          <circle cx="50" cy="22" r="3" fill="currentColor" />
          <circle cx="12" cy="32" r="3" fill="currentColor" />
          <circle cx="88" cy="32" r="3" fill="currentColor" />
        </svg>
      )}

      {/* Mural Pastel Shapes Deco */}
      {visualSystem.activeDecals.includes("pastel-shapes") && (
        <>
          {/* Top Left Giant Arch (Ocean Blue & Pink & Coral) */}
          <div className="absolute top-0 left-0 w-80 h-80 pointer-events-none opacity-20 overflow-hidden z-0 hidden lg:block">
            <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Semi circle / Arch */}
              <path d="M 0 0 L 160 0 C 160 88.37, 88.37 160, 0 160 Z" fill="#a0d3f2" />
              {/* Overlapping peach diagonal bar */}
              <rect x="0" y="80" width="140" height="40" transform="rotate(15 0 80)" fill="#fca890" opacity="0.8" />
              {/* Bubble circles */}
              <circle cx="120" cy="120" r="15" fill="#f7dd9d" />
              <circle cx="150" cy="80" r="8" fill="#d1ebd8" />
            </svg>
          </div>

          {/* Bottom Right Mural Elements */}
          <div className="absolute bottom-20 right-0 w-96 h-96 pointer-events-none opacity-15 overflow-hidden z-0 hidden xl:block">
            <svg className="w-full h-full" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Big Ochre wave/arch block */}
              <path d="M 250 250 L 50 250 C 50 140, 140 50, 250 50 Z" fill="#f7dd9d" />
              {/* Wave line */}
              <path d="M 20 60 Q 60 20, 100 60 T 180 60" stroke="#1a1d1e" strokeWidth="4" strokeLinecap="round" />
              {/* Pastel pink star */}
              <path d="M 170 120 Q 170 145, 195 145 Q 170 145, 170 170 Q 170 145, 145 145 Q 170 145, 170 120 Z" fill="#fca890" />
            </svg>
          </div>
        </>
      )}

      {/* Mural Sparkle Stars Deco */}
      {visualSystem.activeDecals.includes("mural-stars") && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Star 1 (Pink Sparkle top-center) */}
          <svg className="absolute top-12 left-1/4 w-12 h-12 text-[#fca890] opacity-40 animate-pulse" viewBox="0 0 100 100" fill="currentColor">
            <path d="M 50 0 Q 50 50, 100 50 Q 50 50, 50 100 Q 50 50, 0 50 Q 50 50, 50 0 Z" />
          </svg>
          
          {/* Star 2 (Blue Sparkle mid-right) */}
          <svg className="absolute top-1/3 right-12 w-16 h-16 text-[#a0d3f2] opacity-35" viewBox="0 0 100 100" fill="currentColor">
            <path d="M 50 0 Q 50 50, 100 50 Q 50 50, 50 100 Q 50 50, 0 50 Q 50 50, 50 0 Z" />
          </svg>

          {/* Star 3 (Yellow Sparkle bottom-left) */}
          <svg className="absolute bottom-40 left-12 w-14 h-14 text-[#f7dd9d] opacity-40" viewBox="0 0 100 100" fill="currentColor">
            <path d="M 50 0 Q 50 50, 100 50 Q 50 50, 50 100 Q 50 50, 0 50 Q 50 50, 50 0 Z" />
          </svg>
          
          {/* Mini star clusters */}
          <svg className="absolute top-1/2 left-8 w-6 h-6 text-[#d1ebd8] opacity-35" viewBox="0 0 100 100" fill="currentColor">
            <path d="M 50 0 Q 50 50, 100 50 Q 50 50, 50 100 Q 50 50, 0 50 Q 50 50, 50 0 Z" />
          </svg>
        </div>
      )}
      
      {/* Top Professional Header */}
      <header className="border-b border-zinc-805 bg-[#0f1112] sticky top-0 z-40 px-4 py-3 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 opacity-60 blur-sm animate-pulse"></div>
              <div className="relative w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-amber-400">
                <Palette className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                {editMode ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase">ΔΙΕΥΘΥΝΣΗ:</span>
                    <input
                      type="text"
                      value={execSummary.cover.address}
                      onChange={(e) => setExecSummary({
                        ...execSummary,
                        cover: { ...execSummary.cover, address: e.target.value }
                      })}
                      className="bg-zinc-900 border border-zinc-750 text-zinc-100 text-[10px] font-mono px-2 py-0.5 rounded w-48 focus:outline-none focus:border-amber-500"
                    />
                    <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase">ΩΡΑΡΙΟ:</span>
                    <input
                      type="text"
                      value={shopHours}
                      onChange={(e) => setShopHours(e.target.value)}
                      className="bg-zinc-900 border border-zinc-750 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded w-32 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                ) : (
                  <>
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#a1a1aa] uppercase bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/50">
                      ΘΕΣΣΑΛΟΝΙΚΗ • {execSummary.cover.address}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/50 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      ΩΡΑΡΙΟ: {shopHours}
                    </span>
                  </>
                )}
              </div>
              {editMode ? (
                <input
                  type="text"
                  value={execSummary.title}
                  onChange={(e) => setExecSummary({ ...execSummary, title: e.target.value })}
                  className="bg-zinc-900 border border-zinc-700 text-white text-base sm:text-lg font-bold px-2 py-1 rounded focus:outline-none focus:border-amber-400 mt-1.5 w-full sm:w-96"
                />
              ) : (
                <h1 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight mt-1">
                  {execSummary.title}
                </h1>
              )}
            </div>
          </div>

          {/* Controller Panel for Curation Mode */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Live Editor Switch */}
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition border cursor-pointer ${
                editMode 
                  ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-md shadow-amber-500/10" 
                  : "bg-zinc-900 text-amber-400 border-zinc-800 hover:border-amber-500/40"
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>{editMode ? "ΛΕΙΤΟΥΡΓΙΑ ΕΠΕΞΕΡΓΑΣΙΑΣ: ON" : "ΕΝΕΡΓΟΠΟΙΗΣΗ ΕΠΕΞΕΡΓΑΣΙΑΣ"}</span>
            </button>

            {/* Factory Reset button */}
            <button
              onClick={handleFactoryResetWithConfirmation}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:border-rose-900 transition font-mono"
              title="Επαναφορά Εργοστασιακού Πλάνου"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Password Manager under editMode */}
            {editMode && (
              <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-lg p-1 px-2.5">
                <span className="text-[10px] uppercase font-mono text-zinc-400 tracking-wider font-bold">ΚΩΔΙΚΟΣ SITE:</span>
                <div className="relative flex items-center">
                  <input
                    type={showPasswordInEdit ? "text" : "password"}
                    value={sitePassword}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSitePassword(val);
                      localStorage.setItem("thess_cult_hub_password", val);
                    }}
                    placeholder="Κωδικός"
                    className="bg-[#1e2022] text-zinc-200 border border-zinc-800 rounded px-2 py-0.5 w-28 focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                    title="Αλλάξτε τον κωδικό πρόσβασης για είσοδο στην εφαρμογή"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordInEdit(!showPasswordInEdit)}
                    className="ml-1.5 text-[10px] text-amber-500 hover:text-amber-400 font-mono transition"
                    title={showPasswordInEdit ? "Απόκρυψη" : "Εμφάνιση"}
                  >
                    {showPasswordInEdit ? "Κρύψε" : "Δείξε"}
                  </button>
                </div>
              </div>
            )}

            {/* Combined Mini Stats */}
            <div className="hidden lg:flex items-center gap-3 text-xs font-mono bg-zinc-900/40 p-1.5 px-3 rounded-lg border border-zinc-800/80">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-zinc-400 col-span-1">ΜΗΝΙΑΙΟΣ ΤΖΙΡΟΣ: </span>
                <span className="text-zinc-100 font-bold">{formatEuro(totalMonthlyRevenueCombined)}</span>
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* Navigation Sidebar Column */}
        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
          
          <div className="bg-[#0f1112] rounded-xl border border-zinc-850 p-4 space-y-3 shadow-lg">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                Πλοηγηση Πλανου
              </h2>
              <button
                onClick={() => setShowNewTabForm(true)}
                className="flex items-center gap-1 text-[10px] font-mono text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
                title="Προσθήκη νέου κεφαλαίου"
              >
                <Plus className="w-3 h-3" />
                <span>+ ΠΡΟΣΘΗΚΗ</span>
              </button>
            </div>

            {/* Sidebar Tab Lists */}
            <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-1 pb-2 lg:pb-0 scrollbar-none">
              
              {chapters.map((ch, idx) => {
                const getIcon = () => {
                  switch (ch.id) {
                    case "overview": return <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
                    case "internal-prod": return <Coffee className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
                    case "external-pest": return <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
                    case "strategy-swot": return <Sliders className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
                    case "operating-workflow": return <ClipboardCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
                    case "marketing-mix": return <Megaphone className="w-3.5 h-3.5 text-orange-400 shrink-0" />;
                    case "timeline-risks": return <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
                    case "financial-plan": return <DollarSign className="w-3.5 h-3.5 text-green-400 shrink-0" />;
                    case "brand-identity": return <Palette className="w-3.5 h-3.5 text-pink-400 shrink-0" />;
                    default: return <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
                  }
                };

                return (
                  <button 
                    key={ch.id}
                    onClick={() => setActiveTab(ch.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap lg:w-full ${
                      activeTab === ch.id 
                        ? "bg-zinc-800 text-white border border-zinc-700" 
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950"
                    }`}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {getIcon()}
                      {editMode ? (
                        <input
                          type="text"
                          value={ch.label}
                          onChange={(e) => {
                            const list = [...chapters];
                            list[idx] = { ...list[idx], label: e.target.value };
                            setChapters(list);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="bg-zinc-900 border border-zinc-700 text-zinc-150 p-0.5 px-1.5 rounded text-[11px] w-full font-sans cursor-text focus:outline-none focus:border-amber-500"
                        />
                      ) : (
                        <span>{ch.label}</span>
                      )}
                    </div>
                  </button>
                );
              })}

              {/* USER-ADDED DYNAMIC HEADINGS IN NAVIGATION */}
              {customTabs.length > 0 && (
                <>
                  <div className="border-t border-zinc-800/80 my-2 pt-2 hidden lg:block">
                    <span className="text-[10px] font-mono tracking-widest text-[#a1a1aa] uppercase px-2">Προσαρμοσμενα Κεφαλαια</span>
                  </div>
                  {customTabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap lg:w-full group/tab ${
                        activeTab === tab.id
                          ? "bg-amber-950/40 text-amber-300 border border-amber-800/60"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950"
                      }`}
                    >
                      <div className="flex items-center gap-2 max-w-[85%]">
                        <BookOpen className="w-3.5 h-3.5 text-zinc-500 group-hover/tab:text-amber-400 shrink-0" />
                        <span className="truncate">{tab.title}</span>
                      </div>
                      <span 
                        onClick={(e) => handleRemoveCustomTab(tab.id, e)}
                        className="opacity-0 group-hover/tab:opacity-100 hover:text-rose-500 p-0.5 rounded cursor-pointer"
                        title="Διαγραφή Κεφαλαίου"
                      >
                        <Trash2 className="w-3 h-3" />
                      </span>
                    </button>
                  ))}
                </>
              )}

            </nav>
          </div>

          {/* Form Modal/Section to Add dynamic heading, styled cleanly in the sidebar */}
          {showNewTabForm && (
            <div className="bg-[#141618] border border-amber-500/40 rounded-xl p-4 space-y-3.5 shadow-lg">
              <div className="flex items-center justify-between pb-1 border-b border-zinc-800">
                <span className="text-xs font-mono font-bold text-amber-400">ΝΕΟ ΚΕΦΑΛΑΙΟ ΠΛΑΝΟΥ</span>
                <span 
                  onClick={() => setShowNewTabForm(false)} 
                  className="text-xs text-zinc-500 hover:text-white cursor-pointer px-1 font-mono"
                >
                  X
                </span>
              </div>
              <form onSubmit={handleAddCustomSection} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase">Ονομασία Επικεφαλίδας</label>
                  <input
                    type="text"
                    required
                    placeholder="π.χ. Marketing Guerilla 2026"
                    value={newTabTitle}
                    onChange={(e) => setNewTabTitle(e.target.value)}
                    className="w-full bg-[#1e2022] border border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase">Κείμενο / Περιγραφή</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Πληροφορίες, ανάλυση και επιχειρηματικά βήματα..."
                    value={newTabContent}
                    onChange={(e) => setNewTabContent(e.target.value)}
                    className="w-full bg-[#1e2022] border border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold py-1.5 rounded transition shadow cursor-pointer"
                >
                  Προσθήκη & Μετάβαση
                </button>
              </form>
            </div>
          )}

          {/* Founders Note */}
          <div className="hidden lg:block bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 rounded-xl border border-zinc-850 p-4 text-xs font-mono space-y-1.5">
            <span className="text-rose-400 font-bold block">✓ 100% ΕΝΣΩΜΑΤΩΣΗ</span>
            <p className="text-zinc-400 leading-relaxed text-[11px] font-sans">
              Όλες οι ενότητες του Business Plan είναι πλήρως ενσωματωμένες. Η "Λειτουργία Επεξεργασίας" επιτρέπει την άμεση τροποποίηση όλων των κειμένων, τίτλων και πινάκων του σχεδίου.
            </p>
          </div>

        </div>

        {/* Dynamic Focus Content Window */}
        <div id="content-container" className="flex-1 bg-[#101113] rounded-2xl border border-zinc-850 p-5 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden min-h-[500px]">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* CHAPTER 1: INTRO & VISION */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              
              <div className="border-b border-zinc-800 pb-4 flex flex-col gap-2">
                <span className="text-xs font-mono text-amber-500 tracking-widest uppercase">ΚΕΦΑΛΑΙΟ 1 • ΓΕΝΙΚΗ ΕΙΣΑΓΩΓΗ</span>
                <div className="flex justify-between items-start gap-4">
                  {editMode ? (
                    <input
                      type="text"
                      value={execSummary.title}
                      onChange={(e) => setExecSummary({ ...execSummary, title: e.target.value })}
                      className="text-2xl sm:text-3xl font-bold bg-[#1e2022] border border-amber-500/50 rounded px-2 py-1 text-white w-full"
                    />
                  ) : (
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-zinc-100 tracking-tight">
                      {execSummary.title}
                    </h3>
                  )}
                </div>
                {editMode ? (
                  <input
                    type="text"
                    value={execSummary.slogan}
                    onChange={(e) => setExecSummary({ ...execSummary, slogan: e.target.value })}
                    className="text-sm bg-[#1e2022] border border-amber-500/50 rounded px-2 py-1 text-amber-400 italic w-full mt-1.5"
                  />
                ) : (
                  <p className="text-zinc-400 font-medium italic text-xs sm:text-sm border-l-2 border-amber-500 pl-4 mt-1">
                    &ldquo;{execSummary.slogan}&rdquo;
                  </p>
                )}
              </div>

              {/* Cover Information Details */}
              <div className="bg-zinc-900/40 border border-zinc-850 rounded-xl p-4 space-y-3">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block tracking-wider">ΣΤΟΙΧΕΙΑ ΕΞΩΦΥΛΛΟΥ / ΕΙΣΑΓΩΓΙΚΗΣ ΣΕΛΙΔΑΣ</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-zinc-500 block">FOUNDERS & CREATORS:</span>
                    {editMode ? (
                      <input
                        type="text"
                        value={execSummary.cover.founders}
                        onChange={(e) => setExecSummary({
                          ...execSummary,
                          cover: { ...execSummary.cover, founders: e.target.value }
                        })}
                        className="bg-[#1e2022] border border-zinc-800 text-zinc-200 mt-1 px-2 py-1 rounded w-full"
                      />
                    ) : (
                      <span className="text-zinc-300 font-bold block mt-0.5">{execSummary.cover.founders}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-zinc-500 block">EMAIL ΕΠΙΚΟΙΝΩΝΙΑΣ:</span>
                    {editMode ? (
                      <input
                        type="text"
                        value={execSummary.cover.email}
                        onChange={(e) => setExecSummary({
                          ...execSummary,
                          cover: { ...execSummary.cover, email: e.target.value }
                        })}
                        className="bg-[#1e2022] border border-zinc-800 text-zinc-200 mt-1 px-2 py-1 rounded w-full"
                      />
                    ) : (
                      <span className="text-zinc-300 block mt-0.5">{execSummary.cover.email}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-zinc-500 block">ΙΣΤΟΤΟΠΟΣ (WEBSITE):</span>
                    {editMode ? (
                      <input
                        type="text"
                        value={execSummary.cover.website}
                        onChange={(e) => setExecSummary({
                          ...execSummary,
                          cover: { ...execSummary.cover, website: e.target.value }
                        })}
                        className="bg-[#1e2022] border border-zinc-800 text-zinc-200 mt-1 px-2 py-1 rounded w-full"
                      />
                    ) : (
                      <span className="text-zinc-300 block mt-0.5">{execSummary.cover.website}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-zinc-500 block">ΗΜΕΡΟΜΗΝΙΑ ΕΚΔΟΣΗΣ:</span>
                    {editMode ? (
                      <input
                        type="text"
                        value={execSummary.cover.date}
                        onChange={(e) => setExecSummary({
                          ...execSummary,
                          cover: { ...execSummary.cover, date: e.target.value }
                        })}
                        className="bg-[#1e2022] border border-zinc-800 text-zinc-200 mt-1 px-2 py-1 rounded w-full"
                      />
                    ) : (
                      <span className="text-zinc-300 block mt-0.5">{execSummary.cover.date}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Editable Prose Blocks on Concept Overview */}
              <div className="space-y-4">
                <EditableUnit
                  id="desc-intro"
                  title="2.1 Περιγραφή της Επιχείρησης"
                  content={execSummary.introDescription}
                  editMode={editMode}
                  onTitleChange={(val) => setExecSummary({ ...execSummary, introDescription: val })}
                  onContentChange={(val) => setExecSummary({ ...execSummary, introDescription: val })}
                />

                <EditableUnit
                  id="desc-vision"
                  title="Όραμα (Vision)"
                  content={execSummary.vision}
                  editMode={editMode}
                  onTitleChange={(val) => setExecSummary({ ...execSummary, vision: val })}
                  onContentChange={(val) => setExecSummary({ ...execSummary, vision: val })}
                />

                <EditableUnit
                  id="desc-mission"
                  title="Αποστολή (Mission)"
                  content={execSummary.mission}
                  editMode={editMode}
                  onTitleChange={(val) => setExecSummary({ ...execSummary, mission: val })}
                  onContentChange={(val) => setExecSummary({ ...execSummary, mission: val })}
                />
              </div>

              {/* Values Rendering */}
              <div className="space-y-4">
                <h4 className="text-base font-display font-bold text-zinc-200 block border-b border-zinc-800 pb-1">Οι Θεμελιώδεις Αξίες μας</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {execSummary.values.map((v: any, index: number) => (
                    <div key={index} className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 space-y-2">
                      {editMode ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={v.title}
                            onChange={(e) => {
                              const list = [...execSummary.values];
                              list[index] = { ...list[index], title: e.target.value };
                              setExecSummary({ ...execSummary, values: list });
                            }}
                            className="bg-[#1e2022] border border-zinc-800 text-zinc-200 text-xs font-bold px-2 py-1 rounded w-full"
                          />
                          <textarea
                            value={v.desc}
                            onChange={(e) => {
                              const list = [...execSummary.values];
                              list[index] = { ...list[index], desc: e.target.value };
                              setExecSummary({ ...execSummary, values: list });
                            }}
                            rows={3}
                            className="bg-[#1e2022] border border-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded w-full"
                          />
                        </div>
                      ) : (
                        <>
                          <h5 className="text-zinc-100 font-bold font-display text-sm flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-zinc-800 text-[10px] text-amber-400 border border-zinc-700 flex items-center justify-center font-mono font-bold">
                              {index + 1}
                            </span>
                            {v.title}
                          </h5>
                          <p className="text-xs text-zinc-400 leading-relaxed pl-7">{v.desc}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* CHAPTER 2: INTERNAL ANALYSIS & PRODUCTS */}
          {activeTab === "internal-prod" && (
            <div className="space-y-6">
              
              <div className="border-b border-zinc-800 pb-4">
                <span className="text-xs font-mono text-rose-500 tracking-widest uppercase">ΚΕΦΑΛΑΙΟ 2 • ΕΣΩΤΕΡΙΚΗ ΑΝΑΛΥΣΗ & ΣΤΟΧΟΙ</span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-zinc-100 tracking-tight mt-1">
                  Στρατηγική & Λειτουργικές Ικανότητες
                </h3>
              </div>

              {/* Strategy Goals */}
              <div className="space-y-4">
                <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4">
                  <h4 className="font-display font-bold text-lg text-zinc-100">{execSummary.strategyGoals.title}</h4>
                  
                  {editMode ? (
                    <div className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-zinc-500 font-mono">1. Στρατηγική Τοποθέτησης</label>
                        <textarea
                          value={execSummary.strategyGoals.positioning}
                          onChange={(e) => setExecSummary({
                            ...execSummary,
                            strategyGoals: { ...execSummary.strategyGoals, positioning: e.target.value }
                          })}
                          className="w-full bg-[#1e2022] border border-zinc-800 p-2 text-zinc-100 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-zinc-500 font-mono">2. Στρατηγική Προϊόντος/Υπηρεσιών</label>
                        <textarea
                          value={execSummary.strategyGoals.product}
                          onChange={(e) => setExecSummary({
                            ...execSummary,
                            strategyGoals: { ...execSummary.strategyGoals, product: e.target.value }
                          })}
                          className="w-full bg-[#1e2022] border border-zinc-800 p-2 text-zinc-100 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-zinc-500 font-mono">3. Στρατηγική Συνεργασιών</label>
                        <textarea
                          value={execSummary.strategyGoals.partnerships}
                          onChange={(e) => setExecSummary({
                            ...execSummary,
                            strategyGoals: { ...execSummary.strategyGoals, partnerships: e.target.value }
                          })}
                          className="w-full bg-[#1e2022] border border-zinc-800 p-2 text-zinc-100 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-zinc-500 font-mono">4. Στρατηγική Marketing</label>
                        <textarea
                          value={execSummary.strategyGoals.marketing}
                          onChange={(e) => setExecSummary({
                            ...execSummary,
                            strategyGoals: { ...execSummary.strategyGoals, marketing: e.target.value }
                          })}
                          className="w-full bg-[#1e2022] border border-zinc-800 p-2 text-zinc-100 rounded focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
                      <p className="leading-relaxed">{execSummary.strategyGoals.positioning}</p>
                      <p className="leading-relaxed">{execSummary.strategyGoals.product}</p>
                      <p className="leading-relaxed">{execSummary.strategyGoals.partnerships}</p>
                      <p className="leading-relaxed">{execSummary.strategyGoals.marketing}</p>
                    </div>
                  )}
                </div>

                {/* SMART goals targets */}
                <div className="bg-[#191113]/30 border border-rose-950/40 rounded-xl p-5 space-y-4">
                  <h4 className="font-display font-bold text-lg text-rose-400">{execSummary.strategyGoals.smartIntro}</h4>
                  
                  {editMode ? (
                    <div className="space-y-3.5 text-xs">
                      <div className="space-y-1">
                        <label className="text-zinc-500 font-mono">Βραχυπρόθεσμοι Στόχοι (0-12 μήνες)</label>
                        <textarea
                          value={execSummary.strategyGoals.shortTerm}
                          onChange={(e) => setExecSummary({
                            ...execSummary,
                            strategyGoals: { ...execSummary.strategyGoals, shortTerm: e.target.value }
                          })}
                          className="w-full bg-[#1e2022] border border-zinc-800 p-2 text-zinc-150 rounded"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-zinc-500 font-mono">Μεσοπρόθεσμοι Στόχοι (12-24 μήνες)</label>
                        <textarea
                          value={execSummary.strategyGoals.mediumTerm}
                          onChange={(e) => setExecSummary({
                            ...execSummary,
                            strategyGoals: { ...execSummary.strategyGoals, mediumTerm: e.target.value }
                          })}
                          className="w-full bg-[#1e2022] border border-zinc-800 p-2 text-zinc-150 rounded"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-zinc-500 font-mono">Μακροπρόθεσμοι Στόχοι (3-5 έτη)</label>
                        <textarea
                          value={execSummary.strategyGoals.longTerm}
                          onChange={(e) => setExecSummary({
                            ...execSummary,
                            strategyGoals: { ...execSummary.strategyGoals, longTerm: e.target.value }
                          })}
                          className="w-full bg-[#1e2022] border border-zinc-800 p-2 text-zinc-150 rounded"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-zinc-500 font-mono">Στρατηγική Υλοποίησης Στόχων</label>
                        <textarea
                          value={execSummary.strategyGoals.implementationAction}
                          onChange={(e) => setExecSummary({
                            ...execSummary,
                            strategyGoals: { ...execSummary.strategyGoals, implementationAction: e.target.value }
                          })}
                          className="w-full bg-[#1e2022] border border-zinc-800 p-2 text-zinc-150 rounded"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
                      <p className="bg-zinc-950/40 p-3 rounded border border-zinc-850 leading-relaxed">{execSummary.strategyGoals.shortTerm}</p>
                      <p className="bg-zinc-950/40 p-3 rounded border border-zinc-850 leading-relaxed">{execSummary.strategyGoals.mediumTerm}</p>
                      <p className="bg-zinc-950/40 p-3 rounded border border-zinc-850 leading-relaxed">{execSummary.strategyGoals.longTerm}</p>
                      <p className="bg-amber-950/10 p-3 rounded border border-amber-900/30 leading-relaxed italic text-amber-300">{execSummary.strategyGoals.implementationAction}</p>
                    </div>
                  )}
                </div>

                {/* Team & Org structure */}
                <EditableUnit
                  id="org-struct"
                  title={execSummary.orgStructure.title}
                  content={execSummary.orgStructure.management + "\n\n" + execSummary.orgStructure.staffRoles}
                  editMode={editMode}
                  onTitleChange={(val) => setExecSummary({
                    ...execSummary,
                    orgStructure: { ...execSummary.orgStructure, title: val }
                  })}
                  onContentChange={(val) => {
                    const idx = val.indexOf("\n\n");
                    const mgt = idx !== -1 ? val.substring(0, idx) : val;
                    const roles = idx !== -1 ? val.substring(idx + 2) : "";
                    setExecSummary({
                      ...execSummary,
                      orgStructure: { ...execSummary.orgStructure, management: mgt, staffRoles: roles }
                    });
                  }}
                />

                {/* Resources */}
                <div className="bg-[#141618] border border-zinc-850 rounded-xl p-5 space-y-4">
                  <h4 className="font-display font-bold text-lg text-zinc-100">{execSummary.resources.title}</h4>
                  
                  {editMode ? (
                    <div className="space-y-3.5 text-xs">
                      <div className="space-y-1">
                        <label className="text-zinc-500 font-mono">Φυσικοί Πόροι</label>
                        <textarea
                          value={execSummary.resources.physical}
                          onChange={(e) => setExecSummary({
                            ...execSummary,
                            resources: { ...execSummary.resources, physical: e.target.value }
                          })}
                          className="w-full bg-[#1e2022] border border-zinc-800 p-2 text-zinc-150 rounded"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-zinc-500 font-mono">Άυλοι Πόροι</label>
                        <textarea
                          value={execSummary.resources.intangible}
                          onChange={(e) => setExecSummary({
                            ...execSummary,
                            resources: { ...execSummary.resources, intangible: e.target.value }
                          })}
                          className="w-full bg-[#1e2022] border border-zinc-800 p-2 text-zinc-150 rounded"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-zinc-500 font-mono">Core Competencies</label>
                        <textarea
                          value={execSummary.resources.competencies}
                          onChange={(e) => setExecSummary({
                            ...execSummary,
                            resources: { ...execSummary.resources, competencies: e.target.value }
                          })}
                          className="w-full bg-[#1e2022] border border-zinc-800 p-2 text-zinc-150 rounded"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
                      <p className="leading-relaxed whitespace-pre-line"><strong className="text-white">Φυσικοί Πόροι:</strong> {execSummary.resources.physical}</p>
                      <p className="leading-relaxed whitespace-pre-line"><strong className="text-white">Άυλοι Πόροι:</strong> {execSummary.resources.intangible}</p>
                      <p className="leading-relaxed whitespace-pre-line"><strong className="text-amber-400">Ικανότητες (Competencies):</strong> {execSummary.resources.competencies}</p>
                    </div>
                  )}
                </div>

                {/* Dynamically Editable list for custom Values, Goals and Capabilities */}
                <div className="bg-[#141618] border border-zinc-850 rounded-xl p-5 space-y-6">
                  <div className="border-b border-zinc-800 pb-3">
                    <h4 className="font-display font-bold text-base text-zinc-100">Δυναμικά Στοιχεία: Αξίες, Στόχοι & Ικανότητες</h4>
                    <p className="text-xs text-zinc-500 mt-1">
                      Διαμορφώστε, προσθέστε και αφαιρέστε βασικά στοιχεία ταυτότητας, στόχους και ικανότητες.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* CORE VALUES */}
                    <div className="bg-zinc-950/40 border border-zinc-850 p-4 rounded-xl space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
                        <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">ΑΞΙΕΣ (VALUES)</span>
                      </div>
                      <div className="space-y-2">
                        {customValues.map((val, idx) => (
                          <div key={idx} className="flex gap-2 items-center text-xs text-zinc-300">
                            {editMode ? (
                              <div className="flex items-center gap-1.5 w-full">
                                <input
                                  type="text"
                                  value={val}
                                  onChange={(e) => {
                                    const list = [...customValues];
                                    list[idx] = e.target.value;
                                    setCustomValues(list);
                                  }}
                                  className="bg-[#1e2022] border border-zinc-800 text-zinc-150 p-1 rounded font-sans text-xs w-full focus:outline-none focus:border-amber-500"
                                />
                                <button
                                  type="button"
                                  onClick={() => setCustomValues(customValues.filter((_, i) => i !== idx))}
                                  className="text-rose-500 hover:text-rose-400 p-0.5 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                                <span>{val}</span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                      {editMode && (
                        <button
                          type="button"
                          onClick={() => setCustomValues([...customValues, "Νέα Αξία"])}
                          className="w-full py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 font-mono text-[10px] rounded cursor-pointer transition-transform active:scale-95"
                        >
                          + ΠΡΟΣΘΗΚΗ ΑΞΙΑΣ
                        </button>
                      )}
                    </div>

                    {/* TARGET GOALS */}
                    <div className="bg-zinc-950/40 border border-[#9333ea]/20 p-4 rounded-xl space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
                        <span className="text-xs font-mono font-bold text-[#a855f7] uppercase tracking-wider">ΣΤΟΧΟΙ (GOALS)</span>
                      </div>
                      <div className="space-y-2">
                        {customGoals.map((val, idx) => (
                          <div key={idx} className="flex gap-2 items-center text-xs text-zinc-300">
                            {editMode ? (
                              <div className="flex items-center gap-1.5 w-full">
                                <input
                                  type="text"
                                  value={val}
                                  onChange={(e) => {
                                    const list = [...customGoals];
                                    list[idx] = e.target.value;
                                    setCustomGoals(list);
                                  }}
                                  className="bg-[#1e2022] border border-zinc-800 text-zinc-150 p-1 rounded font-sans text-xs w-full focus:outline-none focus:border-purple-500"
                                />
                                <button
                                  type="button"
                                  onClick={() => setCustomGoals(customGoals.filter((_, i) => i !== idx))}
                                  className="text-rose-500 hover:text-rose-400 p-0.5 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] shrink-0"></span>
                                <span>{val}</span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                      {editMode && (
                        <button
                          type="button"
                          onClick={() => setCustomGoals([...customGoals, "Νέος Στόχος"])}
                          className="w-full py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 font-mono text-[10px] rounded cursor-pointer transition-transform active:scale-95"
                        >
                          + ΠΡΟΣΘΗΚΗ ΣΤΟΧΟΥ
                        </button>
                      )}
                    </div>

                    {/* CAPABILITIES & RESOURCES */}
                    <div className="bg-zinc-950/40 border border-[#06b6d4]/20 p-4 rounded-xl space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
                        <span className="text-xs font-mono font-bold text-[#06b6d4] uppercase tracking-wider">ΙΚΑΝΟΤΗΤΕΣ (COMPETENCIES)</span>
                      </div>
                      <div className="space-y-2">
                        {customCapabilities.map((val, idx) => (
                          <div key={idx} className="flex gap-2 items-center text-xs text-zinc-300">
                            {editMode ? (
                              <div className="flex items-center gap-1.5 w-full">
                                <input
                                  type="text"
                                  value={val}
                                  onChange={(e) => {
                                    const list = [...customCapabilities];
                                    list[idx] = e.target.value;
                                    setCustomCapabilities(list);
                                  }}
                                  className="bg-[#1e2022] border border-zinc-800 text-zinc-150 p-1 rounded font-sans text-xs w-full focus:outline-none focus:border-cyan-500"
                                />
                                <button
                                  type="button"
                                  onClick={() => setCustomCapabilities(customCapabilities.filter((_, i) => i !== idx))}
                                  className="text-rose-500 hover:text-rose-400 p-0.5 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] shrink-0"></span>
                                <span>{val}</span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                      {editMode && (
                        <button
                          type="button"
                          onClick={() => setCustomCapabilities([...customCapabilities, "Νέα Ικανότητα / Πόρος"])}
                          className="w-full py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 font-mono text-[10px] rounded cursor-pointer transition-transform active:scale-95"
                        >
                          + ΠΡΟΣΘΗΚΗ ΙΚΑΝΟΤΗΤΑΣ
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* INTERACTIVE SERVICES & WORKFLOWS EXPERIENCE BOARD */}
                <div id="services-dashboard" className="bg-[#141618] border border-zinc-800 rounded-xl p-6 space-y-6">
                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                     <div>
                       <h4 className="font-display font-bold text-lg text-zinc-100 flex items-center gap-2">
                         <Palette className="w-5 h-5 text-rose-400" />
                         <span>Υπηρεσίες, Workflows & Καμπάνιες Εμπειρίας</span>
                       </h4>
                       <p className="text-xs text-zinc-500 mt-1">
                         Διαχειριστείτε όλες τις σταθερές και περιοδικές υπηρεσίες του καταστήματος, τις μεθόδους προσέγγισης και τα workflows.
                       </p>
                     </div>
 
                     {editMode && (
                       <div className="flex flex-wrap gap-2">
                         <button
                           onClick={() => {
                             const newServiceId = `service-${Date.now()}`;
                             const newSrv: ServiceItem = {
                               id: newServiceId,
                               title: "Νέα Σταθερή Υπηρεσία",
                               type: "fixed",
                               caption: "Μια σύντομη περιγραφή του concept της νέας υπηρεσίας.",
                               revenueDesc: "Πώληση εισιτηρίων, προμήθειες, upselling.",
                               expenseDesc: "Μισθώματα, αναλώσιμα, αμοιβές εισηγητών.",
                               profitDesc: "Υγιές περιθώριο κέρδους.",
                               targetDesc: "Προσέλκυση στοχευμένου κοινού.",
                               partnerApproach: "Προσφορά δωρεάν χώρου και προώθησης με αντάλλαγμα ποσοστό επί των εισπράξεων.",
                               customerApproach: "Guerilla marketing, social media με time-lapse, Instagram countdowns.",
                               workflowSteps: [
                                 { step: 1, title: "Σχεδιασμός & Επιμέλεια", desc: "Καθορισμός θεματολογίας και επιλογή καλλιτεχνών/συνεργατών." },
                                 { step: 2, title: "Προετοιμασία Χώρου", desc: "Ρύθμιση φωτισμού, στησίματος και εξοπλισμού." },
                                 { step: 3, title: "Προώθηση", desc: "Teaser βίντεο στα social media (TikTok/Instagram) και countdowns." },
                                 { step: 4, title: "Διεξαγωγή", desc: "Φιλοξενία του event με παράλληλη κατανάλωση specialty καφέ/ποτού." },
                                 { step: 5, title: "Απολογισμός", desc: "Εκκαθάριση πωλήσεων και feedback κοινού." }
                               ]
                             };
                             setServices(prev => [...prev, newSrv]);
                             setSelectedServiceId(newServiceId);
                           }}
                           className="text-emerald-400 hover:text-emerald-300 font-bold font-mono text-[10px] cursor-pointer flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg active:scale-95 transition-all self-start"
                         >
                           <Plus className="w-3.5 h-3.5 text-emerald-500" />
                           <span>+ ΣΤΑΘΕΡΗ ΥΠΗΡΕΣΙΑ</span>
                         </button>
 
                         <button
                           onClick={() => {
                             const newServiceId = `service-${Date.now()}`;
                             const newSrv: ServiceItem = {
                               id: newServiceId,
                               title: "Νέα Περιοδική Υπηρεσία / Event",
                               type: "recurring",
                               caption: "Μια σύντομη περιγραφή του concept της νέας υπηρεσίας.",
                               revenueDesc: "Πώληση εισιτηρίων, προμήθειες, upselling.",
                               expenseDesc: "Μισθώματα, αναλώσιμα, αμοιβές εισηγητών.",
                               profitDesc: "Υγιές περιθώριο κέρδους.",
                               targetDesc: "Προσέλκυση στοχευμένου κοινού.",
                               partnerApproach: "Προσφορά δωρεάν χώρου και προώθησης με αντάλλαγμα ποσοστό επί των εισπράξεων.",
                               customerApproach: "Guerilla marketing, social media με time-lapse, Instagram countdowns.",
                               workflowSteps: [
                                 { step: 1, title: "Σχεδιασμός & Επιμέλεια", desc: "Καθορισμός θεματολογίας." },
                                 { step: 2, title: "Προετοιμασία", desc: "Ρύθμιση στησίματος." },
                                 { step: 3, title: "Προώθηση", desc: "Teaser βίντεο." },
                                 { step: 4, title: "Διεξαγωγή", desc: "Φιλοξενία." },
                                 { step: 5, title: "Απολογισμός", desc: "Feedback." }
                               ]
                             };
                             setServices(prev => [...prev, newSrv]);
                             setSelectedServiceId(newServiceId);
                           }}
                           className="text-rose-400 hover:text-rose-300 font-bold font-mono text-[10px] cursor-pointer flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg active:scale-95 transition-all self-start"
                         >
                           <Plus className="w-3.5 h-3.5 text-rose-500" />
                           <span>+ ΠΕΡΙΟΔΙΚΗ ΥΠΗΡΕΣΙΑ</span>
                         </button>
                       </div>
                     )}
                   </div>
 
                   {/* Divided Lists: Fixed vs Recurring Services */}
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-zinc-950/40 p-4 rounded-xl border border-zinc-850">
                     {/* Fixed Services list */}
                     <div className="space-y-2">
                       <span className="text-[10px] font-mono text-emerald-450 tracking-wider uppercase font-bold flex items-center gap-1.5">
                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                         <span>Σταθερές Υπηρεσίες & Συνεργίες</span>
                       </span>
                       <div className="flex flex-wrap gap-1.5">
                         {services.filter(s => s.type === "fixed").map((srv) => {
                           const isActive = activeService?.id === srv.id;
                           return (
                             <div key={srv.id} className="relative group/tab">
                               <button
                                 type="button"
                                 onClick={() => setSelectedServiceId(srv.id)}
                                 className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border ${
                                   isActive
                                     ? "bg-emerald-500/15 border-emerald-500/70 text-emerald-400 font-bold"
                                     : "bg-zinc-90 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                                 }`}
                               >
                                 <span>{srv.title}</span>
                               </button>
 
                               {editMode && services.length > 1 && (
                                 <button
                                   type="button"
                                   onClick={(e) => {
                                     e.stopPropagation();
                                     const filtered = services.filter(s => s.id !== srv.id);
                                     setServices(filtered);
                                     if (activeService?.id === srv.id) {
                                       setSelectedServiceId(filtered[0].id);
                                     }
                                   }}
                                   className="absolute -top-1 -right-1 bg-rose-950 border border-rose-800 text-rose-450 hover:bg-rose-900 p-0.5 rounded-full shadow-lg opacity-0 group-hover/tab:opacity-100 transition-all cursor-pointer"
                                   title="Διαγραφή υπηρεσίας"
                                 >
                                   <Trash2 className="w-2 h-2" />
                                 </button>
                               )}
                             </div>
                           );
                         })}
                         {services.filter(s => s.type === "fixed").length === 0 && (
                           <span className="text-[10px] text-zinc-600 italic">Δεν υπάρχουν σταθερές υπηρεσίες.</span>
                         )}
                         {services.filter(s => s.type !== "fixed").length === 0 && (
                           <span className="text-[10px] text-zinc-650 italic">Δεν υπάρχουν περιοδικές υπηρεσίες.</span>
                         )}
                       </div>
                     </div>
                   </div>

                  {/* Service selector tabs */}
                  <div className="flex flex-wrap gap-2">
                    {services.map((srv) => {
                      const isActive = activeService?.id === srv.id;
                      return (
                        <div key={srv.id} className="relative group/tab">
                          <button
                            type="button"
                            onClick={() => setSelectedServiceId(srv.id)}
                            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer border ${
                              isActive
                                ? "bg-amber-500/10 border-amber-500 text-amber-400"
                                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${srv.type === "fixed" ? "bg-emerald-400" : "bg-[#a855f7]"}`} />
                            <span>{srv.title}</span>
                            <span className="text-[9px] opacity-60 px-1 py-0.5 rounded bg-zinc-950/45">
                              {srv.type === "fixed" ? "Σταθερή" : "Περιοδική"}
                            </span>
                          </button>

                          {/* Delete service button */}
                          {editMode && services.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const filtered = services.filter(s => s.id !== srv.id);
                                setServices(filtered);
                                if (activeService?.id === srv.id) {
                                  setSelectedServiceId(filtered[0].id);
                                }
                              }}
                              className="absolute -top-1.5 -right-1.5 bg-rose-950 border border-rose-800 text-rose-400 hover:bg-rose-905 p-0.5 rounded-full shadow-lg opacity-0 group-hover/tab:opacity-100 transition-opacity"
                              title="Διαγραφή υπηρεσίας"
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Active Service Panel Detail Display */}
                  {activeService ? (
                    <div className="bg-[#181a1d] border border-zinc-850 rounded-xl p-5 space-y-5">
                      
                      {/* Active Service Basic Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-1">
                          <label className="text-[10px] font-mono text-zinc-500 block">ΤΙΤΛΟΣ ΥΠΗΡΕΣΙΑΣ</label>
                          {editMode ? (
                            <input
                              type="text"
                              value={activeService.title}
                              onChange={(e) => {
                                const list = [...services];
                                const idx = list.findIndex(s => s.id === activeService.id);
                                list[idx] = { ...list[idx], title: e.target.value };
                                setServices(list);
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm font-semibold p-2 rounded"
                            />
                          ) : (
                            <h5 className="text-base font-display font-extrabold text-zinc-200">{activeService.title}</h5>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-zinc-500 block">ΤΥΠΟΣ ΥΠΗΡΕΣΙΑΣ</label>
                          {editMode ? (
                            <select
                              value={activeService.type}
                              onChange={(e) => {
                                const list = [...services];
                                const idx = list.findIndex(s => s.id === activeService.id);
                                list[idx] = { ...list[idx], type: e.target.value as any };
                                setServices(list);
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs p-2 rounded cursor-pointer"
                            >
                              <option value="fixed">Σταθερή (Fixed)</option>
                              <option value="recurring">Περιοδική (Recurring)</option>
                            </select>
                          ) : (
                            <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full border ${
                              activeService.type === "fixed"
                                ? "bg-emerald-950/40 text-emerald-400 border-emerald-800"
                                : "bg-purple-950/40 text-[#a855f7] border-purple-800"
                            }`}>
                              {activeService.type === "fixed" ? "Σταθερή Εμπειρία (Fixed Space)" : "Περιοδικό Event (Recurring Drop)"}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Summary / Slogan */}
                      <div className="space-y-1 bg-zinc-900/60 p-3 rounded-lg border border-zinc-850">
                        <label className="text-[10px] font-mono text-zinc-500 block">ΣΥΝΟΨΗ / SLOGAN</label>
                        {editMode ? (
                          <textarea
                            value={activeService.caption}
                            onChange={(e) => {
                              const list = [...services];
                              const idx = list.findIndex(s => s.id === activeService.id);
                              list[idx] = { ...list[idx], caption: e.target.value };
                              setServices(list);
                            }}
                            className="w-full bg-zinc-950 border border-zinc-850 text-zinc-200 text-xs p-2 rounded focus:ring-1 focus:ring-amber-500"
                            rows={2}
                          />
                        ) : (
                          <p className="text-xs sm:text-sm text-zinc-350 leading-relaxed italic">"{activeService.caption}"</p>
                        )}
                      </div>

                      {/* Goal & Targets */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-500 block uppercase flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Στρατηγικός Στόχος & Vision</span>
                        </label>
                        {editMode ? (
                          <textarea
                            value={activeService.targetDesc}
                            onChange={(e) => {
                              const list = [...services];
                              const idx = list.findIndex(s => s.id === activeService.id);
                              list[idx] = { ...list[idx], targetDesc: e.target.value };
                              setServices(list);
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs p-2 rounded focus:ring-1 focus:ring-amber-500"
                            rows={2}
                          />
                        ) : (
                          <p className="text-xs sm:text-sm text-zinc-250 leading-relaxed bg-zinc-900/30 p-3 rounded-lg border border-zinc-850">{activeService.targetDesc}</p>
                        )}
                      </div>

                      {/* Financial Dimensions Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1 bg-zinc-950/20 p-3.5 rounded-xl border border-zinc-850">
                          <label className="text-[10px] font-mono text-amber-500 block uppercase font-bold">Κανάλι Εσόδων</label>
                          {editMode ? (
                            <textarea
                              value={activeService.revenueDesc}
                              onChange={(e) => {
                                const list = [...services];
                                const idx = list.findIndex(s => s.id === activeService.id);
                                list[idx] = { ...list[idx], revenueDesc: e.target.value };
                                setServices(list);
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs p-2 rounded"
                              rows={3}
                            />
                          ) : (
                            <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-line">{activeService.revenueDesc}</p>
                          )}
                        </div>

                        <div className="space-y-1 bg-zinc-950/20 p-3.5 rounded-xl border border-zinc-850">
                          <label className="text-[10px] font-mono text-rose-500 block uppercase font-bold">Κόστος & Έξοδα</label>
                          {editMode ? (
                            <textarea
                              value={activeService.expenseDesc}
                              onChange={(e) => {
                                const list = [...services];
                                const idx = list.findIndex(s => s.id === activeService.id);
                                list[idx] = { ...list[idx], expenseDesc: e.target.value };
                                setServices(list);
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs p-2 rounded"
                              rows={3}
                            />
                          ) : (
                            <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-line">{activeService.expenseDesc}</p>
                          )}
                        </div>

                        <div className="space-y-1 bg-zinc-950/20 p-3.5 rounded-xl border border-zinc-850">
                          <label className="text-[10px] font-mono text-emerald-500 block uppercase font-bold">Περιθώριο Κέρδους</label>
                          {editMode ? (
                            <textarea
                              value={activeService.profitDesc}
                              onChange={(e) => {
                                const list = [...services];
                                const idx = list.findIndex(s => s.id === activeService.id);
                                list[idx] = { ...list[idx], profitDesc: e.target.value };
                                setServices(list);
                              }}
                              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs p-2 rounded"
                              rows={3}
                            />
                          ) : (
                            <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-line">{activeService.profitDesc}</p>
                          )}
                        </div>
                      </div>

                      {/* Strategy Approaches Area (Users & Collaborators) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Partners Approach */}
                        <div className="space-y-2 bg-[#121416] p-4 rounded-xl border border-zinc-800/80">
                          <h6 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 font-display">
                            <Users className="w-4 h-4 text-amber-500 shrink-0" />
                            <span>Προσέγγιση Συνεργατών & Καλλιτεχνών</span>
                          </h6>
                          {editMode ? (
                            <textarea
                              value={activeService.partnerApproach}
                              onChange={(e) => {
                                const list = [...services];
                                const idx = list.findIndex(s => s.id === activeService.id);
                                list[idx] = { ...list[idx], partnerApproach: e.target.value };
                                setServices(list);
                              }}
                              className="w-full bg-zinc-900 border border-zinc-850 text-[#d4d4d8] text-xs p-2 rounded focus:ring-1 focus:ring-amber-500"
                              rows={4}
                            />
                          ) : (
                            <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-line">{activeService.partnerApproach}</p>
                          )}
                        </div>

                        {/* Customers Approach */}
                        <div className="space-y-2 bg-[#121416] p-4 rounded-xl border border-zinc-800/80">
                          <h6 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 font-display">
                            <Megaphone className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Προσέγγιση Πελατών & Marketing</span>
                          </h6>
                          {editMode ? (
                            <textarea
                              value={activeService.customerApproach}
                              onChange={(e) => {
                                const list = [...services];
                                const idx = list.findIndex(s => s.id === activeService.id);
                                list[idx] = { ...list[idx], customerApproach: e.target.value };
                                setServices(list);
                              }}
                              className="w-full bg-zinc-900 border border-zinc-850 text-[#d4d4d8] text-xs p-2 rounded focus:ring-1 focus:ring-amber-500"
                              rows={4}
                            />
                          ) : (
                            <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-line">{activeService.customerApproach}</p>
                          )}
                        </div>
                      </div>

                      {/* Workflow Steps */}
                      <div className="space-y-3 pt-3 border-t border-zinc-800">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-mono text-zinc-500 block uppercase font-bold tracking-wider">
                            Workflow & Βήματα Υλοποίησης (5-Step Checklist)
                          </label>
                          {editMode && (
                            <button
                              type="button"
                              onClick={() => {
                                const list = [...services];
                                const idx = list.findIndex(s => s.id === activeService.id);
                                const currentSteps = list[idx].workflowSteps || [];
                                const nextNum = currentSteps.length > 0 ? Math.max(...currentSteps.map(s => s.step)) + 1 : 1;
                                list[idx].workflowSteps = [
                                  ...currentSteps,
                                  { step: nextNum, title: "Νέο Βήμα", desc: "Περιγραφή του νέου βήματος διεργασίας." }
                                ];
                                setServices(list);
                              }}
                              className="text-amber-400 hover:text-amber-300 font-bold font-mono text-[10px] cursor-pointer flex items-center gap-1 bg-zinc-900 border border-zinc-805 px-2 py-1 rounded"
                            >
                              <Plus className="w-3 h-3" />
                              <span>+ ΒΗΜΑ WORKFLOW</span>
                            </button>
                          )}
                        </div>

                        <div className="space-y-2.5">
                          {(activeService.workflowSteps || []).map((st, i) => (
                            <div key={i} className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-850/60 flex items-start gap-3 relative group/step">
                              <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-amber-900/20">
                                {st.step}
                              </span>
                              
                              <div className="flex-1">
                                {editMode ? (
                                  <div className="space-y-1.5 pr-6">
                                    <input
                                      type="text"
                                      value={st.title}
                                      onChange={(e) => {
                                        const list = [...services];
                                        const idx = list.findIndex(s => s.id === activeService.id);
                                        const steps = [...list[idx].workflowSteps];
                                        steps[i] = { ...steps[i], title: e.target.value };
                                        list[idx].workflowSteps = steps;
                                        setServices(list);
                                      }}
                                      className="bg-zinc-950 border border-zinc-850 text-zinc-150 text-xs px-2 py-1 rounded w-full font-bold"
                                      placeholder="Τίτλος βήματος"
                                    />
                                    <textarea
                                      value={st.desc}
                                      onChange={(e) => {
                                        const list = [...services];
                                        const idx = list.findIndex(s => s.id === activeService.id);
                                        const steps = [...list[idx].workflowSteps];
                                        steps[i] = { ...steps[i], desc: e.target.value };
                                        list[idx].workflowSteps = steps;
                                        setServices(list);
                                      }}
                                      className="bg-zinc-950 border border-zinc-850 text-zinc-350 text-xs px-2 py-1 rounded w-full"
                                      rows={2}
                                      placeholder="Περιγραφή βήματος"
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <strong className="text-zinc-200 text-xs font-semibold">{st.title}</strong>
                                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{st.desc}</p>
                                  </div>
                                )}
                              </div>

                              {/* Delete workflow step */}
                              {editMode && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const list = [...services];
                                    const idx = list.findIndex(s => s.id === activeService.id);
                                    const steps = list[idx].workflowSteps.filter((_, stepIdx) => stepIdx !== i);
                                    list[idx].workflowSteps = steps;
                                    setServices(list);
                                  }}
                                  className="absolute top-3 right-3 text-rose-500 hover:text-rose-400 p-0.5"
                                  title="Διαγραφή βήματος"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="bg-zinc-900/20 p-8 rounded-lg text-center text-zinc-500 text-xs font-mono">
                      Δεν υπάρχουν διαθέσιμες υπηρεσίες. Πατήστε '+ Προσθήκη' για να δημιουργήσετε.
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* CHAPTER 3: EXTERNAL ANALYSIS & PORTER */}
          {activeTab === "external-pest" && (
            <div className="space-y-6">
              
              <div className="border-b border-zinc-800 pb-4">
                <span className="text-xs font-mono text-emerald-500 tracking-widest uppercase">ΚΕΦΑΛΑΙΟ 3 • ΕΞΩΤΕΡΙΚΗ ΑΝΑΛΥΣΗ ΚΑΙ PEST-DG</span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-zinc-100 tracking-tight mt-1">
                  Μακροπεριβάλλον & Ανάλυση Porter
                </h3>
              </div>

              {/* PEST-DG Analysis Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditableUnit
                  id="pest-pol"
                  title="Πολιτικό Περιβάλλον (Political)"
                  content={pest.political}
                  editMode={editMode}
                  onTitleChange={(val) => setPest({ ...pest, political: val })}
                  onContentChange={(val) => setPest({ ...pest, political: val })}
                />
                <EditableUnit
                  id="pest-econ"
                  title="Οικονομικό Περιβάλλον (Economic)"
                  content={pest.economic}
                  editMode={editMode}
                  onTitleChange={(val) => setPest({ ...pest, economic: val })}
                  onContentChange={(val) => setPest({ ...pest, economic: val })}
                />
                <EditableUnit
                  id="pest-soc"
                  title="Κοινωνικό Περιβάλλον (Social)"
                  content={pest.social}
                  editMode={editMode}
                  onTitleChange={(val) => setPest({ ...pest, social: val })}
                  onContentChange={(val) => setPest({ ...pest, social: val })}
                />
                <EditableUnit
                  id="pest-tech"
                  title="Τεχνολογικό Περιβάλλον (Technological)"
                  content={pest.technological}
                  editMode={editMode}
                  onTitleChange={(val) => setPest({ ...pest, technological: val })}
                  onContentChange={(val) => setPest({ ...pest, technological: val })}
                />
                <EditableUnit
                  id="pest-demo"
                  title="Δημογραφικό Περιβάλλον (Demographic)"
                  content={pest.demographic}
                  editMode={editMode}
                  onTitleChange={(val) => setPest({ ...pest, demographic: val })}
                  onContentChange={(val) => setPest({ ...pest, demographic: val })}
                />
                <EditableUnit
                  id="pest-geo"
                  title="Γεωγραφικό Περιβάλλον (Geographical)"
                  content={pest.geographical}
                  editMode={editMode}
                  onTitleChange={(val) => setPest({ ...pest, geographical: val })}
                  onContentChange={(val) => setPest({ ...pest, geographical: val })}
                />
              </div>

              {/* Industry Characteristics */}
              <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                <h4 className="font-display font-bold text-lg text-zinc-100">Ανάλυση Κλαδικού Περιβάλλοντος</h4>
                <div className="space-y-3">
                  <EditableUnit
                    id="ind-sum"
                    title="Χαρακτηριστικά Κλάδου"
                    content={industry.summary}
                    editMode={editMode}
                    onTitleChange={(val) => setIndustry({ ...industry, summary: val })}
                    onContentChange={(val) => setIndustry({ ...industry, summary: val })}
                  />
                  <EditableUnit
                    id="ind-dist"
                    title="Κανάλια Διανομής (Distribution)"
                    content={industry.distributionChannels}
                    editMode={editMode}
                    onTitleChange={(val) => setIndustry({ ...industry, distributionChannels: val })}
                    onContentChange={(val) => setIndustry({ ...industry, distributionChannels: val })}
                  />
                  <EditableUnit
                    id="ind-trends"
                    title="Τάσεις στον Κλάδο"
                    content={industry.trends}
                    editMode={editMode}
                    onTitleChange={(val) => setIndustry({ ...industry, trends: val })}
                    onContentChange={(val) => setIndustry({ ...industry, trends: val })}
                  />
                  <EditableUnit
                    id="ind-factors"
                    title="Παράγοντες Επιτυχίας"
                    content={industry.successFactors}
                    editMode={editMode}
                    onTitleChange={(val) => setIndustry({ ...industry, successFactors: val })}
                    onContentChange={(val) => setIndustry({ ...industry, successFactors: val })}
                  />
                </div>
              </div>

              {/* Porter Interactive Grid */}
              <div className="space-y-4">
                <h4 className="text-lg font-display font-bold text-zinc-100 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-400" />
                  <span>Οι 5 Δυνάμεις Porter για το Cult-Hub</span>
                </h4>
                {porter.map((p, index) => (
                  <div key={p.id} className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] font-mono text-zinc-500 bg-zinc-850 px-2 py-0.5 rounded">
                          ΔΥΝΑΜΗ {index + 1}
                        </span>
                        {editMode ? (
                          <input
                            type="text"
                            value={p.title}
                            onChange={(e) => {
                              const list = [...porter];
                              list[index] = { ...list[index], title: e.target.value };
                              setPorter(list);
                            }}
                            className="bg-[#1e2022] border border-zinc-800 text-zinc-200 text-sm font-bold px-2 py-1 rounded"
                          />
                        ) : (
                          <h5 className="font-display text-sm sm:text-base font-bold text-zinc-150">
                            {p.title} <span className="text-zinc-500 font-normal font-mono text-xs">({p.titleEn})</span>
                          </h5>
                        )}
                      </div>
                      
                      {/* Scale selection */}
                      {editMode ? (
                        <select
                          value={p.scale}
                          onChange={(e) => {
                            const list = [...porter];
                            list[index] = { ...list[index], scale: e.target.value as any };
                            setPorter(list);
                          }}
                          className="bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs px-2 py-1 rounded font-mono"
                        >
                          <option value="ΧΑΜΗΛΗ">ΧΑΜΗΛΗ</option>
                          <option value="ΧΑΜΗΛΗ ΠΡΟΣ ΜΕΤΡΙΑ">ΧΑΜΗΛΗ ΠΡΟΣ ΜΕΤΡΙΑ</option>
                          <option value="ΜΕΤΡΙΑ">ΜΕΤΡΙΑ</option>
                          <option value="ΜΕΤΡΙΑ ΠΡΟΣ ΥΨΗΛΗ">ΜΕΤΡΙΑ ΠΡΟΣ ΥΨΗΛΗ</option>
                          <option value="ΥΨΗΛΗ">ΥΨΗΛΗ</option>
                        </select>
                      ) : (
                        <span className={`px-2.5 py-0.5 font-mono text-[10px] font-bold rounded-full border ${p.scaleColor}`}>
                          {p.scale}
                        </span>
                      )}
                    </div>
                    {editMode ? (
                      <textarea
                        value={p.description}
                        onChange={(e) => {
                          const list = [...porter];
                          list[index] = { ...list[index], description: e.target.value };
                          setPorter(list);
                        }}
                        rows={3}
                        className="w-full bg-[#1e2022] border border-zinc-800 text-zinc-300 text-xs p-2 rounded"
                      />
                    ) : (
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{p.description}</p>
                    )}

                    {/* Subfactors List Edit */}
                    <div className="pt-2 border-t border-zinc-850">
                      <EditableList
                        id={`porter-sub-${p.id}`}
                        title="Παράγοντες Αξιολόγησης"
                        items={p.subFactors}
                        editMode={editMode}
                        themeColor="zinc"
                        onItemsChange={(updated) => {
                          const list = [...porter];
                          list[index] = { ...list[index], subFactors: updated };
                          setPorter(list);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* CHAPTER 4: STRATEGY & SWOT / TOWS */}
          {activeTab === "strategy-swot" && (
            <div className="space-y-6">
              
              <div className="border-b border-zinc-800 pb-4">
                <span className="text-xs font-mono text-blue-500 tracking-widest uppercase">ΚΕΦΑΛΑΙΟ 4 • SWOT ANALYSIS & TOWS MATRIX</span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-zinc-100 tracking-tight mt-1">
                  Στρατηγική Ανάλυση SWOT-TOWS
                </h3>
              </div>

              {/* SWOT Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditableList
                  id="swot-s"
                  title="Strengths (Δυνάμεις)"
                  items={swot.strengths}
                  editMode={editMode}
                  themeColor="emerald"
                  onItemsChange={(list) => setSwot({ ...swot, strengths: list })}
                />
                <EditableList
                  id="swot-w"
                  title="Weaknesses (Αδυναμίες)"
                  items={swot.weaknesses}
                  editMode={editMode}
                  themeColor="rose"
                  onItemsChange={(list) => setSwot({ ...swot, weaknesses: list })}
                />
                <EditableList
                  id="swot-o"
                  title="Opportunities (Ευκαιρίες)"
                  items={swot.opportunities}
                  editMode={editMode}
                  themeColor="emerald"
                  onItemsChange={(list) => setSwot({ ...swot, opportunities: list })}
                />
                <EditableList
                  id="swot-t"
                  title="Threats (Απειλές)"
                  items={swot.threats}
                  editMode={editMode}
                  themeColor="rose"
                  onItemsChange={(list) => setSwot({ ...swot, threats: list })}
                />
              </div>

              {/* TOWS Matrix */}
              <div className="bg-[#141618] border border-zinc-850 rounded-xl p-5 space-y-4">
                <h4 className="font-display font-bold text-lg text-[#f4f4f5] border-b border-zinc-800 pb-1">TOWS Matrix (Στρατηγική Αντιστοίχισης)</h4>
                <div className="grid grid-cols-1 gap-4">
                  <EditableUnit
                    id="tows-so"
                    title="Συνδυασμός SO (Max-Max)"
                    content={tows.so}
                    editMode={editMode}
                    onTitleChange={(val) => setTows({ ...tows, so: val })}
                    onContentChange={(val) => setTows({ ...tows, so: val })}
                  />
                  <EditableUnit
                    id="tows-wo"
                    title="Συνδυασμός WO (Min-Max)"
                    content={tows.wo}
                    editMode={editMode}
                    onTitleChange={(val) => setTows({ ...tows, wo: val })}
                    onContentChange={(val) => setTows({ ...tows, wo: val })}
                  />
                  <EditableUnit
                    id="tows-st"
                    title="Συνδυασμός ST (Max-Min)"
                    content={tows.st}
                    editMode={editMode}
                    onTitleChange={(val) => setTows({ ...tows, st: val })}
                    onContentChange={(val) => setTows({ ...tows, st: val })}
                  />
                  <EditableUnit
                    id="tows-wt"
                    title="Συνδυασμός WT (Min-Min)"
                    content={tows.wt}
                    editMode={editMode}
                    onTitleChange={(val) => setTows({ ...tows, wt: val })}
                    onContentChange={(val) => setTows({ ...tows, wt: val })}
                  />
                </div>
              </div>

              {/* Strategic & Functional Strategies */}
              <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-4">
                <h4 className="font-display font-bold text-base text-zinc-250">Στρατηγικές Επιλογές & Λειτουργικά Πλάνα</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <EditableUnit
                    id="strat-growth"
                    title="Στρατηγική Ανάπτυξης"
                    content={stratChoices.growth}
                    editMode={editMode}
                    onTitleChange={(val) => setStratChoices({ ...stratChoices, growth: val })}
                    onContentChange={(val) => setStratChoices({ ...stratChoices, growth: val })}
                  />
                  <EditableUnit
                    id="strat-diff"
                    title="Στρατηγική Διαφοροποίησης"
                    content={stratChoices.differentiation}
                    editMode={editMode}
                    onTitleChange={(val) => setStratChoices({ ...stratChoices, differentiation: val })}
                    onContentChange={(val) => setStratChoices({ ...stratChoices, differentiation: val })}
                  />
                </div>

                <div className="pt-2">
                  <h5 className="text-xs font-mono uppercase text-zinc-500 mb-2 whitespace-nowrap">ΛΕΙΤΟΥΡΓΙΚΕΣ ΣΤΡΑΤΗΓΙΚΕΣ (FUNCTIONAL DECK)</h5>
                  <div className="space-y-3">
                    <EditableUnit
                      id="func-mkt"
                      title="Marketing Plan"
                      content={funcStrats.marketing}
                      editMode={editMode}
                      onTitleChange={(val) => setFuncStrats({ ...funcStrats, marketing: val })}
                      onContentChange={(val) => setFuncStrats({ ...funcStrats, marketing: val })}
                    />
                    <EditableUnit
                      id="func-hr"
                      title="Ανθρώπινοι Πόροι (HR)"
                      content={funcStrats.hr}
                      editMode={editMode}
                      onTitleChange={(val) => setFuncStrats({ ...funcStrats, hr: val })}
                      onContentChange={(val) => setFuncStrats({ ...funcStrats, hr: val })}
                    />
                    <EditableUnit
                      id="func-ops"
                      title="Λειτουργίες (Operations)"
                      content={funcStrats.operations}
                      editMode={editMode}
                      onTitleChange={(val) => setFuncStrats({ ...funcStrats, operations: val })}
                      onContentChange={(val) => setFuncStrats({ ...funcStrats, operations: val })}
                    />
                    <EditableUnit
                      id="func-fin"
                      title="Χρηματοοικονομική Στρατηγική"
                      content={funcStrats.finance}
                      editMode={editMode}
                      onTitleChange={(val) => setFuncStrats({ ...funcStrats, finance: val })}
                      onContentChange={(val) => setFuncStrats({ ...funcStrats, finance: val })}
                    />
                    <EditableUnit
                      id="func-sales"
                      title="Στρατηγική Πωλήσεων"
                      content={funcStrats.sales}
                      editMode={editMode}
                      onTitleChange={(val) => setFuncStrats({ ...funcStrats, sales: val })}
                      onContentChange={(val) => setFuncStrats({ ...funcStrats, sales: val })}
                    />

                    {/* Render custom functional strategies */}
                    {customFuncStrats.map((strat, sIdx) => (
                      <div key={strat.id} className="relative">
                        <EditableUnit
                          id={strat.id}
                          title={strat.title}
                          content={strat.content}
                          editMode={editMode}
                          onTitleChange={(val) => {
                            const list = [...customFuncStrats];
                            list[sIdx] = { ...list[sIdx], title: val };
                            setCustomFuncStrats(list);
                          }}
                          onContentChange={(val) => {
                            const list = [...customFuncStrats];
                            list[sIdx] = { ...list[sIdx], content: val };
                            setCustomFuncStrats(list);
                          }}
                        />
                        {editMode && (
                          <button
                            type="button"
                            onClick={() => {
                              setCustomFuncStrats(customFuncStrats.filter((_, idx) => idx !== sIdx));
                            }}
                            className="absolute top-2 right-2 text-rose-500 hover:text-rose-450 p-1.5 rounded bg-rose-950/20 hover:bg-rose-950/60 transition cursor-pointer z-10"
                            title="Διαγραφή Στρατηγικής"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}

                    {/* Add button */}
                    {editMode && (
                      <button
                        type="button"
                        onClick={() => {
                          setCustomFuncStrats([
                            ...customFuncStrats,
                            {
                              id: "custom-func-" + Date.now(),
                              title: "Νέα Λειτουργική Στρατηγική " + (customFuncStrats.length + 1),
                              content: "Συναφές περιεχόμενο και λεπτομέρειες για αυτήν τη στρατηγική..."
                            }
                          ]);
                        }}
                        className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-900 border border-dashed border-zinc-800 text-zinc-400 hover:text-orange-400 text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                      >
                        <Plus className="w-4 h-4 text-orange-500" />
                        <span>+ ΠΡΟΣΘΗΚΗ ΛΕΙΤΟΥΡΓΙΚΗΣ ΣΤΡΑΤΗΓΙΚΗΣ</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* CHAPTER 5: OPERATIONAL PLAN & WORKFLOWS ZONE */}
          {activeTab === "operating-workflow" && (
            <div className="space-y-6">
              
              <div className="border-b border-zinc-800 pb-4">
                <span className="text-xs font-mono text-purple-500 tracking-widest uppercase">ΚΕΦΑΛΑΙΟ 5 • ΛΕΙΤΟΥΡΓΙΚΟ ΠΛΑΝΟ & ΩΡΕΣ ΛΕΙΤΟΥΡΓΙΑΣ</span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#f4f4f5] tracking-tight mt-1">
                  Ωράριο, Πωλήσεις ανά Ώρα & Checklist
                </h3>
              </div>

              {/* Dynamic sales Target Assistant widget */}
              <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="font-display font-bold text-base text-zinc-100">Υπολογιστής Στόχου Επόμενης Ώρας</h4>
                    <p className="text-xs text-zinc-400">
                      Επιλέξτε Σενάριο Ημέρας και Ζώνη για να δείτε τι πωλήσεις θα πρέπει να γίνουν.
                    </p>
                  </div>
                  
                  {/* Selector Segment */}
                  {editMode ? (
                    <div className="grid grid-cols-3 gap-2 px-3 py-1.5 bg-zinc-950 rounded-lg border border-zinc-800/80">
                      <div className="space-y-0.5">
                        <label className="text-[9px] text-zinc-500 font-mono block">Καθημερινές</label>
                        <input
                          type="number"
                          value={weekdayTarget}
                          onChange={(e) => setWeekdayTarget(Math.max(1, Number(e.target.value)))}
                          className="bg-zinc-900 border border-zinc-800 text-zinc-250 text-xs px-2 py-0.5 rounded w-20 text-center font-mono"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-[9px] text-zinc-500 font-mono block">Παρ-Σάβ</label>
                        <input
                          type="number"
                          value={weekendTarget}
                          onChange={(e) => setWeekendTarget(Math.max(1, Number(e.target.value)))}
                          className="bg-zinc-900 border border-zinc-800 text-zinc-250 text-xs px-2 py-0.5 rounded w-20 text-center font-mono"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-[9px] text-zinc-500 font-mono block">Κυριακή</label>
                        <input
                          type="number"
                          value={sundayTarget}
                          onChange={(e) => setSundayTarget(Math.max(1, Number(e.target.value)))}
                          className="bg-zinc-900 border border-zinc-800 text-zinc-250 text-xs px-2 py-0.5 rounded w-20 text-center font-mono"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                      <button
                        onClick={() => setDayType("weekday")}
                        className={`px-3 py-1 rounded text-xs font-mono transition cursor-pointer ${
                          dayType === "weekday" ? "bg-zinc-800 text-white font-bold" : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        Καθημερινές ({weekdayTarget})
                      </button>
                      <button
                        onClick={() => setDayType("weekend")}
                        className={`px-3 py-1 rounded text-xs font-mono transition cursor-pointer ${
                          dayType === "weekend" ? "bg-zinc-800 text-white font-bold" : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        Παρασκευή-Σάββατο ({weekendTarget})
                      </button>
                      <button
                        onClick={() => setDayType("sunday")}
                        className={`px-3 py-1 rounded text-xs font-mono transition cursor-pointer ${
                          dayType === "sunday" ? "bg-zinc-800 text-white font-bold" : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        Κυριακή ({sundayTarget})
                      </button>
                    </div>
                  )}
                </div>

                {/* Grid calculations visualizer */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-950/40 p-4 rounded-lg border border-zinc-850 font-mono text-center">
                  <div className="p-2 border-r border-zinc-800/40">
                    <span className="text-[10px] text-zinc-500 block">ΗΜΕΡΗΣΙΟΣ ΣΤΟΧΟΣ</span>
                    <span className="text-lg font-bold text-zinc-200 mt-1 block">{dailyTargetGoal} τεμ.</span>
                  </div>
                  <div className="p-2 sm:border-r border-zinc-800/40">
                    <span className="text-[10px] text-zinc-500 block">ΜΕΣΗ ΤΙΜΗ ΠΡΟΪΟΝΤΟΣ</span>
                    <span className="text-lg font-bold text-amber-400 mt-1 block">{averagePrice} €</span>
                  </div>
                  <div className="p-2 border-r border-zinc-800/40 col-span-1">
                    <span className="text-[10px] text-zinc-500 block">ΜΕΤΑΒΛΗΤΟ ΚΟΣΤΟΣ</span>
                    <span className="text-lg font-bold text-zinc-300 mt-1 block">{averageCost} €</span>
                  </div>
                  <div className="p-2 col-span-1">
                    <span className="text-[10px] text-zinc-500 block">ΗΜΕΡΗΣΙΟΣ ΤΖΙΡΟΣ (ΣΤΟΧΟΣ)</span>
                    <span className="text-lg font-bold text-emerald-400 mt-1 block">{formatEuro(dailyTargetGoal * averagePrice)}</span>
                  </div>
                </div>

                {/* Zone Grid */}
                <div className="space-y-3.5">
                  <h5 className="text-xs font-mono uppercase text-zinc-500">Κατανομή ανά Λειτουργική Ζώνη (07:00 - 24:00)</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeZoneCalculations.map((z, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedZoneIndex(idx);
                          setHoursElapsedInZone(1);
                          setActualSalesInZone(Math.round(z.hourlySales));
                        }}
                        className={`text-left p-3.5 rounded-xl border transition ${
                          selectedZoneIndex === idx
                            ? "bg-amber-950/15 border-amber-500/50 text-amber-400 shadow-md"
                            : "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <strong className="text-xs font-display">{z.name}</strong>
                          <span className="text-[10px] font-mono font-bold">{z.hours}</span>
                        </div>
                        <div className="text-[11px] font-mono text-zinc-400 space-y-0.5">
                          <div>Στόχος: {z.totalSales} τεμ. (~{z.hourlySales}/ώρα)</div>
                          <div>Take-Away: {z.takeAwayQty} • Dine-In: {z.sitInQty}</div>
                          <div className="text-[10px] text-emerald-400 mt-1">Στελέχωση: {z.staffRequired} άτομο/α</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {editMode && (
                  <div className="bg-zinc-950/70 p-5 rounded-xl border border-zinc-800 space-y-4">
                    <h5 className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1">
                      <Sliders className="w-3.5 h-3.5 text-amber-500" />
                      <span>Επεξεργασία Παραμέτρων Λειτουργικών Ζωνών & Κατανομής</span>
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {operatingZones.map((zone: any, zIdx: number) => (
                        <div key={zIdx} className="p-3.5 bg-zinc-900/40 rounded-xl border border-zinc-850 space-y-3 text-xs">
                          <div className="flex justify-between items-center border-b border-zinc-800/80 pb-2">
                            <span className="font-bold text-zinc-200">Ζώνη {zIdx + 1}</span>
                            <span className="text-[10px] text-zinc-500 font-mono">Μερίδιο Πωλήσεων: {zone.percentage}%</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-zinc-500 font-mono text-[9px] uppercase">Όνομα Ζώνης</label>
                              <input
                                type="text"
                                value={zone.name}
                                onChange={(e) => {
                                  const list = [...operatingZones];
                                  list[zIdx] = { ...list[zIdx], name: e.target.value };
                                  setOperatingZones(list);
                                }}
                                className="bg-zinc-950 border border-zinc-850 p-1.5 text-zinc-200 rounded w-full text-xs font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-zinc-500 font-mono text-[9px] uppercase">Ωράριο</label>
                              <input
                                type="text"
                                value={zone.hours}
                                onChange={(e) => {
                                  const list = [...operatingZones];
                                  list[zIdx] = { ...list[zIdx], hours: e.target.value };
                                  setOperatingZones(list);
                                }}
                                className="bg-zinc-950 border border-zinc-850 p-1.5 text-zinc-250 rounded w-full text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-2">
                            <div className="space-y-1">
                              <label className="text-zinc-500 font-mono text-[9px]">Διάρκεια (h)</label>
                              <input
                                type="number"
                                value={zone.duration}
                                onChange={(e) => {
                                  const list = [...operatingZones];
                                  list[zIdx] = { ...list[zIdx], duration: Math.max(1, Number(e.target.value)) };
                                  setOperatingZones(list);
                                }}
                                className="bg-zinc-950 border border-zinc-850 p-1 text-zinc-200 rounded w-full text-center font-mono text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-zinc-500 font-mono text-[9px]">Μερίδιο %</label>
                              <input
                                type="number"
                                value={zone.percentage}
                                onChange={(e) => {
                                  const list = [...operatingZones];
                                  list[zIdx] = { ...list[zIdx], percentage: Math.max(0, Number(e.target.value)) };
                                  setOperatingZones(list);
                                }}
                                className="bg-zinc-950 border border-zinc-850 p-1 text-zinc-200 rounded w-full text-center font-mono text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-zinc-500 font-mono text-[9px]">Take-Away %</label>
                              <input
                                type="number"
                                value={zone.takeAwayPercent}
                                onChange={(e) => {
                                  const list = [...operatingZones];
                                  const val = Math.min(100, Math.max(0, Number(e.target.value)));
                                  list[zIdx] = { ...list[zIdx], takeAwayPercent: val, sitInPercent: 100 - val };
                                  setOperatingZones(list);
                                }}
                                className="bg-zinc-950 border border-zinc-850 p-1 text-zinc-200 rounded w-full text-center font-mono text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-zinc-500 font-mono text-[9px]">HR Staff</label>
                              <input
                                type="number"
                                value={zone.staffRequired}
                                onChange={(e) => {
                                  const list = [...operatingZones];
                                  list[zIdx] = { ...list[zIdx], staffRequired: Math.max(1, Number(e.target.value)) };
                                  setOperatingZones(list);
                                }}
                                className="bg-zinc-950 border border-zinc-850 p-1 text-zinc-200 rounded w-full text-center font-mono text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Simulator Calculator controls */}
                <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-850 space-y-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono text-zinc-200 uppercase font-bold">Προσομοιωτής Peak & Gap</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="space-y-1">
                      <label className="text-zinc-500 font-mono">Ώρες που πέρασαν στη ζώνη (1-{selectedZone.duration})</label>
                      <input
                        type="number"
                        min="1"
                        max={selectedZone.duration}
                        value={hoursElapsedInZone}
                        onChange={(e) => setHoursElapsedInZone(Math.min(selectedZone.duration, Math.max(1, Number(e.target.value))))}
                        className="w-full bg-[#1e2022] border border-zinc-800 p-2 text-zinc-200 rounded"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-zinc-500 font-mono">Πραγματικές Πωλήσεις που έγιναν</label>
                      <input
                        type="number"
                        min="0"
                        value={actualSalesInZone}
                        onChange={(e) => setActualSalesInZone(Math.max(0, Number(e.target.value)))}
                        className="w-full bg-[#1e2022] border border-zinc-800 p-2 text-zinc-200 rounded"
                      />
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800/80 rounded-lg p-2.5 text-center flex flex-col justify-center">
                      <span className="text-[10px] font-mono text-zinc-400">Στόχος Ζώνης ως τώρα: {nextHourStatus.theoreticalTargetSoFar} τεμ.</span>
                      <span className="text-lg font-bold mt-1 text-amber-400 font-mono">{nextHourStatus.requiredNext} τεμ. <span className="text-[10px] font-normal text-zinc-500">/ώρα</span></span>
                      <span className="text-[9px] text-zinc-500 font-mono">ΑΠΑΙΤΕΙΤΑΙ ΓΙΑ ΤΗΝ ΕΠΟΜΕΝΗ ΩΡΑ</span>
                    </div>
                  </div>

                  {/* Feedback summary */}
                  <div className={`p-3 rounded-lg border text-xs leading-relaxed ${
                    nextHourStatus.status === "ahead" 
                      ? "bg-emerald-950/20 text-emerald-400 border-emerald-800/50" 
                      : nextHourStatus.status === "behind"
                        ? "bg-rose-950/20 text-rose-400 border-rose-800/50"
                        : "bg-zinc-900 text-zinc-300 border-zinc-800"
                  }`}>
                    {nextHourStatus.message}
                  </div>
                </div>

                {/* Operating Vibe Description */}
                <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs text-zinc-300 space-y-1.5">
                  <span className="font-display font-bold block text-zinc-200">Προφίλ και Vibe Ζώνης: {selectedZone.name}</span>
                  <p className="leading-relaxed">{selectedZone.vibe}</p>
                  <p className="leading-relaxed"><strong className="text-amber-400">Οδηγία HR/Βάρδιας:</strong> {selectedZone.staffDetails}</p>
                </div>

              </div>

              {/* Barista workflow checklist */}
              <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                  <h4 className="font-display font-bold text-base text-[#f4f4f5]">Checklist & Workflow Barista</h4>
                  <button
                    onClick={resetAllProgress}
                    className="text-xs font-mono text-zinc-500 hover:text-white transition"
                  >
                    Reset Checklists
                  </button>
                </div>

                {/* Workflow Cards */}
                <div className="space-y-4">
                  
                  {/* Phase 1 */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      {editMode ? (
                        <input
                          type="text"
                          value={baristaWorkflow.morning.title}
                          onChange={(e) => setBaristaWorkflow(prev => ({
                            ...prev,
                            morning: { ...prev.morning, title: e.target.value }
                          }))}
                          className="bg-[#1e2022] border border-zinc-800 text-amber-400 text-xs font-bold px-2 py-0.5 rounded"
                        />
                      ) : (
                        <span className="font-bold text-amber-400">{baristaWorkflow.morning.title}</span>
                      )}
                      
                      <div className="flex items-center gap-2">
                        {editMode && (
                          <button
                            onClick={() => {
                              const steps = [...baristaWorkflow.morning.steps];
                              const nextNum = steps.length > 0 ? Math.max(...steps.map(s => s.step)) + 1 : 1;
                              steps.push({ step: nextNum, title: "Νέο βήμα", desc: "Περιγραφή βήματος" });
                              setBaristaWorkflow(prev => ({
                                ...prev,
                                morning: { ...prev.morning, steps }
                              }));
                            }}
                            className="text-amber-400 hover:text-amber-300 font-bold font-mono text-[10px] cursor-pointer flex items-center gap-0.5 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded"
                            title="Προσθήκη βήματος"
                          >
                            <Plus className="w-2.5 h-2.5" />
                            <span>+ ΒΗΜΑ</span>
                          </button>
                        )}
                        <span className="font-mono bg-zinc-850 px-2 py-0.5 rounded text-[10px] text-zinc-400">{getWorkflowProgress("morning")}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 bg-zinc-900/40 p-3 rounded-lg">
                      {baristaWorkflow.morning.steps.map((st, i) => (
                        <div 
                          key={i} 
                          className="flex items-start gap-2.5 py-1.5 text-xs relative group"
                        >
                          <button 
                            disabled={editMode}
                            onClick={() => !editMode && toggleTick("morning", i)}
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${editMode ? "border-zinc-800 bg-zinc-950 text-zinc-600" : "cursor-pointer"} ${
                              !editMode && morningTicks[`morning-${i}`] ? "border-emerald-500 bg-emerald-500/20 text-emerald-400" : "border-zinc-700"
                            }`}
                          >
                            {!editMode && morningTicks[`morning-${i}`] && <Check className="w-3 h-3" />}
                            {editMode && <span className="text-[9px] font-bold">{st.step}</span>}
                          </button>
                          
                          <div className="flex-1">
                            {editMode ? (
                              <div className="flex flex-col sm:flex-row gap-2 w-full pr-8">
                                <input
                                  type="text"
                                  value={st.title}
                                  onChange={(e) => {
                                    const steps = [...baristaWorkflow.morning.steps];
                                    steps[i] = { ...steps[i], title: e.target.value };
                                    setBaristaWorkflow(prev => ({
                                      ...prev,
                                      morning: { ...prev.morning, steps }
                                    }));
                                  }}
                                  className="bg-zinc-950 border border-zinc-850 text-zinc-200 text-xs px-2 py-0.5 rounded w-1/3"
                                />
                                <input
                                  type="text"
                                  value={st.desc}
                                  onChange={(e) => {
                                    const steps = [...baristaWorkflow.morning.steps];
                                    steps[i] = { ...steps[i], desc: e.target.value };
                                    setBaristaWorkflow(prev => ({
                                      ...prev,
                                      morning: { ...prev.morning, steps }
                                    }));
                                  }}
                                  className="bg-zinc-950 border border-zinc-850 text-zinc-300 text-xs px-2 py-0.5 rounded w-2/3"
                                />
                              </div>
                            ) : (
                              <div>
                                <strong className="text-zinc-200">{st.step}. {st.title}:</strong>
                                <p className="text-zinc-400 inline ml-1">{st.desc}</p>
                              </div>
                            )}
                          </div>

                          {editMode && (
                            <button
                              onClick={() => {
                                const steps = baristaWorkflow.morning.steps.filter((_, idx) => idx !== i);
                                setBaristaWorkflow(prev => ({
                                  ...prev,
                                  morning: { ...prev.morning, steps }
                                }));
                              }}
                              className="absolute top-1 right-0 text-rose-500 hover:text-rose-400 p-0.5"
                              title="Διαγραφή βήματος"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Phase 2 */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      {editMode ? (
                        <input
                          type="text"
                          value={baristaWorkflow.busyPrep.title}
                          onChange={(e) => setBaristaWorkflow(prev => ({
                            ...prev,
                            busyPrep: { ...prev.busyPrep, title: e.target.value }
                          }))}
                          className="bg-[#1e2022] border border-zinc-800 text-[#f43f5e] text-xs font-bold px-2 py-0.5 rounded"
                        />
                      ) : (
                        <span className="font-bold text-rose-400">{baristaWorkflow.busyPrep.title}</span>
                      )}
                      
                      <div className="flex items-center gap-2">
                        {editMode && (
                          <button
                            onClick={() => {
                              const steps = [...baristaWorkflow.busyPrep.steps];
                              const nextNum = steps.length > 0 ? Math.max(...steps.map(s => s.step)) + 1 : 1;
                              steps.push({ step: nextNum, title: "Νέο βήμα", desc: "Περιγραφή βήματος" });
                              setBaristaWorkflow(prev => ({
                                ...prev,
                                busyPrep: { ...prev.busyPrep, steps }
                              }));
                            }}
                            className="text-[#f43f5e] hover:text-rose-300 font-bold font-mono text-[10px] cursor-pointer flex items-center gap-0.5 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded"
                            title="Προσθήκη βήματος"
                          >
                            <Plus className="w-2.5 h-2.5" />
                            <span>+ ΒΗΜΑ</span>
                          </button>
                        )}
                        <span className="font-mono bg-zinc-850 px-2 py-0.5 rounded text-[10px] text-zinc-400">{getWorkflowProgress("busy")}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 bg-zinc-900/40 p-3 rounded-lg">
                      {baristaWorkflow.busyPrep.steps.map((st, i) => (
                        <div 
                          key={i} 
                          className="flex items-start gap-2.5 py-1.5 text-xs relative group"
                        >
                          <button 
                            disabled={editMode}
                            onClick={() => !editMode && toggleTick("busy", i)}
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${editMode ? "border-zinc-800 bg-zinc-950 text-zinc-600" : "cursor-pointer"} ${
                              !editMode && busyTicks[`busy-${i}`] ? "border-emerald-500 bg-emerald-500/20 text-emerald-400" : "border-zinc-700"
                            }`}
                          >
                            {!editMode && busyTicks[`busy-${i}`] && <Check className="w-3 h-3" />}
                            {editMode && <span className="text-[9px] font-bold">{st.step}</span>}
                          </button>
                          
                          <div className="flex-1">
                            {editMode ? (
                              <div className="flex flex-col sm:flex-row gap-2 w-full pr-8">
                                <input
                                  type="text"
                                  value={st.title}
                                  onChange={(e) => {
                                    const steps = [...baristaWorkflow.busyPrep.steps];
                                    steps[i] = { ...steps[i], title: e.target.value };
                                    setBaristaWorkflow(prev => ({
                                      ...prev,
                                      busyPrep: { ...prev.busyPrep, steps }
                                    }));
                                  }}
                                  className="bg-zinc-950 border border-zinc-850 text-zinc-200 text-xs px-2 py-0.5 rounded w-1/3"
                                />
                                <input
                                  type="text"
                                  value={st.desc}
                                  onChange={(e) => {
                                    const steps = [...baristaWorkflow.busyPrep.steps];
                                    steps[i] = { ...steps[i], desc: e.target.value };
                                    setBaristaWorkflow(prev => ({
                                      ...prev,
                                      busyPrep: { ...prev.busyPrep, steps }
                                    }));
                                  }}
                                  className="bg-zinc-950 border border-zinc-850 text-zinc-300 text-xs px-2 py-0.5 rounded w-2/3"
                                />
                              </div>
                            ) : (
                              <div>
                                <strong className="text-zinc-200">{st.step}. {st.title}:</strong>
                                <p className="text-zinc-400 inline ml-1">{st.desc}</p>
                              </div>
                            )}
                          </div>

                          {editMode && (
                            <button
                              onClick={() => {
                                const steps = baristaWorkflow.busyPrep.steps.filter((_, idx) => idx !== i);
                                setBaristaWorkflow(prev => ({
                                  ...prev,
                                  busyPrep: { ...prev.busyPrep, steps }
                                }));
                              }}
                              className="absolute top-1 right-0 text-rose-500 hover:text-rose-400 p-0.5"
                              title="Διαγραφή βήματος"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Phase 3 */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      {editMode ? (
                        <input
                          type="text"
                          value={baristaWorkflow.closing.title}
                          onChange={(e) => setBaristaWorkflow(prev => ({
                            ...prev,
                            closing: { ...prev.closing, title: e.target.value }
                          }))}
                          className="bg-[#1e2022] border border-zinc-800 text-purple-400 text-xs font-bold px-2 py-0.5 rounded"
                        />
                      ) : (
                        <span className="font-bold text-purple-400">{baristaWorkflow.closing.title}</span>
                      )}
                      
                      <div className="flex items-center gap-2">
                        {editMode && (
                          <button
                            onClick={() => {
                              const steps = [...baristaWorkflow.closing.steps];
                              const nextNum = steps.length > 0 ? Math.max(...steps.map(s => s.step)) + 1 : 1;
                              steps.push({ step: nextNum, title: "Νέο βήμα", desc: "Περιγραφή βήματος" });
                              setBaristaWorkflow(prev => ({
                                ...prev,
                                closing: { ...prev.closing, steps }
                              }));
                            }}
                            className="text-purple-400 hover:text-purple-300 font-bold font-mono text-[10px] cursor-pointer flex items-center gap-0.5 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded"
                            title="Προσθήκη βήματος"
                          >
                            <Plus className="w-2.5 h-2.5" />
                            <span>+ ΒΗΜΑ</span>
                          </button>
                        )}
                        <span className="font-mono bg-zinc-850 px-2 py-0.5 rounded text-[10px] text-zinc-400">{getWorkflowProgress("closing")}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 bg-zinc-900/40 p-3 rounded-lg">
                      {baristaWorkflow.closing.steps.map((st, i) => (
                        <div 
                          key={i} 
                          className="flex items-start gap-2.5 py-1.5 text-xs relative group"
                        >
                          <button 
                            disabled={editMode}
                            onClick={() => !editMode && toggleTick("closing", i)}
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${editMode ? "border-zinc-800 bg-zinc-950 text-zinc-600" : "cursor-pointer"} ${
                              !editMode && closingTicks[`closing-${i}`] ? "border-emerald-500 bg-emerald-500/20 text-emerald-400" : "border-zinc-700"
                            }`}
                          >
                            {!editMode && closingTicks[`closing-${i}`] && <Check className="w-3 h-3" />}
                            {editMode && <span className="text-[9px] font-bold">{st.step}</span>}
                          </button>
                          
                          <div className="flex-1">
                            {editMode ? (
                              <div className="flex flex-col sm:flex-row gap-2 w-full pr-8">
                                <input
                                  type="text"
                                  value={st.title}
                                  onChange={(e) => {
                                    const steps = [...baristaWorkflow.closing.steps];
                                    steps[i] = { ...steps[i], title: e.target.value };
                                    setBaristaWorkflow(prev => ({
                                      ...prev,
                                      closing: { ...prev.closing, steps }
                                    }));
                                  }}
                                  className="bg-zinc-950 border border-zinc-850 text-zinc-200 text-xs px-2 py-0.5 rounded w-1/3"
                                />
                                <input
                                  type="text"
                                  value={st.desc}
                                  onChange={(e) => {
                                    const steps = [...baristaWorkflow.closing.steps];
                                    steps[i] = { ...steps[i], desc: e.target.value };
                                    setBaristaWorkflow(prev => ({
                                      ...prev,
                                      closing: { ...prev.closing, steps }
                                    }));
                                  }}
                                  className="bg-zinc-950 border border-zinc-850 text-zinc-300 text-xs px-2 py-0.5 rounded w-2/3"
                                />
                              </div>
                            ) : (
                              <div>
                                <strong className="text-zinc-200">{st.step}. {st.title}:</strong>
                                <p className="text-zinc-400 inline ml-1">{st.desc}</p>
                              </div>
                            )}
                          </div>

                          {editMode && (
                            <button
                              onClick={() => {
                                const steps = baristaWorkflow.closing.steps.filter((_, idx) => idx !== i);
                                setBaristaWorkflow(prev => ({
                                  ...prev,
                                  closing: { ...prev.closing, steps }
                                }));
                              }}
                              className="absolute top-1 right-0 text-rose-500 hover:text-rose-400 p-0.5"
                              title="Διαγραφή βήματος"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Staff Evaluation */}
              <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                  <h4 className="font-display font-bold text-base text-[#f4f4f5]">Κριτήρια & Στάδια HR (Στελέχωση)</h4>
                  {editMode && (
                    <button
                      onClick={() => {
                        const newStage = {
                          title: "Νέο Στάδιο / Κριτήριο HR",
                          focus: "Περιγραφή εστίασης του νέου σταδίου.",
                          points: ["Κριτήριο A", "Κριτήριο B"]
                        };
                        setStaffEvaluation(prev => ({
                          ...prev,
                          stages: [...prev.stages, newStage]
                        }));
                      }}
                      className="text-amber-400 hover:text-amber-300 font-bold font-mono text-xs cursor-pointer flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ ΠΡΟΣΘΗΚΗ ΣΤΑΔΙΟΥ</span>
                    </button>
                  )}
                </div>
                
                <div className="space-y-3.5 text-xs sm:text-sm">
                  {staffEvaluation.stages.map((st: any, idx: number) => (
                    <div key={idx} className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-850 relative group">
                      {editMode && (
                        <button
                          onClick={() => {
                            setStaffEvaluation(prev => ({
                              ...prev,
                              stages: prev.stages.filter((_, i) => i !== idx)
                            }));
                          }}
                          className="absolute top-3 right-3 text-rose-500 hover:text-rose-400 p-1 bg-zinc-950/40 rounded border border-zinc-805"
                          title="Διαγραφή σταδίου"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      
                      {editMode ? (
                        <div className="space-y-2 pr-6">
                          <input
                            type="text"
                            value={st.title}
                            onChange={(e) => {
                              const list = [...staffEvaluation.stages];
                              list[idx] = { ...list[idx], title: e.target.value };
                              setStaffEvaluation({ ...staffEvaluation, stages: list });
                            }}
                            className="bg-[#1e2022] border border-zinc-800 text-zinc-150 p-1.5 rounded font-bold text-xs w-full"
                          />
                          <textarea
                            value={st.focus}
                            onChange={(e) => {
                              const list = [...staffEvaluation.stages];
                              list[idx] = { ...list[idx], focus: e.target.value };
                              setStaffEvaluation({ ...staffEvaluation, stages: list });
                            }}
                            className="bg-[#1e2022] border border-zinc-800 text-zinc-200 text-xs p-2 rounded w-full"
                            rows={2}
                          />
                          <div className="space-y-1 mt-1">
                            <span className="text-[10px] text-zinc-500 block">Κριτήρια (Διαχωρισμός με κόμμα)</span>
                            <input
                              type="text"
                              value={st.points.join(", ")}
                              onChange={(e) => {
                                const list = [...staffEvaluation.stages];
                                list[idx] = { ...list[idx], points: e.target.value.split(",").map((p: any) => p.trim()) };
                                setStaffEvaluation({ ...staffEvaluation, stages: list });
                              }}
                              className="bg-[#1e2022] border border-zinc-800 text-zinc-250 text-xs p-1 rounded w-full font-mono"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <strong className="text-zinc-200 font-display block mb-1">{st.title}</strong>
                          <p className="text-zinc-400 text-xs mb-2 leading-relaxed">{st.focus}</p>
                          <div className="mt-2 space-y-1">
                            {st.points.map((p: any, i: number) => (
                              <div key={i} className="flex items-center gap-2 text-[11px] text-zinc-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                <span>{p}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <EditableList
                      id="hr-greens"
                      title="🟢 Θετικοί Δείκτες (Green Indicators)"
                      items={staffEvaluation.greenIndicators || STAFF_EVALUATION.greenIndicators}
                      editMode={editMode}
                      themeColor="emerald"
                      onItemsChange={(updated) => setStaffEvaluation(prev => ({ ...prev, greenIndicators: updated }))}
                    />
                    <EditableList
                      id="hr-reds"
                      title="🔴 Προειδοποιητικές Ενδείξεις (Red Flags)"
                      items={staffEvaluation.redFlags || STAFF_EVALUATION.redFlags}
                      editMode={editMode}
                      themeColor="rose"
                      onItemsChange={(updated) => setStaffEvaluation(prev => ({ ...prev, redFlags: updated }))}
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* CHAPTER 6: CAFE MARKETING CAMPAIGNS */}
          {activeTab === "marketing-mix" && (
            <div className="space-y-6">
              
              <div className="border-b border-zinc-800 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-orange-500 tracking-widest uppercase">ΚΕΦΑΛΑΙΟ 6 • MARKETING MIX</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#f4f4f5] tracking-tight mt-1">
                    Στρατηγική Προώθησης & Κανάλια
                  </h3>
                </div>
                {editMode && (
                  <button
                    type="button"
                    onClick={() => {
                      setMarketing([
                        ...marketing,
                        {
                          id: "campaign-" + Date.now(),
                          title: "Νέα Καμπάνια " + (marketing.length + 1),
                          implementation: "Περιγράψτε τον τρόπο εκτέλεσης και προώθησης αυτής της καμπάνιας...",
                          tools: ["Instagram", "Facebook", "Flyers"],
                          goals: "Στόχοι της καμπάνιας...",
                          indicators: ["Αύξηση followers κατά 20%", "50+ νέες εγγραφές/κρατήσεις"]
                        }
                      ]);
                    }}
                    className="text-orange-400 hover:text-orange-300 font-bold font-mono text-xs cursor-pointer flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-lg active:scale-95 transition-transform shrink-0 self-start sm:self-center"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ ΠΡΟΣΘΗΚΗ ΚΑΜΠΑΝΙΑΣ</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketing.map((m, index) => (
                  <div key={m.id} className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4 flex flex-col justify-between relative group">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-800 gap-2">
                        <div className="flex-1">
                          {editMode ? (
                            <input
                              type="text"
                              value={m.title}
                              onChange={(e) => {
                                const list = [...marketing];
                                list[index] = { ...list[index], title: e.target.value };
                                setMarketing(list);
                              }}
                              className="bg-[#1e2022] border border-zinc-800 text-zinc-100 text-sm font-bold px-2 py-1 rounded w-full"
                            />
                          ) : (
                            <h4 className="font-display font-bold text-base text-zinc-150">{m.title}</h4>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {editMode && (
                            <button
                              type="button"
                              onClick={() => {
                                const list = marketing.filter((_, idx) => idx !== index);
                                setMarketing(list);
                              }}
                              className="text-rose-500 hover:text-rose-450 p-1 rounded bg-rose-950/20 hover:bg-rose-950/60 cursor-pointer"
                              title="Διαγραφή καμπάνιας"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <TrendingUp className="w-4 h-4 text-orange-500" />
                        </div>
                      </div>

                      <div className="space-y-3 pt-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-500 block uppercase">Υλοποίηση</span>
                          {editMode ? (
                            <textarea
                              value={m.implementation}
                              onChange={(e) => {
                                const list = [...marketing];
                                list[index] = { ...list[index], implementation: e.target.value };
                                setMarketing(list);
                              }}
                              rows={4}
                              className="w-full bg-[#1e2022] border border-zinc-800 text-zinc-200 text-xs p-2 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                            />
                          ) : (
                            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{m.implementation}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-zinc-500 block uppercase">Εργαλεία & Μέσα (χωρισμένα με κόμμα)</span>
                          {editMode ? (
                            <input
                              type="text"
                              value={m.tools.join(", ")}
                              onChange={(e) => {
                                const list = [...marketing];
                                list[index] = { ...list[index], tools: e.target.value.split(",").map(t => t.trim()) };
                                setMarketing(list);
                              }}
                              className="w-full bg-[#1e2022] border border-zinc-800 text-zinc-150 p-1.5 rounded text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                            />
                          ) : (
                            <div className="flex flex-wrap gap-1">
                              {m.tools.map((t, idx) => (
                                <span key={idx} className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px] font-mono">{t}</span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-500 block uppercase">Στόχοι</span>
                          {editMode ? (
                            <textarea
                              value={m.goals}
                              onChange={(e) => {
                                const list = [...marketing];
                                list[index] = { ...list[index], goals: e.target.value };
                                setMarketing(list);
                              }}
                              rows={2}
                              className="w-full bg-[#1e2022] text-[#e4e4e7] border border-zinc-800 text-xs p-2 rounded focus:ring-1 focus:ring-amber-500 focus:outline-none"
                            />
                          ) : (
                            <p className="text-xs italic text-zinc-400 pl-2.5 border-l border-zinc-700 leading-relaxed">{m.goals}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3.5 border-t border-zinc-850 mt-4 bg-zinc-950/20 -mx-5 -mb-5 p-4 rounded-b-xl">
                      <strong className="text-[10px] font-mono text-zinc-500 block tracking-wider uppercase mb-2">Δείκτες Απόδοσης KPIs (ένας ανά σειρά)</strong>
                      {editMode ? (
                        <textarea
                          value={m.indicators.join("\n")}
                          onChange={(e) => {
                            const list = [...marketing];
                            list[index] = { ...list[index], indicators: e.target.value.split("\n").filter(line => line.trim() !== "") };
                            setMarketing(list);
                          }}
                          className="w-full bg-zinc-900 border border-zinc-800 text-emerald-400 text-xs p-2 rounded font-mono focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          rows={3}
                        />
                      ) : (
                        <div className="space-y-1">
                          {m.indicators.map((ind, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{ind}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* CHAPTER 7: TIMELINE & RISKS */}
          {activeTab === "timeline-risks" && (
            <div className="space-y-6">
              
              <div className="border-b border-zinc-800 pb-4">
                <span className="text-xs font-mono text-amber-500 tracking-widest uppercase">ΚΕΦΑΛΑΙΟ 7 • ΧΡΟΝΟΔΙΑΓΡΑΜΜΑ & ΑΝΑΛΥΣΗ ΚΙΝΔΥΝΩΝ</span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#f4f4f5] tracking-tight mt-1">
                  Timeline Υλοποίησης & Διαχείριση Κινδύνων
                </h3>
              </div>

              {/* Implementation timeline */}
              <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4">
                <h4 className="font-display font-bold text-lg text-zinc-100 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500 animate-pulse" />
                  <span>Χρονοδιάγραμμα Υλοποίησης 2026</span>
                </h4>
                
                <div className="space-y-3">
                  <EditableUnit
                    id="tl-march"
                    title="Μάρτιος 2026"
                    content={timeline.march}
                    editMode={editMode}
                    onTitleChange={(val) => setTimeline({ ...timeline, march: val })}
                    onContentChange={(val) => setTimeline({ ...timeline, march: val })}
                  />
                  <EditableUnit
                    id="tl-april"
                    title="Απρίλιος 2026"
                    content={timeline.april}
                    editMode={editMode}
                    onTitleChange={(val) => setTimeline({ ...timeline, april: val })}
                    onContentChange={(val) => setTimeline({ ...timeline, april: val })}
                  />
                  <EditableUnit
                    id="tl-may"
                    title="Μάιος 2026"
                    content={timeline.may}
                    editMode={editMode}
                    onTitleChange={(val) => setTimeline({ ...timeline, may: val })}
                    onContentChange={(val) => setTimeline({ ...timeline, may: val })}
                  />
                  <EditableUnit
                    id="tl-june"
                    title="Ιούνιος 2026"
                    content={timeline.june}
                    editMode={editMode}
                    onTitleChange={(val) => setTimeline({ ...timeline, june: val })}
                    onContentChange={(val) => setTimeline({ ...timeline, june: val })}
                  />
                  <EditableUnit
                    id="tl-july"
                    title="Ιούλιος 2026"
                    content={timeline.july}
                    editMode={editMode}
                    onTitleChange={(val) => setTimeline({ ...timeline, july: val })}
                    onContentChange={(val) => setTimeline({ ...timeline, july: val })}
                  />
                </div>
              </div>

              {/* Risk Management details */}
              <div className="bg-zinc-900/40 p-5 rounded-xl border border-zinc-805 space-y-4">
                <h4 className="font-display font-bold text-lg text-rose-400">7. Αναλυτική Ανάλυση Κινδύνων</h4>
                
                <div className="space-y-3.5">
                  <EditableUnit
                    id="risk-fin"
                    title="7.1 Οικονομικοί Κίνδυνοι"
                    content={risks.financial}
                    editMode={editMode}
                    onTitleChange={(val) => setRisks({ ...risks, financial: val })}
                    onContentChange={(val) => setRisks({ ...risks, financial: val })}
                  />
                  <EditableUnit
                    id="risk-demand"
                    title="7.2 Κίνδυνος Μειωμένης Ζήτησης"
                    content={risks.demand}
                    editMode={editMode}
                    onTitleChange={(val) => setRisks({ ...risks, demand: val })}
                    onContentChange={(val) => setRisks({ ...risks, demand: val })}
                  />
                  <EditableUnit
                    id="risk-comp"
                    title="7.3 Ανταγωνισμός"
                    content={risks.competition}
                    editMode={editMode}
                    onTitleChange={(val) => setRisks({ ...risks, competition: val })}
                    onContentChange={(val) => setRisks({ ...risks, competition: val })}
                  />
                  <EditableUnit
                    id="risk-ops"
                    title="7.4 Λειτουργικοί Κίνδυνοι & Ασφάλεια ράμπας"
                    content={risks.operational}
                    editMode={editMode}
                    onTitleChange={(val) => setRisks({ ...risks, operational: val })}
                    onContentChange={(val) => setRisks({ ...risks, operational: val })}
                  />
                  <EditableUnit
                    id="risk-creative"
                    title="7.5 Κίνδυνοι Σχετικοί με Δημιουργικές Υπηρεσίες"
                    content={risks.creativeServices}
                    editMode={editMode}
                    onTitleChange={(val) => setRisks({ ...risks, creativeServices: val })}
                    onContentChange={(val) => setRisks({ ...risks, creativeServices: val })}
                  />
                  <EditableUnit
                    id="risk-mkt"
                    title="7.6 Κίνδυνοι Marketing"
                    content={risks.marketing}
                    editMode={editMode}
                    onTitleChange={(val) => setRisks({ ...risks, marketing: val })}
                    onContentChange={(val) => setRisks({ ...risks, marketing: val })}
                  />
                  <EditableUnit
                    id="risk-conc"
                    title="7.7 Συμπέρασμα Ανάλυσης Κινδύνων"
                    content={risks.conclusion}
                    editMode={editMode}
                    onTitleChange={(val) => setRisks({ ...risks, conclusion: val })}
                    onContentChange={(val) => setRisks({ ...risks, conclusion: val })}
                  />
                </div>
              </div>

            </div>
          )}

          {/* CHAPTER 8: DETAILED FINANCIAL PLAN, DYNAMIC SIMULATOR & WORKFLOW PRODUCTS */}
          {activeTab === "financial-plan" && (
            <div className="space-y-6">
              
              <div className="border-b border-zinc-800 pb-4">
                <span className="text-xs font-mono text-green-500 tracking-widest uppercase">ΚΕΦΑΛΑΙΟ 8 • ΟΙΚΟΝΟΜΙΚΟ ΠΛΑΝΟ & ΠΡΟΣΟΜΟΙΩΤΗΣ</span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#f4f4f5] tracking-tight mt-1">
                  Οικονομικά Στοιχεία, Τιμοκατάλογοι & Break-Even
                </h3>
              </div>

              {/* Financial Products Editor Cards */}
              <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-800">
                  <div className="flex-1">
                    {editMode ? (
                      <input
                        type="text"
                        value={financialTitle}
                        onChange={(e) => setFinancialTitle(e.target.value)}
                        className="bg-[#1e2022] border border-zinc-800 text-zinc-100 text-sm font-bold p-1 rounded font-display w-full"
                      />
                    ) : (
                      <h4 className="font-display font-bold text-base text-zinc-100">{financialTitle}</h4>
                    )}
                  </div>
                  {editMode && (
                    <button
                      type="button"
                      onClick={() => {
                        setFinancialProducts([
                          ...financialProducts,
                          { id: "product-" + Date.now(), name: "Νέο Προϊόν " + (financialProducts.length + 1), price: 4.5, cost: 1.2, category: "coffee" }
                        ]);
                      }}
                      className="text-emerald-400 hover:text-emerald-300 font-bold font-mono text-[10px] cursor-pointer flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 rounded active:scale-95 transition-transform"
                    >
                      <Plus className="w-3 h-3" />
                      <span>+ ΠΡΟΣΘΗΚΗ ΠΡΟΪΟΝΤΟΣ</span>
                    </button>
                  )}
                </div>

                {/* Category editor panel */}
                {editMode && (
                  <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-850/50 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase">Διαχείριση Κατηγοριών Προϊόντων</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newId = "cat-" + Date.now();
                          setProductCategories([
                            ...productCategories,
                            { id: newId, label: "Νέα Κατηγορία " + (productCategories.length + 1) }
                          ]);
                        }}
                        className="text-amber-500 hover:text-amber-400 font-bold font-mono text-[9px] px-2 py-1 rounded bg-zinc-900 border border-zinc-800 cursor-pointer"
                      >
                        + ΝΕΑ ΚΑΤΗΓΟΡΙΑ
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {productCategories.map((cat: any, cidx: number) => (
                        <div key={cat.id} className="flex items-center gap-1 bg-zinc-900/60 px-2 py-1 rounded border border-zinc-850">
                          <input
                            type="text"
                            value={cat.label}
                            onChange={(e) => {
                              const list = [...productCategories];
                              list[cidx] = { ...list[cidx], label: e.target.value };
                              setProductCategories(list);
                            }}
                            className="bg-transparent border-none text-zinc-200 text-xs w-full focus:outline-none focus:ring-1 focus:ring-amber-500 rounded p-0.5 font-sans"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setProductCategories(productCategories.filter(c => c.id !== cat.id));
                            }}
                            className="text-zinc-600 hover:text-rose-500 transition cursor-pointer"
                            title="Διαγραφή Κατηγορίας"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="overflow-x-auto border border-zinc-800 rounded-lg">
                  <table className="w-full text-xs font-mono text-[#f4f4f5] text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-950/40 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        <th className="py-2.5 px-3 border-r border-zinc-900">Κωδικός / Προϊόν</th>
                        <th className="py-2.5 px-3 border-r border-zinc-900">Κατηγορία</th>
                        <th className="py-2.5 px-3 text-right border-r border-zinc-900 font-bold">Τιμή Πώλησης (€)</th>
                        <th className="py-2.5 px-3 text-right border-r border-zinc-900 font-bold">Κόστος Pr. (€)</th>
                        <th className="py-2.5 px-3 text-right font-bold">Καθαρό Περιθώριο (€)</th>
                        {editMode && <th className="py-2.5 px-3 text-right w-16">Διαγραφή</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {financialProducts.map((p: any, index: number) => (
                        <tr key={p.id} className="border-b border-zinc-805 hover:bg-zinc-900/40 transition">
                          <td className="py-2 px-3 font-sans font-medium text-zinc-200 border-r border-[#1e2022]">
                            {editMode ? (
                              <input
                                type="text"
                                value={p.name}
                                onChange={(e) => {
                                  const list = [...financialProducts];
                                  list[index] = { ...list[index], name: e.target.value };
                                  setFinancialProducts(list);
                                }}
                                className="bg-[#1e2022] border border-zinc-800 text-zinc-150 p-1 rounded font-sans text-xs w-full focus:ring-1 focus:ring-amber-500"
                              />
                            ) : (
                              p.name
                            )}
                          </td>
                          <td className="py-2 px-3 border-r border-[#1e2022]">
                            {editMode ? (
                              <select
                                value={p.category || "coffee"}
                                onChange={(e) => {
                                  const list = [...financialProducts];
                                  list[index] = { ...list[index], category: e.target.value };
                                  setFinancialProducts(list);
                                }}
                                className="bg-[#1e2022] border border-zinc-800 text-zinc-350 p-1 rounded font-sans text-xs w-full focus:outline-none focus:ring-1 focus:ring-amber-500"
                              >
                                {productCategories.map((cat: any) => (
                                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                                ))}
                              </select>
                            ) : (
                              <span className="bg-zinc-850/80 px-2 py-0.5 rounded text-[10px] text-zinc-350 font-mono">
                                {productCategories.find((cat: any) => cat.id === (p.category || "coffee"))?.label || "Specialty Καφέδες"}
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-3 text-right border-r border-[#1e2022]">
                            {editMode ? (
                              <input
                                type="number"
                                step="0.10"
                                value={p.price}
                                onChange={(e) => {
                                  const list = [...financialProducts];
                                  list[index] = { ...list[index], price: Number(e.target.value) };
                                  setFinancialProducts(list);
                                }}
                                className="bg-[#1e2022] border border-zinc-800 text-zinc-150 p-1 rounded font-mono text-xs w-16 text-right"
                              />
                            ) : (
                              p.price.toFixed(2) + " €"
                            )}
                          </td>
                          <td className="py-2 px-3 text-right border-r border-[#1e2022]">
                            {editMode ? (
                              <input
                                type="number"
                                step="0.10"
                                value={p.cost}
                                onChange={(e) => {
                                  const list = [...financialProducts];
                                  list[index] = { ...list[index], cost: Number(e.target.value) };
                                  setFinancialProducts(list);
                                }}
                                className="bg-[#1e2022] border border-zinc-800 text-zinc-150 p-1 rounded font-mono text-xs w-16 text-right"
                              />
                            ) : (
                              p.cost.toFixed(2) + " €"
                            )}
                          </td>
                          <td className="py-2 px-3 text-right text-emerald-400 font-bold">
                            {(p.price - p.cost).toFixed(2)} €
                          </td>
                          {editMode && (
                            <td className="py-2 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => {
                                  const list = financialProducts.filter((_: any, idx: number) => idx !== index);
                                  setFinancialProducts(list);
                                }}
                                className="text-rose-500 hover:text-rose-455 p-1 rounded transition bg-rose-950/20 hover:bg-rose-950/60 inline-flex items-center justify-center cursor-pointer"
                                title="Διαγραφή προϊόντος"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fixed Expenses Editor */}
              <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                  <h4 className="font-display font-bold text-base text-zinc-100">Πάγια Μηνιαία Έξοδα Λειτουργίας</h4>
                  <span className="text-[11px] font-mono text-zinc-400">Σταθερά Έξοδα εκτός COGS</span>
                </div>
                <div className="space-y-2">
                  {fixedExpenses.map((exp: any, index: number) => (
                    <div key={exp.id} className="flex items-center justify-between gap-3 text-xs bg-zinc-900/40 p-2.5 rounded border border-zinc-850">
                      <div className="font-sans font-medium text-zinc-200 flex-1">
                        {editMode ? (
                          <input
                            type="text"
                            value={exp.label}
                            onChange={(e) => {
                              const list = [...fixedExpenses];
                              list[index] = { ...list[index], label: e.target.value };
                              setFixedExpenses(list);
                            }}
                            className="bg-[#1e2022] border border-zinc-800 text-zinc-150 p-1.5 rounded font-sans text-xs w-full focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        ) : (
                          exp.label
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="font-mono font-bold text-rose-400">
                          {editMode ? (
                            <input
                              type="number"
                              value={exp.amount}
                              onChange={(e) => {
                                const list = [...fixedExpenses];
                                list[index] = { ...list[index], amount: Math.max(0, Number(e.target.value)) };
                                setFixedExpenses(list);
                              }}
                              className="bg-[#1e2022] border border-zinc-800 text-zinc-150 p-1.5 rounded font-mono text-xs w-20 text-right text-rose-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                          ) : (
                            formatEuro(exp.amount)
                          )}
                        </div>
                        {editMode && (
                          <button
                            type="button"
                            onClick={() => {
                              const list = fixedExpenses.filter((item: any) => item.id !== exp.id);
                              setFixedExpenses(list);
                            }}
                            className="text-rose-500 hover:text-rose-400 p-1.5 rounded bg-rose-950/20 hover:bg-rose-950/50 cursor-pointer transition-colors"
                            title="Διαγραφή εξόδου"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {editMode && (
                    <button
                      type="button"
                      onClick={() => {
                        const newId = `exp-${Date.now()}`;
                        setFixedExpenses(prev => [...prev, { id: newId, category: "fixed", label: "Νέο Πάγιο Έξοδο", amount: 150 }]);
                      }}
                      className="mt-2 w-full text-center text-amber-400 hover:text-amber-300 text-xs font-mono font-bold py-2 border border-dashed border-zinc-800 rounded bg-zinc-900/10 hover:bg-zinc-900/40 cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Plus className="w-4 h-4 text-amber-500" />
                      <span>+ ΠΡΟΣΘΗΚΗ ΠΑΓΙΟΥ ΕΞΟΔΟΥ</span>
                    </button>
                  )}

                  <div className="pt-2 flex justify-between items-center font-mono font-bold text-sm text-zinc-100 px-2.5">
                    <span>ΣΥΝΟΛΙΚΑ ΠΑΓΙΑ ΜΗΝΙΑΙΑ ΕΞΟΔΑ:</span>
                    <span className="text-zinc-100">{formatEuro(totalMonthlyFixedExpenses)}</span>
                  </div>
                </div>
              </div>

              {/* Ultimate Combined Interactive Financial Dashboard */}
              <div className="bg-[#121614] border border-emerald-900/40 rounded-xl p-5 space-y-4">
                <h4 className="font-display font-bold text-lg text-emerald-400 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  <span>Συνοπτικός Υβριδικός Χρηματοοικονομικός Πίνακας</span>
                </h4>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-center text-xs font-mono">
                  <div className="p-3 bg-[#111914] border border-emerald-900/30 rounded-lg">
                    <span className="text-[10px] text-zinc-550 block">ΕΣΟΔΑ SPECIALTY COFFEE</span>
                    <span className="text-zinc-200 mt-1 block font-bold text-sm">{formatEuro(monthlyCoffeeSalesRevenue)}</span>
                  </div>
                  <div className="p-3 bg-[#111914] border border-emerald-900/30 rounded-lg">
                    <span className="text-[10px] text-zinc-555 block">ΕΣΟΔΑ ΕΞΤΡΑ ΥΠΗΡΕΣΙΩΝ</span>
                    <span className="text-zinc-200 mt-1 block font-bold text-sm">{formatEuro(monthlyExtraRevenue)}</span>
                  </div>
                  <div className="p-3 bg-[#111914] border border-emerald-900/30 rounded-lg">
                    <span className="text-[10px] text-zinc-550 block">ΚΟΣΤΟΣ coffee COGS</span>
                    <span className="text-rose-450 mt-1 block font-bold text-sm">-{formatEuro(monthlyCoffeeCostOfGoodsSold)}</span>
                  </div>
                  <div className="p-3 bg-[#111914] border border-emerald-900/40 rounded-lg">
                    <span className="text-[10px] text-zinc-550 block">ΣΥΝΟΛΙΚΟ ΚΑΘΑΡΟ ΚΕΡΔΟΣ</span>
                    <span className={`mt-1 block font-bold text-sm ${netMonthlyProfitPreTax >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {formatEuro(netMonthlyProfitPreTax)} <span className="text-[9px] text-zinc-550 font-normal font-sans">/μήνα</span>
                    </span>
                  </div>
                </div>

                {/* Break-even point stats summary block */}
                <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-850 space-y-2 text-xs leading-relaxed">
                  <span className="font-mono text-zinc-200 font-bold block uppercase">Ανάλυση Νεκρού Σημείου (Break-Even Analysis)</span>
                  <p className="text-zinc-400 font-sans">
                    Με βάση τις τρέχουσες τιμές προϊόντων και τα σταθερά πάγια έξοδα (<strong>{formatEuro(totalMonthlyFixedExpenses)}</strong>), η επιχείρηση απαιτεί μηνιαίο τζίρο <strong>{formatEuro(monthlyBreakEvenInEuro)}</strong> για να καλύψει πλήρως τα κόστη της. 
                    Αυτό αντιστοιχεί σε ημερήσιο τζίρο <strong>{formatEuro(dailyBreakEvenInEuro)}</strong>.
                  </p>
                  <p className="text-[#a1a1aa] font-mono text-[11px] mt-1 text-emerald-400">
                    * Οποιαδήποτε πώληση πέραν του Break-Even συνεισφέρει κατά {contributionsMarginRatioFormatted()}% (περιθώριο) απευθείας στο καθαρό κέρδος προ φόρων της επιχείρησης.
                  </p>
                </div>

                {/* THE AI COMMENTARY SECTION */}
                <div className="mt-4 p-5 rounded-xl border border-amber-950/30 bg-gradient-to-br from-[#121410] to-[#161411] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-850 pb-3">
                    <div className="space-y-1">
                      <h5 className="font-display font-black text-sm text-amber-400 flex items-center gap-2 tracking-tight">
                        <Sparkles className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />
                        <span>✨ Ρεαλιστική Επιχειρηματική Ανάλυση AI (Gemini Flash 3.5)</span>
                      </h5>
                      <p className="text-[10px] text-zinc-450 font-sans">
                        Ρεαλιστικές εκτιμήσεις βιωσιμότητας με βάση τα νέα σας δεδομένα εσόδων, εξόδων και στόχων κατανάλωσης
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={generateNewAiCommentary}
                      disabled={aiLoading}
                      className="shrink-0 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-zinc-950 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-950/20 active:scale-95 text-zinc-950"
                    >
                      {aiLoading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                          <span>ΑΝΑΛΥΣΗ ΣΕ ΕΞΕΛΙΞΗ...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
                          <span>✨ ΑΝΑΝΕΩΣΗ ΑΝΑΛΥΣΗΣ AI</span>
                        </>
                      )}
                    </button>
                  </div>

                  {isFinancialsDirty && aiCommentary && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-amber-950/35 border border-amber-900/30 text-amber-200 text-[11px] rounded-lg animate-fade-in font-sans">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Τα οικονομικά σας δεδομένα έχουν τροποποιηθεί! Πατήστε «Ανανέωση Ανάλυσης AI» για να επικαιροποιήσετε το σχόλιο.</span>
                    </div>
                  )}

                  <div className="text-zinc-300 space-y-2.5 font-sans leading-relaxed text-xs">
                    {aiCommentary ? (
                      <div className="space-y-4">
                        {renderCommentaryWithStyle(aiCommentary)}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-zinc-550 italic space-y-2 font-sans text-xs">
                        <Activity className="w-8 h-8 text-zinc-700 mx-auto animate-pulse" />
                        <p className="text-zinc-400">Δεν υπάρχει αποθηκευμένη ανάλυση.</p>
                        <p className="text-[10px] text-zinc-650 max-w-sm mx-auto font-normal">
                          Κάντε κλικ στο κουμπί «ΑΝΑΝΕΩΣΗ ΑΝΑΛΥΣΗΣ AI» παραπάνω για να επικοινωνήσετε με το Gemini και να λάβετε πλήρως εξατομικευμένες street-smart συμβουλές.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Extras Revenue Estimation */}
              <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="includeExtras"
                      checked={includeExtraSales}
                      onChange={(e) => setIncludeExtraSales(e.target.checked)}
                      className="accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="includeExtras" className="font-display font-bold text-base text-zinc-150 cursor-pointer">
                      5.9 Συνολικό Έσοδο από Έξτρα Υπηρεσίες & Δράσεις
                    </label>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">Επιπλέον Κανάλια Εσόδων</span>
                </div>

                {includeExtraSales && (
                  <div className="space-y-2">
                    {extraServicesRevenue.map((item: any, index: number) => (
                      <div key={item.id} className="flex items-center justify-between gap-3 text-xs bg-zinc-900/40 p-2.5 rounded border border-zinc-850">
                        <div className="font-sans font-medium text-zinc-200 flex-1">
                          {editMode ? (
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => {
                                const list = [...extraServicesRevenue];
                                list[index] = { ...list[index], name: e.target.value };
                                setExtraServicesRevenue(list);
                              }}
                              className="bg-[#1e2022] border border-zinc-800 text-zinc-150 p-1.5 rounded font-sans text-xs w-full focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                          ) : (
                            item.name
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="font-mono font-bold text-emerald-400">
                            {editMode ? (
                              <input
                                type="number"
                                value={item.estimate}
                                onChange={(e) => {
                                  const list = [...extraServicesRevenue];
                                  list[index] = { ...list[index], estimate: Math.max(0, Number(e.target.value)) };
                                  setExtraServicesRevenue(list);
                                }}
                                className="bg-[#1e2022] border border-zinc-800 text-zinc-150 p-1.5 rounded font-mono text-xs w-20 text-right text-emerald-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                              />
                            ) : (
                              formatEuro(item.estimate)
                            )}
                          </div>
                          {editMode && (
                            <button
                              type="button"
                              onClick={() => {
                                const list = extraServicesRevenue.filter((x: any) => x.id !== item.id);
                                setExtraServicesRevenue(list);
                              }}
                              className="text-rose-500 hover:text-rose-400 p-1.5 rounded bg-rose-950/20 hover:bg-rose-950/50 cursor-pointer transition-colors"
                              title="Διαγραφή έξτρα εσόδου"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {editMode && (
                      <button
                        type="button"
                        onClick={() => {
                          const newId = `extra-${Date.now()}`;
                          setExtraServicesRevenue(prev => [...prev, { id: newId, name: "Νέα Δράση/Έξτρα Υπηρεσία", estimate: 300 }]);
                        }}
                        className="mt-2 w-full text-center text-emerald-400 hover:text-emerald-300 text-xs font-mono font-bold py-2 border border-dashed border-zinc-800 rounded bg-zinc-900/10 hover:bg-zinc-900/40 cursor-pointer flex items-center justify-center gap-1.5 transition-all text-emerald-400"
                      >
                        <Plus className="w-4 h-4 text-emerald-500" />
                        <span>+ ΠΡΟΣΘΗΚΗ ΕΞΤΡΑ ΕΣΟΔΟΥ/ΥΠΗΡΕΣΙΑΣ</span>
                      </button>
                    )}

                    <div className="pt-2 flex justify-between items-center font-mono font-bold text-sm text-zinc-100 px-2.5">
                      <span>ΣΥΝΟΛΙΚΑ ΕΞΤΡΑ ΕΣΟΔΑ ΜΗΝΙΑΙΩΣ:</span>
                      <span className="text-emerald-400">{formatEuro(monthlyExtraRevenue)}</span>
                    </div>
                  </div>
                )}
              </div>



            </div>
          )}

          {/* STOCK AND DAILY ORDER RECOMMENDATIONS CHAPTER */}
          {activeTab === "stock-orders" && (
            <div className="space-y-6 animate-fade-in">
              {/* Header card */}
              <div className="border-b border-zinc-800 pb-4 flex flex-col gap-2">
                <span className="text-xs font-mono text-amber-400 tracking-widest uppercase font-bold flex items-center gap-1.5">
                  <Package className="w-4 h-4" />
                  <span>ΚΕΦΑΛΑΙΟ 9</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#ffd700] tracking-tight">
                  Στοκ & Ημερήσιες Παραγγελίες
                </h3>
                <p className="text-xs text-zinc-400">
                  Δυναμικός Υπολογιστής & Σύστημα Παραγγελιών. Διατηρήστε το ιδανικό απόθεμα specialty καφέ και σνακ με βάση την καθημερινή κατανάλωση.
                </p>
              </div>

              {/* QUICK STATISTICS & CALCULATOR SUMMARY CARD */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Total order items */}
                <div className="p-4 bg-zinc-950/40 border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-zinc-550 block">ΣΥΝΟΛΟ ΠΡΟΪΟΝΤΩΝ ΓΙΑ ΠΑΡΑΓΓΕΛΙΑ</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-amber-500">
                      {stockProducts.filter((p: any) => {
                        const needed = (p.customNeededStock !== undefined && p.customNeededStock !== "" && p.customNeededStock !== null) ? Number(p.customNeededStock) : (p.dailySales * p.daysToCover);
                        const toOrder = Math.max(0, needed - p.currentStock);
                        return toOrder > 0;
                      }).length}
                    </span>
                    <span className="text-xs text-zinc-400">είδη</span>
                  </div>
                </div>

                {/* Total Cost of Order */}
                <div className="p-4 bg-zinc-950/40 border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-zinc-550 block">ΣΥΝΟΛΙΚΟ ΚΟΣΤΟΣ ΠΑΡΑΓΓΕΛΙΑΣ</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-emerald-400">
                      €{stockProducts.reduce((sum: number, p: any) => {
                        const needed = (p.customNeededStock !== undefined && p.customNeededStock !== "" && p.customNeededStock !== null) ? Number(p.customNeededStock) : (p.dailySales * p.daysToCover);
                        const toOrder = Math.max(0, needed - p.currentStock);
                        return sum + (toOrder * p.costPerUnit);
                      }, 0).toFixed(2)}
                    </span>
                    <span className="text-xs text-zinc-400">προ φόρων</span>
                  </div>
                </div>

                {/* Top Category To Order */}
                <div className="p-4 bg-zinc-950/40 border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-zinc-550 block">ΚΑΤΗΓΟΡΙΑ ΜΕ ΜΕΓΑΛΥΤΕΡΟ ΚΟΣΤΟΣ</span>
                  <div className="text-sm font-bold text-zinc-200 truncate mt-1">
                    {(() => {
                      const costs: Record<string, number> = {};
                      stockProducts.forEach((p: any) => {
                        const needed = (p.customNeededStock !== undefined && p.customNeededStock !== "" && p.customNeededStock !== null) ? Number(p.customNeededStock) : (p.dailySales * p.daysToCover);
                        const toOrder = Math.max(0, needed - p.currentStock);
                        const cost = toOrder * p.costPerUnit;
                        costs[p.category] = (costs[p.category] || 0) + cost;
                      });
                      let maxCat = "-";
                      let maxCost = 0;
                      Object.entries(costs).forEach(([cat, val]) => {
                        if (val > maxCost) {
                          maxCost = val;
                          maxCat = cat;
                        }
                      });
                      const label = productCategories.find((c: any) => c.id === maxCat)?.label || maxCat;
                      return maxCost > 0 ? `${label} (€${maxCost.toFixed(1)})` : "Όλα πλήρη!";
                    })()}
                  </div>
                </div>
              </div>

              {/* TABS INTERACTION INSIDE CHAPTER */}
              <div className="bg-[#141618] border border-zinc-800 rounded-xl p-6 space-y-6">
                
                {/* Product Categories Manager Panel */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                    <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                      <span>ΚΑΤΗΓΟΡΙΕΣ ΠΡΟΪΟΝΤΩΝ ({productCategories.length})</span>
                    </h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 items-center">
                    {productCategories.map((cat: any) => (
                      <div key={cat.id} className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 pl-2.5 pr-1.5 py-1 rounded-lg text-xs">
                        {editMode ? (
                          <input
                            type="text"
                            value={cat.label}
                            onChange={(e) => {
                              const list = [...productCategories];
                              const idx = list.findIndex((c: any) => c.id === cat.id);
                              if (idx !== -1) {
                                list[idx].label = e.target.value;
                                setProductCategories(list);
                              }
                            }}
                            className="bg-[#1e2022] text-zinc-200 border-none p-0.5 focus:ring-0 focus:outline-none w-24 font-semibold rounded text-xs"
                          />
                        ) : (
                          <span className="text-zinc-350 font-semibold">{cat.label}</span>
                        )}
                        
                        {editMode && (
                          <button
                            type="button"
                            onClick={() => {
                              if (productCategories.length > 1) {
                                setProductCategories(productCategories.filter((c: any) => c.id !== cat.id));
                              }
                            }}
                            className="text-rose-500 hover:text-rose-450 p-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    {editMode && (
                      <button
                        type="button"
                        onClick={() => {
                          const newId = `cat-${Date.now()}`;
                          setProductCategories([...productCategories, { id: newId, label: "Νέα Κατηγορία" }]);
                        }}
                        className="text-xs font-mono text-[#ffd700] hover:text-[#ffe066] flex items-center gap-1 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg active:scale-95 transition-all cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>ΝΕΑ ΚΑΤΗΓΟΡΙΑ</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* MAIN STOCK AND ORDER RECOMMENDATION LIST */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-850">
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-amber-500" />
                        <span>Υπολογισμός Παραγγελίας & Διαχείριση Στοκ</span>
                      </h4>
                      <p className="text-xs text-zinc-500">
                        Προσαρμόστε τις τιμές για να διαμορφώσετε την ημερήσια παραγγελία. Η προτεινόμενη ποσότητα υπολογίζεται αυτόματα.
                      </p>
                    </div>
                    
                    {/* Add products bar */}
                    {editMode && (
                      <button
                        type="button"
                        onClick={() => {
                          const newId = `stock-${Date.now()}`;
                          const newP = {
                            id: newId,
                            name: "Νέο Προϊόν",
                            category: productCategories[0]?.id || "coffee",
                            unit: "kg",
                            currentStock: 0,
                            dailySales: 0,
                            daysToCover: 3,
                            costPerUnit: 1.00
                          };
                          setStockProducts([...stockProducts, newP]);
                        }}
                        className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 px-3.5 py-1.5 bg-zinc-900 border border-[#10b981]/50 rounded-lg active:scale-95 transition-all self-start cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ ΠΡΟΣΘΗΚΗ ΠΡΟΪΟΝΤΟΣ</span>
                      </button>
                    )}
                  </div>

                  {/* Responsive grid table of stock products */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-zinc-800 text-zinc-400 font-mono text-[10px] uppercase">
                          <th className="py-2.5 px-2">Προϊόν</th>
                          <th className="py-2.5 px-2">Κατηγορία</th>
                          <th className="py-2.5 px-2 text-center">Μον. Μέτρησης</th>
                          <th className="py-2.5 px-2 text-right">Τρέχον Στοκ</th>
                          <th className="py-2.5 px-2 text-right">Ημερ. Πωλήσεις</th>
                          <th className="py-2.5 px-2 text-right">Ημέρες Κάλυψης</th>
                          <th className="py-2.5 px-2 text-right text-emerald-550 font-bold">Κόστος Μονάδας</th>
                          <th className="py-2.5 px-2 text-right">Απαιτούμενο Στοκ</th>
                          <th className="py-2.5 px-2 text-right text-amber-500 font-bold">Προτ. Παραγγελία</th>
                          <th className="py-2.5 px-2 text-right text-emerald-450 font-bold">Κόστος Παραγγελίας</th>
                          {editMode && <th className="py-2.5 px-2 text-center"></th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900">
                        {stockProducts.map((p: any) => {
                          const needed = (p.customNeededStock !== undefined && p.customNeededStock !== "" && p.customNeededStock !== null) ? Number(p.customNeededStock) : (p.dailySales * p.daysToCover);
                          const toOrder = Math.max(0, needed - p.currentStock);
                          const orderCost = toOrder * p.costPerUnit;
                          
                          return (
                            <tr key={p.id} className="hover:bg-zinc-950/20 group/row transition-colors">
                              {/* Product Name */}
                              <td className="py-3 px-2 font-semibold text-zinc-200">
                                {editMode ? (
                                  <input
                                    type="text"
                                    value={p.name}
                                    onChange={(e) => {
                                      const list = [...stockProducts];
                                      const idx = list.findIndex((item: any) => item.id === p.id);
                                      if (idx !== -1) {
                                        list[idx].name = e.target.value;
                                        setStockProducts(list);
                                      }
                                    }}
                                    className="bg-[#1e2022] text-zinc-200 border border-zinc-800 rounded px-1.5 py-1 w-full focus:outline-none focus:border-amber-500 text-xs font-semibold"
                                  />
                                ) : (
                                  <span>{p.name}</span>
                                )}
                              </td>

                              {/* Category selection */}
                              <td className="py-3 px-2">
                                {editMode ? (
                                  <select
                                    value={p.category}
                                    onChange={(e) => {
                                      const list = [...stockProducts];
                                      const idx = list.findIndex((item: any) => item.id === p.id);
                                      if (idx !== -1) {
                                        list[idx].category = e.target.value;
                                        setStockProducts(list);
                                      }
                                    }}
                                    className="bg-[#1e2022] text-zinc-300 border border-zinc-800 rounded px-1 py-1 focus:outline-none text-xs w-full"
                                  >
                                    {productCategories.map((cat: any) => (
                                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                                    ))}
                                    <option value="other">Λοιπά / Αναλώσιμα</option>
                                  </select>
                                ) : (
                                  <span className="px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded">
                                    {productCategories.find((cat: any) => cat.id === p.category)?.label || p.category}
                                  </span>
                                )}
                              </td>

                              {/* Unit of measurement */}
                              <td className="py-3 px-2 text-center font-mono">
                                {editMode ? (
                                  <select
                                    value={p.unit}
                                    onChange={(e) => {
                                      const list = [...stockProducts];
                                      const idx = list.findIndex((item: any) => item.id === p.id);
                                      if (idx !== -1) {
                                        list[idx].unit = e.target.value;
                                        setStockProducts(list);
                                      }
                                    }}
                                    className="bg-[#1e2022] text-zinc-300 border border-zinc-805 rounded px-1 py-1 focus:outline-none text-xs"
                                  >
                                    <option value="kg">kg (κιλό)</option>
                                    <option value="λίτρο">λίτρο (L)</option>
                                    <option value="τεμάχιο">τεμάχιο</option>
                                    <option value="κιβώτιο">κιβώτιο</option>
                                  </select>
                                ) : (
                                  <span>{p.unit}</span>
                                )}
                              </td>

                              {/* Current Stock */}
                              <td className="py-3 px-2 text-right">
                                {editMode ? (
                                  <input
                                    type="number"
                                    step="0.1"
                                    value={p.currentStock}
                                    onChange={(e) => {
                                      const list = [...stockProducts];
                                      const idx = list.findIndex((item: any) => item.id === p.id);
                                      if (idx !== -1) {
                                        list[idx].currentStock = Number(e.target.value);
                                        setStockProducts(list);
                                      }
                                    }}
                                    className="bg-[#1e2022] text-right text-zinc-200 border border-zinc-800 rounded px-1 py-1 w-16 focus:outline-none focus:border-amber-500 font-mono text-xs"
                                  />
                                ) : (
                                  <span className="font-mono font-bold text-zinc-200">{p.currentStock}</span>
                                )}
                              </td>

                              {/* Daily sales */}
                              <td className="py-3 px-2 text-right">
                                {editMode ? (
                                  <input
                                    type="number"
                                    step="0.1"
                                    value={p.dailySales}
                                    onChange={(e) => {
                                      const list = [...stockProducts];
                                      const idx = list.findIndex((item: any) => item.id === p.id);
                                      if (idx !== -1) {
                                        list[idx].dailySales = Number(e.target.value);
                                        setStockProducts(list);
                                      }
                                    }}
                                    className="bg-[#1e2022] text-right text-zinc-200 border border-zinc-800 rounded px-1 py-1 w-16 focus:outline-none focus:border-amber-500 font-mono text-xs"
                                  />
                                ) : (
                                  <span className="font-mono text-zinc-300">{p.dailySales}</span>
                                )}
                              </td>

                              {/* Days to cover */}
                              <td className="py-3 px-2 text-right">
                                {editMode ? (
                                  <input
                                    type="number"
                                    value={p.daysToCover}
                                    onChange={(e) => {
                                      const list = [...stockProducts];
                                      const idx = list.findIndex((item: any) => item.id === p.id);
                                      if (idx !== -1) {
                                        list[idx].daysToCover = Number(e.target.value);
                                        setStockProducts(list);
                                      }
                                    }}
                                    className="bg-[#1e2022] text-right text-zinc-200 border border-zinc-800 rounded px-1 py-1 w-12 focus:outline-none focus:border-amber-500 font-mono text-xs"
                                  />
                                ) : (
                                  <span className="font-mono text-zinc-400">{p.daysToCover} d</span>
                                )}
                              </td>

                              {/* Cost per unit */}
                              <td className="py-3 px-2 text-right text-emerald-400 font-mono font-semibold">
                                {editMode ? (
                                  <input
                                    type="number"
                                    step="0.01"
                                    value={p.costPerUnit}
                                    onChange={(e) => {
                                      const list = [...stockProducts];
                                      const idx = list.findIndex((item: any) => item.id === p.id);
                                      if (idx !== -1) {
                                        list[idx].costPerUnit = Number(e.target.value);
                                        setStockProducts(list);
                                      }
                                    }}
                                    className="bg-[#1e2022] text-right text-emerald-400 border border-zinc-800 rounded px-1 py-1 w-16 focus:outline-none focus:border-emerald-500 font-mono text-xs font-semibold"
                                  />
                                ) : (
                                  <span>€{p.costPerUnit.toFixed(2)}</span>
                                )}
                              </td>

                              {/* Needed Stock */}
                              <td className="py-3 px-2 text-right font-mono text-zinc-400">
                                {editMode ? (
                                  <div className="flex items-center justify-end gap-1.5">
                                    <input
                                      type="number"
                                      step="0.1"
                                      placeholder={`${(p.dailySales * p.daysToCover).toFixed(1)}`}
                                      value={p.customNeededStock !== undefined && p.customNeededStock !== null ? p.customNeededStock : ""}
                                      onChange={(e) => {
                                        const list = [...stockProducts];
                                        const idx = list.findIndex((item: any) => item.id === p.id);
                                        if (idx !== -1) {
                                          const val = e.target.value;
                                          list[idx].customNeededStock = val === "" ? undefined : Number(val);
                                          setStockProducts(list);
                                        }
                                      }}
                                      className="bg-[#1e2022] text-right text-zinc-200 border border-zinc-800 rounded px-1.5 py-1 w-16 focus:outline-none focus:border-amber-500 font-mono text-xs"
                                      title="Εισάγετε προσαρμοσμένο απαιτούμενο στοκ ή αφήστε κενό για αυτόματο υπολογισμό"
                                    />
                                    <span className="text-[10px] text-zinc-500">{p.unit}</span>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-end">
                                    <span>{needed.toFixed(1)} {p.unit}</span>
                                    {p.customNeededStock !== undefined && p.customNeededStock !== null && (
                                      <span className="text-[9px] text-amber-400 block leading-none font-sans mt-0.5 font-semibold">(μη αυτόματο)</span>
                                    )}
                                  </div>
                                )}
                              </td>

                              {/* Order quantity */}
                              <td className="py-3 px-2 text-right font-mono text-sm">
                                {toOrder > 0 ? (
                                  <span className="text-amber-400 font-extrabold">
                                    {toOrder.toFixed(1)} <span className="text-[10px] text-zinc-500 normal-case">{p.unit}</span>
                                  </span>
                                ) : (
                                  <span className="text-zinc-650 italic">Πλήρες</span>
                                )}
                              </td>

                              {/* Order cost */}
                              <td className="py-3 px-2 text-right font-mono text-sm font-bold text-zinc-200">
                                {orderCost > 0 ? (
                                  <span className="text-emerald-400">€{orderCost.toFixed(2)}</span>
                                ) : (
                                  <span className="text-zinc-700">-</span>
                                )}
                              </td>

                              {/* Delete button */}
                              {editMode ? (
                                <td className="py-3 px-2 text-center">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (stockProducts.length > 1) {
                                        setStockProducts(stockProducts.filter((item: any) => item.id !== p.id));
                                      }
                                    }}
                                    className="text-rose-500 hover:text-rose-450 p-0.5 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              ) : (
                                <td className="p-0"></td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* THE FINAL RECOMMENDED ACTIVE PURCHASE ORDER CHECKLIST */}
                <div className="bg-[#181a1d] border border-zinc-850 p-5 rounded-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-zinc-800">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-150 flex items-center gap-1.5">
                        <ClipboardCheck className="w-4.5 h-4.5 text-emerald-400" />
                        <span>Λίστα Ελέγχου Παραγγελίας προς Υλοποίηση</span>
                      </h4>
                      <p className="text-xs text-zinc-500">
                        Τα προϊόντα που βρίσκονται κάτω από το όριο ασφαλείας. Εκτυπώστε ή σημειώστε καθώς ολοκληρώνετε.
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-zinc-400">Συνολικό Κόστος:</span>
                      <span className="text-lg font-bold font-mono text-emerald-400 bg-zinc-950 px-3 py-1 rounded-lg border border-zinc-800">
                        €{stockProducts.reduce((sum: number, p: any) => {
                          const needed = p.dailySales * p.daysToCover;
                          const toOrder = Math.max(0, needed - p.currentStock);
                          return sum + (toOrder * p.costPerUnit);
                        }, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {stockProducts.filter((p: any) => {
                      const needed = p.dailySales * p.daysToCover;
                      return Math.max(0, needed - p.currentStock) > 0;
                    }).map((p: any) => {
                      const needed = p.dailySales * p.daysToCover;
                      const toOrder = Math.max(0, needed - p.currentStock);
                      const cost = toOrder * p.costPerUnit;
                      
                      return (
                        <div key={p.id} className="flex items-center justify-between p-3 bg-zinc-950/50 border border-zinc-850 rounded-lg">
                          <div className="flex items-center gap-3">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 rounded border-zinc-800 text-emerald-500 bg-zinc-900 focus:ring-emerald-500/30"
                            />
                            <div>
                              <span className="text-xs font-bold text-zinc-200 block">{p.name}</span>
                              <span className="text-[10px] font-mono text-zinc-500">
                                {productCategories.find((c: any) => c.id === p.category)?.label || p.category}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-xs font-mono font-bold text-amber-500 block">
                              {toOrder.toFixed(1)} {p.unit}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 block font-semibold">
                              €{cost.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {stockProducts.filter((p: any) => {
                      const needed = p.dailySales * p.daysToCover;
                      return Math.max(0, needed - p.currentStock) > 0;
                    }).length === 0 && (
                      <div className="md:col-span-2 py-8 text-center text-zinc-500 italic text-xs">
                        🎉 Όλα τα προϊόντα έχουν επαρκές απόθεμα! Δεν απαιτείται καμία παραγγελία σήμερα.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* CHAPTER 10: BRAND IDENTITY & VISUAL STUDIO (GALLERY + STREET ART SYSTEM) */}
          {activeTab === "brand-identity" && (
            <div className="space-y-6">
              
              {/* Heading */}
              <div className="border-b border-zinc-800 pb-4 flex flex-col gap-2">
                <span className="text-xs font-mono tracking-widest uppercase text-pink-400">ΚΕΦΑΛΑΙΟ 10 • MULTI-HUB BRAND STUDIO</span>
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-zinc-100 tracking-tight">
                    Ταυτότητα, Αισθητική & Visual Design
                  </h3>
                </div>
                <p className="text-zinc-400 font-medium text-xs sm:text-sm">
                  Σχεδιασμός και προσαρμογή του visual design της γκαλερί και του underground skate-caf&eacute;. Επιλέξτε αισθητική, χρώματα, γραμματοσειρές και υφές για να διαμορφώσετε τον χαρακτήρα ολόκληρης της εφαρμογής και του φυσικού καταστήματος.
                </p>
              </div>

              {/* Grid: Left controls, Right preview mockups */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                
                {/* 1. Left controls column (6 cols) */}
                <div className="xl:col-span-6 space-y-6">
                  
                  {/* Preset Gallery Modes */}
                  <div className="bg-zinc-900/40 border border-zinc-850 rounded-xl p-5 space-y-3">
                    <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Ετοιμα Gallery Presets (Aesthetic Modes)</span>
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">

                      {/* Minimalist Pastel Mural (TRUST) */}
                      <button 
                        type="button"
                        onClick={() => applyPreset("minimal-pastel-mural")}
                        className={`text-left p-4 rounded border transition-all cursor-pointer flex flex-col justify-between sm:col-span-2 ${
                          visualSystem.mode === "minimal-pastel-mural"
                            ? "bg-zinc-950 border-orange-400 shadow-md shadow-orange-400/10"
                            : "bg-zinc-950/40 border-zinc-850 hover:border-zinc-750"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white font-display flex items-center gap-2">
                              <span>🎨 Minimalist Pastel Mural (TRUST • Νέο!)</span>
                              <span className="text-[8px] bg-[#a0d3f2] text-zinc-950 px-1.5 py-0.5 rounded font-mono uppercase font-bold">DEFAULT AESTHETIC</span>
                            </span>
                            <div className="flex gap-1">
                              <div className="w-2.5 h-2.5 rounded bg-[#fca890]"></div>
                              <div className="w-2.5 h-2.5 rounded bg-[#a0d3f2]"></div>
                              <div className="w-2.5 h-2.5 rounded bg-[#f7dd9d]"></div>
                            </div>
                          </div>
                          <p className="text-[10px] text-zinc-400 mt-1.5 leading-normal">
                            Λευκό-μπεζ φόντο με γεωμετρικά σχήματα, τέσσερα-άκρα αστέρια, απαλά παστέλ χρώματα (ροδακινί, γαλάζιο, κίτρινο) &amp; απόλυτα μίνιμαλ αισθητική βασισμένη στο TRUST Mural του Thess Cult Hub.
                          </p>
                        </div>
                        <span className="text-[9px] font-mono mt-3 text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 self-start">
                          {visualSystem.mode === "minimal-pastel-mural" ? "Ενεργό" : "Επιλογή"}
                        </span>
                      </button>
                      
                      {/* Black */}
                      <button 
                        type="button"
                        onClick={() => applyPreset("underground-black")}
                        className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                          visualSystem.mode === "underground-black"
                            ? "bg-zinc-950 border-amber-500 shadow-md shadow-amber-500/10"
                            : "bg-zinc-950/40 border-zinc-850 hover:border-zinc-750"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white font-display">Underground Black</span>
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                          </div>
                          <p className="text-[10px] text-zinc-500 mt-1.5 leading-normal">
                            Σκοτεινή street art σήμανση, κίτρινα σπρέι, έντονα γκράφιτι &amp; skate punk αισθητική.
                          </p>
                        </div>
                        <span className="text-[9px] font-mono mt-3 text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 self-start">
                          {visualSystem.mode === "underground-black" ? "Ενεργό" : "Επιλογή"}
                        </span>
                      </button>

                      {/* White */}
                      <button 
                        type="button"
                        onClick={() => applyPreset("gallery-white")}
                        className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                          visualSystem.mode === "gallery-white"
                            ? "bg-zinc-950 border-zinc-900 shadow-md"
                            : "bg-zinc-950/40 border-zinc-850 hover:border-zinc-750"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white font-display">Exhibition White</span>
                            <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-white"></div>
                          </div>
                          <p className="text-[10px] text-zinc-500 mt-1.5 leading-normal">
                            Καθαρή γκαλερί τέχνης. Minimal λευκό με μαύρες λεπτομέρειες, serif Display &amp; κομψότητα.
                          </p>
                        </div>
                        <span className="text-[9px] font-mono mt-3 text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 self-start">
                          {visualSystem.mode === "gallery-white" ? "Ενεργό" : "Επιλογή"}
                        </span>
                      </button>

                      {/* Concrete */}
                      <button 
                        type="button"
                        onClick={() => applyPreset("industrial-concrete")}
                        className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                          visualSystem.mode === "industrial-concrete"
                            ? "bg-zinc-950 border-emerald-500 shadow-md shadow-emerald-500/10"
                            : "bg-zinc-950/40 border-zinc-850 hover:border-zinc-750"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white font-display">Concrete Loft</span>
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                          </div>
                          <p className="text-[10px] text-zinc-500 mt-1.5 leading-normal">
                            Βιομηχανικός χώρος με οπλισμένο μπετόν, acid-green highlights και monospace γραμματοσειρές.
                          </p>
                        </div>
                        <span className="text-[9px] font-mono mt-3 text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 self-start">
                          {visualSystem.mode === "industrial-concrete" ? "Ενεργό" : "Επιλογή"}
                        </span>
                      </button>

                      {/* Cardboard */}
                      <button 
                        type="button"
                        onClick={() => applyPreset("kraft-cardboard")}
                        className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                          visualSystem.mode === "kraft-cardboard"
                            ? "bg-zinc-950 border-rose-500 shadow-md shadow-rose-500/10"
                            : "bg-zinc-950/40 border-zinc-850 hover:border-zinc-750"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white font-display">Recycled Cardboard</span>
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                          </div>
                          <p className="text-[10px] text-zinc-500 mt-1.5 leading-normal">
                            Χειροποίητο studio με αίσθηση ανακυκλωμένου χαρτιού, punk crimson σταξίματα &amp; Oswald headers.
                          </p>
                        </div>
                        <span className="text-[9px] font-mono mt-3 text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 self-start">
                          {visualSystem.mode === "kraft-cardboard" ? "Ενεργό" : "Επιλογή"}
                        </span>
                      </button>

                    </div>
                  </div>

                  {/* Manual Fine Customizers */}
                  <div className="bg-zinc-900/40 border border-zinc-850 rounded-xl p-5 space-y-5">
                    <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Χειροκίνητη Παραμετροποίηση Visuals</span>
                    </h4>

                    {/* Color Picker */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-300 block">Χρώμα Έμφασης (Primary Accent Color)</label>
                      <span className="text-[10px] text-zinc-500 block">
                        Χρησιμοποιείται σε κουμπιά, highlights, ενεργά tabs και σήμανση.
                      </span>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        {/* Preset color bubbles */}
                        {[
                          { val: "#ef876b", label: "Pastel Coral" },
                          { val: "#a0d3f2", label: "Pastel Blue" },
                          { val: "#fca890", label: "Pastel Pink" },
                          { val: "#f7dd9d", label: "Pastel Yellow" },
                          { val: "#d1ebd8", label: "Pastel Green" },
                          { val: "#1a1d1e", label: "Midnight Ink" }
                        ].map(col => (
                          <button 
                            key={col.val}
                            type="button"
                            onClick={() => setVisualSystem({ ...visualSystem, primaryColor: col.val })}
                            className="w-7 h-7 rounded-full border border-zinc-700 relative cursor-pointer"
                            style={{ backgroundColor: col.val }}
                            title={col.label}
                          >
                            {visualSystem.primaryColor === col.val && (
                              <span className="absolute inset-0 flex items-center justify-center text-zinc-950 text-xs font-extrabold shadow-sm bg-white/40 rounded-full">✓</span>
                            )}
                          </button>
                        ))}
                        {/* Custom Hex input */}
                        <div className="flex items-center gap-2 ml-auto">
                          <input 
                            type="color" 
                            value={visualSystem.primaryColor}
                            onChange={(e) => setVisualSystem({ ...visualSystem, primaryColor: e.target.value })}
                            className="w-8 h-8 rounded border border-zinc-700 bg-transparent cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={visualSystem.primaryColor.toUpperCase()}
                            onChange={(e) => setVisualSystem({ ...visualSystem, primaryColor: e.target.value })}
                            className="bg-zinc-950 text-zinc-200 font-mono text-xs p-1.5 rounded border border-zinc-800 w-20 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Font Pickers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-300 block">Γραμματοσειρά Τίτλων</label>
                        <select
                          value={visualSystem.displayFont}
                          onChange={(e) => setVisualSystem({ ...visualSystem, displayFont: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                        >
                          <option value="Space Grotesk">Space Grotesk (Techno Modern)</option>
                          <option value="Syne">Syne (Chunky Street Art)</option>
                          <option value="Playfair Display">Playfair Display (Gallery Serif)</option>
                          <option value="Oswald">Oswald (Raw Poster Bold)</option>
                          <option value="Unbounded">Unbounded (Maximum Impact)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-300 block">Γραμματοσειρά Κειμένων</label>
                        <select
                          value={visualSystem.bodyFont}
                          onChange={(e) => setVisualSystem({ ...visualSystem, bodyFont: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                        >
                          <option value="Inter">Inter (Minimalist Clean)</option>
                          <option value="JetBrains Mono">JetBrains Mono (Technical Outline)</option>
                        </select>
                      </div>
                    </div>

                    {/* Corners Option */}
                    <div className="space-y-2 pt-1 border-t border-zinc-850/60">
                      <label className="text-xs font-bold text-zinc-300 block">Γωνίες Στοιχείων (Border Radius)</label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => setVisualSystem({ ...visualSystem, corners: "sharp" })}
                          className={`p-2 rounded text-xs font-semibold cursor-pointer transition text-center ${
                            (visualSystem.corners === "sharp" || !visualSystem.corners)
                              ? "bg-zinc-800 text-white border border-red-500"
                              : "bg-zinc-950/60 text-zinc-400 border border-zinc-850 hover:bg-zinc-900"
                          }`}
                        >
                          📐 Sharp / Αιχμηρές (Γωνίες 0px)
                        </button>
                        <button
                          type="button"
                          onClick={() => setVisualSystem({ ...visualSystem, corners: "rounded" })}
                          className={`p-2 rounded text-xs font-semibold cursor-pointer transition text-center ${
                            visualSystem.corners === "rounded"
                              ? "bg-zinc-800 text-white border border-red-500"
                              : "bg-zinc-950/60 text-zinc-400 border border-zinc-850 hover:bg-zinc-900"
                          }`}
                        >
                          ⭕ Rounded / Στρογγυλεμένες
                        </button>
                      </div>
                    </div>



                    {/* Textures and backgrounds */}
                    <div className="space-y-3 pt-2">
                      <label className="text-xs font-bold text-zinc-300 block">Υφή Επιφάνειας (Surface Texture)</label>
                      <div className="grid grid-cols-5 gap-2">
                        {[
                          { id: "none", label: "Καμία" },
                          { id: "canvas", label: "Linen" },
                          { id: "concrete", label: "Concrete" },
                          { id: "noise", label: "Noise" },
                          { id: "grunge", label: "Grunge" }
                        ].map(tex => (
                          <button
                            key={tex.id}
                            type="button"
                            onClick={() => setVisualSystem({ ...visualSystem, textureType: tex.id })}
                            className={`p-1.5 rounded text-[11px] font-sans font-semibold transition cursor-pointer text-center ${
                              visualSystem.textureType === tex.id
                                ? "bg-zinc-800 text-white border border-amber-500"
                                : "bg-zinc-950/60 text-zinc-400 border border-zinc-850 hover:bg-zinc-900"
                            }`}
                          >
                            {tex.label}
                          </button>
                        ))}
                      </div>

                      {/* Opacity slider */}
                      {visualSystem.textureType !== "none" && (
                        <div className="space-y-1 pt-1.5">
                          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                            <span>Διαφάνεια Υφής (Blend Opacity)</span>
                            <span>{Math.round(visualSystem.textureOpacity * 100)}%</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="0.5" 
                            step="0.01"
                            value={visualSystem.textureOpacity}
                            onChange={(e) => setVisualSystem({ ...visualSystem, textureOpacity: Number(e.target.value) })}
                            className="w-full accent-amber-500 cursor-pointer"
                          />
                        </div>
                      )}
                    </div>

                    {/* Street Art Decals Switcher */}
                    <div className="space-y-2 pt-2">
                      <label className="text-xs font-bold text-zinc-300 block">Σχέδια &amp; Urban Decals (Street Art Elements)</label>
                      <span className="text-[10px] text-zinc-500 block">
                        Επιλέξτε ποια σχέδια σπρέι και skate θα προβάλλονται ambient στο background της εφαρμογής.
                      </span>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {[
                          { id: "spray-splatter", label: "Σπρέι Κηλίδες" },
                          { id: "spray-drips", label: "Σταξίματα Μπογιάς" },
                          { id: "skateboard", label: "Outline Skate Deck" },
                          { id: "drown-crown", label: "Graffiti Crown Tag" }
                        ].map(decal => {
                          const isActive = visualSystem.activeDecals.includes(decal.id);
                          return (
                            <label 
                              key={decal.id} 
                              className={`flex items-center gap-3 p-2.5 rounded-lg border transition cursor-pointer ${
                                isActive 
                                  ? "bg-zinc-950 border-amber-500 text-white" 
                                  : "bg-zinc-950/40 border-zinc-850 text-zinc-400 hover:border-zinc-800"
                              }`}
                            >
                              <input 
                                type="checkbox"
                                checked={isActive}
                                onChange={() => {
                                  if (isActive) {
                                    setVisualSystem({
                                      ...visualSystem,
                                      activeDecals: visualSystem.activeDecals.filter(d => d !== decal.id)
                                    });
                                  } else {
                                    setVisualSystem({
                                      ...visualSystem,
                                      activeDecals: [...visualSystem.activeDecals, decal.id]
                                    });
                                  }
                                }}
                                className="w-4 h-4 rounded border-zinc-800 text-amber-500 bg-zinc-900 focus:ring-amber-500/30 cursor-pointer"
                              />
                              <span className="text-[11px] font-sans font-medium">{decal.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                </div>

                {/* 2. Right Column (Mockups Showcase) (6 cols) */}
                <div className="xl:col-span-6 space-y-6">
                  
                  {/* TITLE OF PREVIEW SCREEN */}
                  <div className="bg-zinc-900/10 border border-zinc-850 rounded-xl p-5 space-y-4">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block border-b border-zinc-850 pb-2">
                      LIVE DISPLAY: GALLERY WALL &amp; BRAND EXAMPLES
                    </span>

                    {/* MOCKUP 1: Exhibition Billboard Poster */}
                    <div className="relative bg-zinc-950 p-6 rounded-lg border border-zinc-800 shadow-xl overflow-hidden flex flex-col justify-between aspect-[3/4] sm:aspect-auto sm:min-h-[420px]">
                      
                      {/* background texture preview */}
                      <div className="absolute inset-0 pointer-events-none opacity-25" style={{
                        mixBlendMode: visualSystem.mode === 'gallery-white' ? 'multiply' : 'screen',
                        backgroundImage: visualSystem.textureType === 'canvas' ? 'url("data:image/svg+xml,%3Csvg width=\'12\' height=\'12\' viewBox=\'0 0 12 12\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h12v12H0V0zm1 1v10h10V1H1z\' fill=\'%23ffffff\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' :
                                         visualSystem.textureType === 'concrete' ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23n)\' opacity=\'0.3\'/%3E%3C/svg%3E")' : 'none'
                      }}></div>

                      {/* Poster Content */}
                      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                        
                        {/* Poster Header */}
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] tracking-widest uppercase text-zinc-500 font-mono block">EXHIBITION 01 • THESSALONIKI</span>
                            <h2 className="text-xl sm:text-2xl font-bold mt-1 font-heading-theme uppercase tracking-tight" style={{ color: visualSystem.primaryColor }}>
                              {execSummary.title || "Thess Cult Hub"}
                            </h2>
                            <p className="text-[10px] text-zinc-400 mt-0.5 tracking-wide font-mono">
                              MULTISPACE OF URBAN CRAFT COFFEE &amp; MODERN STREET ART
                            </p>
                          </div>
                          <span className="text-[10px] font-mono border px-2 py-0.5 rounded text-zinc-500" style={{ borderColor: visualSystem.primaryColor, color: visualSystem.primaryColor }}>
                            GR/2026
                          </span>
                        </div>

                        {/* Mid decorative stencil/sketch */}
                        <div className="my-2 flex justify-center items-center relative h-36 border border-zinc-800/40 rounded-lg bg-zinc-900/10">
                          
                          {/* Inside poster spray artwork */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-30 select-none">
                            <span className="text-6xl font-extrabold uppercase tracking-wide opacity-5 text-center font-heading-theme">
                              CULT
                            </span>
                          </div>

                          <div className="z-10 text-center space-y-1.5 p-4">
                            <span className="text-[9px] font-mono tracking-widest text-zinc-500 block uppercase">CURRENT INSTALLATION</span>
                            <p className="text-xs sm:text-sm italic font-medium leading-relaxed max-w-sm text-zinc-300">
                              &ldquo;{execSummary.slogan || "Εκεί που ο specialty καφές συναντά την υπόγεια τέχνη"}&rdquo;
                            </p>
                            <span className="text-[9px] font-mono text-zinc-500 block">CREATORS: {execSummary.cover.authors}</span>
                          </div>

                          {/* Render tiny decals on the billboard poster */}
                          {visualSystem.activeDecals.includes("spray-splatter") && (
                            <div className="absolute right-2 bottom-2 w-12 h-12 rounded-full opacity-65 flex items-center justify-center text-xs text-pink-400" style={{ color: visualSystem.primaryColor }}>
                              <svg viewBox="0 0 100 100" fill="currentColor" className="w-8 h-8">
                                <circle cx="50" cy="50" r="22" />
                                <circle cx="20" cy="30" r="12" />
                                <circle cx="80" cy="70" r="10" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Poster Footer info panels */}
                        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-850 text-[9px] font-mono">
                          <div>
                            <span className="text-zinc-550 block uppercase">SPACE ZONE</span>
                            <span className="text-zinc-200 block font-bold mt-0.5">EXHIBIT ZONE</span>
                            <span className="text-zinc-400 block truncate">{execSummary.cover.address}</span>
                          </div>
                          <div>
                            <span className="text-zinc-550 block uppercase">VISITING</span>
                            <span className="text-zinc-200 block font-bold mt-0.5">{shopHours}</span>
                            <span className="text-zinc-400 block">7 DAYS OPEN</span>
                          </div>
                          <div>
                            <span className="text-zinc-550 block uppercase">COMMUNITY</span>
                            <span className="text-zinc-200 block font-bold mt-0.5">SKATE-FRIENDLY</span>
                            <span className="text-zinc-400 block">UNDERGROUND</span>
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* MOCKUP 2: Dual Small Mockups: Coffee Cup & Skate Deck */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Interactive Coffee Kraft Cup */}
                      <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-850 flex flex-col justify-between items-center text-center relative overflow-hidden h-64">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block border-b border-zinc-900 pb-1 w-full text-left">
                          Physical: Kraft Specialty Cup
                        </span>

                        {/* Vector graphic of coffee cup */}
                        <div className="relative w-28 h-40 flex flex-col justify-center items-center mt-2">
                          {/* Lid */}
                          <div className="w-20 h-5 bg-zinc-800 rounded-t-lg relative z-20 border-b border-zinc-900 shadow"></div>
                          
                          {/* Cup body */}
                          <div className="w-18 h-32 bg-amber-900/10 rounded-b-xl border border-zinc-700/85 relative z-10 flex flex-col items-center justify-center overflow-hidden" 
                            style={{ 
                              backgroundColor: visualSystem.mode === "gallery-white" ? "#fbfbf9" : "#e1d6c5",
                              borderColor: visualSystem.mode === "gallery-white" ? "#cccccc" : "#bcaf9e"
                            }}
                          >
                            {/* Cup sleeve */}
                            <div className="w-full h-12 my-2 flex items-center justify-center border-y border-zinc-800/20 shadow-sm transition"
                              style={{ 
                                backgroundColor: visualSystem.primaryColor,
                                color: visualSystem.mode === 'gallery-white' || visualSystem.mode === 'kraft-cardboard' ? '#0d0d0f' : '#ffffff' 
                              }}
                            >
                              <span className="text-[8px] font-extrabold uppercase font-heading-theme tracking-wider">
                                CULT HUB
                              </span>
                            </div>

                            {/* Tiny crown stamp on the sleeve */}
                            {visualSystem.activeDecals.includes("drown-crown") && (
                              <span className="block mt-1 font-mono text-[7px]" style={{ color: visualSystem.primaryColor }}>
                                👑 SPECIALTY
                              </span>
                            )}
                          </div>
                          
                          {/* Cup base shadow */}
                          <div className="w-16 h-1 bg-zinc-950 rounded-full blur-xs mt-1"></div>
                        </div>

                        <p className="text-[9px] text-zinc-500 font-sans mt-2">
                          100% Recyclable kraft cups stamped with urban stencils.
                        </p>
                      </div>

                      {/* Interactive Skate Deck on wall */}
                      <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-850 flex flex-col justify-between items-center relative overflow-hidden h-64">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block border-b border-zinc-900 pb-1 w-full">
                          Store Decor: Skateboard Deck
                        </span>

                        {/* Vertical skate deck representation */}
                        <div className="relative flex justify-center items-center h-44 mt-1">
                          
                          {/* Wood shadow */}
                          <div className="absolute w-11 h-40 bg-black/80 rounded-[20px] blur-sm mt-2 ml-1"></div>

                          {/* Deck body */}
                          <div className="w-10 h-38 rounded-[20px] border border-zinc-700 relative z-10 overflow-hidden flex flex-col justify-between p-2 items-center"
                            style={{ 
                              backgroundColor: visualSystem.mode === "gallery-white" ? "#000000" : "#221f1d",
                              backgroundImage: 'linear-gradient(v-to-b, transparent, rgba(235,160,80,0.05))'
                            }}
                          >
                            {/* Trucks bolts top */}
                            <div className="grid grid-cols-2 gap-1 opacity-40">
                              <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                              <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                            </div>

                            {/* Main graphic */}
                            <div className="flex-1 flex flex-col items-center justify-center">
                              {/* Splatter graphic */}
                              <div className="w-6 h-6 rounded-full relative opacity-85 flex items-center justify-center" style={{ backgroundColor: visualSystem.primaryColor }}>
                                <span className="text-[5px] font-extrabold text-zinc-900 font-heading-theme tracking-tighter">SK8</span>
                              </div>
                              <span className="text-[7.5px] font-extrabold rotate-270 uppercase text-zinc-100 mt-2 tracking-widest block font-heading-theme">
                                CULT
                              </span>
                            </div>

                            {/* Trucks bolts bottom */}
                            <div className="grid grid-cols-2 gap-1 opacity-40">
                              <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                              <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                            </div>

                          </div>
                        </div>

                        <p className="text-[9px] text-zinc-500 font-sans text-center">
                          Limited series of gallery-styled decks hung on the concrete brick walls.
                        </p>
                      </div>

                    </div>

                    {/* TEXT DESCRIPTION OF REAL ACTIONS AND CONTEXT */}
                    <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-850/80 space-y-2">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                        💡 ΣΗΜΕΙΩΣΕΙΣ ΓΙΑ ΤΟ ΦΥΣΙΚΟ ΚΑΤΑΣΤΗΜΑ (ΓΚΑΛΕΡΙ)
                      </span>
                      <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                        Η αισθητική που ρυθμίζετε εδώ μεταφέρεται άμεσα στις ετικέτες τιμών των καφέδων, στα έντυπα μενού των εκδηλώσεων, στα skate decks που διακοσμούν τον τοίχο και στα stencil graffiti που θα βαφτούν πάνω στα εκτεθειμένα τούβλα του εργαστηρίου. Κάθε αλλαγή χτίζει μια ενιαία underground εμπειρία για τον επισκέπτη.
                      </p>
                    </div>

                  </div>

                </div>

              </div>
              
              {/* Reset to system presets */}
              <div className="bg-zinc-950/40 border border-zinc-850 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="text-xs text-zinc-400">
                  Θέλετε να επαναφέρετε την αρχική visual ταυτότητα της εφαρμογής; Πατήστε επαναφορά.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setVisualSystem({
                      mode: "underground-black",
                      primaryColor: "#eab308",
                      displayFont: "Space Grotesk",
                      bodyFont: "Inter",
                      textureType: "concrete",
                      textureOpacity: 0.15,
                      activeDecals: ["spray-splatter", "spray-drips", "skateboard", "drown-crown"]
                    });
                  }}
                  className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 hover:bg-zinc-800 cursor-pointer transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Επαναφορά Visuals</span>
                </button>
              </div>

            </div>
          )}

          {/* DYNAMIC TAB RENDERING (FOR USER-ADDED HEADINGS) */}
          {activeCustomTab && (
            <div className="space-y-6">
              <div className="border-b border-[#ffd700]/20 pb-4 flex flex-col gap-2">
                <span className="text-xs font-mono text-[#ffd700] tracking-widest uppercase">ΠΡΟΣΑΡΜΟΣΜΕΝΟ ΚΕΦΑΛΑΙΟ</span>
                <div className="flex justify-between items-start gap-4">
                  {editMode ? (
                    <input
                      type="text"
                      value={activeCustomTab.title}
                      onChange={(e) => {
                        const nextId = e.target.value;
                        setCustomTabs(prev => prev.map(t => t.id === activeCustomTab.id ? { ...t, title: nextId } : t));
                      }}
                      className="text-2xl sm:text-3xl font-bold bg-[#1e2022] border border-amber-500/50 rounded px-2' py-1 text-white w-full"
                    />
                  ) : (
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#ffd700] tracking-tight">
                      {activeCustomTab.title}
                    </h3>
                  )}
                </div>
              </div>

              {/* Custom Tab Content, easily editable in full text screen */}
              <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4">
                {editMode ? (
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase">Περιεχόμενο Κεφαλαίου</label>
                    <textarea
                      value={activeCustomTab.content}
                      onChange={(e) => {
                        const content = e.target.value;
                        setCustomTabs(prev => prev.map(t => t.id === activeCustomTab.id ? { ...t, content } : t));
                      }}
                      rows={12}
                      className="w-full bg-[#1e2022] text-zinc-300 border border-zinc-800 rounded p-3 text-xs sm:text-sm leading-relaxed focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                ) : (
                  <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {activeCustomTab.content}
                  </div>
                )}
              </div>

              {/* Guide card */}
              <div className="text-xs bg-zinc-900/30 p-3.5 rounded-lg border border-zinc-850 text-zinc-400">
                Μπορείτε να τροποποιήσετε αυτό το κεφάλαιο ανά πάσα στιγμή πατώντας το κουμπί <strong>&ldquo;ΕΝΕΡΓΟΠΟΙΗΣΗ ΕΠΕΞΕΡΓΑΣΙΑΣ&rdquo;</strong> στο πάνω μέρος.
              </div>
            </div>
          )}

        </div>

      </main>

    </div>
  );

  function contributionsMarginRatioFormatted() {
    return Math.round(contributionMarginPercent * 100);
  }
}
