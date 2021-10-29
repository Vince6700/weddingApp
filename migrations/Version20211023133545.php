<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211023133545 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE guest ALTER adults SET DEFAULT 1');
        $this->addSql('ALTER TABLE guest ALTER children SET DEFAULT 0');
        $this->addSql('ALTER TABLE guest ALTER drink SET DEFAULT \'false\'');
        $this->addSql('ALTER TABLE guest ALTER confirm SET DEFAULT \'false\'');
        $this->addSql('ALTER TABLE guest ALTER email_sent SET DEFAULT \'false\'');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_ACB79A35E7927C74 ON guest (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP INDEX UNIQ_ACB79A35E7927C74');
        $this->addSql('ALTER TABLE guest ALTER adults DROP DEFAULT');
        $this->addSql('ALTER TABLE guest ALTER children DROP DEFAULT');
        $this->addSql('ALTER TABLE guest ALTER drink DROP DEFAULT');
        $this->addSql('ALTER TABLE guest ALTER confirm DROP DEFAULT');
        $this->addSql('ALTER TABLE guest ALTER email_sent DROP DEFAULT');
    }
}
