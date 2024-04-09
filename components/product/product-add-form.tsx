import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

export const ProductAddForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a new Product</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>

      </CardContent>
      <CardFooter>
        <Button type="submit">
          Register
        </Button>
      </CardFooter>
    </Card>
  )
}