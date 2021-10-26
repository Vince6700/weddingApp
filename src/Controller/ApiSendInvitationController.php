<?php

namespace App\Controller;

use App\service\GuestMailService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Routing\Annotation\Route;
class ApiSendInvitationController extends AbstractController
{
    #[Route('/api/sendInvitation', name: 'api_send_invitation_get', methods: 'GET')]
    public function sendInvitationsToAllNotYetInvitedGuests(Request $request, GuestMailService $guestMailService): Response
    {
        try {
            $guests = $guestMailService->sendInvitationsToAllNotYetInvitedGuests();
        } catch (TransportExceptionInterface $e) {
            return $this->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json($guests, Response::HTTP_OK);
    }

    #[Route('/api/sendInvitation', name: 'api_send_invitation_post', methods: 'POST')]
    public function sendInvitations(Request $request, GuestMailService $guestMailService): Response
    {
        $ids = json_decode($request->getContent(), true);

        try {
            $guestMailService->sendInvitations($ids);
        } catch (TransportExceptionInterface $e) {
           return $this->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return $this->json($e->getMessage(), Response::HTTP_NOT_FOUND);
        }

        return $this->json($ids, Response::HTTP_OK);
    }
}
