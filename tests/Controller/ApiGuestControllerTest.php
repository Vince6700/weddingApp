<?php

namespace App\Tests\Controller;

use App\Entity\Guest;
use App\Repository\GuestRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiGuestControllerTest extends WebTestCase
{

    public function testGetGuest(): void
    {
        $client = static::createClient();

        $client->request('GET', '/api/guest/email0@mail.com');
        $response = json_decode($client->getResponse()->getContent(), true);

        $this->assertResponseIsSuccessful();
        $this->assertEquals("email0@mail.com", $response["email"]);
    }

    public function testGetGuestNotFound(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/guest/email11@mail.com');

        $this->assertResponseStatusCodeSame(404);
    }

    public function testUpdateGuest(): void
    {
        $client = static::createClient();
        $client->request(
            'PUT', '/api/guest/21', [],[],[],'{"confirm": true, "adults": 2, "children": 1}'
        );

        $guestRepository = static::getContainer()->get(GuestRepository::class);
        /** @var Guest $guest */
        $guest = $guestRepository->find(21);

        $this->assertEquals(true, $guest->getConfirm());
        $this->assertEquals(2, $guest->getAdults());
        $this->assertEquals(1, $guest->getChildren());
        $this->assertEmailCount(1);
        $this->assertResponseStatusCodeSame(201);
    }

    public function testUpdateGuestBadRequest(): void
    {
        $client = static::createClient();
        $client->request('PUT', '/api/guest/21');

        $this->assertResponseStatusCodeSame(400);
    }

    public function testUpdateGuestNotFound(): void
    {
        $client = static::createClient();
        $client->request(
            'PUT', '/api/guest/100', [],[],[],'{"confirm": true, "adults": 2, "children": 1}'
        );

        $response = json_decode($client->getResponse()->getContent(), true);

        $this->assertEquals('No guest found for id 100', $response);
        $this->assertResponseStatusCodeSame(400);
    }
}
