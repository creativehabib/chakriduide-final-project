import { Link } from '@inertiajs/react';
import { Button } from './ui/button';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { MetaType } from '@/types/globals';

interface Props {
    meta: MetaType;
    range?: number; // number of pages to show before/after the current
}

export default function InertiaPagination({ meta, range = 2 }: Props) {
    const { current_page, last_page, from, to, total, links } = meta;

    // ⛔ Don't render pagination if no items or only one page
    if (!total || last_page <= 1) return null;

    const prevLink = links.find((l) => l.label.toLowerCase().includes('previous'));
    const nextLink = links.find((l) => l.label.toLowerCase().includes('next'));

    const createPagination = () => {
        const pages: (number | string)[] = [];

        // First page logic
        if (current_page > range + 2) {
            pages.push(1, '...');
        } else {
            for (let i = 1; i < current_page; i++) {
                if (i >= current_page - range) pages.push(i);
            }
        }

        // Middle pages
        for (let i = current_page - range; i <= current_page + range; i++) {
            if (i > 1 && i < last_page) pages.push(i);
        }

        // Last page logic
        if (current_page < last_page - range - 1) {
            pages.push('...', last_page);
        } else {
            for (let i = current_page + 1; i <= last_page; i++) {
                if (i <= current_page + range) pages.push(i);
            }
        }

        return [...new Set([1, ...pages, last_page])];
    };

    const paginationItems = createPagination();

    return (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 px-10 sm:justify-between">
            <div>
                {from} - {to} of {total}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
                {/* Previous Button */}
                <Button
                    variant="outline"
                    disabled={!prevLink?.url}
                    className={!prevLink?.url ? 'opacity-50 cursor-not-allowed' : ''}
                    asChild={!!prevLink?.url}
                >
                    {prevLink?.url ? (
                        <Link href={prevLink.url} preserveScroll preserveState>
                            <ChevronsLeft />
                        </Link>
                    ) : (
                        <span><ChevronsLeft /></span>
                    )}
                </Button>

                {/* Page Buttons */}
                {paginationItems.map((item, index) => {
                    if (typeof item === 'string') {
                        return (
                            <Button key={index} variant="outline" disabled className="cursor-default opacity-50">
                                ...
                            </Button>
                        );
                    }

                    const link = links.find((l) => l.label === item.toString());

                    if (!link || !link.url) {
                        return (
                            <Button key={index} variant="outline" disabled className="opacity-50">
                                {item}
                            </Button>
                        );
                    }

                    return (
                        <Button key={index} asChild variant={link.active ? 'default' : 'outline'}>
                            <Link href={link.url} preserveScroll preserveState>
                                {item}
                            </Link>
                        </Button>
                    );
                })}

                {/* Next Button */}
                <Button
                    variant="outline"
                    disabled={!nextLink?.url}
                    className={!nextLink?.url ? 'opacity-50 cursor-not-allowed' : ''}
                    asChild={!!nextLink?.url}
                >
                    {nextLink?.url ? (
                        <Link href={nextLink.url} preserveScroll preserveState>
                            <ChevronsRight />
                        </Link>
                    ) : (
                        <span><ChevronsRight /></span>
                    )}
                </Button>
            </div>
        </div>
    );
}
