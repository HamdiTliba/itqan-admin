"use client";
import { login } from "@/actions/user/login";
import Button from "@/components/Button";
import Input from "@/components/Input";
import useGlobal from "@/hooks/useGlobal";
import { useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LoginForms = () => {
  const { setAccount } = useGlobal();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const result = await login(data);
    if (result?.error) {
      toast.error("Erreur lors de la connexion : " + result.error);
      setLoading(false);
    } else {
      toast.success("Connexion réussie!");
      setLoading(false);
    }
  };

  // const googleSignIn = () => {
  //   signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  // };
  return (
    <div className="flex flex-col gap-2 w-full max-w-md p-2 border border-neutral-300 dark:border-neutral-600 rounded-3xl ">
      {/* <button
        className="relative border hover:bg-neutral-50 transition-all border-blue-500 flex w-full justify-center items-center h-16 rounded-full "
        onClick={googleSignIn}>
        <GoogleSvg
          className="h-full aspect-square absolute p-3 left-0"
          color="#3f82ef"
        />
        <div className="flex w-full h-full justify-center items-center text-lg text-blue-500">
          Continuer avec Google
        </div>
      </button> */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input
          id="email"
          label="Email"
          register={register}
          {...register("email", {
            required: "L'addresse e-mail est obligatoire",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Veuillez saisir une adresse e-mail valide.",
            },
          })}
          errors={errors}
          type="email"
          required
        />
        <Input
          id="password"
          label="Password"
          register={register}
          {...register("password", {
            required: "Le mot de passe est obligatoire",
            minLength: {
              value: 8,
              message: "Le mot de passe doit contenir au moins 8 caractères.",
            },
          })}
          errors={errors}
          required
          type="password"
        />
        <Button
          widthFull
          label={"S'inscrire"}
          onClick={handleSubmit(onSubmit)}
          className="h-16 bg-sky-600"
          textClassName="text-xl"
          black
          loading={loading}
        />
        <p className="text-sm">
          Vous n&apos;avez pas un compte ?
          <span
            className="underline ml-1 cursor-pointer font-bold"
            onClick={() => setAccount("Register")}>
            registrez
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForms;
