<?php

namespace App\Tests\Controller;

use App\Entity\Guest;
use App\Repository\GuestRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiAdminGuestControllerTest extends WebTestCase
{
    public function testGetGuests(): void
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);

        $testUser = $userRepository->findOneByEmail('admin@admin.com');
        $client->loginUser($testUser);

        $client->request('GET', '/api/adminGuest');

        $response = json_decode($client->getResponse()->getContent(), true);

        $this->assertCount(10, $response);
        $this->assertResponseIsSuccessful();
    }

    public function testGetGuestsForbidden(): void
    {
        $client = static::createClient();

        $client->request('GET', '/api/adminGuest');

        $this->assertResponseStatusCodeSame(401);
    }

    public function testCreateGuest(): void
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);
        /** @var GuestRepository $guestRepository */
        $guestRepository = static::getContainer()->get(GuestRepository::class);

        $testUser = $userRepository->findOneByEmail('admin@admin.com');
        $client->loginUser($testUser);

        $client->request('POST', '/api/adminGuest', [],[],[],
            '{"email": "new.guest@mail.com", "firstName": "new", "name": "guest", "drink": false, "adults": 2}'
        );

       $guest = $guestRepository->findOneBy(['email' => "new.guest@mail.com"]);

        $this->assertEquals('new.guest@mail.com', $guest->getEmail());
        $this->assertEquals(false, $guest->getDrink());
        $this->assertEquals(2, $guest->getAdults());
        $this->assertResponseStatusCodeSame(201);
    }

    public function testCreateGuestValidationFails(): void
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);

        $testUser = $userRepository->findOneByEmail('admin@admin.com');
        $client->loginUser($testUser);

        $client->request('POST', '/api/adminGuest', [],[],[],
            '{"firstName": "new", "name": "guest", "drink": false, "adults": 2}'
        );

        $this->assertResponseStatusCodeSame(400);
    }

    public function testCreateGuestWithNotUniqueEmail(): void
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);
        /** @var GuestRepository $guestRepository */
        $guestRepository = static::getContainer()->get(GuestRepository::class);

        $testUser = $userRepository->findOneByEmail('admin@admin.com');
        $client->loginUser($testUser);

        $client->request('POST', '/api/adminGuest', [],[],[],
            '{"email": "email0@mail.com", "firstName": "new", "name": "guest", "drink": false, "adults": 2}'
        );

        $this->assertResponseStatusCodeSame(400);
    }

    public function testCreateGuestWithInvalidEmail(): void
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);
        /** @var GuestRepository $guestRepository */
        $guestRepository = static::getContainer()->get(GuestRepository::class);

        $testUser = $userRepository->findOneByEmail('admin@admin.com');
        $client->loginUser($testUser);

        $client->request('POST', '/api/adminGuest', [],[],[],
            '{"email": "email0.mail.com", "firstName": "new", "name": "guest", "drink": false, "adults": 2}'
        );

        $this->assertResponseStatusCodeSame(400);
    }

    public function testCreateMultipleGuests(): void
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);
        /** @var GuestRepository $guestRepository */
        $guestRepository = static::getContainer()->get(GuestRepository::class);

        $testUser = $userRepository->findOneByEmail('admin@admin.com');
        $client->loginUser($testUser);

        $client->request('POST', '/api/adminGuests', [],[],[],
            '[
            {"email": "new.guest@mail.com", "firstName": "new", "name": "guest", "drink": false, "adults": 2},
            {"email": "new.guestTwo@mail.com", "firstName": "new", "name": "guest", "drink": false, "adults": 2}
            ]'
        );

        $guest = $guestRepository->findOneBy(['email' => "new.guest@mail.com"]);
        $guest2 = $guestRepository->findOneBy(["email" => "new.guestTwo@mail.com"]);

        $this->assertEquals("new.guest@mail.com", $guest->getEmail());
        $this->assertEquals("new.guestTwo@mail.com", $guest2->getEmail());
        $this->assertResponseStatusCodeSame(201);
    }

    public function testCreateMultipleGuestsValidationFails(): void
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);
        /** @var GuestRepository $guestRepository */
        $guestRepository = static::getContainer()->get(GuestRepository::class);

        $testUser = $userRepository->findOneByEmail('admin@admin.com');
        $client->loginUser($testUser);

        $client->request('POST', '/api/adminGuests', [],[],[],
            '[
            {"firstName": "new", "name": "guest", "drink": false, "adults": 2},
            {"email": "new.guestTwo@mail.com", "firstName": "new", "name": "guest", "drink": false, "adults": 2}
            ]'
        );

        $guest2 = $guestRepository->findOneBy(["email" => "new.guestTwo@mail.com"]);

        $this->assertNull($guest2);
        $this->assertResponseStatusCodeSame(400);
    }

    public function testDeleteGuest(): void
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);
        /** @var GuestRepository $guestRepository */
        $guestRepository = static::getContainer()->get(GuestRepository::class);

        $testUser = $userRepository->findOneByEmail('admin@admin.com');
        $client->loginUser($testUser);

        $guest = $guestRepository->findOneBy(["email" => "email0@mail.com"]);
        $id = $guest->getId();

        $client->request("DELETE", '/api/adminGuest/' . $id);

        $guestDeleted = $guestRepository->find($id);

        $this->assertNull($guestDeleted);
        $this->assertResponseIsSuccessful();
    }

    public function testDeleteGuestNotFound(): void
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);
        /** @var GuestRepository $guestRepository */
        $guestRepository = static::getContainer()->get(GuestRepository::class);

        $testUser = $userRepository->findOneByEmail('admin@admin.com');
        $client->loginUser($testUser);

        $client->request("DELETE", '/api/adminGuest/100');

        $this->assertResponseStatusCodeSame(404);
    }
}
