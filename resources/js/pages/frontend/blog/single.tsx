// File: resources/js/Pages/Single.tsx

import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { BlogType, MetaType } from '@/types/globals';
import { getImageUrl } from '@/helper/helpers'; // Your provided helper function
import { Facebook, Linkedin, Twitter, User } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import MainNav from '@/pages/frontend/layouts/MainNav';
import { formatToBengaliDate } from '@/lib/dateFormatter';

interface RelatedBlogsProps {
    data: BlogType[];
}

interface RecentBlogs {
    data: BlogType[];
}

const Single = () => {
    const { blog, relatedBlogs, blogs, meta } = usePage<{ blog: BlogType; meta: MetaType; blogs: RecentBlogs; relatedBlogs: RelatedBlogsProps }>().props;

    // Define explicit dimensions for images to prevent CLS.
    // These should ideally match the desired displayed size and/or the dimensions
    // you pass to getImageUrl if your backend is configured to resize.
    // If your backend *doesn't* resize based on these parameters, use the *actual*
    // width and height you want the image to occupy on the page.
    const MAIN_BLOG_IMG_WIDTH = 800;
    const MAIN_BLOG_IMG_HEIGHT = 400; // Assuming a 2:1 aspect ratio for the main blog image

    const RELATED_BLOG_IMG_WIDTH = 400; // As passed to getImageUrl
    const RELATED_BLOG_IMG_HEIGHT = 250; // As passed to getImageUrl
    // Note: The 'h-40' class (160px) might override height. It's best to either:
    // 1. Ensure the aspect ratio (400:250 = 1.6) matches the h-40's effective ratio if w-full is used.
    // 2. Or, let 'height' attribute take precedence and remove `h-40` class.
    // I'm using the getImageUrl dimensions directly for the width/height attributes for better CLS.

    const RECENT_BLOG_IMG_WIDTH = 80; // As passed to getImageUrl
    const RECENT_BLOG_IMG_HEIGHT = 60; // As passed to getImageUrl
    // Note: 'w-16 h-12' (64x48px) might conflict. I'm removing those to use explicit attrs.


    return (
        <>
            <Head>
                <title>{blog.name || meta?.meta_title }</title>
                <meta name="description" content={meta?.meta_description || 'Default description'} />
                <meta property="og:title" content={meta?.meta_title} />
                <meta property="og:description" content={meta?.meta_description} />
                {/* For meta images, while not direct CLS, explicitly providing dimensions is good for social media crawlers */}
                <meta property="og:image" content={meta?.meta_image ? getImageUrl(meta?.meta_image, 400, 350, meta?.name || 'No Image') : ''} />
                <meta property="og:image:width" content="400" />
                <meta property="og:image:height" content="350" />

                <meta property="og:url" content={blog.slug} />
                <meta property="og:type" content="article" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={meta?.meta_title} />
                <meta name="twitter:description" content={meta?.meta_description} />
                <meta name="twitter:image" content={meta?.meta_image ? getImageUrl(meta?.meta_image, 400, 350, meta?.name || 'No Image') : ''} />
                <meta name="twitter:image:width" content="400" />
                <meta name="twitter:image:height" content="350" />
            </Head>

            <MainNav />

            {/* Main Content */}
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 sm:px-6 lg:px-6 py-8">
                {/* Main Blog */}
                <div className="content lg:col-span-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 rounded shadow-md">
                    {blog.media && (
                        // CLS Fix 1: Add width and height attributes to the main blog image
                        <img
                            src={getImageUrl(blog.media.path, MAIN_BLOG_IMG_WIDTH, MAIN_BLOG_IMG_HEIGHT, blog.media.name || 'No Image')}
                            alt={blog.media.name || 'Blog Post Image'}
                            width={MAIN_BLOG_IMG_WIDTH} // Explicit width
                            height={MAIN_BLOG_IMG_HEIGHT} // Explicit height
                            className="w-full rounded mb-4 object-cover"
                            loading="lazy"
                        />
                    )}
                    <h1 className="font-bold text-3xl mb-4 text-gray-900 dark:text-gray-200">{blog.name}</h1>

                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                        <span>লেখক: {blog.user?.name || 'অজানা'}</span> | <span>প্রকাশিত: {formatToBengaliDate(blog.created_at)}</span> {blog.category && <span> | বিভাগ: {blog.category.name}</span>}
                    </div>

                    {/* dangerouslySetInnerHTML content:
                        IMPORTANT: Images *inside* blog.content rendered via dangerouslySetInnerHTML
                        will NOT automatically have width/height. You must ensure that your rich
                        text editor or backend processing adds these attributes to image tags
                        within the saved HTML content to prevent CLS from those images.
                    */}
                    <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />

                    <div className="flex gap-3 mt-6 items-center">
                        <span className="text-sm text-gray-700 dark:text-gray-300">শেয়ার:</span>
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><Facebook size={18} /></a>
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter"><Twitter size={18} /></a>
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><Linkedin size={18} /></a>
                    </div>

                    <div className="mt-10 p-4 bg-gray-50 dark:bg-gray-800 flex items-center gap-3 rounded">
                        <User size={32} />
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{blog.user?.name}</h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{blog.user?.about}</p>
                        </div>
                    </div>

                    {/* Related Blogs */}
                    {relatedBlogs?.data?.length > 0 && (
                        <section className="mt-12">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">সম্পর্কিত পোস্টসমূহ</h3>
                            <Carousel opts={{ align: 'start' }} className="w-full max-w-screen-lg mx-auto">
                                <CarouselContent>
                                    {relatedBlogs.data.map((post) => (
                                        <CarouselItem key={post.id} className="basis-5/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/2">
                                            <Link href={`/${post.slug}`} className="group block h-full">
                                                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 h-full flex flex-col">
                                                    {post.media?.path && (
                                                        // CLS Fix 2: Add width and height attributes to related blog images
                                                        <img
                                                            src={getImageUrl(post.media.path, RELATED_BLOG_IMG_WIDTH, RELATED_BLOG_IMG_HEIGHT)}
                                                            alt={post.media.name || post.name || 'Related Blog Image'}
                                                            width={RELATED_BLOG_IMG_WIDTH} // Explicit width matching getImageUrl params
                                                            height={RELATED_BLOG_IMG_HEIGHT} // Explicit height matching getImageUrl params
                                                            className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            // Removed h-40 to avoid conflict with explicit height, or ensure it matches
                                                            // If you want h-40 (160px) behavior, adjust RELATED_BLOG_IMG_HEIGHT to 160
                                                            // and RELATED_BLOG_IMG_WIDTH to match the aspect ratio (e.g., 160 * 1.6 = 256)
                                                            style={{ height: '10rem' }} // Tailwind's h-40 is 10rem (160px). Use style to be explicit.
                                                            loading="lazy"
                                                        />
                                                    )}
                                                    <div className="p-4 flex flex-col flex-grow">
                                                        {post.category?.name && (
                                                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full w-fit mb-2 font-semibold dark:bg-yellow-900 dark:text-yellow-200">{post.category.name}</span>
                                                        )}
                                                        <h4 className="font-medium text-gray-900 dark:text-yellow-300 hover:underline line-clamp-2 mb-1">{post.name}</h4>
                                                        <div className="mt-auto text-xs text-gray-600 dark:text-gray-300 flex justify-between">
                                                            <span>{post.user?.name || 'অজানা'}</span>
                                                            <span>{formatToBengaliDate(post.created_at)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </section>
                    )}

                    {/* Comments */}
                    <div className="mt-10">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">মন্তব্য দিন</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">আপনার ইমেইল প্রকাশিত হবে না। প্রয়োজনীয় ঘরগুলো * চিহ্নিত।</p>
                        <form className="mt-4">
                            <textarea className="w-full border dark:border-gray-700 rounded p-3 mb-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" placeholder="আপনার মন্তব্য লিখুন..." rows={4}></textarea>
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">পাঠান</button>
                        </form>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 rounded shadow-md h-fit">
                    <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2">সাম্প্রতিক পোস্ট</h4>
                    <div className="space-y-4">
                        {blogs.data?.map((post: BlogType) => (
                            <Link
                                key={post.id}
                                href={`/${post.slug}`}
                                className="flex items-start gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded transition"
                            >
                                {post.media?.path && (
                                    // CLS Fix 3: Add width and height attributes to recent blog images
                                    <img
                                        src={getImageUrl(post.media.path, RECENT_BLOG_IMG_WIDTH, RECENT_BLOG_IMG_HEIGHT)}
                                        alt={post.media.name || 'Recent Blog Thumbnail'}
                                        width={RECENT_BLOG_IMG_WIDTH} // Explicit width matching getImageUrl params
                                        height={RECENT_BLOG_IMG_HEIGHT} // Explicit height matching getImageUrl params
                                        // Removed w-16 h-12 to avoid conflict.
                                        // If you want w-16 h-12 (64x48px), then adjust RECENT_BLOG_IMG_WIDTH/HEIGHT to 64/48.
                                        className="object-cover rounded"
                                        style={{ width: '4rem', height: '3rem' }} // Explicitly setting styles for w-16 (64px) and h-12 (48px)
                                    />
                                )}
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-yellow-300 hover:underline line-clamp-2">
                                        {post.name}
                                    </h4>
                                    <span className="text-xs text-gray-600 dark:text-gray-300">{formatToBengaliDate(post.created_at)}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-gray-950 to-gray-950 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
                        <div>
                            <h5 className="text-lg font-semibold mb-4 text-yellow-400 tracking-wide">চাকরি গাইড</h5>
                            <p className="text-gray-200 leading-relaxed">
                                চাকরি প্রস্তুতির জন্য নির্ভরযোগ্য প্ল্যাটফর্ম। MCQ কুইজ, গাইড ও চাকরির খবর — সব একসাথে।
                            </p>
                        </div>
                        <div>
                            <h5 className="text-lg font-semibold mb-4 text-yellow-400 tracking-wide">দ্রুত লিংক</h5>
                            <ul className="space-y-2">
                                <li><Link href="/jobs" className="text-gray-100 hover:text-yellow-300">চাকরির খবর</Link></li>
                                <li><Link href="/quiz" className="text-gray-100 hover:text-yellow-300">MCQ অনুশীলন</Link></li>
                                <li><Link href="/guides" className="text-gray-100 hover:text-yellow-300">প্রস্তুতি গাইড</Link></li>
                                <li><Link href="/login" className="text-gray-100 hover:text-yellow-300">লগইন</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-lg font-semibold mb-4 text-yellow-400 tracking-wide">নিউজলেটার</h5>
                            <p className="text-gray-200 mb-3 leading-relaxed">নতুন চাকরির আপডেট পেতে সাবস্ক্রাইব করুন।</p>
                            <form className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="আপনার ইমেইল"
                                    className="w-full px-4 py-2 rounded-md text-sm bg-white text-gray-800 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-md text-sm transition"
                                >
                                    সাবস্ক্রাইব
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="border-t border-blue-800 my-8"></div>
                    <div className="text-center text-gray-400 text-xs">
                        &copy; {new Date().getFullYear()} <span className="font-medium text-white">chakriguide.com</span> | সকল অধিকার সংরক্ষিত
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Single;
