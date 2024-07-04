<?php

namespace App\Services;

use HubSpot\Factory;
use HubSpot\Client\Crm\Contacts\ApiException;
use App\Models\Contact;

class HubSpotService
{
    protected $hubSpot;

    public function __construct()
    {
        $apiKey = env('HUBSPOT_API_KEY');

        if (!$apiKey) {
            throw new \Exception('HubSpot API key not found in environment variables.');
        }

        $this->hubSpot = Factory::createWithAccessToken($apiKey);
    }


    // create hub-spot contact
    public function createContact(array $contactData)
    {
        $properties = [
            'properties' => $contactData
        ];

        try {
            $response = $this->hubSpot->crm()->contacts()->basicApi()->create($properties);
            return $response;
        } catch (ApiException $e) {
            return 'Exception when calling ContactsApi->create: ' . $e->getMessage();
        }
    }

    // get hub-spot contact by email
    public function getContactByEmail($email)
    {
        try {
            $response = $this->hubSpot->crm()->contacts()->searchApi()->doSearch([
                'filterGroups' => [
                    [
                        'filters' => [
                            [
                                'propertyName' => 'email',
                                'operator' => 'EQ',
                                'value' => $email
                            ]
                        ]
                    ]
                ]
            ]);
            return $response;
        } catch (ApiException $e) {
            return 'Exception when calling ContactsApi->doSearch: ' . $e->getMessage();
        }
    }

    // get hub spot list contact limited
    public function listContacts($limit = 10, $after = null)
    {
        try {
            $response = $this->hubSpot->crm()->contacts()->basicApi()->getPage($limit, $after);
            return $response;
        } catch (ApiException $e) {
            return 'Exception when calling ContactsApi->getPage: ' . $e->getMessage();
        }
    }

    // sing contact
    public function syncContacts()
    {

        try {
            $after = 1;
            do {
                $response = $this->hubSpot->crm()->contacts()->basicApi()->getPage(100, $after);

                $results = $response->getResults();

                if (isset($results)) {
                    foreach ($results as $result) {
                        $properties = $result->getProperties();

                        Contact::updateOrCreate(
                            ['hubspot_id' => $result->getId()],
                            [
                                'first_name' => $properties["firstname"],
                                'last_name' => $properties["lastname"],
                                'email' => $properties["email"],
                                "created_at" => $properties["createdate"],
                                "updated_at" => $properties["lastmodifieddate"],
                            ]
                        );
                    }

                    $after = $response->getPaging()->getNext()->getAfter() ?? null;
                }
            } while ($after);

            return true; // Successful sync
        } catch (\Exception $e) {
            \Log::error('HubSpot syncContacts error: ' . $e->getMessage());
            return false; // Failed sync
        }
    }
}
