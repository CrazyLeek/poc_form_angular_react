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
                name="tenFingersAbility"
                required
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
                name="tenFingersAbility"
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
            required
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
                name="otherWebsite"
                value="yes"
                required
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
                name="otherWebsite"
                value="no"
                checked={form.dejaUtilise === "non"}
                onChange={() => setField("dejaUtilise", "non")}
            />
          {errors.dejaUtilise && <div role="alert">{errors.dejaUtilise}</div>}
        </fieldset>

        {form.dejaUtilise === "oui" && (<>

            <p className="mt-4 font-semibold"> Lequel(s) ?</p>
            
            <div className="flex flex-col gap-2 mt-2">
                <label >
                    <input type="checkbox" name="websiteOption" value="AgileFingers" className="mr-2" />
                    AgileFingers
                </label>
                
                <label>
                    <input type="checkbox" name="websiteOption" value="Tapotons" className="mr-2"/>
                    Tapotons
                </label>
                
                <label>
                    <input type="checkbox" name="websiteOption" value="Ratatype" className="mr-2" />
                    Ratatype
                </label>
                
                <label>
                    <input type="checkbox" name="websiteOption" value="TapTouche" className="mr-2"/>
                    TapTouche
                </label>

                <label>
                    <input type="checkbox" name="websiteOption" value="EdClub" className="mr-2"/>
                    EdClub
                </label>

                <label>
                    <input type="checkbox" name="websiteOption" value="Touch Typing Study" className="mr-2"/>
                    Touch Typing Study
                </label>

            </div>
        </>)}
    
    </>)
}