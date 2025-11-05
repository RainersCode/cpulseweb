 
import HomeOne from "@/components/homes/home";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "CoinPulse - AI-Powered Crypto Insights on Telegram",
	description: "CoinPulse - AI-powered cryptocurrency insights delivered directly to Telegram. Get real-time market analysis, sector suggestions, and intelligent trading signals.",
};

const index = () => {
	return (
		<Wrapper>
			<HomeOne />
		</Wrapper>
	);
};

export default index;
