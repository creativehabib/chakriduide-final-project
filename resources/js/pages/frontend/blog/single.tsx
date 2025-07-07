import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { BlogType } from '@/types/globals';
import { getImageUrl } from '@/helper/helpers';
import { Facebook, Linkedin, Twitter, User } from 'lucide-react';

interface RelatedBlogsProps {
    data: BlogType[];
}
const Single = () => {
    const { blog, relatedBlogs } = usePage<{ blog: BlogType; relatedBlogs: RelatedBlogsProps }>().props;
    console.log('Related Post',relatedBlogs);
    return (
        <>
            <Head>
                <title>{blog.name}</title>
                <meta name="description" content={blog.meta_description || 'Blog post details'} />
                <link rel="canonical" href={`/${blog.slug}`} />
                <meta property="og:title" content={blog.meta_title} />
                <meta property="og:description" content={blog.meta_description || 'Blog post details'} />
                {blog.meta_image?.path && (
                    <meta property="og:image" content={getImageUrl(
                        blog.meta_image?.path,
                        400,
                        350,
                        blog.meta_image?.name || 'No Image'
                    )} />
                )}
                <style>
                    {`
                       p{
                            font-size: 1rem;
                            line-height: 1.6;
                            margin-bottom: 1rem;
                            letter-spacing: 0.5px;
                       }
                       h1, h2, h3, h4, h5 {
                            font-weight: 600;
                            margin-bottom: 0.5rem;
                       }
                       h1 {
                            font-size: 2rem;
                            margin-top: 1.5rem;
                       }
                       h2 {
                            font-size: 1.75rem;
                            margin-top: 1.25rem;
                       }
                       h3 {
                            font-size: 1.5rem;
                            margin-top: 1rem;
                       }
                       h4{
                            font-size: 1.25rem;
                            margin-top: 0.75rem;
                       }
                       table{
                            border-collapse:collapse;
                            width: 100%;
                            margin: 1rem 0;
                            font-size: 0.9rem;
                            color: #333;
                            background-color: #f9f9f9;
                            border-radius: 0.5rem;
                       }
                       th, td {
                            border: 1px solid #ddd;
                            padding: 2px;
                            }

                          th {
                            background-color: #f2f2f2;
                            font-weight: 600;
                            text-align: left;
                            }
                          td {
                            text-align: left;
                            }
                          blockquote {
                            margin: 1rem 0;
                            padding: 0.5rem 1rem;
                            border-left: 4px solid #ccc;
                            background-color: #f9f9f9;
                            font-style: italic;
                            color: #555;
                            }
                          ul{
                            padding-left: 1.5rem;
                            margin-bottom: 1rem;
                            line-height: 1.6;
                            list-style-type: square;
                          }
                          li {
                             margin-bottom: 0.5rem;
                             line-height: 1.6;
                            }

                       ol {
                            padding-left: 1.5rem;
                            margin-bottom: 1rem;
                            list-style-type: decimal;
                            line-height: 1.6;
                       }
                    `}
                </style>
            </Head>
            <header className="bg-gray-100 shadow-md sticky top-0 z-50">
                <div className="container mx-auto text-gray-800 flex justify-between items-center px-4 py-2">
                    <Link href="/" className="text-2xl font-bold text-blue-900 hover:text-blue-700">
                        <img src={'logo.svg'} width={'120px'} height={'20px'} alt='logo'/>
                    </Link>
                    <nav className="hidden md:flex gap-6 text-sm font-medium flex items-center">
                        <Link href="/jobs" className="hover:text-yellow-300">চাকরির খবর</Link>
                        <Link href="/quiz" className="hover:text-yellow-300">MCQ কুইজ</Link>
                        <Link href="/guides" className="hover:text-yellow-300">প্রস্তুতি গাইড</Link>
                        <Link href="/login" className="bg-yellow-400 text-blue-900 px-4 py-1.5 rounded hover:bg-yellow-300">লগইন</Link>
                    </nav>
                </div>
            </header>

            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 py-8">
                {/* Left: Post Content */}
                <div className="lg:col-span-8 border p-6 rounded shadow-md">
                    <div className="mb-4">
                        {blog.media && (
                            <img
                                src={getImageUrl(blog.media.path, 800, 400, blog.media.name || 'No Image')}
                                alt={blog.media.name}
                                className="w-full rounded mb-4"
                            />
                        )}
                    </div>
                    <h2 className="font-bold mb-4">{blog.name}</h2>
                    <div className="text-sm text-gray-600 mb-4">
                        <span>লেখক: {blog.user?.name || 'অজানা'}</span> |
                        <span> প্রকাশিত: {new Date(blog.created_at).toLocaleDateString('bn-BD')}</span>
                        {blog.category && <span> | বিভাগ: {blog.category.name}</span>}
                    </div>
                    <div className="prose lg:prose-xl max-w-none dark:prose-invert leading-8">
                        <div className={'prose prose-sm sm:prose lg:prose-lg max-w-none'} dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>

                    {/* Share buttons */}
                    <div className="flex gap-3 mt-6 items-center">
                        <span className="text-sm">শেয়ার:</span>
                        <a href={'#'} target="_blank"><Facebook size={18} /></a>
                        <a href={'#'} target="_blank"><Twitter size={18} /></a>
                        <a href={'#'} target="_blank"><Linkedin size={18} /></a>
                    </div>

                    {/* Author Info */}
                    <div className="mt-10 p-4 bg-gray-100 flex items-center gap-3 rounded">
                        <User size={32} />
                        <div>
                            <h4 className="font-semibold text-gray-800">{blog.user?.name}</h4>
                            <p className="text-sm text-gray-600">{blog.user?.about}</p>
                        </div>
                    </div>

                    {/* Comment Box */}
                    <div className="mt-10">
                        <h3 className="text-xl font-bold mb-3">মন্তব্য দিন</h3>
                        <p>Your email address will not be published. Required fields are marked *</p>
                        <form>
                            <textarea className="w-full border rounded p-3 mb-3" placeholder="আপনার মন্তব্য লিখুন..." rows={4}></textarea>
                            <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded">পাঠান</button>
                        </form>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-4 border p-6 rounded shadow-md sticky">
                    <h4 className="text-lg font-semibold mb-3">সম্পর্কিত পোস্ট</h4>
                    <div className="space-y-3">
                        {relatedBlogs?.data?.map((post: BlogType) => (
                            <Link
                                key={post.id}
                                href={`/${post.slug}`}
                                className="block hover:bg-gray-50 p-3 rounded transition"
                            >
                                <div>
                                    {post.media && (
                                        <img
                                            src={getImageUrl(post.media.path, 150, 100, post.media.name || 'No Image')}
                                            alt={post.media.name}
                                            className="w-full h-30 object-cover rounded mb-2"
                                        />
                                    )}
                                    <h5 className="font-medium hover:underline text-blue-600">{post.name}</h5>
                                    <div className="text-sm text-gray-600 mb-2">
                                        <span>লেখক: {post.user?.name || 'অজানা'}</span> |
                                        <span> প্রকাশিত: {new Date(post.created_at).toLocaleDateString('bn-BD')}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Single;
