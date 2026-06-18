/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Edit3 } from "lucide-react";

interface EditableUnitProps {
  id: string;
  title: string;
  content: string;
  editMode: boolean;
  label?: string;
  multiline?: boolean;
  onTitleChange: (newTitle: string) => void;
  onContentChange: (newContent: string) => void;
}

export default function EditableUnit({
  id,
  title,
  content,
  editMode,
  label,
  multiline = true,
  onTitleChange,
  onContentChange
}: EditableUnitProps) {
  return (
    <div id={`editable-unit-${id}`} className="group relative bg-[#141618] border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition duration-300">
      
      {/* Edit Badge indicator */}
      {editMode && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/60 text-amber-400 text-[10px] font-mono animate-pulse">
          <Edit3 className="w-3 h-3" />
          <span>Επεξεργασία</span>
        </div>
      )}

      {/* Label above */}
      {label && (
        <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block mb-1">
          {label}
        </span>
      )}

      {/* Title */}
      <div className="mb-3">
        {editMode ? (
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-amber-500/70 uppercase">Τίτλος Ενότητας</label>
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full bg-[#1a1c1e] text-zinc-150 border border-amber-500/50 rounded px-3 py-1.5 text-sm font-semibold tracking-tight focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        ) : (
          <h4 className="font-display text-lg font-bold text-zinc-100 tracking-tight">
            {title}
          </h4>
        )}
      </div>

      {/* Content */}
      <div>
        {editMode ? (
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-amber-500/70 uppercase font-medium">Περιεχόμενο</label>
            {multiline ? (
              <textarea
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                rows={5}
                className="w-full bg-[#1a1c1e] text-zinc-300 border border-amber-700/40 rounded px-3 py-2 text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            ) : (
              <input
                type="text"
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                className="w-full bg-[#1a1c1e] text-zinc-300 border border-amber-700/40 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            )}
          </div>
        ) : (
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        )}
      </div>
    </div>
  );
}
