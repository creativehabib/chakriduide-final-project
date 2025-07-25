<?php echo '<?xml version="1.0" encoding="UTF-8"?>';?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>{{ url('/') }}</loc>
        <lastmod>{{ now()->toAtomString() }}</lastmod>
        <priority>1.0</priority>
    </url>

    @foreach ($posts as $post)
        <url>
            <loc>{{ url('/' . $post->slug) }}</loc>
            <lastmod>{{ $post->updated_at->toAtomString() }}</lastmod>
            <changefreq>daily</changefreq>
            <priority>0.80</priority>
        </url>
    @endforeach
</urlset>
