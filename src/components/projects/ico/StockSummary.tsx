import React, { useState, useEffect } from "react";
import Image from 'next/image';

// Types and Interfaces
interface Filter {
    property: string;
    operator: string;
    value: string;
}

interface Sort {
    property: string;
    orientation: string; // "↑" or "↓"
}

interface Movement {
    id: number;
    stock: string;
    date: string;
    object: string;
    quantity: number;
    movement: number;
}

// Fake data
const fakeMovements: Movement[] = [
    { id: 1, stock: "Warehouse A", date: "2025-06-01", object: "Office Chair", quantity: 45, movement: -3 },
    { id: 2, stock: "Warehouse B", date: "2025-06-02", object: "Desk Lamp", quantity: 120, movement: 15 },
    { id: 3, stock: "Warehouse A", date: "2025-06-03", object: "Monitor", quantity: 78, movement: -2 },
    { id: 4, stock: "Storage Room", date: "2025-06-04", object: "Keyboard", quantity: 200, movement: 50 },
    { id: 5, stock: "Warehouse C", date: "2025-06-05", object: "Mouse", quantity: 150, movement: -8 },
    { id: 6, stock: "Warehouse A", date: "2025-06-06", object: "Headphones", quantity: 85, movement: 12 },
    { id: 7, stock: "Storage Room", date: "2025-06-07", object: "Webcam", quantity: 32, movement: -5 },
    { id: 8, stock: "Warehouse B", date: "2025-06-08", object: "Tablet", quantity: 67, movement: 8 },
    { id: 9, stock: "Warehouse C", date: "2025-06-09", object: "Phone", quantity: 95, movement: -12 },
    { id: 10, stock: "Warehouse A", date: "2025-06-10", object: "Charger", quantity: 180, movement: 25 },
];

const propertyLabels = ["Stock", "Date", "Object", "Quantity", "Movement"];
const propertyEmojis = ["📦", "📅", "🛒", "🔢", "🔄"];

// Helper functions
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

// Components
const SummaryTH = ({ label, emoji }: { label: string; emoji: string }) => (
    <th className="w-1/5 border-gray-300 dark:border-gray-700 border text-center p-4 text-sm font-normal text-gray-500 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
        {emoji} {label}
    </th>
);

const SummaryTR = ({ content, isSelected, onClick, movement }: {
    content: string;
    isSelected?: boolean;
    onClick?: (e: React.MouseEvent<HTMLTableCellElement>) => void;
    movement?: number;
}) => {
    const isPositive = movement !== undefined && movement > 0;
    const isNegative = movement !== undefined && movement < 0;

    const baseClasses = "w-1/5 border-gray-300 dark:border-gray-700 border text-center p-1.5 text-sm duration-200 ring-inset hover:ring-1 ring-blue-500 cursor-copy select-none transition-all";

    let colorClasses = "";
    if (isSelected) {
        if (isPositive) {
            colorClasses = "bg-green-500 text-white";
        } else if (isNegative) {
            colorClasses = "bg-red-500 text-white";
        } else {
            colorClasses = "bg-blue-500 text-white";
        }
    } else {
        if (isPositive) {
            colorClasses = "bg-white dark:bg-gray-900 text-green-600 dark:text-green-400";
        } else if (isNegative) {
            colorClasses = "bg-white dark:bg-gray-900 text-red-600 dark:text-red-400";
        } else {
            colorClasses = "bg-white dark:bg-gray-900 dark:text-gray-100";
        }
    }

    return (
        <td
            onClick={onClick}
            className={`${baseClasses} ${colorClasses}`}
        >
            {content}
        </td>
    );
};

const FilterLabel = ({ filter }: { filter: Filter }) => (
    <div className="w-fit h-6 m-0 mx-1 py-1 pl-3 pr-2.5 text-sm border text-blue-500 dark:text-blue-300 rounded-full border-blue-500 hover:border-blue-500 dark:border-blue-600 dark:hover:border-blue-600 bg-blue-100 dark:bg-blue-950 transition-all flex items-center justify-center">
        <span className="mr-1 select-none">
          {filter.property} {filter.operator} {filter.value}
        </span>
        <button className="p-0 m-0 bg-transparent ring-0 border-none focus:outline-none cursor-pointer">
            &#x2715;
        </button>
    </div>
);

const FilterPlusButton = () => (
    <button
        className="w-6 h-6 m-0 mx-1 p-0 text-black dark:text-white rounded-full border-gray-400 transition-all flex items-center justify-center ring-1 ring-gray-400 dark:ring-gray-600 hover:ring-blue-500 bg-gray-100 dark:bg-gray-900 cursor-pointer"
        tabIndex={0}
        type="button"
        onClick={e => e.preventDefault()}
        aria-label="Add filter (disabled in demo)"
    >
        +
    </button>
);

