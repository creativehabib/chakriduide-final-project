import { useEffect, useState } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

type Status = 'checking' | 'available' | 'taken' | null;

export function useSlugChecker(slug: string, table: string = 'blogs', ignoreId?: number) {
    const [status, setStatus] = useState<Status>(null);

    useEffect(() => {
        if (!slug) return setStatus(null);

        const check = debounce(async () => {
            try {
                const res = await axios.get('/admin/slug-check', {
                    params: {
                        slug,
                        table,
                        ignore_id: ignoreId, // ✅ pass ignoreId
                    },
                });
                setStatus(res.data.available ? 'available' : 'taken');
            } catch {
                setStatus(null);
            }
        }, 500);

        setStatus('checking');
        check();

        return () => {
            check.cancel();
        };
    }, [slug, table, ignoreId]);

    return status;
}
