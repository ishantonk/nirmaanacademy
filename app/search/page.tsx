import { LiveSearch } from "@/components/search/search-live";

interface SearchPageProps {
    searchParams: Promise<{
        search?: string;
    }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const query = await Promise.resolve(searchParams);

    return (
        <LiveSearch initialQuery={query.search} />
    );
}
