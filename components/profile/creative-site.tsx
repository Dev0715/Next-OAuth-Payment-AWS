import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Params {
  title: string;
  description: string;
}

export const CreativeSite = ({ title, description }: Params) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>

      </CardContent>
      <CardFooter className="flex justify-between">
      </CardFooter>
    </Card>
  )
}