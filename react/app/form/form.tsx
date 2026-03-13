// form.tsx
import { useForm, FormProvider, useFormState } from "react-hook-form";

import { PersonInfo } from "./person-info";
import { AccountType } from "./account-type";
import { TypingLevel } from "./typing-level";
import { Spinner } from "~/spinner/spinner";

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

  const { isSubmitting } = useFormState(methods);

  const onSubmit = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("SUBMIT =>", data);
    alert("Formulaire envoyé !");
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
        <div className="bg-white p-8 pt-4 rounded-2xl mb-10 w-[140%]">
          <PersonInfo />
        </div>

        {/* ----------- Account Type ------------ */}
        <h2 className="text-mainColor text-2xl font-extrabold my-4">
          Type de compte
        </h2>
        <div className="bg-white p-8 pt-4 rounded-2xl mb-10 w-[140%]">
          <AccountType />
        </div>

        {/* ----------- Typing Level ------------ */}
        <h2 className="text-mainColor text-2xl font-extrabold my-4">
          Niveau en dactylo
        </h2>
        <div className="bg-white p-8 pt-4 rounded-2xl mb-10 w-[140%]">
          <TypingLevel />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-mainColor hover:opacity-80 text-white py-1 px-4 rounded-lg mb-4 cursor-pointer"
          data-cy="btn-submit"
        >
          S'inscrire
          {isSubmitting && <Spinner />}
        </button>
      </form>
    </FormProvider>
  );
}
