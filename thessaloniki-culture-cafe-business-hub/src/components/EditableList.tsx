/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Plus, Trash2, Edit3 } from "lucide-react";

interface EditableListProps {
  id: string;
  title: string;
  items: string[];
  editMode: boolean;
  themeColor?: string; // e.g. "amber", "rose", "emerald"
  onItemsChange: (updatedItems: string[]) => void;
}

export default function EditableList({
  id,
  title,
  items,
  editMode,
  themeColor = "amber",
  onItemsChange
}: EditableListProps) {
  const handleItemEdit = (index: number, val: string) => {
    const nextArr = [...items];
    nextArr[index] = val;
    onItemsChange(nextArr);
  };

  const handleAddItem = () => {
    onItemsChange([...items, "Nέο στοιχείο λίστας..."]);
  };

  const handleRemoveItem = (index: number) => {
    onItemsChange(items.filter((_, i) => i !== index));
  };

  const colorClasses = {
    amber: {
      border: "border-amber-800",
      bg: "bg-amber-950/20",
      text: "text-amber-400",
      bullet: "bg-amber-500"
    },
    rose: {
      border: "border-rose-800",
      bg: "bg-rose-950/20",
      text: "text-rose-400",
      bullet: "bg-rose-500"
    },
    emerald: {
      border: "border-emerald-800",
      bg: "bg-emerald-950/20",
      text: "text-emerald-400",
      bullet: "bg-emerald-500"
    },
    zinc: {
      border: "border-zinc-800",
      bg: "bg-zinc-900/40",
      text: "text-zinc-300",
      bullet: "bg-zinc-500"
    }
  }[themeColor as "amber" | "rose" | "emerald" | "zinc"] || {
    border: "border-zinc-800",
    bg: "bg-zinc-900/40",
    text: "text-zinc-300",
    bullet: "bg-zinc-500"
  };

  return (
    <div id={`editable-list-${id}`} className={`bg-[#141618] border rounded-xl p-5 ${colorClasses.border} transition duration-300`}>
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800/40">
        <h4 className={`font-display text-base font-bold ${colorClasses.text}`}>
          {title}
        </h4>
        {editMode && (
          <button
            onClick={handleAddItem}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs border border-zinc-700/65 font-medium transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Προσθήκη</span>
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2 group/item">
            <span className={`w-1.5 h-1.5 rounded-full ${colorClasses.bullet} mt-2 shrink-0`} />
            
            {editMode ? (
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemEdit(idx, e.target.value)}
                  className="flex-1 bg-[#1a1c1e] text-zinc-200 border border-zinc-800 rounded px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  onClick={() => handleRemoveItem(idx)}
                  className="p-1 rounded hover:bg-rose-950/30 text-rose-500 hover:text-rose-400 border border-transparent hover:border-rose-900/40 transition"
                  title="Διαγραφή στοιχείου"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <span className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                {item}
              </span>
            )}
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-xs text-zinc-500 italic py-2">Δεν υπάρχουν στοιχεία σε αυτή τη λίστα.</p>
        )}
      </div>
    </div>
  );
}
