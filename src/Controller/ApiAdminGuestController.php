<?php

namespace App\Controller;

use App\Entity\Guest;
use App\Service\GuestService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ArrayDenormalizer;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;

class ApiAdminGuestController extends AbstractController
{
    /**
     * @return Response
     */
    #[Route('/api/adminGuest', name: 'api_admin_guest_get', methods: 'GET')]
    public function getGuests(): Response
    {
        return $this->json($this->getDoctrine()->getRepository(Guest::class)->findAll(), Response::HTTP_OK);
    }

    /**
     * @param Request $request
     * @param GuestService $guestService
     * @param SerializerInterface $serializer
     * @return Response
     */
    #[Route('/api/adminGuest', name: 'api_admin_guest_post', methods: 'POST')]
    public function createGuest(Request $request, GuestService $guestService, SerializerInterface $serializer): Response
    {
        $guest = $serializer->deserialize($request->getContent(), Guest::class, 'json');

        try {
            $guest = $guestService->createGuest($guest);
        } catch (\Exception $exception) {
            return $this->json($exception->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        return $this->json($guest, Response::HTTP_CREATED);
    }

    /**
     * @param Request $request
     * @param GuestService $guestService
     * @return Response
     */
    #[Route('/api/adminGuests', name: 'api_admin_guests_post', methods: 'POST')]
    public function createMultipleGuests(Request $request, GuestService $guestService): Response
    {
        $serializer = new Serializer(
            [new GetSetMethodNormalizer(), new ArrayDenormalizer()],
            [new JsonEncoder()]
        );

        $guests = $serializer->deserialize($request->getContent(), 'App\Entity\Guest[]', 'json');

        try {
            $guests = $guestService->createGuests($guests);
        } catch (\Exception $exception) {
            return $this->json($exception->getMessage(),Response::HTTP_BAD_REQUEST);
        }

        return $this->json($guests, Response::HTTP_CREATED);

    }

    /**
     * @param string $id
     * @param GuestService $guestService
     * @return Response
     */
    #[Route('/api/adminGuest/{id}', name: 'api_admin_guest_delete', methods: 'DELETE')]
    public function deleteGuest(string $id, GuestService $guestService): Response
    {
        try {
            $guest = $guestService->deleteGuest($id);
        } catch (\Exception $exception) {
            return $this->json($exception->getMessage(), Response::HTTP_NOT_FOUND);
        }

        return $this->json($guest, Response::HTTP_OK);
    }

    #[Route('/api/adminGuest/{id}', name: 'api_admin_guest_patch', methods: 'PATCH')]
    public function editGuest (string $id, Request $request, GuestService $guestService): Response
    {
        if (!$id) {
            return $this->json('please provide a guest id', Response::HTTP_BAD_REQUEST);
        }

        if(!$data = json_decode($request->getContent(), true)) {
            return $this->json('no data to update', Response::HTTP_BAD_REQUEST);
        }

        try {
            $guest = $guestService->editGuest($id, $data);
        } catch (\Exception $exception) {
            return $this->json($exception->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        return $this->json($guest, Response::HTTP_OK);
    }
}
