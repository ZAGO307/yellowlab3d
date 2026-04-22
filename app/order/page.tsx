"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, ShoppingCart, AlertCircle, Check } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

/* ─── Config ─── */
const TECHNOLOGIES = [
  { id: "pla", label: "PLA", sublabel: "0.05 CHF/g", resolution: "0.2 mm", desc: "Décoration, prototypes, usage général" },
  { id: "petg", label: "PETG", sublabel: "0.05 CHF/g", resolution: "0.2 mm", desc: "Pièces fonctionnelles, résistance mécanique" },
  { id: "abs", label: "ABS", sublabel: "0.06 CHF/g", resolution: "0.2 mm", desc: "Pièces techniques, résistance thermique 100°C" },
];

const MATERIALS_BY_TECH: Record<string, string[]> = {
  pla: ["PLA - Blanc", "PLA - Noir", "PLA - Gris", "PLA - Rouge", "PLA - Bleu", "PLA - Jaune"],
  petg: ["PETG - Transparent", "PETG - Noir", "PETG - Blanc", "PETG - Gris"],
  abs: ["ABS - Noir", "ABS - Blanc", "ABS - Gris"],
};

const INFILL_OPTIONS = [
  "15% — Léger (décoration)",
  "30% — Standard (usage général)",
  "50% — Solide (pièces fonctionnelles)",
  "80% — Très solide (contraintes mécaniques)",
  "100% — Massif (résistance maximale)",
];

const ADDONS = [
  { id: "sanding", label: "Ponçage de surface", price: 8 },
  { id: "primer", label: "Primer de surface", price: 10 },
  { id: "inserts", label: "Inserts filetés (M2–M8)", price: 2 },
  { id: "assembly", label: "Assemblage multi-pièces", price: 15 },
];

/* ─── Swiss Post shipping calculation ─── */
const calculateShipping = (country: string, totalWeightGrams: number): { price: number; label: string; delay: string } => {
  if (country === "Suisse") {
    if (totalWeightGrams <= 500) return { price: 7.00, label: "PostPac Priority", delay: "2–3 jours" };
    if (totalWeightGrams <= 2000) return { price: 9.00, label: "PostPac Priority", delay: "2–3 jours" };
    return { price: 13.00, label: "PostPac Priority", delay: "2–3 jours" };
  }
  if (country === "France") {
    if (totalWeightGrams <= 500) return { price: 15.00, label: "La Poste — Economique", delay: "4–6 jours" };
    if (totalWeightGrams <= 2000) return { price: 22.00, label: "La Poste — Economique", delay: "4–6 jours" };
    return { price: 28.00, label: "La Poste — Economique", delay: "5–7 jours" };
  }
  return { price: 22.00, label: "International", delay: "5–10 jours" };
};

