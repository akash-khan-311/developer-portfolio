
import { authOptions } from "@/app/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user?.role === "admin") {

    return redirect("/admin");
  }

  return (
    <div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">page</h1>
    </div>
  );
};

export default LoginPage;