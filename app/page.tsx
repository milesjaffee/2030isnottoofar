import { Metadata, ResolvingMetadata } from "next";

import { HomeScreen } from "@/components/HomeScreen";

export default function Home() {

  return <HomeScreen />
}

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata,

): Promise<Metadata> {

  const params = await searchParams;
  const shareImage = params?.shareImage;
  const ogImage = `https://2030.milesj.org/api/share-image/?id=${shareImage}`;
  console.log(params);

  return {
    title: `2030 is not too far`,
    description: `2030 is not too far`,
    openGraph: {
    images: [
      {
        url: ogImage,

      },
      // ... more images
    ],
  },
  };
}





