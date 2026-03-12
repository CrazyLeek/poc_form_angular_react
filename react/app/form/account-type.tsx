// account-type.tsx
import { useFormContext } from "react-hook-form";
import { useId } from "react";

const validateCouponApi = async (code: string) => {
  await new Promise((r) => setTimeout(r, 500));
  return code === "SOLUTAP2026";
};

export function AccountType() {
  const { register, watch, setValue } = useFormContext();
  const typeCompte = watch("typeCompte");
  const coupon = watch("coupon");

  const discountId = useId();

  const handleValidateCoupon = async () => {
    if (!coupon.trim()) {
      setValue("couponValid", false);
      return;
    }
    const ok = await validateCouponApi(coupon.trim());
    setValue("couponValid", ok);
  };

  return (
    <>
      <label className="block font-semibold">Type</label>
      <select
        {...register("typeCompte")}
        className="block px-4 py-1 border rounded-md"
      >
        <option value="Gratuit">Gratuit</option>
        <option value="Premium">Premium</option>
      </select>

      {typeCompte === "Premium" && (
        <div className="mt-4">
          {/* Subscription */}
          <fieldset>
            <legend className="font-semibold">Abonnement</legend>

            <label>
              <input
                type="radio"
                value="month"
                {...register("subscriptionType", { required: true })}
                className="mx-2"
              />
              4€ / mois
            </label>

            <label>
              <input
                type="radio"
                value="year"
                {...register("subscriptionType")}
                className="mx-2"
              />
              36€ / an (3€/mois)
            </label>
          </fieldset>

          {/* Coupon */}
          <label htmlFor={discountId} className="font-semibold mt-4 block">
            Coupon de réduction
          </label>
          <input
            id={discountId}
            type="text"
            {...register("coupon")}
            className="px-2 py-1 border rounded-md"
          />

          <button
            type="button"
            onClick={handleValidateCoupon}
            className="bg-mainColor ml-4 text-white px-4 py-1 rounded-lg"
          >
            Ajouter
          </button>

          {watch("couponValid") === true && (
            <p className="text-green-600">Coupon valide appliqué.</p>
          )}
          {watch("couponValid") === false && (
            <p className="text-red-600">Coupon invalide.</p>
          )}
        </div>
      )}
    </>
  );
}
