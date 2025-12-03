 
import Service from "@/components/service";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "Services - CoinPulse | AI Crypto Analysis & Telegram Bot",
	description: "Discover CoinPulse services: AI-powered coin analysis, real-time market insights, trading signals, and top cryptocurrency finder on Telegram",
	keywords: ["crypto analysis", "telegram bot services", "coin finder", "trading signals", "market analysis"],
};

const index = () => {
	return (
		<Wrapper>
			<Service />
		</Wrapper>
	);
};

export default index;
