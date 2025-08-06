import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { formatTimeAgo } from '@/helper/helpers';

const VisitorsInfo = ({ visits }: { visits: any }) => {
    return (
        <AppLayout>
            <Head title={'Visitor Information'}/>
            <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">Visitor Information</h1>
                </div>

                {/* Main Content: Table for Visitor Data */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full leading-normal">
                            <thead>
                            <tr className="bg-gray-100 border-b border-gray-200 text-gray-600 uppercase text-xs font-semibold">
                                <th className="px-5 py-3 text-left">ID</th>
                                <th className="px-5 py-3 text-left">IP Address</th>
                                <th className="px-5 py-3 text-left">Browser</th> {/* নতুন */}
                                <th className="px-5 py-3 text-left">OS</th>      {/* নতুন */}
                                <th className="px-5 py-3 text-left">Device</th>  {/* নতুন */}
                                <th className="px-5 py-3 text-left">Device Type</th> {/* নতুন */}
                                <th className="px-5 py-3 text-left">Country</th>
                                <th className="px-5 py-3 text-left">City</th>
                                <th className="px-5 py-3 text-left">Timezone</th>
                                <th className="px-5 py-3 text-left">User ID</th>
                                <th className="px-5 py-3 text-left">Visited At</th>
                            </tr>
                            </thead>
                            <tbody>
                            {visits.data.length > 0 ? (
                                visits.data.map((visit: any) => (
                                    <tr key={visit.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="px-5 py-5 text-sm text-gray-900">{visit.id}</td>
                                        <td className="px-5 py-5 text-sm text-gray-900">{visit.ip_address}</td>
                                        <td className="px-5 py-5 text-sm text-gray-900">{visit.browser || 'N/A'}</td> {/* নতুন */}
                                        <td className="px-5 py-5 text-sm text-gray-900">{visit.os || 'N/A'}</td>      {/* নতুন */}
                                        <td className="px-5 py-5 text-sm text-gray-900">{visit.device || 'N/A'}</td>  {/* নতুন */}
                                        <td className="px-5 py-5 text-sm text-gray-900">{visit.device_type || 'N/A'}</td> {/* নতুন */}
                                        <td className="px-5 py-5 text-sm text-gray-900">{visit.country || 'N/A'}</td>
                                        <td className="px-5 py-5 text-sm text-gray-900">{visit.city || 'N/A'}</td>
                                        <td className="px-5 py-5 text-sm text-gray-900">{visit.timezone || 'N/A'}</td>
                                        <td className="px-5 py-5 text-sm text-gray-900">{visit.user_id || 'Guest'}</td>
                                        <td className="px-5 py-5 text-sm text-gray-900">{formatTimeAgo(visit.created_at)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={11} className="px-5 py-5 text-sm text-gray-500 text-center"> {/* colSpan আপডেট করা হয়েছে */}
                                        No visitor data found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Links */}
                {visits.links && visits.links.length > 3 && (
                    <div className="flex justify-center mt-8">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            {visits.links.map((link: any, index: number) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'} // Fallback for null URLs
                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                        link.active
                                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                    } ${index === 0 ? 'rounded-l-md' : ''} ${index === visits.links.length - 1 ? 'rounded-r-md' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    preserveScroll
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default VisitorsInfo;
