/* eslint-disable-next-line react/no-unescaped-entities */

import Image from "next/image";
import SocialLink from "../../shared/SocialLink";
import { getHeroData } from "@/lib/getHeroData";
import { getAboutData } from "@/lib/getAboutData";
import PersonalInfo from "../PerosonalInfo/PersonalInfo";


const InfoCard = async () => {
    const result = await getHeroData();
    const data = result?.data;
    const result2 = await getAboutData();
    const aboutData = result2?.data;

    console.log('info card', aboutData);

    return (
        <div className="flex flex-col gap-y-6  mt-20 lg:mt-0">
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-slate-900">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                        <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                            <Image
                                width={200}
                                height={200}
                                className="w-full h-full object-cover"
                                src={aboutData?.profileImage}
                                alt={data?.name}
                            />
                        </div>
                        <div className="order-3 xl:order-2">
                            <h4 className="mb-2 text-lg font-semibold text-center text-white/90 xl:text-left">
                                {data?.name}
                            </h4>
                            <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">

                                <p className="text-sm text-gray-400">
                                    {data.slug[0]}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
                            <SocialLink data={data} />
                        </div>
                    </div>
                </div>
                <PersonalInfo />
            </div>


        </div>
    );
};

export default InfoCard;