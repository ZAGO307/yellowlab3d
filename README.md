# YellowLAB3D — Site d'impression 3D professionnel

Site web Next.js 14 complet pour un service d'impression 3D. Noir & jaune. Prêt pour Vercel + GitHub.

## 🚀 Stack technique

- **Framework** : Next.js 14 (App Router)
- **Style** : Tailwind CSS (thème noir & jaune)
- **Paiement** : Stripe Checkout
- **Email** : Nodemailer (SMTP)
- **Upload** : react-dropzone
- **Déploiement** : Vercel

## 📄 Pages incluses

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/` | Hero, stats, services, process, témoignages, FAQ |
| Services & Tarifs | `/services` | Plans, matériaux, options, tableau comparatif |
| Commander | `/order` | Formulaire multi-étapes, upload fichier, checkout Stripe |
| Contact | `/contact` | Formulaire, infos, FAQ |
| Succès paiement | `/success` | Confirmation après paiement |
| Mentions légales | `/mentions-legales` | — |
| CGV | `/cgv` | Conditions générales de vente |
| Confidentialité | `/confidentialite` | Politique RGPD |

## ⚙️ Installation locale

### 1. Cloner le dépôt

```bash
git clone https://github.com/VOTRE_USER/yellowlab3d.git
cd yellowlab3d
npm install
```

### 2. Variables d'environnement

```bash
cp .env.local.example .env.local
```

Remplissez `.env.local` avec vos vraies clés :

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre@email.com
SMTP_PASS=votre-mot-de-passe-app
```

### 3. Lancer en développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

---

## 💳 Configuration Stripe

### Obtenir vos clés

1. Créez un compte sur [stripe.com](https://stripe.com)
2. Allez dans **Tableau de bord → Développeurs → Clés API**
3. Copiez la clé publique (`pk_test_...`) et la clé secrète (`sk_test_...`)

### Configurer le webhook (développement local)

```bash
# Installer Stripe CLI
brew install stripe/stripe-cli/stripe

# S'authentifier
stripe login

# Écouter les événements et les rediriger vers votre app
stripe listen --forward-to localhost:3000/api/webhook
```

Copiez le `whsec_...` affiché dans `STRIPE_WEBHOOK_SECRET`.

### Configurer le webhook (production)

1. Stripe Dashboard → **Développeurs → Webhooks → Ajouter un endpoint**
2. URL : `https://votre-domaine.vercel.app/api/webhook`
3. Événements : `checkout.session.completed`
4. Copiez le secret de signature dans les variables d'environnement Vercel

---

## 📧 Configuration Email

### Gmail (recommandé pour débuter)

1. Activez la validation en 2 étapes sur votre compte Google
2. Allez dans **Compte Google → Sécurité → Mots de passe des applications**
3. Créez un mot de passe pour "Autre application"
4. Utilisez ce mot de passe dans `SMTP_PASS`

### Services alternatifs

- [Brevo](https://brevo.com) — 300 emails/jour gratuits
- [Resend](https://resend.com) — 100 emails/jour gratuits
- [Mailgun](https://mailgun.com) — fiable et économique

---

## 🌐 Déploiement sur Vercel

### Via GitHub (recommandé)

1. **Pushez sur GitHub** :
```bash
git init
git add .
git commit -m "🚀 Initial commit — YellowLAB3D"
git remote add origin https://github.com/VOTRE_USER/yellowlab3d.git
git push -u origin main
```

2. **Importez sur Vercel** :
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez **Add New Project**
   - Importez votre repo GitHub
   - Vercel détecte automatiquement Next.js

3. **Variables d'environnement sur Vercel** :
   - Dans votre projet Vercel → **Settings → Environment Variables**
   - Ajoutez toutes les variables de `.env.local.example`
   - **Important** : changez `NEXT_PUBLIC_BASE_URL` pour votre URL Vercel
   - **Important** : utilisez vos clés Stripe de **production** (`pk_live_...`, `sk_live_...`)

4. **Redéployez** après avoir ajouté les variables.

---

## 🎨 Personnalisation

### Changer le nom du service

Cherchez/remplacez `YellowLAB3D` dans tous les fichiers.

### Modifier les tarifs

Éditez les tableaux dans :
- `app/order/page.tsx` — ligne `TECHNOLOGIES` et `ADDONS`
- `app/services/page.tsx` — `PLANS`, `ADDONS`, `MATERIALS`

### Modifier les couleurs

Les couleurs sont définies dans `app/globals.css` via les variables CSS :
```css
:root {
  --black: #0A0A0A;
  --yellow: #FFD600;
  --white: #F5F5F0;
}
```

### Modifier les informations de contact

Cherchez le texte dans `components/Footer.tsx` et `app/contact/page.tsx`.

---

## 📁 Structure du projet

```
yellowlab3d/
├── app/
│   ├── api/
│   │   ├── create-checkout-session/route.ts   ← Stripe checkout
│   │   ├── webhook/route.ts                   ← Stripe webhook + email
│   │   └── contact/route.ts                   ← Formulaire de contact
│   ├── order/page.tsx          ← Page commande (3 étapes)
│   ├── services/page.tsx       ← Tarifs & matériaux
│   ├── contact/page.tsx        ← Page contact
│   ├── success/page.tsx        ← Confirmation paiement
│   ├── cgv/page.tsx
│   ├── mentions-legales/page.tsx
│   ├── confidentialite/page.tsx
│   ├── not-found.tsx
│   ├── layout.tsx              ← Layout global
│   ├── page.tsx                ← Page d'accueil
│   └── globals.css             ← Styles globaux
├── components/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── .env.local.example          ← Modèle de config
├── .gitignore
├── vercel.json
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 🔒 Sécurité

- ✅ `.env.local` est dans `.gitignore` — vos clés ne seront jamais commitées
- ✅ Stripe gère le paiement — vous ne stockez aucune donnée bancaire
- ✅ Webhook sécurisé par signature HMAC
- ✅ Headers CORS configurés

---

## 📜 Licence

MIT — Libre d'utilisation commerciale.
