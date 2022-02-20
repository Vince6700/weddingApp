<?php

namespace App\Controller;

use App\Entity\Guest;
use App\Service\GuestMailService;
use App\Service\GuestService;
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
        $guest = $this->getDoctrine()
            ->getRepository(Guest::class)
            ->findOneBy(['email' => strtolower(trim($email))]);

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
        if(!$data = json_decode($request->getContent(), true)) {
            return $this->json('no data to update', Response::HTTP_BAD_REQUEST);
        }

        if ($data["confirm"] === "true") {
            $data["confirm"] = true;
        }

        if ($data["confirm"] === "false") {
            $data["confirm"] = false;
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
