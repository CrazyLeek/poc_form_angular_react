import { useId, useState } from "react";

type YesNo = "oui" | "non" | "";

interface FormState {
  dixDoigts: YesNo;
  vitesse: string;
  dejaUtilise: YesNo;
  lequel: string;
}

export function TypingLevel(){

    const yesTenFingersHintId = useId();
    const noTenFingersHintId = useId();
    const speedTypingHintId = useId();
    const otherSiteUsedHintId = useId();
    const yesOtherSiteHintId = useId();
    const noOtherSiteHintId = useId();

    const [form, setForm] = useState<FormState>({
        dixDoigts: "",
        vitesse: "",
        dejaUtilise: "",
        lequel: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  

    const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm((f) => ({ ...f, [key]: value }));
        setErrors((e) => ({ ...e, [key]: undefined }));
    };


    return (<>
        <fieldset className="mb-4">
            <legend
                className="font-semibold"
            >
                Savez-vous taper avec vos dix doigts au clavier ?</legend>
            <label className="pr-2" htmlFor={yesTenFingersHintId}>
                oui
            </label>
            <input
                id={yesTenFingersHintId}
                type="radio"
                name="dixDoigts"
                value="oui"
                checked={form.dixDoigts === "oui"}
                onChange={() => setField("dixDoigts", "oui")}
                className="mr-8"
            />

            <label className="pr-2" htmlFor={noTenFingersHintId}>
                non
            </label>
            <input
                id={noTenFingersHintId}
                type="radio"
                name="dixDoigts"
                value="non"
                checked={form.dixDoigts === "non"}
                onChange={() => setField("dixDoigts", "non")}
                />
            {errors.dixDoigts && <div role="alert">{errors.dixDoigts}</div>}
        </fieldset>

        <label 
            htmlFor={speedTypingHintId}
            className="font-semibold"
        >
          Quelle est votre vitesse de frappe ? (en mots / min)
        </label>
        <input
            id={speedTypingHintId}
            type="number"
            value={form.vitesse}
            placeholder="30"
            onChange={(e) => setField("vitesse", e.target.value)}
            min={1}
            max={200}
            className="block px-2 py-1 mb-4 border border-gray-300 rounded-md focus:outline-mainColor"
          />
          {errors.vitesse && <div role="alert">{errors.vitesse}</div>}

        
        {/* ------ Other website used ------ */}
        <fieldset >
            <legend
                className="font-semibold"
            >
                Avez-vous déjà utilisé un site de dactylo ?
            </legend>
            <label htmlFor={yesOtherSiteHintId} className="pr-2">
                oui
            </label>
            <input
                id={yesOtherSiteHintId}
                type="radio"
                name="dejaUtilise"
                value="oui"
                checked={form.dejaUtilise === "oui"}
                onChange={() => setField("dejaUtilise", "oui")}
                className="mr-8"
            />

            <label htmlFor={noOtherSiteHintId} className="pr-2">
                non
            </label>
            <input
                id={noOtherSiteHintId}
                type="radio"
                name="dejaUtilise"
                value="non"
                checked={form.dejaUtilise === "non"}
                onChange={() => setField("dejaUtilise", "non")}
            />
          {errors.dejaUtilise && <div role="alert">{errors.dejaUtilise}</div>}
        </fieldset>

        {form.dejaUtilise === "oui" && (<>
            
            <div className="mt-4" /> {/* For some reason, vertical margins don't have any effect on the label*/}
            
            <label>
                <input type="checkbox" name="fruits" value="pommes" />
                Ratatype
            </label>
            
            <label>
                <input type="checkbox" name="fruits" value="bananes" />
                Agile Fingers
            </label>
            
            <label>
                <input type="checkbox" name="fruits" value="cerises" />
                Typing Study
            </label>
            
            <label>
                <input type="checkbox" name="fruits" value="fraises" />
                Autre
            </label>
        </>)}
    
    </>)
}