"use client";

import { AboutCreator } from "@/components/profile/about-creator";
import { UserCollection } from "@/components/profile/user-collection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";

interface PropsParams {
  params: {
    userId: string;
  }
}

export default function CreatorProfile({ params }: PropsParams) {
  const session = useSession();
  const imageBack = "/profile-back-example.jpg";

  const onFollow = () => {
    console.log("User Session", session);
  }

  useEffect(() => {

  }, []);

  return (
    <div className="w-5/6 flex flex-col items-center gap-y-2 py-6">
      <div className="relative w-full flex flex-col items-center mb-12">
        <Avatar className="w-full h-48 rounded-none">
          <AvatarImage src={imageBack} className="object-cover" />
          <AvatarFallback className="bg-sky-500">
            <div className="w-full h-full bg-inherit"></div>
          </AvatarFallback>
        </Avatar>
        <Avatar className="absolute bottom-[-48px] w-24 h-24 border-4 border-white">
          <AvatarImage src="" />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full flex flex-col items-center gap-y-3">
        <p className="text-xl font-bold">@User Name</p>
        <p className="text-xl text-rose-700">★ ★ ★ ★ ★</p>
        <p className="text-lg">User Description</p>
        <div className="flex gap-x-6">
          <Button variant="default" className="w-24" onClick={onFollow}>
            Follow
          </Button>
          <Button variant="outline" className="w-24 border-green-700">
            Message
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col items-center pt-6">
        <Tabs defaultValue="Collection" className="w-full">
          <TabsList className="w-full h-fit flex gap-x-16">
            <TabsTrigger value="Collection">
              <p className="text-base">Collection</p>
            </TabsTrigger>
            <TabsTrigger value="About">
              <p className="text-base">About</p>
            </TabsTrigger>
            <TabsTrigger value="Announcements">
              <p className="text-base">Announcements</p>
            </TabsTrigger>
            <TabsTrigger value="Reviews">
              <p className="text-base">Reviews</p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Collection">
            <UserCollection />
          </TabsContent>
          <TabsContent value="About">
            <AboutCreator />
          </TabsContent>
          <TabsContent value="Announcements"></TabsContent>
          <TabsContent value="Reviews"></TabsContent>
        </Tabs>
      </div>
    </div>
  )
}