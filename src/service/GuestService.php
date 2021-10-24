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
}
