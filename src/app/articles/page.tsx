import Articles from "@/components/articles";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "Crypto Articles & Guides - CoinPulse Blog",
	description: "Read expert cryptocurrency analysis, Bitcoin guides, altcoin reviews, and blockchain insights on CoinPulse blog",
	keywords: ["crypto articles", "bitcoin guide", "cryptocurrency blog", "crypto analysis", "blockchain insights"],
};

const index = () => {
	return (
		<Wrapper>
			<Articles />
		</Wrapper>
	);
};

export default index;
