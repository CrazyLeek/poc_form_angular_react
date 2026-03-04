import { PersonInfo } from "./person-info";
import { AccountType } from "./account-type";
import { TypingLevel } from "./typing-level";

export function Form() {
  /*const validate = (): boolean => {
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
  };*/

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    /*if (!validate()) return;
    console.log("submit", form);
    alert("Formulaire valide (simulation).");*/
  };

  return (
    <form>
      <h1 className="text-mainColor text-4xl font-extrabold my-4">
        Formulaire d'inscription
      </h1>

      {/* ------------------------------ *
       *   Personal information section *
       * ------------------------------ */}
      <h2 className="text-mainColor text-2xl font-extrabold my-4">
        Informations personnelles
      </h2>

      <div className="bg-white p-8 pt-4 rounded-2xl mb-10">
        <PersonInfo />
      </div>

      {/* ---------------------- *
       *   Account type section *
       * ---------------------- */}
      <h2 className="text-mainColor text-2xl font-extrabold my-4">
        Type de compte
      </h2>

      <div className="bg-white p-8 pt-4 rounded-2xl mb-10">
        <AccountType />
      </div>

      {/* ---------------------- *
       *   User level on typing *
       * ---------------------- */}
      <h2 className="text-mainColor text-2xl font-extrabold my-4">
        Niveau en dactylo
      </h2>

      <div className="bg-white p-8 pt-4 rounded-2xl mb-10">
        <TypingLevel />
      </div>

      <button
        type="submit"
        className="bg-mainColor hover:opacity-80 hover:cursor-pointer text-white py-1 px-4 rounded-lg mb-4 "
      >
        S'inscrire
      </button>
    </form>
  );
}
