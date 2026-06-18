import React, { useState } from "react";
import { Clock, AlertTriangle, Plus, Trash2, Edit3, Check, RefreshCw } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  content: string;
}

interface RiskItem {
  id: string;
  title: string;
  content: string;
}

interface TimelineRisksEditorProps {
  editMode: boolean;
  timelineData: any; // could be array or legacy object
  risksData: any;    // could be array or legacy object
  onTimelineChange: (updated: TimelineItem[]) => void;
  onRisksChange: (updated: RiskItem[]) => void;
}

export default function TimelineRisksEditor({
  editMode,
  timelineData,
  risksData,
  onTimelineChange,
  onRisksChange
}: TimelineRisksEditorProps) {

  // Helper: Normative converter for Timeline (Object to Array)
  const getNormalizedTimeline = (data: any): TimelineItem[] => {
    if (Array.isArray(data)) return data;
    if (data && typeof data === "object") {
      return [
        { id: "march", title: "Μάρτιος 2026", content: data.march || "" },
        { id: "april", title: "Απρίλιος 2026", content: data.april || "" },
        { id: "may", title: "Μάιος 2026", content: data.may || "" },
        { id: "june", title: "Ιούνιος 2026", content: data.june || "" },
        { id: "july", title: "Ιούλιος 2026", content: data.july || "" }
      ].filter(item => item.content);
    }
    return [];
  };

  // Helper: Normative converter for Risks (Object to Array)
  const getNormalizedRisks = (data: any): RiskItem[] => {
    if (Array.isArray(data)) return data;
    if (data && typeof data === "object") {
      return [
        { id: "financial", title: "7.1 Οικονομικοί Κίνδυνοι", content: data.financial || "" },
        { id: "demand", title: "7.2 Κίνδυνος Μειωμένης Ζήτησης", content: data.demand || "" },
        { id: "competition", title: "7.3 Ανταγωνισμός", content: data.competition || "" },
        { id: "operational", title: "7.4 Λειτουργικοί Κίνδυνοι & Ασφάλεια ράμπας", content: data.operational || "" },
        { id: "creativeServices", title: "7.5 Κίνδυνοι Σχετικοί με Δημιουργικές Υπηρεσίες", content: data.creativeServices || "" },
        { id: "marketing", title: "7.6 Κίνδυνοι Marketing", content: data.marketing || "" },
        { id: "conclusion", title: "7.7 Συμπέρασμα Ανάλυσης Κινδύνων", content: data.conclusion || "" }
      ].filter(item => item.content);
    }
    return [];
  };

  const [localTimeline, setLocalTimeline] = useState<TimelineItem[]>(() => getNormalizedTimeline(timelineData));
  const [localRisks, setLocalRisks] = useState<RiskItem[]>(() => getNormalizedRisks(risksData));

  // Sync state if parent props change
  React.useEffect(() => {
    if (timelineData) setLocalTimeline(getNormalizedTimeline(timelineData));
  }, [timelineData]);

  React.useEffect(() => {
    if (risksData) setLocalRisks(getNormalizedRisks(risksData));
  }, [risksData]);

  // Handle updates
  const handleTimelineItemChange = (index: number, key: "title" | "content", val: string) => {
    const updated = [...localTimeline];
    updated[index] = { ...updated[index], [key]: val };
    setLocalTimeline(updated);
    onTimelineChange(updated);
  };

  const handleRiskItemChange = (index: number, key: "title" | "content", val: string) => {
    const updated = [...localRisks];
    updated[index] = { ...updated[index], [key]: val };
    setLocalRisks(updated);
    onRisksChange(updated);
  };

  // Add Item
  const handleAddTimelineItem = () => {
    const newItem: TimelineItem = {
      id: "timeline-" + Date.now(),
      title: "Νέος Μήνας/Μίλσοριο 2026",
      content: "Περιγράψτε τα ορόσημα και τις εργασίες που πρέπει να ολοκληρωθούν."
    };
    const updated = [...localTimeline, newItem];
    setLocalTimeline(updated);
    onTimelineChange(updated);
  };

  const handleAddRiskItem = () => {
    const newItem: RiskItem = {
      id: "risk-" + Date.now(),
      title: "7.X Νέος Διαχειρίσιμος Κίνδυνος",
      content: "Μέτρα αντιμετώπισης: Λεπτομερής καταγραφή και οργάνωση προληπτικών ενεργειών."
    };
    const updated = [...localRisks, newItem];
    setLocalRisks(updated);
    onRisksChange(updated);
  };

  // Delete Item
  const handleDeleteTimelineItem = (index: number) => {
    const updated = localTimeline.filter((_, idx) => idx !== index);
    setLocalTimeline(updated);
    onTimelineChange(updated);
  };

  const handleDeleteRiskItem = (index: number) => {
    const updated = localRisks.filter((_, idx) => idx !== index);
    setLocalRisks(updated);
    onRisksChange(updated);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Timeline Section */}
      <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4">
        
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
          <h4 className="font-display font-bold text-lg text-zinc-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500 animate-pulse" />
            <span>Χρονοδιάγραμμα Υλοποίησης Hub</span>
          </h4>
          {editMode && (
            <button
              type="button"
              onClick={handleAddTimelineItem}
              className="text-amber-400 hover:text-amber-300 font-bold font-mono text-[10px] cursor-pointer flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 rounded active:scale-95 transition-transform"
            >
              <Plus className="w-3 h-3" />
              <span>+ ΠΡΟΣΘΗΚΗ ΜΗΝΑ</span>
            </button>
          )}
        </div>

        <div className="space-y-4">
          {localTimeline.map((item, index) => (
            <div key={item.id} className="group relative bg-[#181a1c] border border-zinc-850 rounded-xl p-5 hover:border-zinc-700 transition duration-300">
              
              {/* Badge or Controls in corner */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                {editMode ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteTimelineItem(index)}
                    className="p-1.5 rounded bg-zinc-900/60 hover:bg-rose-950/40 border border-zinc-850 hover:border-rose-900 text-zinc-500 hover:text-rose-400 text-xs cursor-pointer transition active:scale-90"
                    title="Διαγραφή ορόσημου"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[10px] font-mono border border-zinc-800">
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span>Ενεργό</span>
                  </div>
                )}
              </div>

              {/* Editable/Normal Title */}
              <div className="mb-3 max-w-[80%]">
                {editMode ? (
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-amber-500/70 uppercase">Τίτλος Ορόσημου / Μήνας</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleTimelineItemChange(index, "title", e.target.value)}
                      className="w-full bg-[#1a1c1e] text-zinc-150 border border-amber-500/30 rounded px-3 py-1.5 text-xs font-semibold tracking-tight focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                    />
                  </div>
                ) : (
                  <h4 className="font-display text-base font-bold text-zinc-100 tracking-tight">
                    {item.title}
                  </h4>
                )}
              </div>

              {/* Editable/Normal Content */}
              <div>
                {editMode ? (
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-amber-500/70 uppercase font-medium">Εργασίες & Ορόσημα</label>
                    <textarea
                      value={item.content}
                      onChange={(e) => handleTimelineItemChange(index, "content", e.target.value)}
                      rows={3}
                      className="w-full bg-[#1a1c1e] text-zinc-300 border border-[#27272a] rounded px-3 py-2 text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                ) : (
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                    {item.content}
                  </p>
                )}
              </div>

            </div>
          ))}

          {localTimeline.length === 0 && (
            <p className="text-zinc-500 text-xs italic text-center py-4">Δεν έχουν καταχωρηθεί ορόσημα στο χρονοδιάγραμμα.</p>
          )}
        </div>
      </div>

      {/* 2. Risks Analysis Section */}
      <div className="bg-[#141618] border border-zinc-800 rounded-xl p-5 space-y-4">
        
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
          <h4 className="font-display font-bold text-lg text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <span>Αναλυτική Ανάλυση Κινδύνων (Risks Core)</span>
          </h4>
          {editMode && (
            <button
              type="button"
              onClick={handleAddRiskItem}
              className="text-rose-400 hover:text-rose-300 font-bold font-mono text-[10px] cursor-pointer flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 rounded active:scale-95 transition-transform"
            >
              <Plus className="w-3 h-3" />
              <span>+ ΠΡΟΣΘΗΚΗ ΚΙΝΔΥΝΟΥ</span>
            </button>
          )}
        </div>

        <div className="space-y-4">
          {localRisks.map((item, index) => (
            <div key={item.id} className="group relative bg-[#181a1c] border border-zinc-850 rounded-xl p-5 hover:border-zinc-700 transition duration-300">
              
              {/* Corner Delete */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                {editMode ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteRiskItem(index)}
                    className="p-1.5 rounded bg-zinc-900/60 hover:bg-rose-950/40 border border-zinc-850 hover:border-rose-900 text-zinc-500 hover:text-rose-400 text-xs cursor-pointer transition active:scale-90"
                    title="Διαγραφή κινδύνου"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 text-rose-400 text-[10px] font-mono border border-zinc-800/65">
                    <AlertTriangle className="w-3 h-3 text-rose-500" />
                    <span>Κίνδυνος</span>
                  </div>
                )}
              </div>

              {/* Editable/Normal Title */}
              <div className="mb-3 max-w-[80%]">
                {editMode ? (
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-rose-500/70 uppercase">Κατηγορία Κινδύνου & Τίτλος</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleRiskItemChange(index, "title", e.target.value)}
                      className="w-full bg-[#1a1c1e] text-[#f4f4f5] border border-rose-500/30 rounded px-3 py-1.5 text-xs font-semibold tracking-tight focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono"
                    />
                  </div>
                ) : (
                  <h4 className="font-display text-base font-bold text-rose-300 tracking-tight">
                    {item.title}
                  </h4>
                )}
              </div>

              {/* Editable/Normal Content */}
              <div>
                {editMode ? (
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-rose-500/70 uppercase font-medium">Ανάλυση & Μέτρα Αντιμετώπισης</label>
                    <textarea
                      value={item.content}
                      onChange={(e) => handleRiskItemChange(index, "content", e.target.value)}
                      rows={3}
                      className="w-full bg-[#1a1c1e] text-zinc-300 border border-[#27272a] rounded px-3 py-2 text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                ) : (
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                    {item.content}
                  </p>
                )}
              </div>

            </div>
          ))}

          {localRisks.length === 0 && (
            <p className="text-zinc-500 text-xs italic text-center py-4">Δεν έχουν καταχωρηθεί κίνδυνοι στην ανάλυση.</p>
          )}
        </div>
      </div>

    </div>
  );
}
