<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\UserResource;
use App\Models\Media;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(){
        // Fetch all users
        $query = User::query();
        $users = $query->orderByDesc('created_at')->paginate(5)->withQueryString();
        $media = Media::select('id', 'name', 'filename', 'path')->get();

        // Return a view with the users
        return Inertia::render('admin/users/index', [
            'users' => UserResource::collection($users),
            'media' => $media
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Return a view to create a new user
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:15|unique:users',
            'about' => 'nullable|string|max:500',
            'media_id' => 'nullable|exists:media,id',
        ]);

        // Create a new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'phone' => $request->phone,
            'about' => $request->about,
            'media_id' => $request->media_id,
        ]);

        // Redirect back with a success message
        return redirect()->back()->with('success', 'User created successfully');
    }
    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        // Return a view to show the user details

    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        // Return a view to edit the user
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:15|unique:users,phone,' . $user->id,
            'about' => 'nullable|string|max:500',
            'media_id' => 'nullable|exists:media,id',
        ]);

        // Update the user
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'about' => $request->about,
            'media_id' => $request->media_id,
        ]);

        // Redirect back with a success message
        return redirect()->back()->with('success', 'User updated successfully');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, User $user)
    {
        // the current user isn't allowed to delete
        if ($user->id == auth()->user()->id) {
            return redirect()->back()->with('error', 'You cannot delete your own account');
        }
        // Delete the user
        $user->delete();
        // Redirect back with a success message
        return redirect()->back()->with('success', 'User deleted successfully');
    }

    public function toggleStatus(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            if ($user->id === auth()->id()) {
                return redirect()->back()->with('error', 'You cannot change your own status.');
            }

            $newStatus = !$user->status;
            $user->update(['status' => $newStatus]);

            return redirect()->back()->with(
                'success',
                $newStatus ? 'User activated.' : 'User deactivated.'
            );
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong!');
        }
    }
}
