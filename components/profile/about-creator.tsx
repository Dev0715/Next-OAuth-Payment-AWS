import { FaEdit } from "react-icons/fa"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import Link from "next/link"
import { LinkedSites } from "./linked-sites"
import { CreatorInterface } from "@/shared/user-interface"

type PropsParams = {
  creator: CreatorInterface | undefined;
}

export const AboutCreator = ({ creator }: PropsParams) => {
  return (
    <Card className="border-0 rounded-none">
      <CardHeader className="flex flex-row items-end justify-between">
        <p className="text-xl font-bold">About the Creator</p>
        <Button variant="default" asChild>
          <Link href="/user/creator" className="flex gap-x-1">
            <FaEdit /> Edit
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-between">
          <div className="w-1/2 flex flex-col gap-y-2">
            <p className="text-sky-700 font-medium">/** Scraped data will be pre-populated here. **/</p>
            <p>Name: <span className="font-semibold">{`${creator?.firstname} ${creator?.lastname}`}</span></p>
            <p>Description: {creator?.bio}</p>
            <p>Specialization: </p>
            <p>Contact: </p>
          </div>
          <div className="w-2/5 flex flex-col gap-y-6">
            <p className="text-xl font-medium">Your profiles on other Creative markets</p>
            <LinkedSites disabled showButton={false} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>)
}