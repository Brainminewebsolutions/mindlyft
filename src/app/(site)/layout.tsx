import NavbarWrapper       from "@/components/site/NavbarWrapper";
import SiteFooter          from "@/components/site/SiteFooter";
import Chatbot             from "../../components/site/home/Chatbot";
import WhatsAppButton      from "../../components/site/home/WhatsAppButton";
import { ChatSupportWidget } from "@/components/main/ChatSupportWidget";

const NAVBAR_HEIGHT = 80;

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarWrapper height={NAVBAR_HEIGHT} />
      <div className="overflow-x-clip">
        {children}
      </div>
      {/* <Chatbot /> */}
      <WhatsAppButton />
      <ChatSupportWidget />
      <SiteFooter />
    </>
  );
}
