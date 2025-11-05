import Guide from "@/components/guide";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "Bot Guide - CoinPulse",
	description: "Learn how to use CoinPulse Telegram bot with detailed instructions and command list",
};

const index = () => {
	return (
		<Wrapper>
			<Guide />
		</Wrapper>
	);
};

export default index;
