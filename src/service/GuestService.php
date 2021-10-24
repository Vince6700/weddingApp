<?php

namespace App\service;

use App\Entity\Guest;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class GuestService
{
    protected EntityManagerInterface $entityManager;
    protected ValidatorInterface $validator;

    /**
     * @param EntityManagerInterface $entityManager
     * @param ValidatorInterface $validator
     */
    public function __construct(EntityManagerInterface $entityManager, ValidatorInterface $validator)
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }

    /**
     * @param Guest $guest
     * @return Guest
     * @throws Exception
     */
    public function createGuest(Guest $guest) : Guest
    {
        $errors = $this->validator->validate($guest);

        if (count($errors) > 0) {
            throw new Exception($errors);
        }
        $this->entityManager->persist($guest);
        $this->entityManager->flush();

        return $guest;
    }

    /**
     * @param string $id
     * @param array $data
     * @return Guest|null
     * @throws Exception
     */
    public function updateGuest(string $id, array $data): ?Guest
    {
        /** @var Guest $guest */
        $guest = $this->entityManager
            ->getRepository(Guest::class)
            ->find($id);

        if (!$guest) {
            throw new Exception('No guest found for id '.$id);
        }

        $guest->setEmail($data['email'] ?? $guest->getEmail());
        $guest->setFirstName($data['firstName'] ?? $guest->getFirstName());
        $guest->setName($data['name'] ?? $guest->getName());
        $guest->setAdults($data['adults'] ?? $guest->getAdults());
        $guest->setAdults($data['children'] ?? $guest->getChildren());
        $guest->setConfirm($data['confirm'] ?? $guest->getConfirm());

        $this->entityManager->flush();

        return $guest;
    }
}
