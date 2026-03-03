import { useState, useId } from "react";


// simulation d'appel HTTP pour valider le coupon
const validateCouponApi = async (code: string): Promise<boolean> => {
  await new Promise((r) => setTimeout(r, 500));
  return code === "SOLUTAP2026";
};

type SubscriptionType = "month" | "year" | undefined
type AccountType = "Gratuit" | "Premium";
type YesNo = "oui" | "non" | "";

interface FormState {
  lastName: string;
  firstName: string;
  genre: "M" | "Mme" | "Autre";
  age: string; // kept string to bind to input value
  email: string;
  typeCompte: AccountType;
  subscriptionType: SubscriptionType;
  coupon: string;
  couponValid: boolean | null;
  dixDoigts: YesNo;
  vitesse: string;
  dejaUtilise: YesNo;
  lequel: string;
}

export function Form() {

  const [form, setForm] = useState<FormState>({
    lastName: "",
    firstName: "",
    genre: "M",
    age: "",
    email: "",
    typeCompte: "Gratuit",
    subscriptionType: undefined,
    coupon: "",
    couponValid: null,
    dixDoigts: "",
    vitesse: "",
    dejaUtilise: "",
    lequel: "",
  });

  const lastNameHintId = useId()
  const firstNameHintId = useId()
  const ageHintId = useId()
  const emailHintId = useId()
  const accountTypeHintId = useId()
  const discountHintId = useId()


  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    if (key === "coupon") {
      setForm((f) => ({ ...f, couponValid: null }));
      setCouponMessage("");
    }
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};

    if (!form.lastName.trim()) e.lastName = "lastName requis";
    else if (form.lastName.length > 40) e.lastName = "Max 40 caractères";

    if (!form.firstName.trim()) e.firstName = "Prénom requis";
    else if (form.firstName.length > 40) e.firstName = "Max 40 caractères";

    if (!form.age.toString().trim()) e.age = "Âge requis";
    else {
      const n = Number(form.age);
      if (!Number.isInteger(n) || n <= 0) e.age = "Doit être un entier strictement positif";
    }

    if (!form.email.trim()) e.email = "Email requis";
    else {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(form.email)) e.email = "Email invalide";
      else if (form.email.toLowerCase().endsWith("yopmail.com")) e.email = "Les adresses 'yopmail.com' ne sont pas autorisées";
    }

    if (!form.dixDoigts) e.dixDoigts = "Réponse requise";

    if (!form.vitesse.toString().trim()) e.vitesse = "Vitesse requise";
    else {
      const v = Number(form.vitesse);
      if (!Number.isInteger(v) || v <= 0) e.vitesse = "Doit être un entier strictement positif";
    }

    if (!form.dejaUtilise) e.dejaUtilise = "Réponse requise";
    if (form.dejaUtilise === "oui" && !form.lequel.trim()) e.lequel = "Précisez le site";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    console.log("submit", form);
    alert("Formulaire valide (simulation).");
  };

  const handleValidateCoupon = async () => {
    if (!form.coupon.trim()) {
      setCouponMessage("Entrez un coupon.");
      setForm((f) => ({ ...f, couponValid: false }));
      return;
    }
    setCouponLoading(true);
    const ok = await validateCouponApi(form.coupon.trim());
    setCouponLoading(false);
    setForm((f) => ({ ...f, couponValid: ok }));
    setCouponMessage(ok ? "Coupon valide appliqué." : "Coupon invalide.");
  };

  return (
    <form 
      onSubmit={handleSubmit}
    > 

      <h1 className="text-mainColor text-4xl font-extrabold my-4">
        Formulaire d'inscription
      </h1>


      <h2 className="text-mainColor text-2xl font-extrabold my-4">
        Informations personnelles
      </h2>

      <div className="bg-white p-4 rounded-2xl">
        {/* ------- lastName -------- */}
        <label 
          htmlFor={lastNameHintId}
          className="block font-semibold"
        >
          Nom
        </label>

        <input
            id={lastNameHintId}
            type="text"
            value={form.lastName}
            maxLength={40}
            onChange={(e) => setField("lastName", e.target.value)}
            placeholder="Dupont"
            className="block px-2 py-1 border border-gray-300 rounded-md focus:outline-mainColor"
          />

        {errors.lastName && <div role="alert">{errors.lastName}</div>}

        {/* ------- firstName -------- */}
        <label 
          htmlFor={firstNameHintId}
          className="block font-semibold"
        >
          Prénom
        </label>

        <input
            id={firstNameHintId}
            type="text"
            value={form.firstName}
            maxLength={40}
            onChange={(e) => setField("firstName", e.target.value)}
            placeholder="Jean"
            className="block px-2 py-1 border border-gray-300 rounded-md focus:outline-mainColor"
          />

        {errors.firstName && <div role="alert">{errors.firstName}</div>}

        {/* ------- Genre -------- */}
        <fieldset>
          <legend className="font-semibold">Genre</legend>
          <label className="block">
            <input
              type="radio"
              name="genre"
              value="M"
              checked={form.genre === "M"}
              onChange={() => setField("genre", "M")}
              className="mx-2"
            />
            M
          </label>
          <label className="block">
            <input
              type="radio"
              name="genre"
              value="Mme"
              checked={form.genre === "Mme"}
              onChange={() => setField("genre", "Mme")}
              className="mx-2"
            />
            Mme
          </label>
          <label className="block">
            <input
              type="radio"
              name="genre"
              value="Autre"
              checked={form.genre === "Autre"}
              onChange={() => setField("genre", "Autre")}
              className="mx-2"
            />
            Autre
          </label>
        </fieldset>

        {/* ------- Age -------- */}
        <label
          htmlFor={ageHintId}
          className="block font-semibold"
        >
          Age
        </label>

        <input
          id={ageHintId}
          type="number"
          value={form.age}
          onChange={(e) => setField("age", e.target.value)}
          min={1}
          max={120}
          className="block px-2 py-1 border border-gray-300 rounded-md focus:outline-mainColor"
        />
        
        {errors.age && <div role="alert">{errors.age}</div>}


        {/* ------- email -------- */}
        <label
          htmlFor={emailHintId}
          className="block font-semibold"
        >
          Adresse mail
        </label>

        <input
          id={emailHintId}
          type="email"
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          className="block px-2 py-1 border border-gray-300 rounded-md focus:outline-mainColor"
        />
        
        {errors.email && <div role="alert">{errors.email}</div>}
      </div>

      {/* ---------------------- *
        *   Account type section *
        * ---------------------- */}

      <h2 className="text-mainColor text-2xl font-extrabold my-4">Type de compte</h2>
      
      <div className="bg-white p-4 rounded-2xl">
        <label
          htmlFor={accountTypeHintId}
          className="block font-semibold"
        >
          Type
        </label>

        <select
          id={accountTypeHintId}
          value={form.typeCompte} 
          onChange={(e) => setField("typeCompte", e.target.value as AccountType)}
          className="block px-2 py-1 border border-gray-300 rounded-md focus:outline-mainColor"

        >
            <option value="Gratuit">Gratuit</option>
            <option value="Premium">Premium</option>
        </select>

        <p
          className="text-gray-500 text-sm"
        >
            Vous pourrez changer de type de compte à tout moment dans les paramètres
        </p>

        

        {form.typeCompte === "Premium" && (
          <div>
            <fieldset>
              <legend className="font-semibold">Choisissez votre abonnement</legend>
              <label className="block">
                <input
                  type="radio"
                  name="month"
                  value="month"
                  checked={form.subscriptionType === "month"}
                  onChange={() => setField("subscriptionType", "month")}
                  className="mx-2"
                />
                4€ / mois
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="year"
                  value="year"
                  checked={form.subscriptionType === "year"}
                  onChange={() => setField("subscriptionType", "year")}
                  className="mx-2"
                />
                36€ / an (soit 3€ / mois)
              </label>
            </fieldset>

            
            <label
              htmlFor={discountHintId}
              className="block font-semibold"
            >
              Coupon de réduction
            </label>

            <input
              id={discountHintId}
              type="text"
              value={form.coupon}
              onChange={(e) => setField("coupon", e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded-md focus:outline-mainColor"
            />

            <button 
              type="button" 
              onClick={handleValidateCoupon} 
              disabled={couponLoading}
              className="bg-mainColor text-white  py-1 px-4 rounded-lg ml-4"
            >
              {couponLoading ? "Validation..." : "Ajouter"}
            </button>

            {couponMessage && <div role="status">{couponMessage}</div>}
            
          </div>
        )}
      </div>

      {/* ---------------------- *
        *   User level on typing *
        * ---------------------- */}
      <h2 
        className="text-mainColor text-2xl font-extrabold my-4"
      >
        Niveau en dactylo
      </h2>
      
      <div className="bg-white p-4 rounded-2xl">
        <fieldset>
          <legend
            className="font-semibold"
          >
            Savez-vous taper avec vos dix doigts au clavier ?</legend>
          <label>
            <input
              type="radio"
              name="dixDoigts"
              value="oui"
              checked={form.dixDoigts === "oui"}
              onChange={() => setField("dixDoigts", "oui")}
            />
            oui
          </label>
          <label>
            <input
              type="radio"
              name="dixDoigts"
              value="non"
              checked={form.dixDoigts === "non"}
              onChange={() => setField("dixDoigts", "non")}
            />
            non
          </label>
          {errors.dixDoigts && <div role="alert">{errors.dixDoigts}</div>}
        </fieldset>

        <label className="font-semibold">
          Quelle est votre vitesse de frappe ? (en mots / min)
          <input
            type="number"
            value={form.vitesse}
            onChange={(e) => setField("vitesse", e.target.value)}
            min={1}
            max={200}
            className="block px-2 py-1 border border-gray-300 rounded-md focus:outline-mainColor"
          />
          {errors.vitesse && <div role="alert">{errors.vitesse}</div>}
        </label>

        <p
          className="text-gray-500 text-sm"
        >
            Vous ne connaissez pas votre vitesse de frappe ?
            Testez-vous : TODO
        </p>

        <fieldset>
          <legend
            className="font-semibold"
          >
            Avez-vous déjà utilisé un site de dactylo ?</legend>
          <label>
            <input
              type="radio"
              name="dejaUtilise"
              value="oui"
              checked={form.dejaUtilise === "oui"}
              onChange={() => setField("dejaUtilise", "oui")}
            />
            oui
          </label>
          <label>
            <input
              type="radio"
              name="dejaUtilise"
              value="non"
              checked={form.dejaUtilise === "non"}
              onChange={() => setField("dejaUtilise", "non")}
            />
            non
          </label>
          {errors.dejaUtilise && <div role="alert">{errors.dejaUtilise}</div>}
        </fieldset>

        {form.dejaUtilise === "oui" && (
          <label>
            Lequel ?
            <select
              value={form.lequel}
              onChange={(e) => setField("lequel", e.target.value)}
              className="block px-2 py-1 border border-gray-300 rounded-md focus:outline-mainColor"
            >
              <option value="">-- sélectionner --</option>
              <option value="RataType">RataType</option>
              <option value="AgileFingers">AgileFingers</option>
              <option value="Autre">Autre (préciser)</option>
            </select>

            {form.lequel === "Autre" && (
              <input
                type="text"
                placeholder="Précisez"
                value=""
                onChange={(e) => setField("lequel", e.target.value)}
              />
            )}

            {errors.lequel && <div role="alert">{errors.lequel}</div>}
          </label>
        )}

      </div>

      <button 
        type="submit"
        className="bg-mainColor text-white  py-1 px-4 rounded-lg"
      >
        S'inscrire
      </button>
    </form>
  );
}