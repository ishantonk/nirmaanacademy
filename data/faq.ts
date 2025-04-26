import { brandName, contactInfo } from "@/data/contact-info";

export const faqData = {
    title: "FAQs | " + brandName,
    tagline: "Frequently Asked Questions",
    description:
        "Get quick answers to common questions about our courses, materials, exams, and enrollment process at Nirmaan Academy.",
    faqs: [
        {
            question:
                "What is the duration of your CA Foundation, Intermediate, and Final courses at Nirmaan Academy?",
            answer: "At Nirmaan Academy, our course durations are thoughtfully structured to align with the ICAI exam cycle. The CA Foundation course typically takes around 4.5 months to complete, while the CA Intermediate course spans approximately 6 months. For students opting for our recorded lectures, the timeline is flexible—allowing them to learn at their own pace with maximum convenience.",
        },
        {
            question: "Does Nirmaan Academy provide study materials?",
            answer: "Yes, we provide comprehensive study materials in both hardcopy and eBook formats, depending on the course selected. Our books are crafted to be visually engaging and conceptually strong, with colorful layouts and well-organized notes that make studying more effective and enjoyable.",
        },
        {
            question: "What are the passing criteria for CA exams?",
            answer: "To pass the CA Foundation exam, students must score at least 40 marks in each subject and a minimum of 50% aggregate (i.e., 200 out of 400 marks). For CA Intermediate, a student must secure 50 marks in each subject and an aggregate of 50% per group (i.e., 150 out of 300). A score of 60 or more in any subject earns an exemption for future attempts if the group is not cleared. The same criteria apply for the CA Final level—50 marks per subject and 150 out of 300 per group, with exemptions granted for 60+ scores.",
        },
        {
            question: "Do you offer mock tests and practice papers?",
            answer: "Absolutely! At Nirmaan Academy, we provide extensive mock tests and practice papers to support strong exam preparation. Each subject includes at least 4 unit tests and 1 full-course test, tailored to ICAI guidelines. All evaluations are conducted by experienced Chartered Accountants, with detailed feedback and model answer sheets provided to help students understand the best way to approach each question.",
        },
        {
            question: "How are doubts resolved at Nirmaan Academy?",
            answer: "Our doubt-solving process is seamless across all learning formats. Recorded Mode students can raise queries 24/7 via text, images, or voice recordings on our dedicated portal, and SMEs respond within 24–48 hours. Live Classes include real-time chat-based doubt solving with teachers, and Face-to-Face & Gurukul Mode students can clarify doubts instantly during class sessions and also use the online portal for follow-ups.",
        },
        {
            question: "How do I enroll at Nirmaan Academy?",
            answer:
                "Just head to our 'Courses' section, select your desired course, choose your preferred learning mode, and complete the registration. You’ll get access to recorded lectures within 24 hours of admission. Need help? Call us directly at " +
                contactInfo.phone +
                ", and our counselors will guide you through the process.",
        },
        {
            question: "Can I watch a demo class before enrolling?",
            answer: "Yes, definitely! You can watch demo lectures on our official YouTube channel, where we regularly post the latest sample classes. [Click here to watch now.]",
        },
    ],
    contact: {
        address: contactInfo.address,
        email: contactInfo.email,
        phone: contactInfo.phone,
    },
};
