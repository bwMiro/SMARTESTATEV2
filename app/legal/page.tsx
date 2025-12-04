import { MarketingLayout } from '@/components/layouts/marketing-layout'

export const metadata = {
  title: 'Mentions Légales - ESTATE SMART',
  description: 'Mentions légales et CGU de ESTATE SMART',
}

export default function LegalPage() {
  return (
    <MarketingLayout>
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Mentions Légales & CGU</h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Informations légales</h2>
              <p className="text-muted-foreground leading-relaxed">
                ESTATE SMART est un service édité par [Nom de la société], société [forme juridique] au capital de [montant] euros, 
                immatriculée au RCS de [ville] sous le numéro [numéro], dont le siège social est situé [adresse complète].
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Directeur de la publication : [Nom du directeur]<br />
                Contact : contact@estatesmart.fr<br />
                Téléphone : [numéro de téléphone]
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Hébergeur : Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Conditions Générales d'Utilisation</h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Objet</h3>
              <p className="text-muted-foreground leading-relaxed">
                Les présentes conditions générales ont pour objet de définir les modalités et conditions d'utilisation 
                des services proposés sur le site ESTATE SMART, ainsi que de définir les droits et obligations des parties 
                dans ce cadre.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Acceptation des CGU</h3>
              <p className="text-muted-foreground leading-relaxed">
                L'accès et l'utilisation du site sont subordonnés à l'acceptation et au respect des présentes Conditions 
                Générales d'Utilisation. En accédant au site, l'utilisateur accepte sans réserve les présentes CGU.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Services proposés</h3>
              <p className="text-muted-foreground leading-relaxed">
                ESTATE SMART propose une plateforme SaaS permettant aux agents immobiliers de :
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed ml-4 mt-2 space-y-2">
                <li>Générer automatiquement des annonces immobilières</li>
                <li>Améliorer la qualité des photos immobilières</li>
                <li>Scorer et qualifier des prospects</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.4 Inscription et compte utilisateur</h3>
              <p className="text-muted-foreground leading-relaxed">
                L'utilisation des services nécessite la création d'un compte utilisateur. L'utilisateur s'engage à 
                fournir des informations exactes et à les maintenir à jour. Il est responsable de la confidentialité 
                de ses identifiants de connexion.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.5 Tarifs et paiement</h3>
              <p className="text-muted-foreground leading-relaxed">
                Les tarifs des services sont indiqués en euros TTC. Le paiement s'effectue par carte bancaire ou 
                prélèvement automatique selon les modalités choisies lors de l'inscription. Une période d'essai gratuite 
                de 14 jours est proposée sans engagement.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.6 Propriété intellectuelle</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tous les éléments du site ESTATE SMART (textes, images, graphismes, logo, icônes, etc.) sont la propriété 
                exclusive de [Nom de la société] et sont protégés par les lois françaises et internationales relatives à 
                la propriété intellectuelle.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.7 Données personnelles</h3>
              <p className="text-muted-foreground leading-relaxed">
                Les données personnelles collectées sont traitées conformément à notre Politique de Confidentialité 
                et au RGPD. L'utilisateur dispose d'un droit d'accès, de rectification et de suppression de ses données 
                personnelles.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.8 Résiliation</h3>
              <p className="text-muted-foreground leading-relaxed">
                L'utilisateur peut résilier son abonnement à tout moment depuis son espace personnel. La résiliation 
                prend effet à la fin de la période d'abonnement en cours. Aucun remboursement ne sera effectué pour 
                la période déjà payée.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.9 Responsabilité</h3>
              <p className="text-muted-foreground leading-relaxed">
                ESTATE SMART met en œuvre tous les moyens raisonnables pour assurer un accès de qualité à ses services. 
                Toutefois, la société ne saurait être tenue responsable des interruptions temporaires du service dues 
                à des opérations de maintenance ou à des cas de force majeure.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">2.10 Loi applicable</h3>
              <p className="text-muted-foreground leading-relaxed">
                Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation et/ou à 
                leur exécution relève des tribunaux français compétents.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Modification des CGU</h2>
              <p className="text-muted-foreground leading-relaxed">
                ESTATE SMART se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront 
                informés de toute modification par email. La poursuite de l'utilisation du service après notification 
                vaut acceptation des nouvelles conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pour toute question concernant les présentes CGU, vous pouvez nous contacter à l'adresse : 
                <br />
                <a href="mailto:legal@estatesmart.fr" className="text-accent hover:underline">
                  legal@estatesmart.fr
                </a>
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
