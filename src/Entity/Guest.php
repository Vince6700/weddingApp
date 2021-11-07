<?php

namespace App\Entity;

use App\Repository\GuestRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=GuestRepository::class)
 */
class Guest
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     */
    #[Assert\Email(
        message: 'The email {{ value }} is not a valid email.',
    )]
    #[Assert\NotBlank]
    private string $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Assert\NotBlank]
    private string $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    #[Assert\NotBlank]
    private string $firstName;

    /**
     * @ORM\Column(type="integer", options={"default" : 1})
     */
    private int $adults=1;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private int $children=0;

    /**
     * @ORM\Column(type="boolean", options={"default" : false})
     */
    private bool $drink=false;

    /**
     * @ORM\Column(type="boolean", options={"default" : false})
     */
    private bool $confirm=false;

    /**
     * @ORM\Column(type="boolean", options={"default" : false})
     */
    private bool $emailSent=false;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private string $comments;

    /**
     * @ORM\Column(type="boolean", options={"default" : false})
     */
    private bool $responded=false;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getAdults(): ?int
    {
        return $this->adults;
    }

    public function setAdults(int $adults): self
    {
        $this->adults = $adults;

        return $this;
    }

    public function getChildren(): ?int
    {
        return $this->children;
    }

    public function setChildren(int $children): self
    {
        $this->children = $children;

        return $this;
    }

    public function getDrink(): ?bool
    {
        return $this->drink;
    }

    public function setDrink(bool $drink): self
    {
        $this->drink = $drink;

        return $this;
    }

    public function getConfirm(): ?bool
    {
        return $this->confirm;
    }

    public function setConfirm(bool $confirm): self
    {
        $this->confirm = $confirm;

        return $this;
    }

    public function getEmailSent(): ?bool
    {
        return $this->emailSent;
    }

    public function setEmailSent(bool $emailSent): self
    {
        $this->emailSent = $emailSent;

        return $this;
    }

    public function getComments(): ?string
    {
        return $this->comments;
    }

    public function setComments(?string $comments): self
    {
        $this->comments = $comments;

        return $this;
    }

    public function getResponded(): ?bool
    {
        return $this->responded;
    }

    public function setResponded(bool $responded): self
    {
        $this->responded = $responded;

        return $this;
    }
}
