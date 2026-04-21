export default function MentionsLegalesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-36 pb-24">
      <h1 className="font-display text-5xl text-white uppercase mb-8">Mentions Légales</h1>
      <div className="prose prose-invert max-w-none space-y-6 text-gray-400 leading-relaxed">
        <h2 className="font-display text-2xl text-yellow-400 uppercase">Éditeur du site</h2>
        <p>YellowLAB3D SAS — 12 Rue de la Fabrication, 75011 Paris, France</p>
        <p>SIRET : 000 000 000 00000 — RCS Paris</p>
        <p>Email : contact@yellowlab3d.fr — Tél : +33 1 23 45 67 89</p>
        <p>Directeur de publication : [Nom du dirigeant]</p>

        <h2 className="font-display text-2xl text-yellow-400 uppercase mt-8">Hébergeur</h2>
        <p>Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104, USA</p>

        <h2 className="font-display text-2xl text-yellow-400 uppercase mt-8">Propriété intellectuelle</h2>
        <p>L'ensemble des contenus de ce site (textes, images, logos) est protégé par le droit d'auteur. Toute reproduction non autorisée est interdite.</p>

        <h2 className="font-display text-2xl text-yellow-400 uppercase mt-8">Limitation de responsabilité</h2>
        <p>YellowLAB3D ne saurait être tenu responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès au site.</p>
      </div>
    </div>
  );
}
