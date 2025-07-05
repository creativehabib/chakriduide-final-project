// File: resources/js/Pages/Homepage.tsx
import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react'; // Import 'router'
import { ChevronRight } from 'lucide-react';
import { BlogType } from '@/types/globals';
import { getImageUrl } from '@/helper/helpers';
export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
}

export default function Homepage() {
    const { blogs } = usePage<{ blogs: PaginatedData<BlogType> }>().props;

    const [blogList, setBlogList] = useState(blogs.data || []);
    const [nextPageUrl, setNextPageUrl] = useState(blogs.links.next || null);
    const [loading, setLoading] = useState(false);

    const loadMore = () => { // No need for 'async' here for Inertia.get
        if (!nextPageUrl) return;
        setLoading(true);

        // Use Inertia.get to visit the next page URL
        router.get(
            nextPageUrl,
            {}, // Empty data object, as we're just navigating
            {
                preserveScroll: true, // Keep scroll position
                preserveState: true,   // Preserve current component state
                onSuccess: (page) => {
                    // When the new page data is successfully loaded
                    const newBlogs = (page.props.blogs as PaginatedData<BlogType>);
                    setBlogList(prev => [...prev, ...newBlogs.data]);
                    setNextPageUrl(newBlogs.links.next);
                    setLoading(false);
                },
                onError: (errors) => {
                    console.error('Failed to load more blogs:', errors);
                    setLoading(false);
                }
            }
        );
    };
console.log(blogs)
    return (
        <>
            {/* ✅ Set meta-title and other tags */}
            <Head>
                <title>চাকরি গাইড - আপনার ক্যারিয়ার সহচর</title>
            </Head>
            {/* Header */}
            <header className="bg-gray-100 shadow-md sticky top-0 z-50">
                <div className="container mx-auto text-gray-800 flex justify-between items-center px-4 py-4">
                    <Link href="/" className="text-2xl font-bold text-blue-900 hover:text-blue-700">
                        <img src={'logo.svg'} width={'120px'} height={'40px'} alt='logo'/>
                    </Link>
                    <nav className="hidden md:flex gap-6 text-sm font-medium">
                        <Link href="/jobs" className="hover:text-yellow-300">চাকরির খবর</Link>
                        <Link href="/quiz" className="hover:text-yellow-300">MCQ কুইজ</Link>
                        <Link href="/guides" className="hover:text-yellow-300">প্রস্তুতি গাইড</Link>
                        <Link href="/login" className="bg-yellow-400 text-blue-900 px-4 py-1.5 rounded hover:bg-yellow-300">লগইন</Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-4xl font-bold text-blue-900 mb-4 leading-snug">আপনার ক্যারিয়ারের জন্য <br /> সম্পূর্ণ গাইডলাইন</h2>
                    <p className="text-gray-700 mb-8 text-lg">নিয়োগ বিজ্ঞপ্তি, প্রস্তুতি কুইজ ও MCQ অনুশীলন একসাথে</p>
                    <div className="flex justify-center flex-wrap gap-4">
                        <Link href="/quiz" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-base font-medium">MCQ অনুশীলন শুরু করুন</Link>
                        <Link href="/jobs" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-base font-medium">চাকরির খবর দেখুন</Link>
                    </div>
                </div>
            </section>

            {/* Job Circular Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-semibold mb-6">সাম্প্রতিক চাকরির খবর</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((job) => (
                            <div key={job} className="bg-gray-50 p-5 rounded-lg shadow hover:shadow-md transition">
                                <h4 className="text-lg font-semibold text-blue-800">সরকারি প্রাথমিক শিক্ষক নিয়োগ</h4>
                                <p className="text-sm text-gray-600">আবেদনের শেষ তারিখ: ৩০ জুন ২০২৫</p>
                                <Link href="/jobs/1" className="inline-flex items-center text-blue-600 mt-3 font-medium hover:underline">
                                    বিস্তারিত <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quiz Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-semibold mb-6">বিষয়ভিত্তিক কুইজ অনুশীলন</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['BCS', 'Bank', 'প্রাথমিক'].map((topic, index) => (
                            <Link
                                key={index}
                                href={`/quiz/${topic.toLowerCase()}`}
                                className="block bg-white rounded-lg shadow p-5 hover:shadow-md border border-gray-200"
                            >
                                <h4 className="text-lg font-bold text-gray-800">{topic} কুইজ</h4>
                                <p className="text-sm text-gray-600">১০টি MCQ প্রশ্ন</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guide/Blog Section */}
            <section className="py-12 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-semibold mb-6">প্রস্তুতি ও ক্যারিয়ার গাইড</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogList.map((post) => (
                            <Link
                                key={post.id}
                                href={`/${post.slug}`}
                                className="bg-gray-50 p-5 rounded-lg shadow hover:shadow-md dark:bg-gray-800 transition dark:text-white"
                            >
                                <img
                                    src={getImageUrl(
                                        post.media?.path,
                                        400,
                                        350,
                                        post.media?.name || 'No Image'
                                    )}
                                    alt={post.media?.name || post.name}
                                    className="h-40 w-full object-cover rounded mb-4"
                                />
                                <h4 className="text-lg font-semibold">{post.name}</h4>
                                <p className="text-sm text-gray-700 mt-2 line-clamp-3 dark:text-gray-50">{post.description}</p>
                                <span className="text-yellow-600 mt-2 inline-block font-medium hover:underline">আরও পড়ুন</span>
                            </Link>
                        ))}
                    </div>
                    {/* Load More Button */}
                    {nextPageUrl && (
                        <div className="text-center mt-8">
                            <button
                                onClick={loadMore}
                                disabled={loading}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded text-base font-medium"
                            >
                                {loading ? 'লোড হচ্ছে...' : 'আরও দেখুন'}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-6 mt-12">
                <div className="container mx-auto px-4 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} chakriguide.com | সকল অধিকার সংরক্ষিত</p>
                </div>
            </footer>
        </>
    );
}
