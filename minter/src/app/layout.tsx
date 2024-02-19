import { AppProvider } from "@/components/Provider";
import { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const extractSignMeta = (url: string): string | null => {
  const signMetaIndex = url.indexOf("signMeta=");
  if (signMetaIndex === -1) {
    return null; // signMeta not found
  }

  const startIndex = signMetaIndex + "signMeta=".length;
  const endIndex = url.indexOf("&", startIndex);
  if (endIndex === -1) {
    return url.substring(startIndex); // signMeta is the last parameter in the URL
  } else {
    return url.substring(startIndex, endIndex);
  }
};

export async function generateMetadata(): Promise<Metadata> {

  const headersList = headers();
  const referer = headersList.get("referer");


  let pageTitle = "Mintbase Minter Example";
  let pageDescription = "Learn how to Mint NFTs on NEAR with Mintbase Minter Example"

  // Check if signMeta exists in the URL
  const signMeta = referer ? extractSignMeta(referer) : "";
  if (signMeta) {
    const signMetaData = JSON.parse(decodeURIComponent(signMeta));

    pageTitle = `Success! You just minted: ${signMetaData?.args?.title}`;
    pageDescription = `Just Minted ${signMetaData?.args?.title} on Mintbase`
    // Now you can further process the extracted signMeta value
  }

  return {
    metadataBase: new URL("https://minter.mintbase.xyz"),
    title: pageTitle,
    openGraph: {
      title:pageTitle,
      description: pageDescription,
      images:['./thumbnail.png'],
    },
    twitter: {
      title: pageTitle,
      description: pageDescription,
      siteId: "1467726470533754880",
      creator: "Mintbase",
      card: "summary_large_image",
      images: './thumbnail.png'
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppProvider> {children} </AppProvider>;
}
