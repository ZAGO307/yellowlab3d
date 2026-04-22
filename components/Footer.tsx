import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900 mt-0">
      {/* CTA Banner */}
      <div className="bg-yellow-400 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-3xl md:text-4xl text-black uppercase tracking-wider">
            Votre projet mérite le meilleur.
          </p>
          <Link href="/order" className="btn-secondary border-black text-black hover:bg-black hover:text-yellow-400 whitespace-nowrap">
            Commencer maintenant →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-400 flex items-center justify-center" style={{clipPath:'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))'}}>
              <span className="font-display text-black text-lg">Y</span>
            </div>
            <span className="font-display text-2xl text-white">YellowLAB<span className="text-yellow-400">3D</span></span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Service d'impression 3D professionnel à Genève. FDM et résine haute résolution.
            Nous donnons vie à vos idées avec précision et rapidité.
          </p>
          <div className="flex gap-4 mt-6">
            {[Instagram, Linkedin, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 border border-gray-700 flex items-center justify-center text-gray-500 hover:border-yellow-400 hover:text-yellow-400 transition-all">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-display text-lg text-white uppercase tracking-wider mb-4">Navigation</h4>
          <ul className="space-y-3">
            {[
              { href: "/", label: "Accueil" },
              { href: "/services", label: "Services & Tarifs" },
              { href: "/order", label: "Commander" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-gray-400 hover:text-yellow-400 transition-colors text-sm tracking-wide">
                  → {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-lg text-white uppercase tracking-wider mb-4">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-400 text-sm">
              <Mail size={14} className="text-yellow-400 shrink-0" />
              contactyellowlab3d@gmail.com
            </li>
            <li className="flex items-center gap-3 text-gray-400 text-sm">
              <Phone size={14} className="text-yellow-400 shrink-0" />
              +41 79 460 31 65
            </li>
            <li className="flex items-start gap-3 text-gray-400 text-sm">
              <MapPin size={14} className="text-yellow-400 shrink-0 mt-0.5" />
              Genève, Suisse
            </li>
          </ul>
          <div className="mt-6 p-3 border border-yellow-400/20 bg-yellow-400/5">
            <p className="text-xs text-yellow-400/80 uppercase tracking-wider">Délai moyen</p>
            <p className="text-white font-display text-2xl mt-1">48–72H</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-900 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} YellowLAB3D. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-gray-400 transition-colors">Mentions légales</Link>
            <Link href="/cgv" className="hover:text-gray-400 transition-colors">CGV</Link>
            <Link href="/confidentialite" className="hover:text-gray-400 transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
