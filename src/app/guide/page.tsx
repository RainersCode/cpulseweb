import Guide from "@/components/guide";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "CoinPulse Bot Guide - How to Use & Commands",
	description: "Complete guide to CoinPulse Telegram bot: setup instructions, commands, features, and tips for finding and analyzing top cryptocurrencies",
	keywords: ["telegram bot guide", "coinpulse commands", "how to use bot", "crypto analysis guide"],
};

const index = () => {
	return (
		<Wrapper>
			<Guide />
		</Wrapper>
	);
};

export default index;
