import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { authOptions } from "../lib/authOptions";

const WelcomeToAdminPanel =async () => {

  const session = await getServerSession(authOptions)

  if(!session || session.user.role !== "admin") {
    redirect('/login')
  }
  return (
    <div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">Welcome To Admin Panel</h1>
    </div>
  );
};

export default WelcomeToAdminPanel;