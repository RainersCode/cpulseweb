 
import Portfolio from "@/components/portfolio";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "Portfolio - CoinPulse Success Stories & Case Studies",
	description: "Explore CoinPulse portfolio: successful crypto analysis projects, user testimonials, and case studies of profitable coin discoveries",
	keywords: ["portfolio", "case studies", "success stories", "crypto projects", "analysis results"],
};

const index = () => {
	return (
		<Wrapper>
			<Portfolio />
		</Wrapper>
	);
};

export default index;
