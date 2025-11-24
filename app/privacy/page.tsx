import { MarketingLayout } from '@/components/layouts/marketing-layout'

export const metadata = {
  title: 'Politique de Confidentialité - ESTATE SMART',
  description: 'Politique de confidentialité et protection des données de ESTATE SMART',
}

export default function PrivacyPage() {
  return (
    <MarketingLayout>
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Politique de Confidentialité</h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                La présente Politique de Confidentialité a pour but de vous informer sur la manière dont ESTATE SMART 
                collecte, utilise et protège vos données personnelles conformément au Règlement Général sur la Protection 
                des Données (RGPD) et à la loi Informatique et Libertés.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Responsable du traitement</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le responsable du traitement des données est [Nom de la société], dont les coordonnées sont mentionnées 
                dans les Mentions Légales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Données collectées</h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Données d'identification</h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed ml-4 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone (optionnel)</li>
                <li>Nom de l'agence ou société</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Données de connexion</h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed ml-4 space-y-2">
                <li>Adresse IP</li>
                <li>Logs de connexion</li>
                <li>Type de navigateur</li>
                <li>Pages visitées</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Données d'utilisation</h3>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed ml-4 space-y-2">
                <li>Contenu des annonces générées</li>
                <li>Photos téléchargées et traitées</li>
                <li>Informations sur les prospects scorés</li>
                <li>Historique d'utilisation des services</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">3.4 Données de paiement</h3>
              <p className="text-muted-foreground leading-relaxed">
                Les informations de paiement sont traitées de manière sécurisée par notre prestataire de paiement Stripe. 
                ESTATE SMART ne stocke jamais vos coordonnées bancaires complètes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Finalités du traitement</h2>
              <p className="text-muted-foreground leading-relaxed">
                Vos données personnelles sont collectées et traitées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed ml-4 mt-2 space-y-2">
                <li>Création et gestion de votre compte utilisateur</li>
                <li>Fourniture des services ESTATE SMART</li>
                <li>Traitement des paiements et facturation</li>
                <li>Support client et assistance technique</li>
                <li>Amélioration de nos services</li>
                <li>Communications marketing (avec votre consentement)</li>
                <li>Respect de nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Base légale du traitement</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le traitement de vos données personnelles repose sur :
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed ml-4 mt-2 space-y-2">
                <li>L'exécution du contrat pour la fourniture des services</li>
                <li>Votre consentement pour les communications marketing</li>
                <li>Notre intérêt légitime pour l'amélioration de nos services</li>
                <li>Le respect d'obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Destinataires des données</h2>
              <p className="text-muted-foreground leading-relaxed">
                Vos données personnelles peuvent être partagées avec :
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed ml-4 mt-2 space-y-2">
                <li>Notre personnel autorisé</li>
                <li>Nos prestataires techniques (hébergement, paiement, analytics)</li>
                <li>Les autorités compétentes sur demande légale</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Nous ne vendons jamais vos données personnelles à des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Durée de conservation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Vos données personnelles sont conservées :
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed ml-4 mt-2 space-y-2">
                <li>Pendant la durée de votre abonnement</li>
                <li>3 ans après la fin de votre abonnement pour les données de compte</li>
                <li>10 ans pour les données de facturation (obligation légale)</li>
                <li>13 mois pour les cookies et traceurs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Vos droits</h2>
              <p className="text-muted-foreground leading-relaxed">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed ml-4 mt-2 space-y-2">
                <li><strong>Droit d'accès</strong> : obtenir une copie de vos données personnelles</li>
                <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
                <li><strong>Droit à la limitation</strong> : limiter le traitement de vos données</li>
                <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
                <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                <li><strong>Droit de retirer votre consentement</strong> à tout moment</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Pour exercer vos droits, contactez-nous à :{' '}
                <a href="mailto:privacy@estatesmart.fr" className="text-accent hover:underline">
                  privacy@estatesmart.fr
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Sécurité des données</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données 
                personnelles contre tout accès non autorisé, modification, divulgation ou destruction :
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed ml-4 mt-2 space-y-2">
                <li>Chiffrement des données sensibles</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Surveillance et audits de sécurité réguliers</li>
                <li>Authentification sécurisée</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                ESTATE SMART utilise des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences de 
                cookies dans les paramètres de votre navigateur. Pour plus d'informations, consultez notre politique de cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous nous réservons le droit de modifier cette Politique de Confidentialité à tout moment. Toute modification 
                sera publiée sur cette page avec une date de mise à jour. Nous vous encourageons à consulter régulièrement 
                cette page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Réclamation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Si vous estimez que vos droits ne sont pas respectés, vous avez le droit d'introduire une réclamation auprès 
                de la CNIL (Commission Nationale de l'Informatique et des Libertés) :<br />
                CNIL - 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07<br />
                Téléphone : 01 53 73 22 22 - <a href="https://www.cnil.fr" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pour toute question concernant cette Politique de Confidentialité ou l'exercice de vos droits, contactez notre 
                Délégué à la Protection des Données :
                <br /><br />
                Email : <a href="mailto:privacy@estatesmart.fr" className="text-accent hover:underline">privacy@estatesmart.fr</a><br />
                Adresse : [Adresse postale]
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-12">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </main>
    </MarketingLayout>
  )
}
