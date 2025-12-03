 
import PricingPlan from "@/components/pricing-plan";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "Pricing Plans - CoinPulse Premium Crypto Bot Access",
	description: "Choose your CoinPulse plan: free tier, premium, or enterprise cryptocurrency analysis bot access on Telegram with advanced features",
	keywords: ["pricing", "plans", "subscription", "crypto bot pricing", "premium features"],
};

const index = () => {
	return (
		<Wrapper>
			<PricingPlan />
		</Wrapper>
	);
};

export default index;
