import { FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";
import { LinkedSites } from "./linked-sites";
import { userAtom } from "@/store/user";
import { useAtom } from "jotai";
import type { Address, Company, User } from "@/shared/types/user.type";
import { Separator } from "../ui/separator";

type PropsParams = {
  userData: User | undefined;
};

export const AboutCreator = ({ userData }: PropsParams) => {
  const [user] = useAtom(userAtom);
  const creator = userData?.creator;

  return (
    <Card className="border-0 rounded-none">
      <CardHeader className="flex flex-row items-end justify-between">
        <p className="text-xl font-bold">About the Creator</p>
        {user?.userId === userData?.userId && (
          <Button variant="default" asChild>
            <Link href="/user/creator" className="flex gap-x-1">
              <FaEdit /> Edit
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-between">
          <div className="w-1/2 flex flex-col gap-y-12">
            <div className="flex flex-col gap-y-2">
              <p className="text-sky-700 font-medium">
                ** Scraped data will be pre-populated here. **
              </p>
              <p>
                creatorId:{" "}
                <span className="font-semibold">
                  {creator?.creatorId || ""}
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-4 items-center">
                <p className="font-semibold">
                  {`${userData?.firstname || ""} ${userData?.lastname || ""}`}
                </p>
                <Separator orientation={"vertical"} />
                <p className="font-semibold">{creator?.jobTitle}</p>
              </div>
              <p className="text-gray-700">{creator?.bio}</p>
            </div>
            <div className="flex flex-col gap-y-4">
              <p className="text-xl text-green-700 font-semibold">Contact</p>
              <div className="flex flex-col gap-y-2">
                <CompanyShow company={creator?.company} />
                <AddressShow address={userData?.address} />
              </div>
            </div>
          </div>
          <div className="w-2/5 flex flex-col gap-y-6">
            <p className="text-xl font-medium">
              Creator's profiles on other Creative markets
            </p>
            <LinkedSites disabled showButton={false} />
          </div>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

const AddressShow = ({ address }: { address: Address | undefined }) => {
  if (!address) {
    return null;
  }

  return (
    <div className="flex gap-x-2">
      <p>Address:</p>
      <div className="flex gap-x-2 font-semibold">
        <p>{`${address.address1},`}</p>
        <p>{`${address.address2},`}</p>
        <p>{`${address.city},`}</p>
        <p>{`${address.postal},`}</p>
        <p>{address.country}</p>
      </div>
    </div>
  );
};

const CompanyShow = ({ company }: { company: Company | undefined }) => {
  if (!company) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-4">
      <p>Company:</p>
      {company.website ? (
        <Button variant="link" className="p-0 text-md">
          <Link href={company.website}>
            {company.name ? company.name : company.website}
          </Link>
        </Button>
      ) : (
        <p className="font-semibold">{company.name || ""}</p>
      )}
      {company.country && (
        <div className="flex gap-x-2">
          <p>in</p>
          <p>{company.country}</p>
        </div>
      )}
    </div>
  );
};
