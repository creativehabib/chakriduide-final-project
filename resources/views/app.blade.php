@php use App\Models\Setting; @endphp
    <!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    @php
        // Retrieve Inertia meta props or defaults
        $props = $page['props'] ?? [];
        $meta = $props['meta'] ?? [];

        $title = $meta['meta_title']    ?? Setting::get('meta_title', config('app.name'));
        $description = $meta['meta_description'] ?? Setting::get('meta_description', 'Default description for the site.');
        $image = $meta['meta_image'] ?? null;
        $imagePath = $image ? asset('storage/' . $image) : asset(Setting::get('og_image', 'default-image.jpg'));
        $url = $meta['url']            ?? url()->current();
        $allowIndex = Setting::get('allow_indexing', true);
        $index = $meta['index'] ?? $allowIndex;
    @endphp

    {{-- Primary SEO --}}
    <title inertia>{{ $title }}</title>
    <meta name="description" content="{{ $description }}">
    @unless($index)
        <meta name="robots" content="noindex, nofollow">
    @endunless
    <link rel="canonical" href="{{ $url }}">

    {{-- Open Graph / Facebook --}}
    <meta property="og:type"        content="article">
    <meta property="og:site_name"   content="{{ config('app.name') }}">
    <meta property="og:title"       content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
    <meta property="og:image"       content="{{ $imagePath }}">
    <meta property="og:url"         content="{{ $url }}">

    {{-- Twitter Card --}}
    <meta name="twitter:card"        content="summary_large_image">
    <meta name="twitter:site"        content="@YourTwitterHandle">
    <meta name="twitter:title"       content="{{ $title }}">
    <meta name="twitter:description" content="{{ $description }}">
    <meta name="twitter:image"       content="{{ $imagePath }}">

    {{-- Facebook Pixel (optional) --}}
    @if($pixel = Setting::get('meta_pixel_id'))
        <script>
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '{{ $pixel }}');
            fbq('track', 'PageView');
        </script>
        <noscript>
            <img height="1" width="1" style="display:none"
                 src="https://www.facebook.com/tr?id={{ $pixel }}&ev=PageView&noscript=1"/>
        </noscript>
    @endif

    {{-- Dark-mode init --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? "system" }}';
            if (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            }
        })();
    </script>

    {{-- Inline background color --}}
    <style>
        html { background-color: oklch(1 0 0); }
        html.dark { background-color: oklch(0.145 0 0); }
    </style>

    {{-- Favicon & Fonts --}}
    <link rel="icon" href="{{ asset(Setting::get('favicon', 'favicon.ico')) }}" sizes="any">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" href="/fonts/roboto-regular-webfont.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="/fonts/ShurjoWeb_400.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="/fonts/ShurjoWeb_700.woff2" as="font" type="font/woff2" crossorigin="anonymous">

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>
<body class="font-sans antialiased">
    @inertia
</body>
</html>
