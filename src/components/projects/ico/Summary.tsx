import React, { useState, useEffect } from "react";

// Fake data
const fakeObjects = [
    { id: 1, date: "2025-06-01", title: "Supermarket", totalAmount: 52.5, category: "Groceries" },
    { id: 2, date: "2025-06-02", title: "Car Insurance", totalAmount: 120.0, category: "Insurance" },
    { id: 3, date: "2025-06-03", title: "Electricity Bill", totalAmount: 75.0, category: "Utilities" },
    { id: 4, date: "2025-06-04", title: "Internet Subscription", totalAmount: 45.0, category: "Utilities" },
    { id: 5, date: "2025-06-05", title: "Restaurant", totalAmount: 30.0, category: "Dining" },
    { id: 6, date: "2025-06-06", title: "Gas Station", totalAmount: 60.0, category: "Transport" },
    { id: 7, date: "2025-06-07", title: "Pharmacy", totalAmount: 18.0, category: "Health" },
    { id: 8, date: "2025-06-08", title: "Movie Theater", totalAmount: 22.0, category: "Entertainment" },
    { id: 9, date: "2025-06-09", title: "Gym Membership", totalAmount: 40.0, category: "Health" },
    { id: 10, date: "2025-06-10", title: "Public Transport", totalAmount: 15.0, category: "Transport" },
];

const propertyLabels = ["Date", "Title", "Amount", "Category"];

