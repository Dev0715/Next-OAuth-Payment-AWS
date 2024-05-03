import { Bundle } from "@/shared/types/bundles.type";
import { Card, CardContent } from "../ui/card";

type Props = {
  bundle: Bundle;
};

export const BundleItem = ({ bundle }: Props) => {
  return (
    <Card>
      <CardContent>{bundle.title}</CardContent>
    </Card>
  );
};
