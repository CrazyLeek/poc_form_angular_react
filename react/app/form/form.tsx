// form.tsx
import { useForm, FormProvider } from "react-hook-form";

import { PersonInfo } from "./person-info";
import { AccountType } from "./account-type";
import { TypingLevel } from "./typing-level";

export function Form() {
  const methods = useForm({
    defaultValues: {
      // Section PersonInfo
      lastName: "",
      firstName: "",
      genre: "M",
      age: "",
      email: "",

      // Section AccountType
      typeCompte: "Gratuit",
      subscriptionType: undefined,
      coupon: "",
      couponValid: null,

      // Section TypingLevel
      dixDoigts: "",
      vitesse: "",
      dejaUtilise: "",
      lequel: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("SUBMIT =>", data);
    alert("Formulaire valide !");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h1 className="text-mainColor text-4xl font-extrabold my-4">
          Formulaire d'inscription
        </h1>

        {/* ----------- Person Info ------------ */}
        <h2 className="text-mainColor text-2xl font-extrabold my-4">
          Informations personnelles
        </h2>
        <div className="bg-white p-8 pt-4 rounded-2xl mb-10">
          <PersonInfo />
        </div>

        {/* ----------- Account Type ------------ */}
        <h2 className="text-mainColor text-2xl font-extrabold my-4">
          Type de compte
        </h2>
        <div className="bg-white p-8 pt-4 rounded-2xl mb-10">
          <AccountType />
        </div>

        {/* ----------- Typing Level ------------ */}
        <h2 className="text-mainColor text-2xl font-extrabold my-4">
          Niveau en dactylo
        </h2>
        <div className="bg-white p-8 pt-4 rounded-2xl mb-10">
          <TypingLevel />
        </div>

        <button
          type="submit"
          className="bg-mainColor hover:opacity-80 text-white py-1 px-4 rounded-lg mb-4 cursor-pointer"
        >
          S'inscrire
        </button>
      </form>
    </FormProvider>
  );
}
