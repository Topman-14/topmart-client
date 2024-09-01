# Topmart Store - NextJS Tailwind Ecommerce App

![image](https://github.com/user-attachments/assets/31beeefa-6369-43d5-b06d-077a76e7b796)


Topmart is a full-featured E-commerce Product Listing Platform I built with Next.js, TypeScript, ShadCN and Tailwind CSS. It includes an administrator dashboard for managing products and a storefront for users to browse and purchase items. The platform is designed to be SEO-compliant, performant, and follows clean coding practices.

## Overview

Topmart is split into two primary components:

1. **Administrator Dashboard**: Built with Next.js and TypeScript, the  dashboard allows users to manage the store's inventory. Users can add, edit, and delete products. The dashboard also captures analytics for tracking sales and product stock levels. Authentication for the dashboard is handled via ClerkJS. The repository for the admin dashboard is located at https://github.com/Topman-14/topmart-admin.

![image](https://github.com/user-attachments/assets/87962250-feee-49b7-8e1c-f34c57ff40f4)


3. **Storefront**: This is the public-facing side of Topmart, where users can view and filter products by category, sizes and color, view individual product details, and make purchases using the Paystack payment gateway. There is no login or signup functionality for the storefront. The cart is saved with local storage.

![image](https://github.com/user-attachments/assets/1d6c6458-2bfe-4b8f-aca8-8946751853b2)


### Key Features

- **Product Management**: Users can add, edit, and delete products in real-time. All changes are immediately reflected on the storefront.
- **SEO Optimization**: Comprehensive SEO strategies are implemented, including meta tags, dynamic metadata generation, and a sitemap.
- **Server side Rendering**: I used React Server Components in the latest version of NextJS as of today- V14.2 (01-09-2024) Server-side rendering (SSR), and static site generation (SSG) are implemented differently in the app router than the pages router. `getStaticProps` and `getServerSideProps` are now deprecated.
- **Payment Integration**: Paystack is integrated as the payment gateway to facilitate secure transactions. This was totally not necessary, but I personally wanted a comprehensive product checkout flow for this app.
  ![image](https://github.com/user-attachments/assets/e0cdae79-2232-4b25-a46a-6a3d07eaed7d)


- **Integration with my NextJS products API**: Although the in the requirements file I noticed I didn't need to store my products on a remote db, I wanted to demonstrate my proficiency with Server Side Rendering by dynamically pre-rendering each page content on the server before sending it to the client as per the assesment criteria.

<br />

This means that for this specific scenario, **product data cannot be stored on the client** whether localstorage or indexedDb. Thankfully the requirements didn't explicitly state that I should not use a remote DB, so I built an API alongside the Admin dashboard using NextJs. The persistence layer is a MongoDB database hosted with mongoDB atlas, my ORM of choice is Prisma. I built this NextJS storefront separately so I'd require the minimum env credentials if you were to set up locally. Just the public API endpoint and the Paystack test Key.

## Live Demo
You can check out the storefront at [https://topmart.vercel.app](https://topmart.vercel.app) . <br /> If you would like to manage the products on the live store, check out the admin dashboard at [https://topmart-admin.vercel.app](https://topmart-admin.vercel.app) and sign in with these credentials:

  - email: topman.portfolio@gmail.com
  - password: #1@Password$

  > These are the credentials to a demo account. when you make changes to the products there, they will immediately affect the storefront, 

![image](https://github.com/user-attachments/assets/307ab421-9a94-491d-8733-8047a11cd2be)


## Setup and Running the Project Locally

To run Topmart locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/topmart.git
   cd topmart
   ```

2. **Create a `.env` File**:
   Add the following environment variables to a `.env` file in the root directory:

   ```
   NEXT_PUBLIC_API_URL=https://topmart-admin.vercel.app/api/668f9ec5d8ac115da48ede86/
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_YOUR_PAYSTACK_TEST_KEY
   ```

   > You can obtain a Paystack test key by creating a Paystack account and navigating to the settings tab in the dashboard.

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

   To build for production and start the server:

   ```bash
   npm run build
   npm start
   ```

## Design Decisions, Optimizations, and Trade-offs

### Design Decisions

- **UI Component Library**: I utilized prebuilt components from ShadCN and customized them to fit the design aesthetic of the project. This involved modifying styles and setting an accent color in the global CSS file. While the ShadCN CLI handled most of the Tailwind configuration, I manually adjusted some variants in the tailwind config to align with the design requirements. Additionally, I used icons from Lucide.

### Optimizations

- **SEO**: A dynamic SEO strategy was implemented using Next.js 14.2's App Router. Metadata objects and the `generateMetadata` function were used to provide detailed SEO data for each page, improving search engine visibility. A sitemap and robots.txt file were also included to guide search engine crawlers.
- **SSR**: SSR (Server-Side Rendering): Leveraging SSR in Next.js improved the performance and SEO of the application by rendering pages on the server side, reducing load times and enhancing user experience.

### Trade-offs

- **Local vs Remote Data Storage**: This project would have been a lot easier if I stuck with client storage. I had to include the complexity of building an API with NextJS server actions, I feel it was worth it for the SSR as I have mentioned a few times already, since the server does not have access to client side storage. 
- **Paystack Integration**: While not required by the assessment, integrating Paystack provided a more complete e-commerce experience and alowwed me to complete the product purchace flow of a user. However, this added some intricacies to the app and required handling more external dependencies.

## How I Handled SEO

To ensure the app is SEO-compliant and highly discoverable, I implemented the following strategies

1. **Comprehensive Metadata**: A detailed metadata object was included in the root layout page to ensure all essential SEO tags are present on every page.
  ```typescript
    export const metadata: Metadata = {
      metadataBase: new URL('https://topmart.vercel.app/'),
      title: "Topmart Store",
      description: "Your one-stop online store",
      keywords: "online, store, shopping, electronics, fashion, home, goods, Topmart, yaba, mandilas, lagos, thrift, iphone, lambo",
      openGraph: {
        title: 'Topmart Store',
        description: 'Your one-stop online store',
        url: 'https://topmart.vercel.app/',
        siteName: 'Topmart Store',
        images: [
          {
            url: 'https://topmart.vercel.app/opengraph-image.png', 
            width: 800,
            height: 600,
          },
          {
            url: 'https://topmart.vercel.app/twitter-image.png',
            width: 1800,
            height: 1600,
            alt: 'Twitter Image',
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: false,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      }
  ```
   
2. **Dynamic SEO Content**: The `generateMetadata` function was used for dynamic routes (products and billboards), allowing each product and billboard page to have unique, descriptive metadata. This includes the use of keywords, descriptions, and Open Graph tags tailored to the content of each page. i.e - in the billboards page (app/(routes)/billboard/[billboardId]/page.tsx) and also in the products page (app/(routes)/product/[productId]/page.tsx)

```typescript
  export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const product = await getProduct(params.productId);
  
    if (!product) {
      return {
        title: 'Product not found - Topmart Store',
        description: 'The product you are looking for could not be found on Topmart Store.',
      };
    }
  
    return {
      title: `${product.name} - Topmart Store`,
      description: `Buy ${product.name} on Topmart Store. ${product.description || "Discover high-quality products at the best prices."}`,
      keywords: `${product.name}, ${product.category?.name || ''}, ${product.size?.name || ''}, ${product.color?.name || ''}, online shopping, nigeria, buy ${product.name}`,
      openGraph: {
        title: `${product.name} - Topmart Store`,
        description: `Buy ${product.name} on Topmart Store. ${product.description || "Discover high-quality products at the best prices."}`,
        url: `https://topmart.vercel.app/product/${params.productId}`,
        images: product.images.map((image) => ({
          url: image.url,
          width: 800,
          height: 600,
          alt: product.name,
        })),
      },
    };
  }
```

3. **Sitemap and Robots.txt**: I added a sitemap to assist search engines in crawling the site efficiently in the app/sitemap.ts file. I also configured the robots.ts to ensure all pages are indexed as well. These files are accessible at:
   - Sitemap: [https://topmart.vercel.app/sitemap.xml](https://topmart.vercel.app/sitemap.xml)
   - Robots.txt: [https://topmart.vercel.app/robots.txt](https://topmart.vercel.app/robots.txt)

```
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
```

4. **Mobile Optimization**: I used Tailwind media query utility classes to ensure the site is fully responsive and mobile-friendly, which is a crucial factor for SEO given the prevalence of mobile browsing.