const FilterSelection = ({ filters, sorts }: { filters: Filter[]; sorts: Sort[] }) => (
    <div className="w-full h-6 my-4 inline-flex items-center">
        <Image src="/generic/filter.svg" alt="Filter" className="w-6 h-6 mr-2" width="10" height="10" />
        {sorts.map((sort: Sort, index: number) => (
            <div key={index} className="w-fit h-6 m-0 mx-1 py-1 pl-3 pr-2.5 text-sm border text-orange-500 dark:text-orange-300 rounded-full border-orange-500 hover:border-orange-500 dark:border-orange-600 dark:hover:border-orange-600 bg-orange-100 dark:bg-orange-950 transition-all flex items-center justify-center">
                <span className="mr-1 select-none">
                  {sort.orientation} {sort.property.charAt(0).toUpperCase() + sort.property.slice(1)}
                </span>
                <button className="p-0 m-0 bg-transparent ring-0 border-none focus:outline-none cursor-pointer">
                    &#x2715;
                </button>
            </div>
        ))}
        {filters.map((filter: Filter, index: number) => (
            <FilterLabel key={index} filter={filter} />
        ))}
        <FilterPlusButton />
    </div>
);

const AggregationToolbar = ({ columnIndex, values }: { columnIndex: number | null; values: string[] }) => {
    const isVisible = columnIndex !== null && values.length > 0;
    let additionalElement = null;

    if (columnIndex === 3) {
        // Quantity column: sum, min, max
        const numbers = values.map(val => parseFloat(val)).filter(num => !isNaN(num));
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        const min = numbers.length > 0 ? Math.min(...numbers) : 0;
        const max = numbers.length > 0 ? Math.max(...numbers) : 0;

        additionalElement = (
            <>
                <div className="px-3"><strong>➕ Sum:</strong> {sum.toFixed(0)}</div>
                <div className="px-3"><strong>🔻 Min:</strong> {min.toFixed(0)}</div>
                <div className="px-3"><strong>🔺 Max:</strong> {max.toFixed(0)}</div>
            </>
        );
    } else if (columnIndex === 4) {
        // Movement column: sum, min, max, positive sum, negative sum
        const numbers = values.map(val => parseFloat(val)).filter(num => !isNaN(num));
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        const min = numbers.length > 0 ? Math.min(...numbers) : 0;
        const max = numbers.length > 0 ? Math.max(...numbers) : 0;
        const sumNegatives = numbers.filter(num => num < 0).reduce((acc, num) => acc + num, 0) * -1;
        const sumPositives = numbers.filter(num => num > 0).reduce((acc, num) => acc + num, 0);

        additionalElement = (
            <>
                <div className="px-3"><strong>➕ Sum:</strong> {sum.toFixed(0)}</div>
                <div className="px-3"><strong>🔻 Min:</strong> {min.toFixed(0)}</div>
                <div className="px-3"><strong>🔺 Max:</strong> {max.toFixed(0)}</div>
                <div className="px-3"><strong>➖ Negative:</strong> {sumNegatives.toFixed(0)}</div>
                <div className="px-3"><strong>➕ Positive:</strong> {sumPositives.toFixed(0)}</div>
            </>
        );
    } else if (columnIndex === 1) {
        // Date column: date range
        const dates = values.map(dateStr => new Date(dateStr)).filter(date => !isNaN(date.getTime()));
        const minDate = dates.length > 0 ? new Date(Math.min(...dates.map(date => date.getTime()))) : null;
        const maxDate = dates.length > 0 ? new Date(Math.max(...dates.map(date => date.getTime()))) : null;
        const dayDiff = minDate && maxDate ? Math.floor((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;

        additionalElement = (
            <div className="px-3">
                <strong>📅 Date range:</strong> {minDate ? minDate.toLocaleDateString() : "-"} → {maxDate ? maxDate.toLocaleDateString() : "-"} ({dayDiff} days)
            </div>
        );
    } else if (columnIndex === 0 || columnIndex === 2) {
        // Text columns (Stock, Object): unique values count
        const uniqueValuesCount = values.reduce((acc: Record<string, number>, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {});

        additionalElement = (
            <>
                {Object.entries(uniqueValuesCount).map(([value, count]) => (
                    <div key={value} className="px-3">
                        <strong>{value}:</strong> {count}
                    </div>
                ))}
            </>
        );
    }

    return (
        <div className={`absolute left-0 right-0 bottom-2 rounded-lg bg-white dark:bg-gray-900 p-4 shadow-md border border-gray-400 dark:border-gray-600 transition-opacity duration-300 mx-4 hidden sm:block ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
            <div className="flex flex-row items-center justify-center space-x-4 flex-wrap">
                <div className="px-3 text-gray-900 dark:text-gray-100"><strong>🔢 Selected:</strong> {values.length}</div>
                {additionalElement}
            </div>
        </div>
    );
};

// Main Component
const StockSummary = () => {
    const [selectedColumn, setSelectedColumn] = useState<number | null>(null);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedColumn(null);
                setSelectedRows([]);
                setLastSelectedIndex(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleCellClick = (
        event: React.MouseEvent<HTMLTableCellElement>,
        columnIndex: number,
        rowIndex: number,
        rowId: number
    ) => {
        if (selectedColumn !== null && selectedColumn !== columnIndex) {
            setSelectedColumn(columnIndex);
            setSelectedRows([rowId]);
            setLastSelectedIndex(rowIndex);
            return;
        }

        setSelectedColumn(columnIndex);

        if (event.shiftKey && lastSelectedIndex !== null) {
            const start = Math.min(lastSelectedIndex, rowIndex);
            const end = Math.max(lastSelectedIndex, rowIndex);
            const idsToSelect = fakeMovements.slice(start, end + 1).map((movement) => movement.id);
            setSelectedRows(idsToSelect);
        } else {
            if (selectedRows.includes(rowId)) {
                setSelectedRows(selectedRows.filter((id) => id !== rowId));
            } else {
                setSelectedRows([...selectedRows, rowId]);
            }
            setLastSelectedIndex(rowIndex);
        }
    };

    const selectedValues = selectedColumn !== null
        ? fakeMovements
            .filter((movement) => selectedRows.includes(movement.id))
            .map((movement) => {
                switch (selectedColumn) {
                    case 0: return movement.stock;
                    case 1: return movement.date;
                    case 2: return movement.object;
                    case 3: return movement.quantity.toString();
                    case 4: return movement.movement.toString();
                    default: return "";
                }
            })
        : [];

    const fakeFilters: Filter[] = [{ property: "Quantity", operator: ">", value: "30" }];
    const fakeSorts: Sort[] = [{ property: "Date", orientation: "↓" }];

    return (
        <div className="rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-6 py-12 max-w-6xl mx-auto my-10 relative overflow-x-auto">
            <h1 className="text-3xl mb-4 font-bold cursor-default text-gray-900 dark:text-gray-100">🔄 Movements</h1>
            <FilterSelection filters={fakeFilters} sorts={fakeSorts} />
            <table className="w-full table-auto border-white dark:border-gray-800 border-2 border-t-0 border-b-gray-300 dark:border-b-gray-700 border-b-2 cursor-pointer">
                <thead>
                <tr>
                    {propertyLabels.map((label, idx) => <SummaryTH key={idx} label={label} emoji={propertyEmojis[idx]} />)}
                </tr>
                </thead>
            </table>
            <table className="w-full table-auto border-white dark:border-gray-800 border-2 border-y-0 cursor-copy mt-0">
                <tbody>
                {fakeMovements.map((movement, index) => (
                    <tr key={movement.id}>
                        <SummaryTR
                            content={movement.stock}
                            isSelected={selectedColumn === 0 && selectedRows.includes(movement.id)}
                            onClick={e => handleCellClick(e, 0, index, movement.id)}
                            movement={movement.movement}
                        />
                        <SummaryTR
                            content={formatDate(movement.date)}
                            isSelected={selectedColumn === 1 && selectedRows.includes(movement.id)}
                            onClick={e => handleCellClick(e, 1, index, movement.id)}
                            movement={movement.movement}
                        />
                        <SummaryTR
                            content={movement.object}
                            isSelected={selectedColumn === 2 && selectedRows.includes(movement.id)}
                            onClick={e => handleCellClick(e, 2, index, movement.id)}
                            movement={movement.movement}
                        />
                        <SummaryTR
                            content={movement.quantity.toString()}
                            isSelected={selectedColumn === 3 && selectedRows.includes(movement.id)}
                            onClick={e => handleCellClick(e, 3, index, movement.id)}
                            movement={movement.movement}
                        />
                        <SummaryTR
                            content={movement.movement > 0 ? `+${movement.movement}` : movement.movement.toString()}
                            isSelected={selectedColumn === 4 && selectedRows.includes(movement.id)}
                            onClick={e => handleCellClick(e, 4, index, movement.id)}
                            movement={movement.movement}
                        />
                    </tr>
                ))}
                </tbody>
            </table>
            <AggregationToolbar columnIndex={selectedColumn} values={selectedValues} />
            <div className="h-20"></div>
        </div>
    );
};

export default StockSummary;