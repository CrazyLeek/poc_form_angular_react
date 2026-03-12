// person-info.tsx
import { useFormContext } from "react-hook-form";
import { useId } from "react";

export function PersonInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const lastNameId = useId();
  const firstNameId = useId();
  const ageId = useId();
  const emailId = useId();

  return (
    <>
      {/* ------- lastName -------- */}
      <label htmlFor={lastNameId} className="block font-semibold">
        Nom
      </label>
      <input
        id={lastNameId}
        placeholder="Dupont"
        type="text"
        {...register("lastName", {
          required: "Nom requis",
          minLength: { value: 3, message: "Min 3 caractères" },
          maxLength: { value: 40, message: "Max 40 caractères" },
        })}
        className="block px-2 py-1 border border-gray-300 rounded-md focus:outline-mainColor outline-gray-300 transition-colors delay-70 ease-out"
      />
      {errors.lastName && (
        <div role="alert" className="text-red-600 text-sm ml-1">
          {errors.lastName.message?.toString()}
        </div>
      )}

      {/* ------- firstName ------- */}
      <label htmlFor={firstNameId} className="block mt-4 font-semibold">
        Prénom
      </label>
      <input
        id={firstNameId}
        placeholder="Jean"
        type="text"
        {...register("firstName", {
          required: "Prénom requis",
          minLength: { value: 3, message: "Min 3 caractères" },
          maxLength: { value: 40, message: "Max 40 caractères" },
        })}
        className="block px-2 py-1 border border-gray-300 rounded-md focus:outline-mainColor outline-gray-300 transition-colors delay-70 ease-out"
      />
      {errors.firstName && (
        <div role="alert" className="text-red-600 text-sm ml-1">
          {errors.firstName.message?.toString()}
        </div>
      )}

      {/* -------- Gender --------------*/}
      <fieldset className="mb-4 mt-4">
        <legend className="font-semibold">Genre</legend>

        <label className="block">
          <input
            type="radio"
            value="M"
            {...register("genre")}
            className="mx-2"
          />
          M.
        </label>

        <label className="block">
          <input
            type="radio"
            value="Mme"
            {...register("genre")}
            className="mx-2"
          />
          Mme
        </label>

        <label className="block">
          <input
            type="radio"
            value="Autre"
            {...register("genre")}
            className="mx-2"
          />
          Autre
        </label>
      </fieldset>

      {/* ------------- Age ----------------*/}
      <label htmlFor={ageId} className="block font-semibold">
        Age
      </label>
      <input
        id={ageId}
        type="number"
        placeholder="40"
        {...register("age", {
          required: "Âge requis",
          valueAsNumber: true,
          min: { value: 1, message: "Doit être supérieur à 1" },
          max: { value: 150, message: "Doit être inférieur à 150" },
        })}
        className="block px-2 py-1 border border-gray-300 rounded-md focus:outline-mainColor outline-gray-300 transition-colors delay-70 ease-out"
      />
      {errors.age && (
        <div role="alert" className="text-red-600 text-sm ml-1">
          {errors.age.message?.toString()}
        </div>
      )}

      {/* Email */}
      <label htmlFor={emailId} className="block font-semibold mt-4">
        Adresse mail
      </label>
      <input
        id={emailId}
        type="email"
        placeholder="vous@example.com"
        {...register("email", {
          required: "Email requis",
          maxLength: { value: 50, message: "Email trop long" },
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email invalide",
          },
          validate: (value) =>
            !value.toLowerCase().endsWith("yopmail.com") ||
            "Les adresses 'yopmail.com' ne sont pas autorisées",
        })}
        className="block px-2 py-1 border border-gray-300 rounded-md focus:outline-mainColor outline-gray-300 transition-colors delay-70 ease-out"
      />
      {errors.email && (
        <div role="alert" className="text-red-600 text-sm ml-1">
          {errors.email.message?.toString()}
        </div>
      )}
    </>
  );
}
