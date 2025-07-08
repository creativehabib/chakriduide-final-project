// File: resources/js/Pages/Homepage.tsx
import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react'; // Import 'router'
import { ChevronRight } from 'lucide-react';
import { BlogType } from '@/types/globals';
import { getImageUrl } from '@/helper/helpers';
import HerroComponent from '@/pages/frontend/components/HerroComponent';
import MainNav from '@/pages/frontend/layouts/MainNav';
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
    return (
        <>
            {/* ✅ Set meta-title and other tags */}
            <Head>
                <title>চাকরি গাইড - আপনার ক্যারিয়ার সহচর</title>
            </Head>

            <MainNav/>


            {/* Hero Section */}
            <HerroComponent/>

            {/* Job Circular Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h3 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white text-center md:text-left">
                        সাম্প্রতিক চাকরির খবর
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((job) => (
                            <div
                                key={job}
                                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition duration-300 p-6"
                            >
                                <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-400 mb-2">
                                    সরকারি প্রাথমিক শিক্ষক নিয়োগ
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    আবেদনের শেষ তারিখ: ৩০ জুন ২০২৫
                                </p>
                                <Link
                                    href="/jobs/1"
                                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
                                >
                                    বিস্তারিত <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Quiz Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h3 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white text-center md:text-left">
                        বিষয়ভিত্তিক কুইজ অনুশীলন
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {['BCS', 'Bank', 'প্রাথমিক'].map((topic, index) => (
                            <Link
                                key={index}
                                href={`/quiz/${topic.toLowerCase()}`}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition duration-300 p-6"
                            >
                                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{topic} কুইজ</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">১০টি MCQ প্রশ্ন</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guide/Blog Section */}
            <section className="py-12 bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h3 className="text-3xl font-extrabold mb-10 text-gray-900 dark:text-white text-center md:text-left">
                        প্রস্তুতি ও ক্যারিয়ার গাইড
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogList.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
                            >
                                {/* Image */}
                                <div className="overflow-hidden rounded-t-xl">
                                    <img
                                        src={getImageUrl(post.media?.path, 400, 350, post.media?.name || 'No Image')}
                                        alt={post.media?.name || post.name}
                                        className="w-full h-48 object-cover rounded-t-xl transform transition-transform duration-300 hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white line-clamp-2">
                                        {post.name}
                                    </h4>

                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3">
                                        {post.description}
                                    </p>

                                    {/* Read More Link */}
                                    <a
                                        href={`/${post.slug}`}
                                        className="mt-auto text-yellow-600 font-semibold hover:underline cursor-pointer"
                                    >
                                        আরও পড়ুন &rarr;
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    {!nextPageUrl ? (
                        <p className="text-center mt-12 text-gray-500 dark:text-gray-400 text-lg font-medium">
                            আর কিছু নেই
                        </p>
                    ) : (
                        <div className="text-center mt-12">
                            <button
                                onClick={loadMore}
                                disabled={loading}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'লোড হচ্ছে...' : 'আরও দেখুন'}
                            </button>
                        </div>
                    )}
                </div>
            </section>


            {/* Footer */}
            <footer className="bg-gradient-to-r from-gray-950  to-gray-950 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
                        {/* About */}
                        <div>
                            <h5 className="text-lg font-semibold mb-4 text-yellow-400 tracking-wide">চাকরি গাইড</h5>
                            <p className="text-gray-300 leading-relaxed">
                                চাকরি প্রস্তুতির জন্য নির্ভরযোগ্য প্ল্যাটফর্ম। MCQ কুইজ, গাইড ও চাকরির খবর — সব একসাথে।
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h5 className="text-lg font-semibold mb-4 text-yellow-400 tracking-wide">দ্রুত লিংক</h5>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/jobs" className="text-gray-300 hover:text-yellow-300 transition duration-200">
                                        চাকরির খবর
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/quiz" className="text-gray-300 hover:text-yellow-300 transition duration-200">
                                        MCQ অনুশীলন
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/guides" className="text-gray-300 hover:text-yellow-300 transition duration-200">
                                        প্রস্তুতি গাইড
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/login" className="text-gray-300 hover:text-yellow-300 transition duration-200">
                                        লগইন
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h5 className="text-lg font-semibold mb-4 text-yellow-400 tracking-wide">নিউজলেটার</h5>
                            <p className="text-gray-300 mb-3 leading-relaxed">
                                নতুন চাকরির আপডেট পেতে সাবস্ক্রাইব করুন।
                            </p>
                            <form className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="আপনার ইমেইল"
                                    className="w-full px-4 py-2 rounded-md text-sm bg-white text-gray-800 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-5 py-2 rounded-md text-sm transition"
                                >
                                    সাবস্ক্রাইব
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-blue-800 my-8"></div>

                    {/* Footer bottom */}
                    <div className="text-center text-gray-400 text-xs">
                        &copy; {new Date().getFullYear()} <span className="font-medium text-white">chakriguide.com</span> | সকল অধিকার সংরক্ষিত
                    </div>
                </div>
            </footer>

        </>
    );
}
