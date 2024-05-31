"use client";

import { useEffect, useState } from "react";

import { FaUser } from "react-icons/fa";

import { AboutCreator } from "@/components/profile/about-creator";
import { UserCollection } from "@/components/profile/user-collection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GradientParagraph } from "@/components/utils/gradient-paragraph";

import { getProductById } from "@/data/product";
import { getUserById } from "@/data/user";

import { useLinkFromS3 } from "@/hooks/use-link-from-s3";

import type { Product, ProductLink } from "@/shared/types/product.type";
import type { User } from "@/shared/types/user.type";

interface PropsParams {
  params: {
    userId: string;
  };
}

export default function CreatorProfile({ params: { userId } }: PropsParams) {
  const { getLinkFromS3 } = useLinkFromS3();
  const [userData, setUserData] = useState<User>();
  const [avatarPath, setAvatarPath] = useState<string>("");
  const [coverPath, setCoverPath] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    getUserById(userId).then((_userData) => {
      if (!_userData) {
        return;
      }

      setUserData(_userData);
      if (_userData.avatar) {
        getLinkFromS3(_userData.avatar).then((res) => {
          if (res.success) {
            setAvatarPath(res.response as string);
          }
        });
      }
      if (_userData.creator?.cover) {
        getLinkFromS3(_userData.creator.cover).then((res) => {
          if (res.success) {
            setCoverPath(res.response as string);
          }
        });
      }
      if (_userData.creator?.products) {
        _userData.creator.products.map((item: ProductLink) => {
          getProductById(item.productType, item.productId).then((_product) => {
            if (_product) {
              setProducts((prev) => [...prev, _product]);
            }
          });
        });
      }
    });
  };

  const onFollow = () => {};

  return (
    <div className="w-5/6 flex flex-col items-center gap-y-2 pt-6 pb-24">
      <div className="relative w-full flex flex-col items-center mb-12">
        <Avatar className="w-full h-56 rounded-none">
          <AvatarImage src={coverPath} className="object-cover" />
          <AvatarFallback className="bg-sky-500">
            <div className="w-full h-full bg-inherit"></div>
          </AvatarFallback>
        </Avatar>
        <Avatar className="absolute bottom-[-48px] w-24 h-24 border-4 border-white">
          <AvatarImage src={avatarPath} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full flex flex-col items-center gap-y-3 font-firs">
        {/* <p className="text-xl font-bold">@{userData?.username}</p> */}
        <GradientParagraph className="text-xl font-bold">
          @{userData?.userId}
        </GradientParagraph>
        <p className="text-xl font-bold text-rose-700">★ ★ ★ ★ ★</p>
        <p className="text-lg font-semibold">{`${userData?.firstname || ""} ${userData?.lastname || ""}`}</p>
        <div className="flex gap-x-6">
          <Button
            variant="default"
            className="w-24 rounded-none"
            onClick={onFollow}
          >
            Follow
          </Button>
          <Button
            variant="outline"
            className="w-24 border-green-700 rounded-none"
          >
            Message
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col items-center pt-6">
        <Tabs defaultValue="Collection" className="w-full">
          <TabsList className="w-full px-6 py-2 h-fit flex justify-start gap-x-16">
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
            <UserCollection products={products} userId={userId} />
          </TabsContent>
          <TabsContent value="About">
            <AboutCreator userData={userData} />
          </TabsContent>
          <TabsContent value="Announcements"></TabsContent>
          <TabsContent value="Reviews"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
