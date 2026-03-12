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
      {/* lastName */}
      <label htmlFor={lastNameId} className="block font-semibold">
        Nom
      </label>
      <input
        id={lastNameId}
        type="text"
        {...register("lastName", {
          required: "Nom requis",
          minLength: { value: 3, message: "Min 3 caractères" },
          maxLength: { value: 40, message: "Max 40 caractères" },
        })}
        className="block px-2 py-1 mb-2 border rounded-md"
      />
      {errors.lastName && (
        <div role="alert">{errors.lastName.message?.toString()}</div>
      )}

      {/* firstName */}
      <label htmlFor={firstNameId} className="block font-semibold">
        Prénom
      </label>
      <input
        id={firstNameId}
        type="text"
        {...register("firstName", {
          required: "Prénom requis",
          minLength: { value: 3, message: "Min 3 caractères" },
          maxLength: { value: 40, message: "Max 40 caractères" },
        })}
        className="block px-2 py-1 mb-2 border rounded-md"
      />
      {errors.firstName && (
        <div role="alert">{errors.firstName.message?.toString()}</div>
      )}

      {/* Genre */}
      <fieldset className="mb-4">
        <legend className="font-semibold">Genre</legend>

        <label>
          <input
            type="radio"
            value="M"
            {...register("genre")}
            className="mx-2"
          />
          M.
        </label>

        <label>
          <input
            type="radio"
            value="Mme"
            {...register("genre")}
            className="mx-2"
          />
          Mme
        </label>

        <label>
          <input
            type="radio"
            value="Autre"
            {...register("genre")}
            className="mx-2"
          />
          Autre
        </label>
      </fieldset>

      {/* Age */}
      <label htmlFor={ageId} className="block font-semibold">
        Age
      </label>
      <input
        id={ageId}
        type="number"
        {...register("age", {
          required: "Âge requis",
          valueAsNumber: true,
          validate: (v) => v > 0 || "Doit être un entier positif",
        })}
        className="block px-2 py-1 mb-2 border rounded-md"
      />
      {errors.age && <div role="alert">{errors.age.message?.toString()}</div>}

      {/* Email */}
      <label htmlFor={emailId} className="block font-semibold">
        Adresse mail
      </label>
      <input
        id={emailId}
        type="email"
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
        className="block px-2 py-1 border rounded-md"
      />
      {errors.email && (
        <div role="alert">{errors.email.message?.toString()}</div>
      )}
    </>
  );
}
