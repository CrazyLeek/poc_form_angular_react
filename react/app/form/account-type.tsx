// account-type.tsx
import { useFormContext } from "react-hook-form";
import { useId, useState } from "react";
import { Spinner } from "app/spinner/spinner";

const validateCouponApi = async (code: string) => {
  await new Promise((r) => setTimeout(r, 1000));
  return code === "SOLUTAP2026";
};

export function AccountType() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const typeCompte = watch("typeCompte");
  const coupon = watch("coupon");

  const discountId = useId();

  const [isCouponLoading, setIsCouponLoading] = useState(false);

  const handleValidateCoupon = async () => {
    if (!coupon.trim()) {
      setValue("couponValid", false);
      return;
    }

    setIsCouponLoading(true);
    const ok = await validateCouponApi(coupon.trim());
    setIsCouponLoading(false);
    setValue("couponValid", ok);
  };

  return (
    <>
      <label className="block font-semibold">Type</label>
      <select
        {...register("typeCompte")}
        className="block px-4 py-1 border border-gray-300 rounded-md focus:outline-mainColor"
      >
        <option value="Gratuit">Gratuit</option>
        <option value="Premium">Premium</option>
      </select>

      {typeCompte === "Premium" && (
        <div className="mt-4">
          {/* Subscription */}
          <fieldset>
            <legend className="font-semibold">Abonnement</legend>

            <label className="block ml-2 mt-2">
              <input
                type="radio"
                value="month"
                {...register("subscriptionType", {
                  required: "Réponse attendue",
                })}
                className="mx-2"
              />
              4€ / mois
            </label>

            <label className="block ml-2 mt-2">
              <input
                type="radio"
                value="year"
                {...register("subscriptionType")}
                className="mx-2"
              />
              36€ / an (3€/mois)
            </label>
          </fieldset>
          {errors.subscriptionType && (
            <div role="alert" className="text-red-600 text-sm ml-1">
              {errors.subscriptionType.message?.toString()}
            </div>
          )}

          {/* ------ Coupon ----------- */}
          <label htmlFor={discountId} className="font-semibold mt-4 block">
            Coupon de réduction
          </label>
          <input
            id={discountId}
            placeholder="Code promo"
            type="text"
            {...register("coupon")}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-mainColor outline-gray-300 transition-colors delay-70 ease-out"
          />

          <button
            type="button"
            onClick={handleValidateCoupon}
            className="bg-mainColor hover:opacity-80 text-white py-1 px-4 rounded-lg ml-4 cursor-pointer"
            disabled={isCouponLoading}
          >
            Ajouter
            {isCouponLoading && <Spinner />}
          </button>

          {watch("couponValid") === true && (
            <p className="text-green-600 text-sm ml-1">
              Coupon valide appliqué
            </p>
          )}
          {watch("couponValid") === false && (
            <p className="text-red-600 text-sm ml-1">Coupon invalide</p>
          )}
        </div>
      )}
    </>
  );
}
