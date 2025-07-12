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

            $title = $meta['meta_title'] ?? Setting::get('meta_title', config('app.name'));
            $siteName = Setting::get('site_name', 'চাকরি গাইড');
            $description = $meta['meta_description'] ?? Setting::get('site_description', 'Default description for the site.');
            $siteKeywords = Setting::get('site_keywords', 'default, keywords, for, the, site');
            $image = $meta['meta_image'] ?? null;
            $imagePath = $image ? asset('storage/' . $image) : asset('storage/'.Setting::get('og_image', 'default-image.jpg'));
            $url = $meta['url']            ?? url()->current();
            $favicon = Setting::get('favicon') ? asset('storage/' . Setting::get('favicon')) : asset('favicon.ico');
            $adsenseId = Setting::get('google_adsense_id', 'ca-pub-XXXXXXXXXXXXXXX');
            $allowIndex = Setting::get('allow_indexing', true);
            $index = $meta['index'] ?? $allowIndex;
            if (!$allowIndex) {
                $index = false;
            }
        @endphp

        {{-- Primary SEO --}}
        <title inertia>{{ $title ?? config('app.name') }} | {{config('app.name')}}</title>
        <meta name="description" content="{{ $description }}">
        <meta name="keywords" content="{{ $siteKeywords }}">
        <meta name="author" content="চাকরি গাইড টিম">
        {{-- Meta Tag --}}
        @unless($index)
            <meta name="robots" content="noindex, nofollow">
        @else
            <meta name="robots" content="index, follow">
        @endunless

        {{-- Schema.org --}}
        <link rel="canonical" href="{{ $url }}">

        {{-- Open Graph / Facebook --}}
        <meta property="og:type"        content="article">
        <meta property="og:site_name"   content="{{ $siteName }}">
        <meta property="og:title"       content="{{ $title }}">
        <meta property="og:description" content="{{ $description }}">
        <meta property="og:image"       content="{{ $imagePath }}">
        <meta property="og:url"         content="{{ $url }}">

        {{-- Twitter Card --}}
        <meta name="twitter:card"        content="summary_large_image">
        <meta property="twitter:url"     content="{{ $url }}">
        <meta name="twitter:title"       content="{{ $title }}">
        <meta name="twitter:description" content="{{ $description }}">
        <meta name="twitter:image"       content="{{ $imagePath }}">

        @if($script = Setting::get('header_script')) {!! $script !!} @endif

        {{-- Facebook Pixel--}}
        @if($pixel = Setting::get('meta_pixel_id'))
            <script>
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '{{ $pixel }}');
                fbq('track', 'PageView');
            </script>
            <noscript><img height="1" width="1" style="display:none"
                           src="https://www.facebook.com/tr?id={{ $pixel }}&ev=PageView&noscript=1" alt="pixel"/></noscript>
        @endif

        @if($ga = Setting::get('google_analytics_id'))
            <script async src="https://www.googletagmanager.com/gtag/js?id={{ $ga }}"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '{{ $ga }}');
            </script>
        @endif



        @if($cookie = Setting::get('cookie_consent_text'))
            <script>
                window.onload = () => {
                    if (!localStorage.getItem('cookie_accepted')) {
                        const c = document.createElement('div');
                        c.innerHTML = `{!! addslashes($cookie) !!}`;
                        c.className = "fixed bottom-0 left-0 right-0 bg-black text-white text-sm p-4 z-50 text-center";
                        const b = document.createElement('button');
                        b.innerText = 'ঠিক আছে';
                        b.className = "bg-white text-black ml-4 px-3 py-1 rounded";
                        b.onclick = () => {
                            localStorage.setItem('cookie_accepted', 'yes');
                            c.remove();
                        };
                        c.appendChild(b);
                        document.body.appendChild(c);
                    }
                }
            </script>
        @endif

        <!-- Google AdSense -->
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={{$adsenseId}}" crossorigin="anonymous">
            window.adsbygoogle = window.adsbygoogle || [];
            adsbygoogle.push({
                google_ad_client: "{{ $adsenseId }}",
                enable_page_level_ads: true,
                overlays: {bottom: true}  // bottom banner
            });
        </script>

        {{-- Inline background color --}}
        <style>
            html { background-color: oklch(1 0 0); }
            html.dark { background-color: oklch(0.145 0 0); }
        </style>

        {{-- Favicon & Fonts --}}
        <link rel="icon" href="{{ $favicon }}" type="image/x-icon" sizes="any">
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

        @if($footerScript = Setting::get('footer_script'))
            {!! $footerScript !!}
        @endif
    </body>
</html>
