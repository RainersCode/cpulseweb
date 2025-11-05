 
import Service from "@/components/service";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "Services - CoinPulse",
	description: "Explore our AI-powered cryptocurrency analysis services on Telegram",
};

const index = () => {
	return (
		<Wrapper>
			<Service />
		</Wrapper>
	);
};

export default index;
