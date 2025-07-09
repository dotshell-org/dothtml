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
        <div className="flex justify-center mt-20 sm:mt-40 px-2">
            <div className="flex flex-col sm:flex-row items-end gap-4 w-full max-w-5xl">
                {features.map((feature, index) => (
                    <div
                        className="bg-red-500 w-full sm:w-48 px-4 sm:px-6 pt-8 sm:pt-12 pb-8 sm:pb-14 h-fit rounded-lg flex-1 min-w-[180px] max-w-xs mx-auto"
                        key={index}
                    >
                        <h1 className="text-white text-base sm:text-xl font-semibold text-center">{feature.title}</h1>
                        <p className="mt-2 sm:mt-4 text-white text-xs sm:text-md font-light text-center">{feature.description}</p>
                        <p className="mt-2 sm:mt-4 text-white text-xs sm:text-md font-semibold text-center">In {feature.software}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BarChart;