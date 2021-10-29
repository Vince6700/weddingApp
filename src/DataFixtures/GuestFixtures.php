<?php

namespace App\DataFixtures;

use App\Entity\Guest;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class GuestFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        for($i=0; $i<10; $i++) {
            $guest = (new Guest())
                ->setFirstName("firstname$i")
                ->setName("name$i")
                ->setEmail("email$i@mail.com");
            $manager->persist($guest);
        }

        $manager->flush();
    }
}
