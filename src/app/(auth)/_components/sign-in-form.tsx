"use client";

import {FC, useTransition} from "react";
import {useForm} from "react-hook-form";
import {valibotResolver} from "@hookform/resolvers/valibot";
import {SignInModel} from "../_types/auth.types";
import {SignInSchema} from "../_types/auth.schema";
import {TextBox} from "@/app/_components/textbox";
import {Button} from "@/app/_components/button";
import Phone from "@/app/_assets/phone";
import Eye from "@/app/_assets/eye";
import {signinAction} from "@/app/_actions/auth.action";
import {useSessionStore} from "@/app/stores/auth.store";
import {useRouter} from "next/navigation";

export const SignInForm: FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SignInModel>({
        resolver: valibotResolver(SignInSchema),
    });

    const [isPending, startTransition] = useTransition();

    const updateSession = useSessionStore((state) => state.updateSession);

    const router = useRouter()

    const onSubmit = async (data: SignInModel) => {
        startTransition(async () => {
            const response = await signinAction(data);
            if (response.isSuccess) {
                updateSession();
                router.push("/dashboard/courses")
            }
        });
    };
    return (
        <div className="mx-auto w-full">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 mt-6"
            >
                <TextBox
                    name={"username"}
                    register={register}
                    errors={errors}
                    type="number"
                    placeholder="شماره موبایل"
                    label="شماره موبایلت رو وارد کن"
                    icon={<Phone/>}
                />
                <TextBox
                    name={"password"}
                    register={register}
                    errors={errors}
                    type="password"
                    placeholder="رمز عبور"
                    label="رمز عبورت رو وارد کن"
                    icon={<Eye/>}
                />
                <Button type="submit" loading={isPending} className="w-full">
                    ورود به پلتفرم
                </Button>
            </form>
        </div>
    );
};
