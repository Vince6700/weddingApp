<?php

namespace App\Controller;

use App\Entity\Guest;
use App\service\GuestMailService;
use App\service\GuestService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Routing\Annotation\Route;

class ApiGuestController extends AbstractController
{
    /**
     * @param string $email
     * @return Response
     */
    #[Route('/api/guest/{email}', name: 'api_guest_get',methods: 'GET')]
    public function getGuest(string $email) : Response
    {
        if (!$email) {
           return $this->json('please provide email address', Response::HTTP_BAD_REQUEST);
        }

        $guest = $this->getDoctrine()
            ->getRepository(Guest::class)
            ->findOneBy(['email' => $email]);

        if (!$guest) {
            return $this->json('no guest found', Response::HTTP_NOT_FOUND);
        }

        return $this->json($guest, Response::HTTP_OK);
    }

    /**
     * @param string $id
     * @param Request $request
     * @param GuestService $guestService
     * @param GuestMailService $guestMailService
     * @return Response
     * @throws TransportExceptionInterface
     */
    #[Route('/api/guest/{id}', name: 'api_guest_put',methods: 'PUT')]
    public function updateGuest(string $id, Request $request, GuestService $guestService, GuestMailService $guestMailService): Response
    {
        if(!$id) {
            return $this->json('please provide user id', Response::HTTP_BAD_REQUEST);
        }

        if(!$data = json_decode($request->getContent(), true)) {
            return $this->json('no data to update', Response::HTTP_BAD_REQUEST);
        }

        try {
            $guest = $guestService->updateGuest($id, $data);
            $guestMailService->sendUpdateConfirmation($guest);
        } catch (\Exception $exception) {
            return $this->json($exception->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        return $this->json($guest, Response::HTTP_CREATED);
    }
}
