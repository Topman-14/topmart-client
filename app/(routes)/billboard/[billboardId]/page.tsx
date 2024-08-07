import { FC } from "react";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import Filter from "../components/filter";
import MobileFilters from "../components/mobile-filters";
import getCategories from "@/actions/get-categories";
import getBillboard from "@/actions/get-billboard";
import { notFound } from "next/navigation";

export const revalidate = 600
interface CategoryPageProps {
    params: {
        billboardId: string
    },
    searchParams:{
        colorId: string;
        sizeId: string;
        categoryId: string;
    }
}

const CategoryPage:FC<CategoryPageProps> = async ({
    params,
    searchParams
}) => {

    const products = await getProducts({
        billboardId: params.billboardId,
        categoryId: searchParams.categoryId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId
    })

    const sizes = await getSizes();
    const colors = await getColors();
    const allCategories = await getCategories();
    const categories = allCategories.filter(item => item.billboardId === params.billboardId)
    const billboard = await getBillboard(params.billboardId);

    if(!billboard){
        notFound()
    }

  return (
    <div className="bg-white">
        <Container>
            <Billboard data={billboard} />
            <div className="px-4 sm:px-6 lg:px-8 pb-24">
                <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                    <MobileFilters sizes={sizes} colors={colors} categories={categories} />
                    <div className="hidden lg:block">
                        <Filter
                            valueKey="sizeId"
                            name="Sizes"
                            data={sizes}
                         />
                        <Filter
                            valueKey="colorId"
                            name="Colors"
                            data={colors}
                         />
                        <Filter
                            valueKey="categoryId"
                            name="Categories"
                            data={categories}
                         />
                    </div>
                    <div className="mt-6 lg:col-span-4 lg:mt-0">
                        {products.length === 0 && <NoResults />}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {products.map((product) => (
                                <ProductCard key={product.id} data={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default CategoryPage