const Summary = () => {
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

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
            const idsToSelect = fakeObjects.slice(start, end + 1).map((obj) => obj.id);
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

    const selectedValues =
        selectedColumn !== null
            ? fakeObjects
                  .filter((obj) => selectedRows.includes(obj.id))
                  .map((obj) => {
                      switch (selectedColumn) {
                          case 0:
                              return obj.date;
                          case 1:
                              return obj.title;
                          case 2:
                              return obj.totalAmount.toString();
                          case 3:
                              return obj.category;
                          default:
                              return "";
                      }
                  })
            : [];

    // Inline helper components
    const propertyEmojis = ["📅", "🏷️", "💰", "📑"];
    const SummaryTH = ({ label, emoji }: { label: string; emoji: string }) => (
        <th className="w-1/4 border-gray-300 border text-center p-4 text-sm font-normal text-gray-500 bg-white hover:bg-gray-100 transition-all">
            {emoji} {label}
        </th>
    );
    const SummaryTR = ({ content, isSelected, onClick }: { content: string; isSelected?: boolean; onClick?: (e: React.MouseEvent<HTMLTableCellElement>) => void }) => (
        <td
            onClick={onClick}
            className={`w-1/4 border-gray-300 border text-center p-1.5 text-sm transition-all duration-200 ring-inset hover:ring-1 ring-blue-500 cursor-copy select-none transition-all ${isSelected ? "bg-blue-500 text-white" : "bg-white"}`}

        >
            {content}
        </td>
    );
    // AggregationToolbar (in English, with emojis)
    const AggregationToolbar = ({ columnIndex, values }: { columnIndex: number | null; values: string[] }) => {
        const isVisible = columnIndex !== null && values.length > 0;
        let additionalElement = null;
        if (columnIndex === 2) {
            // Numeric column
            const numbers = values.map(val => parseFloat(val)).filter(num => !isNaN(num));
            const sum = numbers.reduce((acc, num) => acc + num, 0);
            const avg = numbers.length > 0 ? sum / numbers.length : 0;
            const min = numbers.length > 0 ? Math.min(...numbers) : 0;
            const max = numbers.length > 0 ? Math.max(...numbers) : 0;
            const sorted = [...numbers].sort((a, b) => a - b);
            const median =
                sorted.length % 2 === 0
                    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
                    : sorted[Math.floor(sorted.length / 2)];
            const variance =
                numbers.length > 0
                    ? numbers.reduce((acc, num) => acc + Math.pow(num - avg, 2), 0) / numbers.length
                    : 0;
            const stdDev = Math.sqrt(variance);
            additionalElement = (
                <>
                    <div className="px-3"><strong>➕ Sum:</strong> €{sum.toFixed(2)}</div>
                    <div className="px-3"><strong>📊 Average:</strong> €{avg.toFixed(2)}</div>
                    <div className="px-3"><strong>📏 Median:</strong> €{median.toFixed(2)}</div>
                    <div className="px-3"><strong>📉 Std Dev:</strong> €{stdDev.toFixed(2)}</div>
                    <div className="px-3"><strong>🔻 Min:</strong> €{min.toFixed(2)}</div>
                    <div className="px-3"><strong>🔺 Max:</strong> €{max.toFixed(2)}</div>
                </>
            );
        } else if (columnIndex === 0) {
            // Date column
            const dates = values.map(dateStr => new Date(dateStr)).filter(date => !isNaN(date.getTime()));
            const minDate = dates.length > 0 ? new Date(Math.min(...dates.map(date => date.getTime()))) : null;
            const maxDate = dates.length > 0 ? new Date(Math.max(...dates.map(date => date.getTime()))) : null;
            const dayDiff = minDate && maxDate ? Math.floor((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;
            additionalElement = (
                <div className="px-3">
                    <strong>📅 Date range:</strong> {minDate ? minDate.toLocaleDateString() : "-"} → {maxDate ? maxDate.toLocaleDateString() : "-"} ({dayDiff} days)
                </div>
            );
        } else if (columnIndex === 3) {
            // Category column
            const frequency: { [key: string]: number } = {};
            values.forEach(val => {
                frequency[val] = (frequency[val] || 0) + 1;
            });
            additionalElement = (
                <div className="px-3 overflow-x-auto">
                    {Object.entries(frequency).map(([category, count]) => (
                        <div key={category} className="inline-block mr-4">
                            <strong>{category === "" ? "Other" : category}:</strong> {count}
                        </div>
                    ))}
                </div>
            );
        } else if (columnIndex === 1) {
            // Title column
            const uniqueValues = Array.from(new Set(values));
            additionalElement = (
                <div className="px-3">
                    <strong>🔑 Unique values:</strong> {uniqueValues.length}
                </div>
            );
        }
        return (
            <div
                className={`absolute left-0 right-0 bottom-2 rounded-lg bg-white p-4 shadow-md border border-gray-400 transition-opacity duration-300 mx-4 ${
                    isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
                <div className="flex flex-row items-center justify-center space-x-4">
                    <div className="px-3"><strong>🔢 Selected:</strong> {values.length}</div>
                    {additionalElement}
                </div>
            </div>
        );
    };

    return (
        <div className="rounded-2xl border border-gray-300 bg-white shadow-lg p-6 py-12 max-w-5xl mx-auto my-10 relative overflow-x-auto">
            <h1 className="text-3xl mb-4 font-bold cursor-default">📉 Debit</h1>
            <table className="w-full table-auto border-white border-2 border-t-0 border-b-gray-300 border-b-2 cursor-pointer">
                <thead>
                    <tr>
                        {propertyLabels.map((label, idx) => <SummaryTH key={idx} label={label} emoji={propertyEmojis[idx]} />)}
                    </tr>
                </thead>
            </table>
            <table className="w-full table-auto border-white border-2 border-y-0 cursor-copy mt-0">
                <tbody>
                    {fakeObjects.map((obj, index) => (
                        <tr key={obj.id}>
                            <SummaryTR
                                content={formatDate(obj.date)}
                                isSelected={selectedColumn === 0 && selectedRows.includes(obj.id)}
                                onClick={e => handleCellClick(e, 0, index, obj.id)}
                            />
                            <SummaryTR
                                content={obj.title}
                                isSelected={selectedColumn === 1 && selectedRows.includes(obj.id)}
                                onClick={e => handleCellClick(e, 1, index, obj.id)}
                            />
                            <SummaryTR
                                content={"€" + obj.totalAmount.toFixed(2)}
                                isSelected={selectedColumn === 2 && selectedRows.includes(obj.id)}
                                onClick={e => handleCellClick(e, 2, index, obj.id)}
                            />
                            <SummaryTR
                                content={obj.category === "" ? "Other" : obj.category}
                                isSelected={selectedColumn === 3 && selectedRows.includes(obj.id)}
                                onClick={e => handleCellClick(e, 3, index, obj.id)}
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

export default Summary;

