"use client";
import { cn } from "@/utils/cn";
import React, { useMemo, useRef, useState } from "react";

export const BackgroundRippleEffect = ({
  rows = 12,
  cols = 30,
  cellSize = 50,
  className,
  children,
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
  className?: string;
  children?: React.ReactNode;
}) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);

  const ref = useRef<any>(null);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full overflow-hidden",
        "[--cell-border-color:var(--color-primary)] [--cell-fill-color:var(--color-primary)] [--cell-shadow-color:var(--color-primary)]",
        className
      )}
    >
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full bg-gradient-to-b from-transparent via-background/50 to-background rounded-3xl" />
        <DivGrid
          key={`base-${rippleKey}`}
          className="opacity-20"
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--color-primary)"
          fillColor="var(--color-primary)"
          clickedCell={clickedCell}
          onCellClick={(row, col) => {
            setClickedCell({ row, col });
            setRippleKey((k) => k + 1);
          }}
          interactive
        />
        <div className="absolute inset-0 z-10">{children}</div>
      </div>
    </div>
  );
};

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number; // in pixels
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

const DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "#3f3f46",
  fillColor = "rgba(14,165,233,0.3)",
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols]
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div className={cn("relative z-[3]", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, distance * 55) : 0; // ms
        const duration = 200 + distance * 80; // ms

        const style: CellStyle = clickedCell
          ? {
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-10 transition-opacity duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_20px_1px_var(--color-primary)_inset]",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
              !interactive && "pointer-events-none"
            )}
            style={{
              backgroundColor: clickedCell ? fillColor : "transparent",
              borderColor: borderColor,
              opacity: clickedCell ? 0.3 : 0.05,
              ...style,
            }}
            onClick={
              interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
            }
          />
        );
      })}
    </div>
  );
};
