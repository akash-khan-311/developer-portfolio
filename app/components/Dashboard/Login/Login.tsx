'use client'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Field from "../../shared/Form/Field";
type LoginFormInputs = {
  email: string;
  password: string;
};
const Login = () => {
   const router = useRouter();

    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

   const onSubmit = async (data: LoginFormInputs) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    
    });


    if (res?.ok) {
      router.push('/admin');
      console.log("Login successful!");
    } else {
      console.error("Invalid email or password");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900  px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4 shadow-xl shadow-black  p-6 rounded-md"
      >
        <h2 className="text-2xl font-bold text-center ">Admin Login</h2>

        <div>
          <Field label='Email' required error={errors.email}>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full bg-slate-800 px-4 py-2 border rounded-md"
            />
            
          </Field>
        </div>

        <div>
        <Field label='Password' required error={errors.password}>
          
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 bg-slate-800 py-2 border rounded-md"
          />
        
        </Field>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;