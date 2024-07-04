<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', [ContactController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');


// contacts
Route::post("/contacts", [ContactController::class, 'store'])->name("contact.store");
Route::get("/contacts/status", function () {
    return Inertia::render("ContactStatus");
})->name("contact.status");


Route::middleware('auth')->group(function () {
    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // export
    Route::get('/export-contact', [ContactController::class, 'export'])->name("export.contact");
    Route::post('/contacts/sync', [ContactController::class, 'syncContacts'])->name("contacts.sync");
});

require __DIR__ . '/auth.php';
