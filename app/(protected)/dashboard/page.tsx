"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card"
import { FaUser } from "react-icons/fa";

const Dashboard = () => {
    return (
        <div className="h-full w-full flex flex-col items-center">
            <div className="w-full flex">
                <Avatar>
                    <AvatarImage src="" />
                        <AvatarFallback className="bg-sky-500">
                            <FaUser className="text-white" />
                        </AvatarFallback>
                </Avatar>
            </div>
            <div className="w-full flex flex-col items-center">
                <p>
                This site is scheduled to launch officially on May 15th
                </p>
                <p>
                You can sign-up now as either a Seller, Affiliate or a User. 
                </p>
            </div>
            <div className="w-full flex">
                Footer
            </div>        
        </div>
    )
}

export default Dashboard;