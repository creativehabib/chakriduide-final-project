<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class InstallController extends Controller
{
    public function step0()
    {
        return Inertia::render('installation/step0');
    }

    public function step1()
    {
        $phpVersion = number_format((float) phpversion(), 2, '.', '');
        $permissions = [
            'curl_enabled' => function_exists('curl_version'),
            'symlink_enabled' => function_exists('symlink'),
            'db_file_write_perm' => is_writable(base_path('.env')),
        ];
        return Inertia::render('installation/step1', [
            'phpVersion' => $phpVersion,
            'permissions' => $permissions,
        ]);
    }

    public function step2()
    {
        // Only update APP_URL if not already set properly
        if (env('APP_URL') !== URL::to('/')) {
            $this->writeEnvironmentFile('APP_URL', URL::to('/'));
        }

        // Create the storage symlink if it doesn’t exist
        if (!file_exists(public_path('storage'))) {
            Artisan::call('storage:link');
        }

        return Inertia::render('installation/step2');
    }

    public function step3()
    {
        if(!$this->core()) {
            return redirect()->route('step2')->with('error', 'Core files are missing or corrupted.');
        }
        return Inertia::render('installation/step3');
    }

    public function step5()
    {
        if(!$this->core()) {
            return redirect()->route('step2')->with('error', 'Core files are missing or corrupted.');
        }
        return Inertia::render('installation/step5');
    }

    /**
     * Check if core files are present.
     * @return \Inertia\Response
     */
    public function step6()
    {
        if(!$this->core()) {
            return redirect()->route('step2')->with('error', 'Core files are missing or corrupted.');
        }
        return Inertia::render('installation/step6', [
            'success' => 'Installation completed successfully. You can now log in.',
        ]);
    }

    /**
     * Check if core files are present.
     * @param Request $request
     * @return Response
     */

    public function database_installation(Request $request)
    {
        try {
            $this->checkDatabaseConnection(
                $request->DB_HOST,
                $request->DB_DATABASE,
                $request->DB_USERNAME,
                $request->DB_PASSWORD,
            );
            foreach ($request->types as $type) {
                $this->writeEnvironmentFile($type, $request[$type]);
            }
            Artisan::call('config:clear');
            Artisan::call('cache:clear');
            Artisan::call('config:cache');
            DB::purge();
            DB::reconnect();
            if($request->has('reset')) {
                Artisan::call('migrate:fresh', ['--force' => true]);
            } else {
                Artisan::call('migrate', ['--force' => true]);
            }
            return Inertia::location(route('step5'));
        } catch (\Exception $exception) {
            return redirect()->route('step3')->with('error', 'Database connection failed: ' . $exception->getMessage());
        }

    }

    /**
     * Check if core files are present.
     * @param $db_host
     * @param $db_name
     * @param $db_user
     * @param $db_password
     * @param int $db_port
     * @return bool
     */
    public function checkDatabaseConnection($db_host, $db_name, $db_user, $db_password, int $db_port = 3306): bool
    {
        config([
            'database.connections.temp' => [
                'driver' => 'mysql',
                'host' => $db_host,
                'port' => $db_port,
                'database' => $db_name,
                'username' => $db_user,
                'password' => $db_password,
                'charset' => 'utf8mb4',
                'collation' => 'utf8mb4_unicode_ci',
                'prefix' => '',
                'strict' => true,
            ],
        ]);
        return DB::connection('temp')->getPdo() !== null;
    }

    /**
     * Check if core files are present.
     * @param Request $request
     * @return Response
     */
    public function system_settings(Request $request)
    {
        $request->validate([
            'system_name' => 'required|string|max:255',
            'admin_name' => 'required|string|max:255',
            'admin_email' => 'required|email|unique:users,email',
            'admin_password' => 'required|string|min:8',
        ]);

        try {
            $this->writeEnvironmentFile('APP_NAME', $request->system_name);
            $this->writeEnvironmentFile('APP_INSTALLED', true);

            User::create([
                'name' => $request->admin_name,
                'email' => $request->admin_email,
                'password' => Hash::make($request->admin_password),
                'email_verified_at' => now(),
            ]);

            Artisan::call('config:clear');
            Artisan::call('cache:clear');

            return Inertia::location(route('step6'));
        } catch (\Exception $exception) {
            return redirect()->route('step3')->with('error', 'Failed to save system settings: ' . $exception->getMessage());
        }
    }

    /**
     * Check if core files are present.
     * @param $key
     * @param $value
     * @return bool
     */
    public function writeEnvironmentFile($key, $value): bool
    {
        $path = base_path('.env');
        $value = '"' . trim($value) . '"';
        if(!file_exists($path)) return false;
        $contents = file_get_contents($path);
        if(preg_match('/^' . preg_quote($key, '/') . '=/m', $contents)) {
            $contents = preg_replace('/^' . preg_quote($key, '/') . '=.*/m', $key . '=' . $value, $contents);
        } else {
            $contents .= "\n" . $key . '=' . $value;
        }
        return file_put_contents($path, $contents) !== false;
    }

    /**
     * Check if core files are present.
     * @param Request $request
     * @return RedirectResponse
     */
    public function verify_purchase(Request $request): RedirectResponse
    {
        $request->validate([
            'purchase_code' => 'required|string',
        ]);
        try {
            $this->verify($request->purchase_code, $request->username, $request->email);
            return redirect()->route('step3')->with('success', 'Purchase code verified successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Purchase code verification failed: ' . $e->getMessage());
        }


    }
}
