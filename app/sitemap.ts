import getBillboards from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import { MetadataRoute } from "next";

const baseUrl = "https://topmart.vercel.app/"
   
  export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const defaultPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1
      },
      {
        url: `${baseUrl}cart`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9
      }
    ];
   
    const billboardIds = (await getBillboards()).map(billboard => billboard.id);
    const productIds = (await getProducts({})).map(product => product.id)
   
    const sitemap = [
      ...defaultPages,
      ...billboardIds.map((slug: string) => ({
        url: `${baseUrl}billbord/${slug}`,
        priority: 0.8
      })),
      ...productIds.map((slug: string) => ({
        url: `${baseUrl}product/${slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.7
      }))
    ];   
    return sitemap;
  }