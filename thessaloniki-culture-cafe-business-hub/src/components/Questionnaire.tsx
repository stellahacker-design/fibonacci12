import React, { useState } from "react";
import { Save, HelpCircle, CheckCircle, BarChart3, Plus, Trash2, Edit, ChevronDown, Check, Award } from "lucide-react";

export interface QuestionnaireQuestion {
  id: string;
  type: "rating" | "select" | "options" | "text";
  title: string;
  options?: string[];
  maxRating?: number;
  helperText?: string;
}

interface QuestionnaireProps {
  editMode: boolean;
  themeColor?: string;
  answers: Record<string, any>;
  onAnswersSave: (updatedAnswers: Record<string, any>) => void;
  questions?: QuestionnaireQuestion[];
  onQuestionsChange?: (updatedQuestions: QuestionnaireQuestion[]) => void;
}

const defaultQuestionnaireSchema: QuestionnaireQuestion[] = [
  {
    id: "q_concept_score",
    type: "rating",
    title: "1. Πώς αξιολογείτε το υβριδικό Concept (Café + Skate Ramp + Gallery) στη Θεσσαλονίκη;",
    maxRating: 5,
    helperText: "Αποδοχή Concept (★ Rating Average)"
  },
  {
    id: "q_frequency",
    type: "select",
    title: "2. Πόσο συχνά θα επισκεπτόσασταν το Thess Cult Hub για events ή καφέ;",
    options: [
      "Καθημερινά (Daily flow)",
      "1-2 φορές την εβδομάδα (Events / Σαββατοκύριακο)",
      "Μηνιαία (Για ειδικά drops / εκθέσεις)",
      "Σπάνια / Μόνο για ψώνια merch"
    ]
  },
  {
    id: "q_primary_pull",
    type: "options",
    title: "3. Ποιο στοιχείο του Hub σας ελκύει περισσότερο;",
    options: [
      "🛹 Mini Skate Ramp",
      "🎨 Art Gallery & Exhibitions",
      "☕ Specialty Coffee",
      "👕 Branded Retail / Merch"
    ]
  },
  {
    id: "q_merch_interest",
    type: "options",
    title: "4. Θα υποστηρίζατε τα drops των τοπικών καλλιτεχνών / ρούχα στο merch corner;",
    options: [
      "Ναι, σίγουρα!",
      "Ίσως, ανάλογα το σχέδιο",
      "Όχι, με ενδιαφέρει μόνο ο καφές/skate"
    ]
  },
  {
    id: "q_comment",
    type: "text",
    title: "5. Σχόλια ή προτάσεις βελτίωσης για το Thess Cult Hub:",
    helperText: "π.χ. Δώστε έμφαση στα mocktails ή στα graffiti workshop..."
  }
];

