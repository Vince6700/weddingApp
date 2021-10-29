<?php

namespace App\Service;

use App\Entity\Guest;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class GuestService
{
    protected EntityManagerInterface $entityManager;
    protected ValidatorInterface $validator;
    protected SerializerInterface $serializer;

    /**
     * @param EntityManagerInterface $entityManager
     * @param ValidatorInterface $validator
     * @param SerializerInterface $serializer
     */
    public function __construct(
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator,
        SerializerInterface $serializer,
    ){
        $this->entityManager = $entityManager;
        $this->validator = $validator;
        $this->serializer = $serializer;
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
     * @param Guest[] $guests
     * @return array
     * @throws Exception
     */
    public function createGuests(array $guests) : array
    {
        $errors = [];
        foreach ($guests as $guest) {
            $error = $this->validator->validate($guest);
            if (count($error) > 0) {
                $errors[] = $error;
            }
        }

        if (count($errors) > 0) {
            throw new Exception($this->serializer->serialize($errors, 'json'));
        }

        foreach ($guests as $guest) {
            $this->entityManager->persist($guest);
        }

        $this->entityManager->flush();

        return $guests;
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

        $guest->setAdults($data['adults'] ?? $guest->getAdults());
        $guest->setChildren($data['children'] ?? $guest->getChildren());
        $guest->setConfirm($data['confirm'] ?? $guest->getConfirm());

        $errors = $this->validator->validate($guest);

        if (count($errors) > 0) {
            throw new Exception($errors);
        }

        $this->entityManager->flush();

        return $guest;
    }

    /**
     * @param string $id
     * @return Guest
     * @throws Exception
     */
    public function deleteGuest(string $id) : Guest
    {
        /** @var Guest $guest */
        $guest = $this->entityManager
            ->getRepository(Guest::class)
            ->find($id);

        if (!$guest) {
            throw new Exception('No guest found for id '.$id);
        }

        $this->entityManager->remove($guest);
        $this->entityManager->flush();

        return $guest;
    }

    /**
     * @param string $id
     * @param array $data
     * @return Guest|null
     * @throws Exception
     */
    public function editGuest(string $id, array $data): ?Guest
    {
        /** @var Guest $guest */
        $guest = $this->entityManager
            ->getRepository(Guest::class)
            ->find($id);

        if (!$guest) {
            throw new Exception('No guest found for id '.$id);
        }

        $guest->setName($data['name'] ?? $guest->getName());
        $guest->setFirstName($data['firstName'] ?? $guest->getFirstName());
        $guest->setEmail($data['email'] ?? $guest->getEmail());
        $guest->setAdults($data['adults'] ?? $guest->getAdults());
        $guest->setChildren($data['children'] ?? $guest->getChildren());
        $guest->setConfirm($data['confirm'] ?? $guest->getConfirm());
        $guest->setDrink($data['drink'] ?? $guest->getDrink());
        $guest->setEmailSent($data['emailSent'] ?? $guest->getEmailSent());
        $guest->setConfirm($data['confirm'] ?? $guest->getConfirm());

        $errors = $this->validator->validate($guest);

        if (count($errors) > 0) {
            throw new Exception($errors);
        }

        $this->entityManager->flush();

        return $guest;
    }
}
