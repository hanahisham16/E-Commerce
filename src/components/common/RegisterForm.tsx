// "use client";

// import React from "react";
// import { FaFacebook, FaFacebookF, FaGoogle } from "react-icons/fa";
// import { Controller, useForm } from "react-hook-form";
// import { Field, FieldError, FieldLabel } from "../ui/field";
// import { Input } from "../ui/input";
// import { UserPlus } from "lucide-react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { registerSchema, RegisterSchemaType } from "@/lib/schemas/auth.schema";
// import SignupUser from "@/services/auth.services";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// export default function RegisterForm() {
//   const router = useRouter();
//   const {
//     handleSubmit,
//     control,
//     register,
//     formState: { errors },
//   } = useForm<RegisterSchemaType>({
//     mode: "all",
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       rePassword: "",
//       phone: "",
//     },
//   });
//   async function handelUserRegister(values: RegisterSchemaType) {
//     console.log(values);
//     try {
//       const response = await SignupUser(values);
//       console.log(response);
//       if (response.message === "success") {
//         toast.success("account created succesfully");
//         router.push("/login");
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return (
//     <>
//       <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
//         <h2 className="text-center text-[#364153] text-3xl font-semibold mb-2">
//           Create Your Account
//         </h2>
//         <p className="text-center text-[#364153]">
//           Start your fresh journey with us today
//         </p>
//         <div className="register-options flex gap-2 *:grow my-10">
//           <button className="px-4  py-2  bg-transparent rounded-lg border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
//             <FaGoogle className="me-2 text-red-600" size={20} />
//             <span className="font-semibold">Google</span>
//           </button>
//           <button className="btn bg-transparent border rounded-lg border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
//             <FaFacebook className="me-2 text-blue-600" size={20} />{" "}
//             <span className="font-semibold">Facebook</span>
//           </button>
//         </div>
//         <div className="divider relative w-full h-0.5 bg-gray-300/30 my-4 flex items-center before:content-['or'] before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 before:bg-white before:px-4"></div>
//         <form onSubmit={handleSubmit(handelUserRegister)} className="space-y-7">
//           <Controller
//             name="name"
//             control={control}
//             render={({ field, fieldState }) => (
//               <Field data-invalid={fieldState.invalid}>
//                 <FieldLabel htmlFor={field.name}>Name*</FieldLabel>
//                 <Input
//                   {...field}
//                   id={field.name}
//                   aria-invalid={fieldState.invalid}
//                   placeholder="Ali"
//                   type="text"
//                   className={`w-full px-4 py-3 rounded-md border text-sm outline-none transition-all duration-200 bg-white ${
//                     fieldState.invalid
//                       ? "border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
//                       : "border-gray-200 focus:bg-white focus:border-[#0aad0a] focus:ring-4 focus:ring-[#0aad0a]/10"
//                   }`}
//                 />

//                 {fieldState.invalid && (
//                   <span className="text-xs text-red-500 font-medium">
//                     {fieldState.error?.message}
//                   </span>
//                 )}
//               </Field>
//             )}
//           />
//           <Controller
//             name="email"
//             control={control}
//             render={({ field, fieldState }) => (
//               <Field data-invalid={fieldState.invalid}>
//                 <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
//                 <Input
//                   {...field}
//                   id={field.name}
//                   aria-invalid={fieldState.invalid}
//                   placeholder="ali@example.com"
//                   type="email"
//                   className={`w-full px-4 py-3 rounded-md border text-sm outline-none transition-all duration-200 bg-white ${
//                     fieldState.invalid
//                       ? "border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
//                       : "border-gray-200 focus:bg-white focus:border-[#0aad0a] focus:ring-4 focus:ring-[#0aad0a]/10"
//                   }`}
//                 />

//                 {fieldState.invalid && (
//                   <span className="text-xs text-red-500 font-medium">
//                     {fieldState.error?.message}
//                   </span>
//                 )}
//               </Field>
//             )}
//           />
//           <Controller
//             name="password"
//             control={control}
//             render={({ field, fieldState }) => (
//               <Field data-invalid={fieldState.invalid}>
//                 <FieldLabel htmlFor={field.name}>Password*</FieldLabel>
//                 <Input
//                   {...field}
//                   id={field.name}
//                   aria-invalid={fieldState.invalid}
//                   placeholder="create a strong password"
//                   type="password"
//                   className={`w-full px-4 py-3 rounded-md border text-sm outline-none transition-all duration-200 bg-white ${
//                     fieldState.invalid
//                       ? "border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
//                       : "border-gray-200 focus:bg-white focus:border-[#0aad0a] focus:ring-4 focus:ring-[#0aad0a]/10"
//                   }`}
//                 />

//                 {fieldState.invalid && (
//                   <span className="text-xs text-red-500 font-medium">
//                     {fieldState.error?.message}
//                   </span>
//                 )}
//               </Field>
//             )}
//           />
//           <Controller
//             name="rePassword"
//             control={control}
//             render={({ field, fieldState }) => (
//               <Field data-invalid={fieldState.invalid}>
//                 <FieldLabel htmlFor={field.name}>confirm password*</FieldLabel>
//                 <Input
//                   {...field}
//                   id={field.name}
//                   aria-invalid={fieldState.invalid}
//                   placeholder="confirm your password"
//                   type="password"
//                   className={`w-full px-4 py-3 rounded-md border text-sm outline-none transition-all duration-200 bg-white ${
//                     fieldState.invalid
//                       ? "border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
//                       : "border-gray-200 focus:bg-white focus:border-[#0aad0a] focus:ring-4 focus:ring-[#0aad0a]/10"
//                   }`}
//                 />

//                 {fieldState.invalid && (
//                   <span className="text-xs text-red-500 font-medium">
//                     {fieldState.error?.message}
//                   </span>
//                 )}
//               </Field>
//             )}
//           />
//           <Controller
//             name="phone"
//             control={control}
//             render={({ field, fieldState }) => (
//               <Field data-invalid={fieldState.invalid}>
//                 <FieldLabel htmlFor={field.name}>Phone Number*</FieldLabel>
//                 <Input
//                   {...field}
//                   id={field.name}
//                   aria-invalid={fieldState.invalid}
//                   placeholder="01xxxxxxxxx"
//                   type="tel"
//                   className={`w-full px-4 py-3 rounded-md border text-sm outline-none transition-all duration-200 bg-white ${
//                     fieldState.invalid
//                       ? "border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
//                       : "border-gray-200 focus:bg-white focus:border-[#0aad0a] focus:ring-4 focus:ring-[#0aad0a]/10"
//                   }`}
//                 />

//                 {fieldState.invalid && (
//                   <span className="text-xs text-red-500 font-medium">
//                     {fieldState.error?.message}
//                   </span>
//                 )}
//               </Field>
//             )}
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 flex items-center justify-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed w-full transition-colors"
//           >
//             <UserPlus className="me-2" size={20} />{" "}
//             <span>Create My Account</span>
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }
"use client";

