export default function CGVPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-36 pb-24">
      <h1 className="font-display text-5xl text-white uppercase mb-8">Conditions Générales de Vente</h1>
      <div className="space-y-8 text-gray-400 leading-relaxed">

        <section>
          <h2 className="font-display text-2xl text-yellow-400 uppercase mb-3">1. Objet</h2>
          <p>Les présentes CGV régissent les relations contractuelles entre YellowLAB3D (ci-après "le Prestataire") et tout client passant commande via le site yellowlab3d.fr. Toute commande implique l'acceptation pleine et entière des présentes CGV.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-yellow-400 uppercase mb-3">2. Prestations proposées</h2>
          <p>YellowLAB3D propose des services d'impression 3D (FDM, résine), de post-traitement, de peinture et de finition. Les tarifs sont indiqués en euros TTC sur le site et peuvent être mis à jour sans préavis.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-yellow-400 uppercase mb-3">3. Commande et paiement</h2>
          <p>Toute commande est ferme et définitive après paiement complet via la plateforme Stripe. Le client recevra un email de confirmation. Le prix définitif est calculé sur la base du poids réel de matière utilisée, pouvant différer légèrement de l'estimation initiale.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-yellow-400 uppercase mb-3">4. Fichiers numériques</h2>
          <p>Le client garantit détenir les droits sur les fichiers transmis. YellowLAB3D se réserve le droit de refuser l'impression de fichiers contrefaits, illégaux ou portant atteinte à des droits de tiers. En cas de fichier non imprimable, le client sera remboursé intégralement.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-yellow-400 uppercase mb-3">5. Délais de livraison</h2>
          <p>Les délais indiqués (24–72h) sont donnés à titre indicatif. Des retards peuvent survenir en cas de forte demande, de complexité particulière ou de problème technique. YellowLAB3D ne saurait être tenu responsable des retards de livraison imputables au transporteur.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-yellow-400 uppercase mb-3">6. Réclamations et remboursements</h2>
          <p>Toute réclamation doit être formulée par email dans les 48h suivant la réception. En cas de défaut reconnu, YellowLAB3D proposera une réimpression ou un remboursement. Les réclamations liées à des fichiers mal modélisés par le client ne sont pas prises en charge.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-yellow-400 uppercase mb-3">7. Droit de rétractation</h2>
          <p>Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux biens confectionnés selon les spécifications du consommateur (impression 3D personnalisée).</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-yellow-400 uppercase mb-3">8. Droit applicable</h2>
          <p>Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux compétents de Paris seront saisis, après tentative de résolution amiable.</p>
        </section>

        <p className="text-gray-600 text-sm mt-10">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
      </div>
    </div>
  );
}
