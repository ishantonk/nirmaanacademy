import { Metadata } from "next"
import { ContactForm } from "@/components/contact/contact-form"
import { brandName } from "@/data/contact-info"

export const metadata: Metadata = {
  title: "Contact Us | " + brandName,
  description: "Get in touch with us for any questions or support.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-muted-foreground max-w-[600px]">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
        <div className="w-full max-w-[600px]">
          <ContactForm />
        </div>
      </div>
    </div>
  )
} 