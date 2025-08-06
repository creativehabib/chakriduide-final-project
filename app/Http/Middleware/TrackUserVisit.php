<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\UserVisit;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Jenssegers\Agent\Agent; // Agent লাইব্রেরি ইম্পোর্ট করা হয়েছে

class TrackUserVisit
{
    /**
     * হ্যান্ডেল একটি ইনকামিং রিকোয়েস্ট।
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $ipAddress = $request->ip();
        $userAgent = $request->header('User-Agent');
        $sessionId = Session::getId();
        $userId = Auth::id();

        // এই ভিজিটটি একই সেশনে ইতিমধ্যেই রেকর্ড করা হয়েছে কিনা তা চেক করা হচ্ছে।
        if (!Session::has('visit_recorded_for_session')) {
            $agent = new Agent(); // Agent ইনস্ট্যান্স তৈরি করা হয়েছে
            $agent->setUserAgent($userAgent);

            // জিওলোকেশন ডেটা সংগ্রহ করা।
            $locationData = $this->getLocationFromIp($ipAddress);

            UserVisit::create([
                'session_id' => $sessionId,
                'ip_address' => $ipAddress,
                'user_agent' => $userAgent,
                'browser' => $agent->browser(), // ব্রাউজার
                'os' => $agent->platform(),    // অপারেটিং সিস্টেম
                'device' => $agent->device(),  // ডিভাইসের নাম
                'device_type' => $agent->isDesktop() ? 'desktop' : ($agent->isTablet() ? 'tablet' : 'mobile'), // ডিভাইসের ধরন
                'user_id' => $userId,
                'country' => $locationData['country'] ?? null,
                'city' => $locationData['city'] ?? null,
                'region' => $locationData['region'] ?? null,
                'zip' => $locationData['zip'] ?? null,
                'latitude' => $locationData['lat'] ?? null,
                'longitude' => $locationData['long'] ?? null,
                'long_react' => $locationData['long'] ?? null,
                'timezone' => $locationData['timeZone'] ?? null,
            ]);

            Session::put('visit_recorded_for_session', true);
        }

        return $next($request);
    }

    /**
     * ডেমো ফাংশন যা একটি IP ঠিকানা থেকে জিওলোকেশন ডেটা রিটার্ন করবে।
     *
     * @param string $ip
     * @return array
     */
    protected function getLocationFromIp(string $ip): array
    {
        // এখানে জিওলোকেশন লাইব্রেরি বা API কল করার লজিক থাকবে
        // আপাতত একটি ডামি ডেটা রিটার্ন করা হচ্ছে
        return [
            'country' => 'Bangladesh',
            'city' => 'Dhaka',
            'region' => 'Dhaka Division',
            'zip' => '1200',
            'lat' => '23.8103',
            'long' => '90.4125',
            'timeZone' => 'Asia/Dhaka'
        ];
    }
}
