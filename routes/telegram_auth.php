<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\Registered;
use Inertia\Inertia;

Route::get('/telegram-login-widget', function () {
    return Inertia::render('TestTelegramLoginWidget',);
});

Route::match(['get', 'post'], '/t-login/callback', function (Request $request) {
    // === What we get from telegram ===
    // /api/t-login/callback?id=983913974&first_name=Long%20Soeng%20(ឡុង%20សឹង)&username=longsoeng&photo_url=https%3A%2F%2Ft.me%2Fi%2Fuserpic%2F320%2FLpUqXkHECvNvRQkHWCwpvWMJ1QWatAkdTvctr-AZxPU.jpg&auth_date=1764735311&hash=c9d000bfbbbb0a5991a7045d651254acae122aa1f6ffa87b6458d731657c860f
    //    /auth?bot_id=547043436&origin=https://rule-library.longsoeng.com&embed=1&request_access=write&return_to=https%3A%2F%2Fcore.telegram.org%2Fwidgets%2Flogin
    //    https://oauth.telegram.org/auth/logout?bot_id=8069292817&origin=https://rule-library.longsoeng.com&request_access=write&hash=e5aa2e321f192cd19acb055b2dec33d56f99cfb82b88352f981486e512075145
    // dd($request->all());
    // https://oauth.telegram.org/auth/logout?bot_id=8069292817&origin=https%3A%2F%2Frule-library.longsoeng.com&embed=1&request_access=write&return_to=https%3A%2F%2Frule-library.longsoeng.com%2Flogin

    // Get all Telegram data safely
    $data = $request->all();

    // --- Check 'hash' exists ---
    if (!isset($data['hash'])) {
        return abort(400, 'Missing Telegram hash');
    }

    $checkHash = $data['hash'];
    unset($data['hash']);

    // --- Build data check string ---
    ksort($data);
    $dataCheckString = collect($data)
        ->map(fn($v, $k) => "$k=$v")
        ->implode("\n");

    // --- Verify hash ---
    $secret = hash('sha256', env('TELEGRAM_BOT_TOKEN'), true);
    $calculatedHash = hash_hmac('sha256', $dataCheckString, $secret);

    if (!hash_equals($calculatedHash, $checkHash)) {
        return abort(401, 'Invalid Telegram login data');
    }

    // --- Create or get user ---
    $user = User::firstOrCreate(
        ['telegram_id' => $data['id']],
        [
            'name' => ($data['first_name'] ?? 'Telegram User'),
            'email' => 'telegram_user_' . $data['id'] . '@telegram.org',
            'password' => Hash::make(Str::random(16)), // random password
            // 'photo_url' => $data['photo_url'] ?? null,  // optional field if you added it
            'photo_url' => $data['hash'] ?? null,  // optional field if you added it
        ]
    );

    // dd($user);
    // --- Log in user using Laravel session ---

    Auth::guard('web')->login($user, true);
    $request->session()->regenerate();

    // --- Redirect to dashboard ---
    return redirect('/dashboard');
});
