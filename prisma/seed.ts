import {
    PrismaClient,
    PostStatus,
    CourseStatus,
    UserRole,
} from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // Create admin user if not exists
    const adminEmail = "admin@nirmaanacademy.com";
    let adminUser = await prisma.user.findUnique({
        where: { email: adminEmail },
    });

    if (!adminUser) {
        const hashedPassword = await hash("admin123", 12);
        adminUser = await prisma.user.create({
            data: {
                name: "Admin User",
                email: adminEmail,
                password: hashedPassword,
                role: UserRole.ADMIN,
                bio: "Administrator of Nirmaan Academy",
            },
        });
    }

    // Create course categories
    const courseCategories = await Promise.all([
        prisma.category.upsert({
            where: { slug: "business-law-courses" },
            update: {},
            create: {
                name: "Business Law Courses",
                slug: "business-law-courses",
                description:
                    "Comprehensive courses on business law and regulations",
            },
        }),
        prisma.category.upsert({
            where: { slug: "company-law-courses" },
            update: {},
            create: {
                name: "Company Law Courses",
                slug: "company-law-courses",
                description:
                    "In-depth courses on company law and corporate governance",
            },
        }),
        prisma.category.upsert({
            where: { slug: "finance-law-courses" },
            update: {},
            create: {
                name: "Finance Law Courses",
                slug: "finance-law-courses",
                description:
                    "Specialized courses on financial laws and regulations",
            },
        }),
    ]);

    // Create a faculty member for courses
    const facultyMember = await prisma.faculty.upsert({
        where: { email: "nitin.bhardwaj@nirmaanacademy.com" },
        update: {},
        create: {
            name: "Prof. Nitin Bhardwaj",
            email: "nitin.bhardwaj@nirmaanacademy.com",
            phone: "+91 9876543210",
            bio: "Expert in Business Law and Corporate Governance",
            image: "/images/instructors/nitin-bhardwaj.jpg",
            designation: "Professor of Law",
        },
    });

    // Create a regular user as blog author
    const authorEmail = "author@nirmaanacademy.com";
    const authorUser = await prisma.user.upsert({
        where: { email: authorEmail },
        update: {},
        create: {
            name: "Content Author",
            email: authorEmail,
            password: await hash("author123", 12),
            role: UserRole.ADMIN,
            bio: "Content creator for Nirmaan Academy",
            image: "/images/users/author.jpg",
        },
    });

    // Create default Mode and Attempt for courses
    const standardMode = await prisma.mode.upsert({
        where: { slug: "standard-mode" },
        update: {},
        create: {
            name: "Standard Mode",
            slug: "standard-mode",
        },
    });

    const regularAttempt = await prisma.attempt.upsert({
        where: { slug: "regular-attempt" },
        update: {},
        create: {
            name: "Regular Attempt",
            slug: "regular-attempt",
        },
    });

    // Create tags for blog posts
    const blogTags = await Promise.all([
        prisma.tag.upsert({
            where: { slug: "business-law" },
            update: {},
            create: { name: "Business Law", slug: "business-law" },
        }),
        prisma.tag.upsert({
            where: { slug: "company-law" },
            update: {},
            create: { name: "Company Law", slug: "company-law" },
        }),
        prisma.tag.upsert({
            where: { slug: "finance-law" },
            update: {},
            create: { name: "Finance Law", slug: "finance-law" },
        }),
        prisma.tag.upsert({
            where: { slug: "legal-updates" },
            update: {},
            create: { name: "Legal Updates", slug: "legal-updates" },
        }),
        prisma.tag.upsert({
            where: { slug: "business-tips" },
            update: {},
            create: { name: "Business Tips", slug: "business-tips" },
        }),
        prisma.tag.upsert({
            where: { slug: "corporate-governance" },
            update: {},
            create: {
                name: "Corporate Governance",
                slug: "corporate-governance",
            },
        }),
        prisma.tag.upsert({
            where: { slug: "finance" },
            update: {},
            create: { name: "Finance", slug: "finance" },
        }),
    ]);

    // Define courses to be seeded
    const courses = [
        {
            title: "Business Law Fundamentals",
            slug: "business-law-fundamentals",
            description:
                "A comprehensive course covering the essential principles of business law.",
            thumbnail: "/images/courses/business-law.jpg",
            durationInMin: 320,
            price: 1999,
            discountPrice: 1499,
            onSale: true,
            status: CourseStatus.PUBLISHED,
            featured: true,
            videoLanguage: "English",
            courseMaterialLanguage: "English",
            // Relationships
            categoryId: courseCategories[0].id,
            availableModes: { connect: [{ id: standardMode.id }] },
            availableAttempts: { connect: [{ id: regularAttempt.id }] },
            faculties: { connect: [{ id: facultyMember.id }] },
        },
        {
            title: "Company Law Mastery",
            slug: "company-law-mastery",
            description:
                "Advanced course on company law and corporate governance.",
            thumbnail: "/images/courses/company-law.jpg",
            durationInMin: 330,
            price: 2499,
            discountPrice: 1999,
            onSale: false,
            status: CourseStatus.PUBLISHED,
            featured: true,
            videoLanguage: "English",
            courseMaterialLanguage: "English",
            categoryId: courseCategories[1].id,
            availableModes: { connect: [{ id: standardMode.id }] },
            availableAttempts: { connect: [{ id: regularAttempt.id }] },
            faculties: { connect: [{ id: facultyMember.id }] },
        },
        {
            title: "Finance Law Essentials",
            slug: "finance-law-essentials",
            description: "Essential course on financial laws and regulations.",
            thumbnail: "/images/courses/finance-law.jpg",
            durationInMin: 325,
            price: 1799,
            status: CourseStatus.PUBLISHED,
            featured: true,
            videoLanguage: "English",
            courseMaterialLanguage: "English",
            categoryId: courseCategories[2].id,
            availableModes: { connect: [{ id: standardMode.id }] },
            availableAttempts: { connect: [{ id: regularAttempt.id }] },
            faculties: { connect: [{ id: facultyMember.id }] },
        },
    ];

    // Upsert courses
    for (const course of courses) {
        await prisma.course.upsert({
            where: { slug: course.slug },
            update: {},
            create: course,
        });
    }

    // Add dummy enrollment data:
    // Enroll the admin user in the "Business Law Fundamentals" course.
    const businessLawCourse = await prisma.course.findUnique({
        where: { slug: "business-law-fundamentals" },
    });

    if (adminUser && businessLawCourse) {
        await prisma.enrollment.upsert({
            // Use a compound unique constraint identifier.
            // Ensure your schema has @@unique([userId, courseId]) in Enrollment model.
            where: {
                // Replace this with the proper composite unique field if defined.
                userId_courseId: {
                    userId: adminUser.id,
                    courseId: businessLawCourse.id,
                },
            },
            update: {},
            create: {
                userId: adminUser.id,
                courseId: businessLawCourse.id,
            },
        });
    }

    // Create blog posts
    const posts = [
        {
            title: "Understanding Business Law Fundamentals",
            slug: "understanding-business-law-fundamentals",
            excerpt:
                "A comprehensive guide to the basic principles of business law and their practical applications.",
            content:
                "<h2>Introduction to Business Law</h2><p>Business law is crucial for commercial operations.</p>",
            featuredImage: "/images/blog/business-law.jpg",
            featuredImageAlt: "Business law books and documents on a desk",
            status: PostStatus.PUBLISHED,
            publishedAt: new Date(),
            readTimeMinutes: 8,
            metaTitle:
                "Understanding Business Law Fundamentals - Nirmaan Academy Blog",
            metaDescription:
                "A comprehensive guide to business law principles.",
            categoryId: courseCategories[0].id,
            tagIds: [blogTags[0].id, blogTags[1].id], // Business Law, Company Law
        },
        {
            title: "Key Changes in Company Law 2024",
            slug: "key-changes-company-law-2024",
            excerpt: "Latest amendments in company law for 2024.",
            content:
                "<h2>Recent Amendments</h2><p>2024 brings significant changes.</p>",
            featuredImage: "/images/blog/company-law.jpg",
            featuredImageAlt:
                "Modern office building representing corporate law",
            status: PostStatus.PUBLISHED,
            publishedAt: new Date(),
            readTimeMinutes: 6,
            metaTitle: "Key Changes in Company Law 2024 - Nirmaan Academy Blog",
            metaDescription:
                "Stay updated with the latest company law changes.",
            categoryId: courseCategories[1].id,
            tagIds: [blogTags[3].id, blogTags[4].id], // Legal Updates, Business Tips
        },
    ];

    for (const post of posts) {
        // Separate out tagIds for later connection.
        const { tagIds, ...postData } = post;
        const createdPost = await prisma.post.upsert({
            where: { slug: post.slug },
            update: {},
            create: {
                ...postData,
                authorId: authorUser.id,
            },
        });

        // Connect tags to the post.
        await prisma.post.update({
            where: { id: createdPost.id },
            data: {
                tags: { connect: tagIds.map((id) => ({ id })) },
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
