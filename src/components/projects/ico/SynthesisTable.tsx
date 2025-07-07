import React from "react";

export enum DashboardCharts {
    Credit = '📈',
    Debit = '📉',
    Profit = '⚖\uFE0F'
}

// Mock data for financial summary
const synthesizedData = [
  { category: "Salaries", debit: 12500.75, credit: 0, profit: -12500.75 },
  { category: "Equipment", debit: 3750.25, credit: 0, profit: -3750.25 },
  { category: "Services", debit: 5200.00, credit: 19800.50, profit: 14600.50 },
  { category: "Investments", debit: 8000.00, credit: 11250.75, profit: 3250.75 },
  { category: "Marketing", debit: 2100.50, credit: 0, profit: -2100.50 },
];

const allDebits = {
  categories: ["Salaries", "Equipment", "Services", "Investments", "Marketing"],
  values: [12500.75, 3750.25, 5200.00, 8000.00, 2100.50]
};

const allCredits = {
  categories: ["Services", "Investments"],
  values: [19800.50, 11250.75]
};

interface CreditSummaryTRProps {
    property: DashboardCharts | null;
    content: string;
    border: boolean;
}

const DashboardTR: React.FC<CreditSummaryTRProps> = ({ property, content, border }) => {
    const color =
        property === DashboardCharts.Credit
            ? "hover:text-red-500"
            : property === DashboardCharts.Debit
                ? "hover:text-blue-500"
                : property === DashboardCharts.Profit
                    ? "hover:text-violet-500"
                    : "";

    return (
        <td
            className={`w-1/4 border-gray-300 dark:border-gray-700 border text-center p-1.5 text-sm transition-all ${color} ${property === null && "cursor-default select-none"} ${property != null && "cursor-text"} ${!border && "border-0"} select-text`}
        >
            {content}
        </td>
    );
};

interface SummaryTHProps {
    property: DashboardCharts | null;
}

const DashboardTH: React.FC<SummaryTHProps> = ({ property }) => {
    const textProperty: string = property === DashboardCharts.Credit
        ? "📈 " + "Credit"
        : property === DashboardCharts.Debit
            ? "📉 " + "Debit"
            : property === DashboardCharts.Profit
                ? "⚖\uFE0F " + "Profit"
                : "";
    return (
        <th className="w-1/4 border-gray-300 dark:border-gray-700 border text-center p-4 text-sm font-normal text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-950 transition-all">{textProperty}</th>
    );
};

const SynthesisTable = () => {

    const formatProfit = (value: number): string => {
        if (value < 0) {
            return `-€${Math.abs(value).toFixed(2)}`;
        }
        return `€${value.toFixed(2)}`;
    };

    return (
        <div className="w-2/3 mx-auto">
            <table className="w-full mt-5 table-auto border-white dark:border-gray-950 border-2 border-t-0 border-b-gray-300 dark:border-b-gray-700 border-b-2">
                <thead className="cursor-default select-none">
                <tr className="border-b-gray-300 dark:border-b-gray-700 border-b-2">
                    <DashboardTH property={null} />
                    <DashboardTH property={DashboardCharts.Debit} />
                    <DashboardTH property={DashboardCharts.Credit} />
                    <DashboardTH property={DashboardCharts.Profit} />
                </tr>
                </thead>
                <tbody>
                {synthesizedData.map((row, index) => (
                    <tr key={`row-${index}`}>
                        <DashboardTR border={true} content={row.category} property={null} />
                        <DashboardTR border={true} content={`€${row.debit.toFixed(2)}`} property={DashboardCharts.Debit} />
                        <DashboardTR border={true} content={`€${row.credit.toFixed(2)}`} property={DashboardCharts.Credit} />
                        <DashboardTR border={true} content={formatProfit(row.profit)} property={DashboardCharts.Profit} />
                    </tr>
                ))}
                </tbody>
            </table>
            <table className="w-full mt-0.5 table-auto border-white dark:border-gray-950 border-0">
                <tbody>
                <tr>
                    <DashboardTR border={false} content={""} property={null} />
                    <DashboardTR border={false} content={`€${allDebits.values.reduce((a: number, b: number) => a + b, 0).toFixed(2)}`} property={DashboardCharts.Debit} />
                    <DashboardTR border={false} content={`€${allCredits.values.reduce((a: number, b: number) => a + b, 0).toFixed(2)}`} property={DashboardCharts.Credit} />
                    <DashboardTR border={false} content={`${formatProfit(allCredits.values.reduce((a: number, b: number) => a + b, 0) - allDebits.values.reduce((a: number, b: number) => a + b, 0))}`} property={DashboardCharts.Profit} />
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SynthesisTable;