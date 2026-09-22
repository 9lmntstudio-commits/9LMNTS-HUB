import React, { useEffect } from "react";
import { X } from "lucide-react";

interface MasterDrawerShellProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string; // hex or tailwind text color
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string; // e.g. 'max-w-2xl', 'max-w-3xl'
}

export const MasterDrawerShell: React.FC<MasterDrawerShellProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  badge = "LIVE TELEMETRY",
  badgeColor = "#FF5500",
  children,
  footer,
  maxWidth = "max-w-2xl",
}) => {
  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* 82% Obsidian Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-[#0A0B10]/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 85vh Master Modal Drawer Shell */}
      <div
        className={`relative z-10 w-full ${maxWidth} h-[85vh] flex flex-col rounded-t-[24px] bg-[#121624]/95 border-t border-x border-white/12 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in slide-in-from-bottom duration-300`}
      >
        {/* Top Swipe Drag Handle */}
        <div className="pt-3 pb-2 flex justify-center cursor-grab active:cursor-grabbing">
          <div className="w-10 h-1.5 rounded-full bg-white/25 hover:bg-white/40 transition-colors" />
        </div>

        {/* Standardized Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded border"
                style={{
                  color: badgeColor,
                  borderColor: `${badgeColor}40`,
                  backgroundColor: `${badgeColor}15`,
                }}
              >
                ● {badge}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-['Syne',sans-serif] tracking-tight text-white">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-gray-400 font-['Plus_Jakarta_Sans',sans-serif] mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/10"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Body Slot (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 font-['Plus_Jakarta_Sans',sans-serif] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {children}
        </div>

        {/* Persistent Action Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-white/10 bg-[#0A0B10]/60 backdrop-blur-md shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
