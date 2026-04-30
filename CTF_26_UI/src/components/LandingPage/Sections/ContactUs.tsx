"use client";

import ContactHeader from "@/components/ui-elements/Contact Us/ContactHeader";
import ContactMethods from "@/components/ui-elements/Contact Us/ContactMethods";
import FAQSection from "@/components/ui-elements/Contact Us/FAQSection";
import QueryForm from "@/components/ui-elements/Contact Us/QueryForm";

export const ContactUs = () => {
  return (
    <>
      <section id="contactus">
        <div className="w-full relative">
          {/* Content */}
          <div className="relative z-10 w-full">
            <ContactHeader />
            <ContactMethods />
            <QueryForm />
            <FAQSection />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