interface FormData {
  technology: string;
  material: string;
  infill: string;
  quantity: number;
  weight: number;
  addons: string[];
  notes: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const MIN_ORDER = 8; // CHF

export default function OrderPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState<FormData>({
    technology: "pla",
    material: "PLA - Noir",
    infill: "30% — Standard (usage général)",
    quantity: 1,
    weight: 50,
    addons: [],
    notes: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Suisse",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const onDrop = useCallback((accepted: File[]) => {
    setFiles((prev) => [...prev, ...accepted].slice(0, 5));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/octet-stream": [".stl", ".obj", ".step", ".stp", ".3mf"],
    },
    maxSize: 100 * 1024 * 1024,
  });

  /* ─── Price calculation ─── */
  const pricePerGram = () => {
    const rates: Record<string, number> = { pla: 0.05, petg: 0.05, abs: 0.06 };
    return rates[form.technology] ?? 0.05;
  };

  const addonTotal = () =>
    ADDONS.filter((a) => form.addons.includes(a.id)).reduce((sum, a) => sum + a.price, 0);

  const printCost = () =>
    Math.max(pricePerGram() * form.weight * form.quantity, MIN_ORDER);

  const shipping = () => calculateShipping(form.country, form.weight * form.quantity);

  const total = () => printCost() + addonTotal() * form.quantity + shipping().price;

  const handleCheckout = async () => {
    if (!form.email || !form.firstName || !form.lastName || !form.address) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form,
          files: files.map((f) => f.name),
          total: total(),
          printCost: printCost(),
          shippingPrice: shipping().price,
          currency: "chf",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de la création du paiement");
      const stripe = await stripePromise;
      if (stripe && data.sessionId) {
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (key: keyof FormData, value: string | number | string[]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleAddon = (id: string) => {
    setForm((prev) => ({
      ...prev,
      addons: prev.addons.includes(id)
        ? prev.addons.filter((a) => a !== id)
        : [...prev.addons, id],
    }));
  };

  return (
    <>
      <section className="pt-36 pb-12 px-6 grid-bg">
        <div className="max-w-7xl mx-auto">
          <span className="section-tag">Commande</span>
          <h1 className="section-title mt-2">
            Votre <span className="text-yellow-400">projet</span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-xl">
            Configurez votre impression FDM et procédez au paiement sécurisé. Prix en CHF, livraison Suisse & France.
          </p>
        </div>
      </section>

      {/* Steps indicator */}
      <div className="border-b border-gray-800 bg-black sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex">
            {["Fichier & Config", "Coordonnées", "Récapitulatif"].map((s, i) => (
              <button
                key={s}
                onClick={() => i < step - 1 && setStep(i + 1)}
                className={`flex items-center gap-2 px-6 py-4 text-sm uppercase tracking-wider border-b-2 transition-colors ${
                  step === i + 1 ? "border-yellow-400 text-yellow-400"
                  : step > i + 1 ? "border-green-500 text-green-500 cursor-pointer"
                  : "border-transparent text-gray-600"
                }`}
              >
                <span className={`w-6 h-6 flex items-center justify-center text-xs border ${
                  step === i + 1 ? "border-yellow-400 text-yellow-400"
                  : step > i + 1 ? "border-green-500 bg-green-500 text-black"
                  : "border-gray-700 text-gray-600"
                }`}>
                  {step > i + 1 ? <Check size={12} /> : i + 1}
                </span>
                <span className="hidden md:inline">{s}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ─── LEFT: Form ─── */}
          <div className="lg:col-span-2 space-y-10">

            {step === 1 && (
              <>
                {/* File upload */}
                <div>
                  <h2 className="font-display text-2xl text-white uppercase tracking-wide mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-yellow-400 text-black flex items-center justify-center text-sm">1</span>
                    Votre fichier 3D
                  </h2>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed p-12 text-center cursor-pointer transition-all ${
                      isDragActive ? "border-yellow-400 bg-yellow-400/5" : "border-gray-700 hover:border-yellow-400/50"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload size={40} className="mx-auto text-gray-600 mb-4" />
                    <p className="text-gray-300 font-display text-xl uppercase tracking-wide">
                      {isDragActive ? "Déposez vos fichiers ici" : "Glissez-déposez ou cliquez"}
                    </p>
                    <p className="text-gray-500 text-sm mt-2">STL, OBJ, STEP, 3MF — max 100 MB</p>
                  </div>
                  {files.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {files.map((f, i) => (
                        <li key={i} className="flex items-center justify-between bg-gray-900 px-4 py-3 border border-gray-800">
                          <div className="flex items-center gap-3">
                            <span className="text-yellow-400 text-xs font-display">{f.name.split(".").pop()?.toUpperCase()}</span>
                            <span className="text-gray-300 text-sm truncate max-w-xs">{f.name}</span>
                            <span className="text-gray-600 text-xs">({(f.size / 1024 / 1024).toFixed(1)} MB)</span>
                          </div>
                          <button onClick={() => setFiles((p) => p.filter((_, j) => j !== i))} className="text-gray-600 hover:text-red-400 transition-colors">
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {files.length === 0 && (
                    <p className="mt-3 text-sm text-gray-600 flex items-center gap-2">
                      <AlertCircle size={14} className="text-yellow-400/60" />
                      Pas de fichier ? Contactez-nous pour une modélisation sur mesure.
                    </p>
                  )}
                </div>

                {/* Material/Technology */}
                <div>
                  <h2 className="font-display text-2xl text-white uppercase tracking-wide mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-yellow-400 text-black flex items-center justify-center text-sm">2</span>
                    Matériau
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {TECHNOLOGIES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          updateForm("technology", t.id);
                          updateForm("material", MATERIALS_BY_TECH[t.id][0]);
                        }}
                        className={`text-left p-5 border transition-all ${
                          form.technology === t.id
                            ? "border-yellow-400 bg-yellow-400/5"
                            : "border-gray-800 hover:border-gray-600"
                        }`}
                      >
                        <div className="font-display text-2xl text-white uppercase">{t.label}</div>
                        <div className="text-gray-500 text-xs mt-1">{t.desc}</div>
                        <div className="text-yellow-400 font-display text-xl mt-2">{t.sublabel}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <h2 className="font-display text-2xl text-white uppercase tracking-wide mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-yellow-400 text-black flex items-center justify-center text-sm">3</span>
                    Couleur
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {MATERIALS_BY_TECH[form.technology].map((m) => (
                      <button
                        key={m}
                        onClick={() => updateForm("material", m)}
                        className={`p-3 text-sm text-left border transition-all ${
                          form.material === m
                            ? "border-yellow-400 text-yellow-400 bg-yellow-400/5"
                            : "border-gray-800 text-gray-400 hover:border-gray-600"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Infill & Quantity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="font-display text-xl text-white uppercase tracking-wide mb-4">Remplissage</h2>
                    <select value={form.infill} onChange={(e) => updateForm("infill", e.target.value)} className="input-field w-full">
                      {INFILL_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <p className="text-gray-600 text-xs mt-2">Influence la solidité et le poids final</p>
                  </div>
                  <div>
                    <h2 className="font-display text-xl text-white uppercase tracking-wide mb-4">Quantité</h2>
                    <input
                      type="number" min={1} max={1000} value={form.quantity}
                      onChange={(e) => updateForm("quantity", parseInt(e.target.value) || 1)}
                      className="input-field w-full"
                    />
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <h2 className="font-display text-xl text-white uppercase tracking-wide mb-4">
                    Poids estimé par pièce (grammes)
                  </h2>
                  <input
                    type="number" min={1} max={10000} value={form.weight}
                    onChange={(e) => updateForm("weight", parseInt(e.target.value) || 1)}
                    className="input-field w-full"
                  />
                  <p className="text-gray-600 text-xs mt-2">
                    Estimez le poids de votre pièce. Minimum de commande : 8 CHF. Nous ajustons la facture si nécessaire.
                  </p>
                </div>

                {/* Add-ons */}
                <div>
                  <h2 className="font-display text-2xl text-white uppercase tracking-wide mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-yellow-400 text-black flex items-center justify-center text-sm">4</span>
                    Options & finitions
                  </h2>
                  <div className="space-y-3">
                    {ADDONS.map((a) => (
                      <label key={a.id} className="flex items-center justify-between p-4 border border-gray-800 hover:border-gray-600 cursor-pointer transition-all group">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 border flex items-center justify-center transition-all ${
                            form.addons.includes(a.id) ? "border-yellow-400 bg-yellow-400" : "border-gray-700"
                          }`}>
                            {form.addons.includes(a.id) && <Check size={12} className="text-black" />}
                          </div>
                          <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{a.label}</span>
                        </div>
                        <span className="text-yellow-400 font-display text-lg">+{a.price} CHF</span>
                        <input type="checkbox" className="hidden" checked={form.addons.includes(a.id)} onChange={() => toggleAddon(a.id)} />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h2 className="font-display text-xl text-white uppercase tracking-wide mb-4">Notes (optionnel)</h2>
                  <textarea
                    rows={3} placeholder="Précisions sur votre projet, contraintes particulières…"
                    value={form.notes} onChange={(e) => updateForm("notes", e.target.value)}
                    className="input-field w-full resize-none"
                  />
                </div>

                <button onClick={() => setStep(2)} className="btn-primary w-full justify-center text-lg">
                  Continuer — Coordonnées →
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <h2 className="font-display text-2xl text-white uppercase tracking-wide mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-yellow-400 text-black flex items-center justify-center text-sm">5</span>
                    Vos coordonnées & livraison
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-gray-500 mb-1 block">Prénom *</label>
                      <input className="input-field" value={form.firstName} onChange={(e) => updateForm("firstName", e.target.value)} placeholder="Jean" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-gray-500 mb-1 block">Nom *</label>
                      <input className="input-field" value={form.lastName} onChange={(e) => updateForm("lastName", e.target.value)} placeholder="Dupont" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-gray-500 mb-1 block">Email *</label>
                      <input type="email" className="input-field" value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="jean@exemple.ch" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-gray-500 mb-1 block">Téléphone</label>
                      <input type="tel" className="input-field" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder="+41 79 123 45 67" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs uppercase tracking-wider text-gray-500 mb-1 block">Pays *</label>
                      <select
                        className="input-field w-full"
                        value={form.country}
                        onChange={(e) => updateForm("country", e.target.value)}
                      >
                        <option value="Suisse">Suisse</option>
                        <option value="France">France</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs uppercase tracking-wider text-gray-500 mb-1 block">Adresse *</label>
                      <input className="input-field" value={form.address} onChange={(e) => updateForm("address", e.target.value)} placeholder="Rue de Rive 12" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-gray-500 mb-1 block">Ville *</label>
                      <input className="input-field" value={form.city} onChange={(e) => updateForm("city", e.target.value)} placeholder="Genève" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-gray-500 mb-1 block">NPA / Code postal *</label>
                      <input className="input-field" value={form.postalCode} onChange={(e) => updateForm("postalCode", e.target.value)} placeholder="1204" />
                    </div>
                  </div>

                  {/* Live shipping preview */}
                  {form.country && (
                    <div className="mt-6 p-4 border border-yellow-400/30 bg-yellow-400/5">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Frais de port calculés</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm">{shipping().label}</p>
                          <p className="text-gray-500 text-xs">{shipping().delay} · Poids total estimé : {form.weight * form.quantity}g</p>
                        </div>
                        <span className="font-display text-2xl text-yellow-400">{shipping().price.toFixed(2)} CHF</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center">← Retour</button>
                  <button onClick={() => setStep(3)} className="btn-primary flex-1 justify-center text-lg">Vérifier la commande →</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <h2 className="font-display text-2xl text-white uppercase tracking-wide mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-yellow-400 text-black flex items-center justify-center text-sm">✓</span>
                    Récapitulatif
                  </h2>
                  <div className="space-y-4">
                    {[
                      { label: "Matériau", value: `${form.technology.toUpperCase()} — ${form.material}` },
                      { label: "Remplissage", value: form.infill },
                      { label: "Quantité", value: form.quantity },
                      { label: "Poids estimé", value: `${form.weight}g / pièce (total : ${form.weight * form.quantity}g)` },
                      { label: "Livraison", value: `${shipping().label} — ${shipping().delay}` },
                      { label: "Contact", value: `${form.firstName} ${form.lastName} — ${form.email}` },
                      { label: "Adresse", value: `${form.address}, ${form.postalCode} ${form.city}, ${form.country}` },
                      ...(form.addons.length > 0 ? [{ label: "Options", value: ADDONS.filter((a) => form.addons.includes(a.id)).map((a) => a.label).join(", ") }] : []),
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between py-3 border-b border-gray-900">
                        <span className="text-gray-500 text-sm uppercase tracking-wider">{label}</span>
                        <span className="text-white text-sm text-right max-w-xs">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {error && (
                  <div className="p-4 border border-red-500 bg-red-500/10 text-red-400 text-sm flex items-center gap-3">
                    <AlertCircle size={16} />{error}
                  </div>
                )}
                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="btn-secondary flex-1 justify-center">← Modifier</button>
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="btn-primary flex-1 justify-center text-lg disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Chargement…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ShoppingCart size={18} /> Payer {total().toFixed(2)} CHF
                      </span>
                    )}
                  </button>
                </div>
                <p className="text-gray-600 text-xs text-center flex items-center justify-center gap-2">
                  🔒 Paiement sécurisé par Stripe · SSL · 3DS
                </p>
              </>
            )}
          </div>

          {/* ─── RIGHT: Summary ─── */}
          <div className="lg:col-span-1">
            <div className="sticky top-40 border border-gray-800 p-6 bg-black/50">
              <h3 className="font-display text-xl text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-4">
                Résumé du devis
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Impression ({form.weight}g × {form.quantity})</span>
                  <span className="text-white">{printCost().toFixed(2)} CHF</span>
                </div>
                {form.addons.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Options (× {form.quantity})</span>
                    <span className="text-white">{(addonTotal() * form.quantity).toFixed(2)} CHF</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Livraison ({form.country})</span>
                  <span className="text-white">{shipping().price.toFixed(2)} CHF</span>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-3 mt-3">
                  <span className="text-gray-300 font-medium">Total</span>
                  <span className="font-display text-2xl text-yellow-400">{total().toFixed(2)} CHF</span>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-600 space-y-1">
                <p>• Matériau : {form.technology.toUpperCase()} — {pricePerGram()} CHF/g</p>
                <p>• Livraison : La Poste Suisse</p>
                <p>• Minimum de commande : 8 CHF</p>
              </div>
              <div className="mt-6 p-4 border border-yellow-400/20 bg-yellow-400/5 text-xs text-yellow-400/70 space-y-1">
                <p>✓ Devis ajusté au poids réel</p>
                <p>✓ Paiement 100% sécurisé</p>
                <p>✓ Remboursement si fichier non imprimable</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
