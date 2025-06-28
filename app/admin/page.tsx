import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/authOptions";
import InfoCard from "../components/Admin/InfoCard/InfoCard";

const WelcomeToAdminPanel = async () => {

  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    redirect('/login')
  }
  return (
    <InfoCard />
  );
};

export default WelcomeToAdminPanel;