<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'=> ['required', 'email'],
            'password' => 'required',
            'remember' => 'boolean'
        ]);
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);
        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'message' => 'Email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (!$user->is_admin) {
            Auth::logout();
            return response([
                'message' => 'You don\'t have permission to authenticate as admin'
            ], 403);
        }
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token
        ]);

    }

    public function logout()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
