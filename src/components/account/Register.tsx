"use client";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { register as userRegister } from "@/actions/user/register";
import toast from "react-hot-toast";
import Button from "../Button";
import useGlobal from "@/hooks/useGlobal";

const RegisterForms = () => {
  const { setAccount } = useGlobal();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    const result = await userRegister(data);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.success || "Registration successful!");
      router.push("/admin");
    }
  };
  // const googleSignIn = () => {
  //   signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  // };
  return (
    <div className="flex flex-col gap-2 w-full max-w-md  p-2 border border-neutral-300 dark:border-neutral-600 rounded-3xl">
      {/* <button
        className="relative border hover:bg-neutral-50 transition-all border-blue-500 flex w-full justify-center items-center h-16 rounded-full"
        onClick={googleSignIn}>
        <GoogleSvg
          className="h-full aspect-square absolute p-3 left-0"
          color="#3f82ef"
        />
        <div className="flex w-full h-full justify-center items-center text-lg text-blue-500">
          Continuer avec Google
        </div>
      </button> */}
      <form className="flex flex-col gap-2">
        <Input
          id="firstName"
          label="Prénom"
          register={register}
          {...register("firstName", {
            required: "Le prénom est obligatoire",
            minLength: {
              value: 3,
              message: "Le prénom doit contenir au moins 3 caractères",
            },
          })}
          errors={errors}
          required
        />
        <Input
          id="lastName"
          label="Nom"
          register={register}
          {...register("lastName", {
            required: "Le nom est obligatoire",
            minLength: {
              value: 3,
              message: "Le nom doit contenir au moins 3 caractères",
            },
          })}
          errors={errors}
          required
        />

        <Input
          id="email"
          label="Email"
          register={register}
          {...register("email", {
            required: "L' addresse e-mail est obligatoire",
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
          className="h-16 bg-sky-600"
          textClassName="text-xl"
          black
          onClick={handleSubmit(onSubmit)}
        />
      </form>
      <p className="text-sm">
        Vous avez déjà un compte ?
        <span
          className="underline ml-1 cursor-pointer font-bold"
          onClick={() => setAccount("Login")}>
          Connectez-vous
        </span>
      </p>
    </div>
  );
};

export default RegisterForms;
