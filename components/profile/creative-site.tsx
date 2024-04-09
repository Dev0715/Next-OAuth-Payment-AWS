import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";

interface Params {
  href: string;
  title: string;
  description: string;
  userId: string;
  numberOfProducts: number;
  numberOfFollowers: number;
  disabled?: boolean;
  showButton?: boolean;
}

function Bold({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-semibold text-sm">
      {children}
    </span>
  )
}

export const CreativeSite = ({
  href,
  title,
  description,
  userId,
  numberOfProducts,
  numberOfFollowers,
  disabled,
  showButton
}: Params) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg text-blue-700">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <p>Username: <Bold>{userId}</Bold></p>
        <div className="flex gap-x-4">
          <p>Products: <Bold>{numberOfProducts}</Bold></p>
          <p>Followers: <Bold>{numberOfFollowers}</Bold></p>
        </div>
      </CardContent>
      <CardFooter className={`flex gap-x-6 ${showButton === false && 'hidden'}`}>
        <Button disabled={disabled} variant="outline" className="border-green-700">Confirm</Button>
        <Button disabled={disabled} variant="outline" className="border-red-700">Discard</Button>
      </CardFooter>
    </Card>
  )
}