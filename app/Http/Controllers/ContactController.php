<?php

namespace App\Http\Controllers;

use App\Exports\ContactExport;
use App\Models\Contact;
use App\Services\HubSpotService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ContactController extends Controller
{
    protected $hubSpotService;

    public function __construct(HubSpotService $hubSpotService)
    {
        $this->hubSpotService = $hubSpotService;
    }

    public function index(Request $request)
    {
        // query strings
        $count = $request->query('count', 10);
        $page = $request->query('page', 1);
        $search = $request->query('q', "");
        $sort = $request->query('sort', "id");
        $order = $request->query('order', "desc");

        $contacts = Contact::where(function ($q) use ($search) {
            if ($search) {
                $q->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ['%' . $search . '%'])
                    ->orWhere('email', "LIKE", '%' . $search . '%');
            }
        })
            ->orderBy($sort, $order)
            ->paginate($count, ['*'], 'page', $page);


        return Inertia::render("Dashboard", [
            "contacts" => $contacts,
            'filters' => [
                "count" => $count,
                "page" => $page,
                "search" => $search,
                "sort" => $sort,
                "order" => $order,
            ]
        ]);
    }

    // store
    public function store(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:contacts,email',
        ]);

        $f_name = $request->input('firstName');
        $l_name = $request->input('lastName');
        $email = $request->input('email');

        // Create contact in HubSpot
        $hubSpotContactData = [
            'firstname' => $f_name,
            'lastname' => $l_name,
            'email' => $email
        ];
        $hubSportResponse = $this->hubSpotService->createContact($hubSpotContactData);

        if ($hubSportResponse->getId()) {
            $properties = $hubSportResponse->getProperties();

            Contact::create([
                "hubspot_id" => $hubSportResponse->getId(),
                'first_name' => $properties["firstname"],
                'last_name' => $properties["lastname"],
                'email' => $properties["email"],
                "created_at" => $properties["createdate"],
                "updated_at" => $properties["lastmodifieddate"],
            ]);

            return redirect()->intended(route('contact.status', absolute: false));
        }


        return redirect('/')->with(["message" => "Something went wrong. Please try again or contact with administrator."]);
    }

    public function export()
    {
        return Excel::download(new ContactExport, 'contacts.csv');
    }

    // Sync Contacts with local
    public function syncContacts()
    {
        $this->hubSpotService->syncContacts();

        // return response()->json(['message' => 'Contacts synchronized successfully.']);
        return redirect()->intended(route('dashboard', absolute: false));
    }
}
