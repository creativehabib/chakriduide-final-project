// resources/js/lib/the_permalink.ts

interface PermalinkOptions {
    slug: string;
    prefix?: string;        // e.g., "blog", "post"
    locale?: string;        // e.g., "en", "bn"
    baseUrl?: string;       // default to window.location.origin
    query?: Record<string, string | number | boolean>;
    hash?: string;
    canonical?: boolean;    // return absolute URL if true
}

export function the_permalink({
                                  slug,
                                  prefix = '',
                                  locale = '',
                                  baseUrl = '',
                                  query,
                                  hash = '',
                                  canonical = false,
                              }: PermalinkOptions): string {
    // Default to current domain
    const origin = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');

    // Build URL parts
    const parts = [];
    if (locale) parts.push(locale);
    if (prefix) parts.push(prefix);
    if (slug) parts.push(slug);

    let url = canonical ? `${origin}/${parts.filter(Boolean).join('/')}` : `/${parts.filter(Boolean).join('/')}`;

    if (query) {
        const queryString = new URLSearchParams(query as Record<string, string>).toString();
        url += `?${queryString}`;
    }

    if (hash) {
        url += `#${hash}`;
    }

    return url;
}
