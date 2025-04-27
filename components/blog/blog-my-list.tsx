export function BlogMyList() {
    return (
        <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
                <h2 className="text-lg font-semibold">My Blog Posts</h2>
                {/* Add your blog list component here */}
            </div>
            <div className="lg:col-span-5 relative">
                {/* Add any additional components or information here */}
            </div>
        </div>
    );
}