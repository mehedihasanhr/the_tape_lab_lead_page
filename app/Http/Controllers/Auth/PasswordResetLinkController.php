<?php

// namespace App\Http\Controllers\Auth;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\RedirectResponse;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Password;
// use Illuminate\Validation\ValidationException;
// use Inertia\Inertia;
// use Inertia\Response;

// class PasswordResetLinkController extends Controller
// {
//     /**
//      * Display the password reset link request view.
//      */
//     public function create(): Response
//     {
//         return Inertia::render('Auth/ForgotPassword', [
//             'status' => session('status'),
//             'cooldown' => session(60),
//         ]);
//     }

//     /**
//      * Handle an incoming password reset link request.
//      *
//      * @throws \Illuminate\Validation\ValidationException
//      */
//     public function store(Request $request): RedirectResponse
//     {
//         $request->validate([
//             'email' => 'required|email',
//         ]);

//         // We will send the password reset link to this user. Once we have attempted
//         // to send the link, we will examine the response then see the message we
//         // need to show to the user. Finally, we'll send out a proper response.
//         $status = Password::sendResetLink(
//             $request->only('email')
//         );

//         if ($status == Password::RESET_LINK_SENT) {
//             return back()->with('status', __($status));
//         }

//         throw ValidationException::withMessages([
//             'email' => [trans($status)],
//         ]);
//     }
// }

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
            'cooldown' => session('cooldown'), // pass cooldown to the view
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        // Check the cooldown
        $cooldownDuration = 60; // cooldown in seconds
        $lastSent = session('password_reset_last_sent');
        $timePassed = -Carbon::now()->diffInSeconds($lastSent);


        if ($lastSent && $timePassed >= 0 && $timePassed < $cooldownDuration) {

            return back()->with('status', 'Please wait before requesting another password reset link.')
                ->with('cooldown', $cooldownDuration - $timePassed);
        }

        // Send the password reset link
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            $startTime = Carbon::now();
            // Store the time the link was sent
            session(['password_reset_last_sent' => $startTime]);
            $timePassed = -Carbon::now()->diffInSeconds($startTime);

            return back()->with('status', __($status))
                ->with('cooldown', $cooldownDuration - $timePassed);
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
