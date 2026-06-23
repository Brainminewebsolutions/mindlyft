import ContactHero from "@/components/site/contact/ContactHero";
import ContactInfo from "@/components/site/contact/ContactInfo";
import ContactForm from "@/components/site/contact/ContactForm";
import ContactMap from "@/components/site/contact/ContactMap";

export default function ContactPage(){
  return (
    <main>
      <ContactHero
        title="Contact Us"
        tagline="Have questions about admissions or courses? We're here to help."
      />
      <ContactInfo 
      />
      <ContactForm />
      <ContactMap   />
      
    </main>
  )
}