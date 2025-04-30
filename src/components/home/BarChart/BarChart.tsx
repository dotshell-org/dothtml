import { Feature } from "@/types/home/Feature";

const BarChart = () => {
    const features: Feature[] = [
        {title: "Export", description: "Export your data in the formats you love like CSV and JSON", software: "Cafeteria Manager"},
        {title: "Search & Filters", description: "Organize and search deeply into your data with Sorts & Filters", software: "Ico"},
        {title: "Aggregation Toolbar", description: "Easy perform calculations on different data using the Agregation Toolbar", software: "Ico"},
        {title: "Charts", description: "Visualize easily your data over the time with Charts", software: "Ico & Cafeteria Manager"},
        {title: "History", description: "Find out in detail what happened at a specific time, with a detailed history", software: "Ico & Cafeteria Manager"},
    ];

    return (
        <div className="flex justify-center mt-40">
            <div className="flex flex-row items-end gap-4 border-b px-16 border-black dark:border-white">
                {features.map((feature, index) => (
                    <div
                        className="bg-red-500 w-48 px-6 pt-12 pb-14 h-fit"
                        key={index}
                    >
                        <h1 className="text-white text-xl font-semibold text-center">{feature.title}</h1>
                        <p className="mt-4 text-white text-md font-light text-center">{feature.description}</p>
                        <p className="mt-4 text-white text-md font-semibold text-center">In {feature.software}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BarChart;