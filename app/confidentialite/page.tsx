export default function ConfidentialitePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-36 pb-24">
      <h1 className="font-display text-5xl text-white uppercase mb-8">Politique de Confidentialité</h1>
      <div className="space-y-8 text-gray-400 leading-relaxed">

        <section>
          <h2 className="font-display text-2xl text-yellow-400 uppercase mb-3">1. Responsable du traitement</h2>
          <p>YellowLAB3D SAS, 12 Rue de la Fabrication, 75011 Paris — contact@yellowlab3d.fr</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-yellow-400 uppercase mb-3">2. Données collectées</h2>
          <p>Nous collectons les données suivantes lors d'une commande ou d'un contact :</p>
          <ul className="list-none space-y-2 mt-3 ml-4">
            {["Nom, prénom", "Adresse email", "Numéro de téléphone (facultatif)", "Adresse postale de livraison", "Fichiers 3D uploadés", "Données de paiement (traitées exclusivement par Stripe)"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-yellow-400">→</span> {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl text-yellow-400 uppercase mb-3">3. Finalités du traitement</h2>
          <p>Vos données sont utilisées pour :</p>
          <ul className="list-none space-y-2 mt-3 ml-4">
            {["Traitement et suivi des commandes", "Communication concernant votre commande", "Facturation", "Amélioration de nos services", "Envoi d'informations commerciales (avec votre consentement)"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-yellow-400">→</span> {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl text-yellow-400 uppercase mb-3">4. Conservation des données</h2>
          <p>Les données de commande sont conservées 5 ans à des fins comptables. Les fichiers 3D sont supprimés 30 jours après la livraison, sauf demande contraire du client.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-yellow-400 uppercase mb-3">5. Partage des données</h2>
          <p>Vos données ne sont jamais vendues. Elles peuvent être partagées avec :</p>
          <ul className="list-none space-y-2 mt-3 ml-4">
            {["Stripe (paiement sécurisé)", "Transporteurs (Colissimo, Chronopost) pour la livraison", "Sous-traitants techniques sous NDA"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-yellow-400">→</span> {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl text-yellow-400 uppercase mb-3">6. Vos droits (RGPD)</h2>
          <p>Conformément au RGPD, vous disposez des droits d'accès, de rectification, d'effacement, de portabilité et d'opposition. Pour exercer ces droits : <a href="mailto:privacy@yellowlab3d.fr" className="text-yellow-400 hover:underline">privacy@yellowlab3d.fr</a></p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-yellow-400 uppercase mb-3">7. Cookies</h2>
          <p>Ce site utilise uniquement des cookies techniques nécessaires au bon fonctionnement (session, panier). Aucun cookie publicitaire ou de tracking tiers n'est utilisé.</p>
        </section>

        <p className="text-gray-600 text-sm mt-10">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
      </div>
    </div>
  );
}
