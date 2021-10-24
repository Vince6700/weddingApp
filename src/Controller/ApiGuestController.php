<?php

namespace App\Controller;

use App\Entity\Guest;
use App\service\GuestService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ApiGuestController extends AbstractController
{
    /**
     * @param Request $request
     * @param GuestService $guestService
     * @param SerializerInterface $serializer
     * @return Response
     */
    #[Route('/api/guest', name: 'api_guest',methods: 'POST')]
    public function createGuest(Request $request, GuestService $guestService, SerializerInterface $serializer): Response
    {

        $guest = $serializer->deserialize($request->getContent(), Guest::class, 'json');

        try {
            $guestService->createGuest($guest);
        } catch (\Exception $exception) {
            return $this->json($exception->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        return $this->json('created', Response::HTTP_CREATED);
    }
}
