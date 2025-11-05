 
import PricingPlan from "@/components/pricing-plan";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "Pricing Plans - CoinPulse",
	description: "Explore our flexible pricing plans for AI-powered cryptocurrency insights on Telegram",
};

const index = () => {
	return (
		<Wrapper>
			<PricingPlan />
		</Wrapper>
	);
};

export default index;
