<?php

namespace App\service;

use App\Entity\Guest;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;

class GuestMailService
{
    protected MailerInterface $mailer;
    protected string $adminEmail;

    public function __construct(string $adminEmail, MailerInterface $mailer)
    {
        $this->mailer = $mailer;
        $this->adminEmail = $adminEmail;
    }

    /**
     * @throws TransportExceptionInterface
     */
    public function sendUpdateConfirmation(Guest $guest): void
    {
        $email = (new TemplatedEmail())
            ->from($this->adminEmail)
            ->to($guest->getEmail())
            ->subject('Le mariage des Bibiches')
            ->htmlTemplate('emails/confirmation.html.twig')
            ->context([
                'firstName' => $guest->getFirstName(),
                'name' => $guest->getName(),
                'adults' => $guest->getAdults(),
                'children' => $guest->getChildren(),
                'drink' => $guest->getDrink()
            ]);

        $this->mailer->send($email);
    }
}
