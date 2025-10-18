import React, { useState } from 'react';
import Card from '../components/Card';
import { RESOURCES_DATA } from '../constants';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const resourceCategories = ['All', 'AI', 'CSE', 'Electronics', 'Mechanical'];

const ResourcesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredResources = RESOURCES_DATA
        .filter(r => activeFilter === 'All' || r.category === activeFilter)
        .filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
    const paginatedResources = filteredResources.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="space-y-16">
            <div className="text-center">
                <h1 className="text-4xl font-bold font-heading text-text-primary mb-2">Resource Hub</h1>
                <p className="text-lg text-text-secondary">Find notes, lecture recordings, and study materials curated for you.</p>
            </div>

            {/* Search and Filters */}
            <div className="space-y-6">
                <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input
                        type="text"
                        placeholder="Search for resources..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-accent bg-white/10 border-white/20 placeholder:text-text-secondary text-text-primary"
                    />
                </div>
                <div className="flex justify-center flex-wrap gap-3">
                    {resourceCategories.map(category => (
                        <button
                            key={category}
                            onClick={() => { setActiveFilter(category); setCurrentPage(1); }}
                            className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors ${activeFilter === category ? 'bg-primary text-white shadow' : 'bg-white/10 text-text-secondary hover:bg-white/20'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Resources Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                {paginatedResources.map(resource => (
                    <Card key={resource.id} className="flex flex-col">
                        <div className="flex-grow">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-primary/20 p-3 rounded-full">
                                    <resource.icon className="h-6 w-6 text-accent" />
                                </div>
                                <span className="bg-primary/30 text-accent text-xs font-bold px-3 py-1 rounded-full">{resource.category}</span>
                            </div>
                            <h3 className="text-xl font-semibold font-heading text-text-primary mb-2">{resource.title}</h3>
                            <p className="text-text-secondary text-sm">{resource.description}</p>
                        </div>
                        <button className="mt-6 w-full bg-primary/80 text-white py-2 rounded-lg font-semibold hover:bg-primary flex items-center justify-center gap-2 transition-colors">
                            <Download size={18} /> Download {resource.fileType}
                        </button>
                    </Card>
                ))}
            </div>

             {/* Pagination */}
            <div className="flex justify-center items-center gap-4">
                <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                    disabled={currentPage === 1}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50"
                >
                    <ChevronLeft />
                </button>
                <span className="font-semibold">Page {currentPage} of {totalPages}</span>
                 <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50"
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
};

export default ResourcesPage;