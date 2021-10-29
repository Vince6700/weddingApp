<?php

namespace App\Tests\Controller;

use App\Repository\GuestRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiSendInvitationControllerTest extends WebTestCase
{
    public function testControllerIsSecured(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/sendInvitation');

        $this->assertResponseStatusCodeSame(401);
    }

    public function testSendInvitationsToAllNotYetInvitedGuests(): void
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);
        /** @var GuestRepository $guestRepository */
        $guestRepository = static::getContainer()->get(GuestRepository::class);

        $testUser = $userRepository->findOneByEmail('admin@admin.com');
        $client->loginUser($testUser);

        $client->request('GET', '/api/sendInvitation');

        $guests = $guestRepository->findBy(["emailSent" => true]);

        $response = json_decode($client->getResponse()->getContent(), true);

        $this->assertCount(10, $guests);
        $this->assertCount(10, $response);
        $this->assertEmailCount(10);
    }

    public function testSendInvitations(): void
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);
        /** @var GuestRepository $guestRepository */
        $guestRepository = static::getContainer()->get(GuestRepository::class);

        $testUser = $userRepository->findOneByEmail('admin@admin.com');
        $client->loginUser($testUser);

        $uninvitedGuests = $guestRepository->findBy(["emailSent" => false]);
        $ids = [];

        foreach ($uninvitedGuests as $guest) {
            $ids[] = $guest->getId();
        }

        $jsonIds = json_encode($ids);

        $client->request('POST', '/api/sendInvitation', [], [], [],
            $jsonIds
        );

        $guests = $guestRepository->findBy(["emailSent" => true]);

        $this->assertEmailCount(10);
        $this->assertCount(10, $guests);
        $this->assertResponseIsSuccessful();
    }

    public function testSendInvitationsGuestNotFound(): void
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);

        $testUser = $userRepository->findOneByEmail('admin@admin.com');
        $client->loginUser($testUser);

        $client->request('POST', '/api/sendInvitation', [], [], [],
            '[100]'
        );

        $this->assertResponseStatusCodeSame(404);
    }
}
