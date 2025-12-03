 
import Contact from "@/components/contact";  
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "Contact CoinPulse - Get Support & Inquiries",
	description: "Contact CoinPulse for support, feedback, partnerships, or questions about our AI-powered Telegram crypto analysis bot",
	keywords: ["contact", "support", "crypto bot support", "coinpulse contact"],
};

const index = () => {
	return (
		<Wrapper>
			<Contact />
		</Wrapper>
	);
};

export default index;
