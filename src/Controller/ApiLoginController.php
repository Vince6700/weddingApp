<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class ApiLoginController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: 'POST')]
    public function index(): Response
    {
        $user = $this->getUser();

        if (null === $user) {
            return $this->json([
                'message' => 'missing credentials',
            ], Response::HTTP_BAD_REQUEST);
        }

        return $this->json([
            'user'  => $user->getUserIdentifier(),
            'roles' => $user->getRoles()
        ]);
    }
}
