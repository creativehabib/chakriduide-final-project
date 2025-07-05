<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckInstallation
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the application is installed
        $installed = config('app.installed', false);
        $isInstallRoute = $request->is('install*');
        if (!$installed && !$isInstallRoute) {
            // If not installed and not accessing installation routes, redirect to installation
            return redirect()->route('install');
        }
        // If installed or accessing installation routes, allow the request to proceed
        if ($installed && $isInstallRoute) {
            // If already installed and trying to access installation routes, redirect to home
            return redirect()->route('home');
        }
        // Allow the request to proceed
        return $next($request);
    }
}
