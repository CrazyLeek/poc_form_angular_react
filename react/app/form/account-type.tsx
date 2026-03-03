import { useId, useState } from "react";

type SubscriptionType = "month" | "year" | undefined
type AccountType = "Gratuit" | "Premium";

interface FormState {
  typeCompte: AccountType;
  subscriptionType: SubscriptionType;
  coupon: string;
  couponValid: boolean | null;
}

// simulation d'appel HTTP pour valider le coupon
const validateCouponApi = async (code: string): Promise<boolean> => {
  await new Promise((r) => setTimeout(r, 500));
  return code === "SOLUTAP2026";
};

export function AccountType(){

    const accountTypeHintId = useId()
    const discountHintId = useId()

    const [form, setForm] = useState<FormState>({
        typeCompte: "Gratuit",
        subscriptionType: undefined,
        coupon: "",
        couponValid: null,
    });

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

    return (<>
    
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
          className="block px-4 py-1 border border-gray-300 rounded-md focus:outline-mainColor"

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
          <div >
            <fieldset className="mt-4">
              <legend className="font-semibold">Choisissez votre abonnement</legend>
              <label className="block">
                <input
                  type="radio"
                  name="subscriptionType"
                  value="month"
                  checked={form.subscriptionType === "month"}
                  required
                  onChange={() => setField("subscriptionType", "month")}
                  className="mx-2"
                />
                4€ / mois
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="subscriptionType"
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
              className="block font-semibold mt-4"
            >
              Coupon de réduction
            </label>

            <input
              id={discountHintId}
              type="text"
              value={form.coupon}
              placeholder="PROMO"
              onChange={(e) => setField("coupon", e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded-md focus:outline-mainColor"
            />

            <button 
              type="button" 
              onClick={handleValidateCoupon} 
              disabled={couponLoading}
              className="bg-mainColor text-white py-1 px-4 rounded-lg ml-4 hover:opacity-80 hover:cursor-pointer"
            >
              {couponLoading ? "Validation..." : "Ajouter"}
            </button>

            {couponMessage && <div role="status">{couponMessage}</div>}
            
          </div>
        )}
    
    </>);
}