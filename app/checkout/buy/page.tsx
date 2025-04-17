import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutOrderSummary } from "@/components/checkout/checkout-order-summary";
import { findCourseById } from "@/lib/services/course";

interface BuyPageProps {
    searchParams: Promise<{
        courseId?: string;
    }>;
}

export default async function BuyPage({ searchParams }: BuyPageProps) {
    const { courseId } = await Promise.resolve(searchParams);

    if (!courseId) {
        return "Error on finding course ID.";
    }

    const course = await findCourseById(courseId);

    if (!course) {
        return "Error on finding course.";
    }

    // Extract and normalize prices
    const price = Number(course.price);
    const discountPrice = Number(course.discountPrice);
    const isOnSale =
        course.onSale && discountPrice && price && discountPrice < price;
    const currentPrice = isOnSale ? discountPrice : price;

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <CheckoutOrderSummary type="course" course={course} />
            <CheckoutForm
                type="course"
                courseId={courseId}
                amount={currentPrice}
            />
        </div>
    );
}
