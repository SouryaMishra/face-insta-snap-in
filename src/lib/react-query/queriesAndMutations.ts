import { useMutation } from "@tanstack/react-query";
import { signInAccount, createUserAccount } from "../appwrite/api";
import type { INewUser } from "@/types";

export const useCreateUserAccount = () =>
  useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });

export const useSignInAccount = () =>
  useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
