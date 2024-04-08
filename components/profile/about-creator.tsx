import { FaEdit } from "react-icons/fa"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import Link from "next/link"

export const AboutCreator = () => {
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
        <div className="flex flex-col gap-y-2">
          <p className="text-sky-700 font-medium">/** Scraped data will be pre-populated here. **/</p>
          <p>Name: </p>
          <p>Description: </p>
          <p>Specialization: </p>
          <p>Contact: </p>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>)
}