<?php

namespace App\service;

use App\Entity\Guest;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;

class GuestMailService
{
    protected string $adminEmail;
    protected MailerInterface $mailer;
    protected EntityManagerInterface $entityManager;

    public function __construct(string $adminEmail, MailerInterface $mailer, EntityManagerInterface $entityManager)
    {
        $this->adminEmail = $adminEmail;
        $this->mailer = $mailer;
        $this->entityManager = $entityManager;
    }

    /**
     * @throws TransportExceptionInterface
     */
    public function sendUpdateConfirmation(Guest $guest): void
    {
        $email = $this->buildEmail($guest, 'emails/confirmation.html.twig');

        $this->mailer->send($email);
    }

    /**
     * @throws TransportExceptionInterface
     * @throws Exception
     */
    public function sendInvitations(array $ids): array
    {
        $errors = [];

        foreach ($ids as $id) {
            /** @var Guest $guest */
            $guest = $this->entityManager->getRepository(Guest::class)->find($id);
            if (!$guest) {
                $errors[] = $id;
            } else {
                $email = $this->buildEmail($guest, 'emails/invitation.html.twig');
                $this->mailer->send($email);
                $guest->setEmailSent(true);
                $this->entityManager->flush();
            }
        }

        if (count($errors) > 0) {
            throw new Exception('could not send find these guest ids :' . implode(', ', $errors));
        }

        return $ids;
    }

    /**
     * @throws TransportExceptionInterface
     */
    public function sendInvitationsToAllNotYetInvitedGuests(): array
    {
        $guests = $this->entityManager->getRepository(Guest::class)->findBy(['emailSent' => false]);

        foreach ($guests as $guest) {
            $email = $this->buildEmail($guest, 'emails/invitation.html.twig');
            $this->mailer->send($email);
            $guest->setEmailSent(true);
            $this->entityManager->flush();
        }

        return $guests;
    }

    protected function buildEmail(Guest $guest, string $template): TemplatedEmail
    {
        return (new TemplatedEmail())
            ->from($this->adminEmail)
            ->to($guest->getEmail())
            ->subject('Le mariage des Bibiches')
            ->htmlTemplate($template)
            ->context([
                'firstName' => $guest->getFirstName(),
                'name' => $guest->getName(),
                'adults' => $guest->getAdults(),
                'children' => $guest->getChildren(),
                'drink' => $guest->getDrink()
            ]);
    }
}
