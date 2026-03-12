// typing-level.tsx
import { useFormContext } from "react-hook-form";
import { useId } from "react";

export function TypingLevel() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const dejaUtilise = watch("dejaUtilise");

  const speedId = useId();

  return (
    <>
      {/* ---------- Dix doigts -------------- */}
      <fieldset className="mb-4">
        <legend className="font-semibold">
          Savez-vous taper avec vos dix doigts ?
        </legend>

        <label>
          <input
            type="radio"
            value="oui"
            {...register("dixDoigts", { required: "Réponse requise" })}
            className="mx-2"
          />
          oui
        </label>

        <label>
          <input
            type="radio"
            value="non"
            {...register("dixDoigts")}
            className="mx-2"
          />
          non
        </label>

        {errors.dixDoigts && (
          <div role="alert" className="text-red-600 text-sm ml-1">
            {errors.dixDoigts.message?.toString()}
          </div>
        )}
      </fieldset>

      {/* ------------- Speed typing ------------------*/}
      <label htmlFor={speedId} className="font-semibold">
        Vitesse de frappe (mots/min)
      </label>
      <p className="text-gray-500 text-sm">
        Vous ne connaissez pas votre vitesse de frappe ?
      </p>
      <p className="text-gray-500 text-sm mb-2">
        Testez-vous :
        <a
          href="https://tapotons.fr/test-vitesse-de-frappe/"
          target="_blank"
          className="underline text-mainColor ml-1"
        >
          tapotons.fr/test-vitesse-de-frappe
          <img src="/pop-icon.svg" alt="" className="inline pl-1 w-4" />
        </a>
      </p>

      <input
        id={speedId}
        type="number"
        placeholder="40"
        {...register("vitesse", {
          required: "Vitesse requise",
          valueAsNumber: true,
          validate: (v) => v > 0 || "Doit être un entier positif",
        })}
        className="block px-2 py-1 border border-gray-300 rounded-md focus:outline-mainColor outline-gray-300 transition-colors delay-70 ease-out"
      />
      {errors.vitesse && (
        <div role="alert" className="text-red-600 text-sm ml-1">
          {errors.vitesse.message?.toString()}
        </div>
      )}

      {/* Déjà utilisé ? */}
      <fieldset className="mt-4">
        <legend className="font-semibold">
          Avez-vous déjà utilisé un site de dactylo ?
        </legend>

        <label>
          <input
            type="radio"
            value="oui"
            {...register("dejaUtilise", { required: "Réponse requise" })}
            className="mx-2"
          />
          oui
        </label>

        <label>
          <input
            type="radio"
            value="non"
            {...register("dejaUtilise")}
            className="mx-2"
          />
          non
        </label>
      </fieldset>
      {errors.dejaUtilise && (
        <div role="alert" className="text-red-600 text-sm ml-1">
          {errors.dejaUtilise.message?.toString()}
        </div>
      )}

      {/* Si oui → cases à cocher */}
      {dejaUtilise === "oui" && (
        <>
          <p className="mt-4 font-semibold">Lequel(s) ?</p>

          <div className="flex flex-col gap-2 mt-2 pl-2">
            {[
              "AgileFingers",
              "Tapotons",
              "Ratatype",
              "TapTouche",
              "EdClub",
              "Touch Typing Study",
            ].map((opt) => (
              <label key={opt}>
                <input
                  type="checkbox"
                  value={opt}
                  {...register("lequel")}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        </>
      )}
    </>
  );
}
