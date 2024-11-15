import { CreativeSite } from "./creative-site"

type Params = {
  disabled: boolean;
  showButton?: boolean
}

export const LinkedSites = ({ disabled, showButton = true }: Params) => {
  const siteList = [
    {
      href: "",
      title: "Behance",
      description: "Behance is leading market for creative workers",
      userId: "behancewarrior2325",
      numberOfProducts: 17,
      numberOfFollowers: 212
    },
    {
      href: "",
      title: "Creative Market",
      description: "Creative Market is leading market for creative workers",
      userId: "creativemarketwarrior2325",
      numberOfProducts: 71,
      numberOfFollowers: 220
    },
    {
      href: "",
      title: "Creative Fabric",
      description: "Creative Fabric is leading market for creative workers",
      userId: "creativefabricwarrior2325",
      numberOfProducts: 127,
      numberOfFollowers: 242
    },
    {
      href: "",
      title: "Art Station",
      description: "Art Station is leading market for creative workers",
      userId: "atationwarrior2325",
      numberOfProducts: 347,
      numberOfFollowers: 922
    },
    {
      href: "",
      title: "Evanto",
      description: "Evanto is leading market for creative workers",
      userId: "evantowarrior2325",
      numberOfProducts: 47,
      numberOfFollowers: 92
    },
  ]

  return (
    <div className="w-full flex flex-col gap-y-4">
      {siteList.map((site) => (
        <CreativeSite
          key={site.title}
          {...site}
          disabled={disabled}
          showButton={showButton}
        />
      ))}

    </div>
  )
}