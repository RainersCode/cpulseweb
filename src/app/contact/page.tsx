 
import Contact from "@/components/contact";  
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "Contact Us - CoinPulse",
	description: "Get in touch with CoinPulse for AI-powered cryptocurrency insights",
};

const index = () => {
	return (
		<Wrapper>
			<Contact />
		</Wrapper>
	);
};

export default index;