import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { UserPlus, Loader2 } from "lucide-react"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchemaType } from "@/lib/schemas/auth.schema";
import SignupUser from "@/services/auth.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }, 
  } = useForm<RegisterSchemaType>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function handleUserRegister(values: RegisterSchemaType) {
    console.log(values);
    try {
      const response = await SignupUser(values);
      console.log(response);
      if (response.message === "success") {
        toast.success("Account created successfully");
        router.push("/login");
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to connect to the server.");
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
        <h2 className="text-center text-[#364153] text-3xl font-semibold mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-[#364153]">
          Start your fresh journey with us today
        </p>
        <div className="flex gap-2 *:grow my-10">
          <button 
            type="button"
            className="px-4 w-full py-2 bg-transparent rounded-lg border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaGoogle className="me-2 text-red-600" size={20} />
            <span className="font-semibold">Google</span>
          </button>
          <button 
            type="button"
            className="w-full bg-transparent border rounded-lg border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaFacebook className="me-2 text-blue-600" size={20} />{" "}
            <span className="font-semibold">Facebook</span>
          </button>
        </div>

        <div className="divider relative w-full h-0.5 bg-gray-300/30 my-4 flex items-center before:content-['or'] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white before:px-4"></div>

        <form onSubmit={handleSubmit(handleUserRegister)} className="space-y-7">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name*</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Ali"
                  type="text"
                  className={`w-full px-4 py-3 rounded-md border text-sm outline-none transition-all duration-200 bg-white ${
                    fieldState.invalid
                      ? "border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:bg-white focus:border-[#0aad0a] focus:ring-4 focus:ring-[#0aad0a]/10"
                  }`}
                />
                {fieldState.invalid && (
                  <span className="text-xs text-red-500 font-medium">
                    {fieldState.error?.message}
                  </span>
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="ali@example.com"
                  type="email"
                  className={`w-full px-4 py-3 rounded-md border text-sm outline-none transition-all duration-200 bg-white ${
                    fieldState.invalid
                      ? "border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:bg-white focus:border-[#0aad0a] focus:ring-4 focus:ring-[#0aad0a]/10"
                  }`}
                />
                {fieldState.invalid && (
                  <span className="text-xs text-red-500 font-medium">
                    {fieldState.error?.message}
                  </span>
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password*</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="create a strong password"
                  type="password"
                  className={`w-full px-4 py-3 rounded-md border text-sm outline-none transition-all duration-200 bg-white ${
                    fieldState.invalid
                      ? "border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:bg-white focus:border-[#0aad0a] focus:ring-4 focus:ring-[#0aad0a]/10"
                  }`}
                />
                {fieldState.invalid && (
                  <span className="text-xs text-red-500 font-medium">
                    {fieldState.error?.message}
                  </span>
                )}
              </Field>
            )}
          />

          <Controller
            name="rePassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>confirm password*</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="confirm your password"
                  type="password"
                  className={`w-full px-4 py-3 rounded-md border text-sm outline-none transition-all duration-200 bg-white ${
                    fieldState.invalid
                      ? "border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:bg-white focus:border-[#0aad0a] focus:ring-4 focus:ring-[#0aad0a]/10"
                  }`}
                />
                {fieldState.invalid && (
                  <span className="text-xs text-red-500 font-medium">
                    {fieldState.error?.message}
                  </span>
                )}
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone Number*</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="01xxxxxxxxx"
                  type="tel"
                  className={`w-full px-4 py-3 rounded-md border text-sm outline-none transition-all duration-200 bg-white ${
                    fieldState.invalid
                      ? "border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:bg-white focus:border-[#0aad0a] focus:ring-4 focus:ring-[#0aad0a]/10"
                  }`}
                />
                {fieldState.invalid && (
                  <span className="text-xs text-red-500 font-medium">
                    {fieldState.error?.message}
                  </span>
                )}
              </Field>
            )}
          />

          <button
            type="submit"
            disabled={isSubmitting} 
            className="px-4 py-2 flex items-center justify-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed w-full transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="me-2 animate-spin" size={20} />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <UserPlus className="me-2" size={20} />
                <span>Create My Account</span>
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
}