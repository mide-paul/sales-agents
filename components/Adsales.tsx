'use client';
import { useState, useRef } from "react";
import Image from "next/image";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import cocacola from './../public/icons/cocacola.svg';

interface Deal {
    id: number;
    company: string;
    logo: string;
    dealSize: string;
    source: string;
    sourceName: string;
    status: string;
    category: string;
}

const categoryColors: Record<string, string> = {
    "New lead": "bg-purple-50",
    "Qualified": "bg-blue-50",
    "Proposal sent": "bg-green-50",
    "Closed": "bg-red-50",
};

const categories = ["New lead", "Qualified", "Proposal sent", "Closed"];
const statuses = ["All", "Urgent", "Closed"]; // Filter options

interface CardProps {
    deal: Deal;
    moveDeal: (id: number, category: string) => void;
}

const Card: React.FC<CardProps> = ({ deal }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "DEAL",
        item: { id: deal.id, category: deal.category },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const ref = useRef<HTMLDivElement>(null); // Explicitly define the ref type
    drag(ref); // Attach drag function to the ref

    return (
        <div
            ref={ref} // Use the ref here
            className={`shadow-md rounded-lg w-52 p-2 mb-4 ${categoryColors[deal.category]} ${isDragging ? "opacity-50" : "opacity-100"}`}
        >
            <div className="flex items-center space-x-2">
                <Image src={cocacola} alt={deal.company} className="w-8 h-8" />
                <h3 className="text-xs font-medium">{deal.company}</h3>
            </div>
            <div className="flex flex-row justify-between text-xs mt-2">
                <h3>Deal size</h3>
                <span className="font-bold">{deal.dealSize}</span>
            </div>
            <div className="flex flex-row justify-between text-xs mt-2">
                <h3>Source</h3>
                <span>{deal.source} ({deal.sourceName})</span>
            </div>
            <div className="flex justify-between text-xs mt-2">
                <h3>Status</h3>
                <span className="p-1 text-red-900 bg-red-100 rounded-full">{deal.status}</span>
            </div>
        </div>
    );
};

export default function DealPipeline() {
    const [deals, setDeals] = useState<Deal[]>([
        { id: 1, company: "HOSOptima", logo: "/logo1.png", dealSize: "$50K", source: "Referral", sourceName: "John Doe", status: "Urgent", category: "New lead" },
        { id: 2, company: "HOSOptima", logo: "/logo1.png", dealSize: "$50K", source: "Referral", sourceName: "John Doe", status: "Urgent", category: "New lead" },
        { id: 3, company: "Beta Ltd", logo: "/logo2.png", dealSize: "$80K", source: "LinkedIn", sourceName: "Jane Smith", status: "Closed", category: "Qualified" },
        { id: 4, company: "Gamma LLC", logo: "/logo3.png", dealSize: "$120K", source: "Email", sourceName: "Mike Ross", status: "Urgent", category: "Proposal sent" },
        { id: 5, company: "Delta Inc", logo: "/logo4.png", dealSize: "$200K", source: "Event", sourceName: "Rachel Green", status: "Closed", category: "Closed" },
        { id: 6, company: "Epsilon Co", logo: "/logo5.png", dealSize: "$300K", source: "Cold Call", sourceName: "Sarah Connor", status: "Urgent", category: "New lead" },
        { id: 7, company: "Zeta Enterprises", logo: "/logo6.png", dealSize: "$400K", source: "Website", sourceName: "Luke Skywalker", status: "Closed", category: "Closed" },
    ]);
    
    const [currentWeek, setCurrentWeek] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState("All");

    const moveDeal = (id: number, newCategory: string) => {
        setDeals((prevDeals) => prevDeals.map((deal) => (deal.id === id ? { ...deal, category: newCategory } : deal)));
    };

    // Filter deals by selected status
    const filteredDeals = selectedStatus === "All" ? deals : deals.filter((deal) => deal.status === selectedStatus);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="p-2 space-y-4">
                {/* Weekly Navigation & Filter Buttons */}
                <div className="flex justify-between items-center bg-white p-3 shadow-md rounded-lg">
                    {/* Weekly Navigation */}
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => setCurrentWeek((prev) => Math.max(prev - 1, 1))} 
                            className="border text-xs px-4 py-2 rounded"
                        >
                            Previous Week
                        </button>
                        <span className="text-xs font-bold">Week {currentWeek}</span>
                        <button 
                            onClick={() => setCurrentWeek((prev) => prev + 1)} 
                            className="border text-xs px-4 py-2 rounded"
                        >
                            Next Week
                        </button>
                    </div>

                    {/* Filter Dropdown */}
                    <div>
                        <select
                            className="border text-xs px-4 py-2 rounded"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Deal Categories */}
                <div className="grid grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <CategoryColumn key={category} category={category} deals={filteredDeals} moveDeal={moveDeal} />
                    ))}
                </div>
            </div>
        </DndProvider>
    );
}

interface CategoryColumnProps {
    category: string;
    deals: Deal[];
    moveDeal: (id: number, category: string) => void;
}

const CategoryColumn: React.FC<CategoryColumnProps> = ({ category, deals, moveDeal }) => {
    const [, drop] = useDrop(() => ({
        accept: "DEAL",
        drop: (item: { id: number }) => moveDeal(item.id, category),
    }));

    const ref = useRef<HTMLDivElement>(null); // Explicitly define the ref type
    drop(ref);

    return (
        <div ref={ref} className="p-4 rounded-lg min-h-[200px]">
            <h2 className="text-xs font-semibold mb-2 text-center">{category}</h2>
            <div className="space-y-4">
                {deals.filter((deal) => deal.category === category).map((deal) => (
                    <Card key={deal.id} deal={deal} moveDeal={moveDeal} />
                ))}
            </div>
        </div>
    );
};