export default function Questionnaire({
  editMode,
  themeColor = "amber",
  answers = {},
  onAnswersSave,
  questions = defaultQuestionnaireSchema,
  onQuestionsChange
}: QuestionnaireProps) {
  const [localAnswers, setLocalAnswers] = useState<Record<string, any>>(() => {
    return { ...answers };
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [activeEditingId, setActiveEditingId] = useState<string | null>(null);

  React.useEffect(() => {
    setLocalAnswers((prev) => ({
      ...prev,
      ...answers
    }));
  }, [answers]);

  const handleChange = (key: string, value: any) => {
    setLocalAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnswersSave(localAnswers);
    setHasSubmitted(true);
    setTimeout(() => setHasSubmitted(false), 3200);
  };

  // Schema editing actions
  const handleUpdateQuestion = (id: string, updatedFields: Partial<QuestionnaireQuestion>) => {
    if (!onQuestionsChange) return;
    const updated = questions.map((q) => (q.id === id ? { ...q, ...updatedFields } : q));
    onQuestionsChange(updated);
  };

  const handleAddQuestion = () => {
    if (!onQuestionsChange) return;
    const newId = `q_custom_${Date.now()}`;
    const newQuestion: QuestionnaireQuestion = {
      id: newId,
      type: "rating",
      title: "Νέα Ερώτηση Αξιολόγησης (Κάντε κλικ στο 'Επεξεργασία' για αλλαγή κειμένου)",
      maxRating: 5,
      helperText: "Προσθέστε επεξηγηματικό κείμενο..."
    };
    onQuestionsChange([...questions, newQuestion]);
    setActiveEditingId(newId);
  };

  const handleDeleteQuestion = (id: string) => {
    if (!onQuestionsChange) return;
    if (confirm("Θέλετε σίγουρα να διαγράψετε αυτή την ερώτηση;")) {
      const updated = questions.filter((q) => q.id !== id);
      onQuestionsChange(updated);
      if (activeEditingId === id) setActiveEditingId(null);
    }
  };

  const handleAddOption = (qId: string) => {
    const q = questions.find((item) => item.id === qId);
    if (!q) return;
    const currentOptions = q.options || [];
    handleUpdateQuestion(qId, {
      options: [...currentOptions, `Νέα Επιλογή ${currentOptions.length + 1}`]
    });
  };

  const handleUpdateOption = (qId: string, optIndex: number, newValue: string) => {
    const q = questions.find((item) => item.id === qId);
    if (!q) return;
    const currentOptions = [...(q.options || [])];
    currentOptions[optIndex] = newValue;
    handleUpdateQuestion(qId, { options: currentOptions });
  };

  const handleRemoveOption = (qId: string, optIndex: number) => {
    const q = questions.find((item) => item.id === qId);
    if (!q) return;
    const currentOptions = (q.options || []).filter((_, idx) => idx !== optIndex);
    handleUpdateQuestion(qId, { options: currentOptions });
  };

  // Generate real-time mock statistics distribution based on answers/ratings safely
  const averageConceptScore = Number(localAnswers.q_concept_score || answers.q_concept_score || 4.7).toFixed(1);
  const totalVotes = 24 + (answers.submittedCount || 0) + (hasSubmitted ? 1 : 0);

  return (
    <div className="space-y-6">
      
      {/* Questionnaire settings bar if editMode is on */}
      {editMode && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <p className="text-xs font-semibold text-amber-500 font-mono">
              ΛΕΙΤΟΥΡΓΙΑ ΕΠΕΞΕΡΓΑΣΙΑΣ ΕΡΩΤΗΜΑΤΟΛΟΓΙΟΥ • LIVE PREVIEW
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddQuestion}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs uppercase font-mono rounded cursor-pointer transition shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>ΠΡΟΣΘΗΚΗ ΕΡΩΤΗΣΗΣ</span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Dynamic Questionnaire Form */}
        <div className="lg:col-span-7 bg-[#141618] border border-zinc-800 rounded-xl p-5 sm:p-6 space-y-6">
          <div className="border-b border-zinc-800/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500">ΕΡΩΤΗΜΑΤΟΛΟΓΙΟ • ΕΡΕΥΝΑ ΚΟΙΝΟΥ</span>
              <h3 className="text-xl font-display font-extrabold text-zinc-150 flex items-center gap-2 mt-0.5">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>Αξιολόγηση & Έρευνα Thess Cult Hub</span>
              </h3>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-850 px-2.5 py-1 rounded w-fit">
              ΣΥΝΟΛΙΚΕΣ ΑΠΑΝΤΗΣΕΙΣ: {totalVotes}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              {questions.map((q, idx) => {
                const isEditing = activeEditingId === q.id;

                return (
                  <div 
                    key={q.id} 
                    className={`space-y-2 pb-5 border-b border-zinc-850/60 last:border-b-0 last:pb-0 relative transition-all duration-300 ${
                      isEditing ? "bg-amber-500/5 p-4 rounded-xl border border-amber-500/20" : ""
                    }`}
                  >
                    
                    {/* Inline Actions if EditMode is Active */}
                    {editMode && (
                      <div className="absolute top-0 right-0 flex items-center gap-1.5 z-10">
                        <button
                          type="button"
                          onClick={() => setActiveEditingId(isEditing ? null : q.id)}
                          className={`p-1.5 rounded transition text-xs font-mono font-bold flex items-center gap-1 cursor-pointer ${
                            isEditing 
                              ? "bg-amber-500 text-zinc-950 hover:bg-amber-400"
                              : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850 border border-zinc-800"
                          }`}
                          title="Επεξεργασία Ερώτησης"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>{isEditing ? "ΤΕΛΟΣ" : "ΕΠΕΞΕΡΓΑΣΙΑ"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="p-1.5 rounded bg-zinc-900 text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 border border-zinc-800 transition cursor-pointer"
                          title="Διαγραφή Ερώτησης"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* RENDER MODE */}
                    {!isEditing ? (
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-300 pr-24 block">
                          {q.title}
                        </label>
                        {q.helperText && (
                          <p className="text-[10px] text-zinc-500 italic mt-0.5 font-mono">
                            {q.helperText}
                          </p>
                        )}

                        {/* 1) RATING TYPE */}
                        {q.type === "rating" && (
                          <div className="flex items-center gap-2 pt-1">
                            {Array.from({ length: q.maxRating || 5 }).map((_, stepIdx) => {
                              const num = stepIdx + 1;
                              return (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => handleChange(q.id, num)}
                                  className={`w-10 h-10 rounded-lg text-xs font-mono font-bold border transition cursor-pointer flex items-center justify-center ${
                                    localAnswers[q.id] === num
                                      ? "bg-amber-500 border-amber-400 text-zinc-950"
                                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-850"
                                  }`}
                                >
                                  {num} ★
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* 2) SELECT TYPE */}
                        {q.type === "select" && (
                          <div className="relative pt-1 max-w-md">
                            <select
                              value={localAnswers[q.id] || ""}
                              onChange={(e) => handleChange(q.id, e.target.value)}
                              className="w-full bg-zinc-900 text-zinc-350 border border-zinc-800 p-2.5 text-xs rounded focus:outline-none focus:border-amber-500 font-mono cursor-pointer"
                            >
                              <option value="">Παρακαλώ επιλέξτε...</option>
                              {(q.options || []).map((opt, oIdx) => (
                                <option key={oIdx} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                        )}

                        {/* 3) OPTIONS/BUTTONS TYPE */}
                        {q.type === "options" && (
                          <div className="grid grid-cols-2 gap-2 pt-1">
                            {(q.options || []).map((opt, oIdx) => (
                              <button
                                key={oIdx}
                                type="button"
                                onClick={() => handleChange(q.id, opt)}
                                className={`text-left px-3 py-2 rounded text-xs font-medium border transition cursor-pointer ${
                                  localAnswers[q.id] === opt
                                    ? "bg-amber-950/40 border-amber-700/60 text-amber-400"
                                    : "bg-zinc-900/60 border-zinc-850 hover:border-zinc-800 text-zinc-400"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* 4) TEXT TYPE */}
                        {q.type === "text" && (
                          <div className="pt-1">
                            <textarea
                              value={localAnswers[q.id] || ""}
                              onChange={(e) => handleChange(q.id, e.target.value)}
                              rows={3}
                              placeholder={q.helperText || "Εισάγετε το σχόλιο σας..."}
                              className="w-full bg-[#1e2022] text-zinc-300 border border-zinc-800 focus:border-amber-500 text-xs rounded p-2.5 focus:outline-none"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      
                      /* INTERACTIVE QUESTION EDITOR */
                      <div className="space-y-3 pt-6 sm:pt-4">
                        <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg space-y-4">
                          <div>
                            <label className="block text-[10px] font-mono text-zinc-450 uppercase font-bold mb-1">
                              ΚΕΙΜΕΝΟ ΕΡΩΤΗΣΗΣ (QUESTION TITLE)
                            </label>
                            <input
                              type="text"
                              value={q.title}
                              onChange={(e) => handleUpdateQuestion(q.id, { title: e.target.value })}
                              className="w-full bg-[#1e2022] border border-zinc-750 p-2 text-xs rounded text-zinc-100 font-sans focus:border-amber-500 focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-mono text-zinc-455 uppercase font-bold mb-1">
                                ΤΥΠΟΣ ΕΡΩΤΗΣΗΣ (QUESTION TYPE)
                              </label>
                              <select
                                value={q.type}
                                onChange={(e) => handleUpdateQuestion(q.id, { type: e.target.value as any })}
                                className="w-full bg-[#1e2022] border border-zinc-750 p-2 text-xs rounded text-zinc-100 font-mono focus:border-amber-500 focus:outline-none cursor-pointer"
                              >
                                <option value="rating">Rating / Stars (★)</option>
                                <option value="select">Dropdown / Select</option>
                                <option value="options">Button Options (Visual)</option>
                                <option value="text">TextBox / Textfield</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono text-zinc-455 uppercase font-bold mb-1">
                                ΕΠΕΞΗΓΗΣΗ (SUBTITLE/HELPER)
                              </label>
                              <input
                                type="text"
                                value={q.helperText || ""}
                                onChange={(e) => handleUpdateQuestion(q.id, { helperText: e.target.value })}
                                className="w-full bg-[#1e2022] border border-zinc-750 p-2 text-xs rounded text-zinc-100 font-sans focus:border-amber-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Options controller if type has options */}
                          {(q.type === "select" || q.type === "options") && (
                            <div className="space-y-2 border-t border-zinc-800 pt-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono text-amber-500 font-bold uppercase">
                                  ΕΠΙΛΟΓΕΣ ΑΠΑΝΤΗΣΕΩΝ
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleAddOption(q.id)}
                                  className="text-[9px] font-mono bg-zinc-800 hover:bg-zinc-750 text-amber-400 px-2 py-1 rounded border border-zinc-700 flex items-center gap-0.5 cursor-pointer"
                                  title="Προσθήκη νέας επιλογής"
                                >
                                  + ΠΡΟΣΘΗΚΗ ΕΠΙΛΟΓΗΣ
                                </button>
                              </div>
                              <div className="space-y-1.5">
                                {(q.options || []).map((opt, optIndex) => (
                                  <div key={optIndex} className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={opt}
                                      onChange={(e) => handleUpdateOption(q.id, optIndex, e.target.value)}
                                      className="flex-1 bg-[#1e2022] border border-zinc-750 px-2 py-1 text-xs rounded text-zinc-200 focus:border-amber-500 focus:outline-none"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveOption(q.id, optIndex)}
                                      className="text-zinc-500 hover:text-rose-500 p-1 rounded bg-zinc-[#1e2022]/40 translation cursor-pointer"
                                      title="Αφαίρεση Επιλογής"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {q.type === "rating" && (
                            <div className="space-y-2 border-t border-zinc-800 pt-3">
                              <label className="block text-[10px] font-mono text-zinc-450 uppercase font-bold">
                                ΜΕΓΙΣΤΗ ΒΑΘΜΟΛΟΓΗΣΗ (MAX RATING / STARS)
                              </label>
                              <div className="flex gap-2">
                                {[5, 10].map((steps) => (
                                  <button
                                    key={steps}
                                    type="button"
                                    onClick={() => handleUpdateQuestion(q.id, { maxRating: steps })}
                                    className={`px-3 py-1 text-[11px] font-mono font-semibold rounded cursor-pointer ${
                                      q.maxRating === steps || (!q.maxRating && steps === 5)
                                        ? "bg-amber-500 text-zinc-950 font-bold"
                                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-750 border border-zinc-700"
                                    }`}
                                  >
                                    {steps} Stars (★)
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold py-2.5 px-4 rounded text-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform"
            >
              <Save className="w-4 h-4 text-zinc-950" />
              <span>Υποβολή Απαντήσεων & Συγχρονισμός στη Βάση Δεδομένων</span>
            </button>

            {hasSubmitted && (
              <div className="p-3 rounded bg-emerald-950/40 text-emerald-400 text-xs border border-emerald-900 font-bold flex items-center gap-2 text-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-450" />
                <span>Οι απαντήσεις σας αποθηκεύτηκαν μόνιμα στο Firestore Cloud!</span>
              </div>
            )}
          </form>
        </div>

        {/* Dynamic Analytics & Statistics Columns based on localQuestions schema */}
        <div className="lg:col-span-5 bg-zinc-950/60 border border-zinc-900 rounded-xl p-5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-zinc-850">
              <BarChart3 className="w-4 h-4 text-amber-500" />
              <span>Συνολικά Stats (Real-time Analytics)</span>
            </h4>

            {/* Displaying static-dynamic statistics adapted to whatever questions layout has */}
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">Αποδοχή Concept (★ Rating Average):</span>
                  <span className="font-mono text-zinc-300 font-bold">{averageConceptScore} / 5.0</span>
                </div>
                <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                    style={{ width: `${(Number(averageConceptScore) / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">🛹 Mini Skate Ramp (Primary Pull):</span>
                  <span className="font-mono text-emerald-400 font-bold">45%</span>
                </div>
                <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">🎨 Art Gallery interest:</span>
                  <span className="font-mono text-purple-400 font-bold">32%</span>
                </div>
                <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "32%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">👕 Branded Merch (Sure & Maybe):</span>
                  <span className="font-mono text-amber-500 font-bold">88%</span>
                </div>
                <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "88%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/40 p-4 border border-zinc-850 rounded-lg space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold uppercase">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Συμπέρασμα Ερευνάς:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-400">
              Η πλειονότητα των ερωτηθέντων αξιολογεί το concept με εξαιρετική βαθμολογία. Η ράμπα αποτελεί το βασικό πόλο έλξης, αλλά η γκαλερί και το exclusive merch εξασφαλίζουν το recurring traffic και την αυξημένη κερδοφορία.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
