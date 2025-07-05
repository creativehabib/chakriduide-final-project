import { the_permalink } from '@/lib/the_permalink';
import { Link } from '@inertiajs/react';
import React from 'react';

interface Props {
    slug: string;
    name?: string;
    prefix?: string;
    locale?: string;
    className?: string;
    children?: React.ReactNode;
    query?: Record<string, string | number | boolean>;
    hash?: string;
}

const Permalink: React.FC<Props> = ({
                                        slug,
                                        name,
                                        prefix = '',
                                        locale,
                                        className = '',
                                        children,
                                        query,
                                        hash
                                    }) => {
    const href = the_permalink({ slug, prefix, locale, query, hash });

    return (
        <Link href={href} className={`text-blue-600 hover:underline ${className}`} target="_blank">
            {children || name || slug}
        </Link>
    );
};

export default Permalink;
