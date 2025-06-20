// app/admin/layout.tsx
import Link from 'next/link';
import { Inter } from "next/font/google";
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
const inter = Inter({ subsets: ["latin"] });
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className={`${inter.className}  text-white relative min-h-screen lg:flex  h-full w-full bg-slate-950 overflow-x-hidden`}>
                <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px]  rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
                <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px]  rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
                <Sidebar />
                <ToastContainer position="top-center" />
                <div className="flex-1 relative lg:ml-64 z-[0]">
                    <div className="p-5">{children}</div>
                </div>
            </div>
        </>
    );
}
