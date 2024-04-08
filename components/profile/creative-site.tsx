import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Params {
  href: string;
  title: string;
  description: string;
  userId: string;
  numberOfProducts: number;
  numberOfFollowers: number;
}

function Bold({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-bold text-sm">
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
  numberOfFollowers
}: Params) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <p>Username: <Bold>{userId}</Bold></p>
        <p>Products: <Bold>{numberOfProducts}</Bold></p>
        <p>Followers: <Bold>{numberOfFollowers}</Bold></p>
      </CardContent>
      <CardFooter className="flex justify-between">
      </CardFooter>
    </Card>
  )
}