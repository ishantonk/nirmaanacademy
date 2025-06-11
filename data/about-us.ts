import SiteInfo, { contactInfo } from "@/data/contact-info";

export const aboutUsData = {
    title: "About Us | " + SiteInfo.Title,
    tagline: "Empowering Learners, Transforming Careers",
    description:
        "Nirmaan Academy is a premier education and e-learning platform dedicated to providing high-quality, career-oriented learning experiences. Founded by Prof. Nitin Bhardwaj, a seasoned educator with 14+ years of teaching experience, our academy is committed to shaping the future of students and professionals through expert-led courses in Business Law, Company Law, Finance, and Commerce.",
    values: {
        engaging: "Education should be engaging, accessible, and impactful.",
        innovative:
            "Our Storytelling Technique makes complex subjects easy to understand.",
        practical:
            "Students gain practical knowledge along with theoretical insights.",
    },
    why_choose_us: [
        "Expert-Led Learning – Courses designed and delivered by top industry professionals.",
        "Practical Approach – Real-world applications to bridge the gap between academics and industry.",
        "Flexible Learning – Learn through live sessions, recorded lectures, and face-to-face interactions.",
        "Proven Track Record – Thousands of students trained and mentored across India.",
        "Trusted by Top EdTech Brands – Faculty experience with Pearson ETEN CA, Stargate E-Learning Pvt. Ltd., and UNACADEMY.",
    ],
    vision_mission: {
        vision: "To make high-quality education accessible to every learner, helping them achieve academic and professional excellence.",
        mission:
            "To create an engaging learning environment that fosters knowledge, innovation, and career growth through expert guidance.",
    },
    founder: {
        name: "Prof. Nitin Bhardwaj",
        qualifications: ["CA (Semi-qualified)", "LLB", "M.COM", "B.COM"],
        experience:
            "14+ years of experience mentoring thousands of students in Business Law and Company Law.",
        achievements: [
            "University topper in M.COM & B.COM.",
            "Renowned for his Storytelling Technique, making complex legal concepts easy to understand.",
            "Faculty experience with Pearson ETEN CA, Stargate E-Learning Pvt. Ltd., and UNACADEMY.",
            "Taught extensively in Delhi NCR and across India, delivering impactful sessions in Face-to-Face and Live Online modes.",
        ],
    },
    contact: {
        address: contactInfo.address,
        email: contactInfo.email,
        phone: contactInfo.phone,
    },
};
