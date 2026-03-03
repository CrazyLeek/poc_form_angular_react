import { useId, useState } from "react";

interface FormState {
  lastName: string;
  firstName: string;
  genre: "M" | "Mme" | "Autre";
  age: string; // kept string to bind to input value
  email: string;
}


export function PersonInfo() {

    const lastNameHintId = useId()
    const firstNameHintId = useId()
    const ageHintId = useId()
    const emailHintId = useId()

    const [form, setForm] = useState<FormState>({
        lastName: "",
        firstName: "",
        genre: "M",
        age: "",
        email: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

    const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((f) => ({ ...f, [key]: value }));
        setErrors((e) => ({ ...e, [key]: undefined }));
    };

    return (<>
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
            className="block px-2 py-1 mb-4 border border-gray-300 rounded-md focus:outline-mainColor"
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
            className="block px-2 py-1 mb-4 border border-gray-300 rounded-md focus:outline-mainColor"
          />

        {errors.firstName && <div role="alert">{errors.firstName}</div>}

        {/* ------- Genre -------- */}
        <fieldset className="mb-4">
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
            M.
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
          placeholder="30"
          min={1}
          max={120}
          className="block px-2 py-1 mb-4 border border-gray-300 rounded-md focus:outline-mainColor"
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
          placeholder="nom@example.com"
          onChange={(e) => setField("email", e.target.value)}
          className="block px-2 py-1 border border-gray-300 rounded-md focus:outline-mainColor"
        />
        
        {errors.email && <div role="alert">{errors.email}</div>}
    </>);

}