 
import PortfolioDetails from "@/components/portfolio-details";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "Portfolio Details - CoinPulse",
	description: "Detailed view of our cryptocurrency analysis case studies and results",
};

const index = () => {
	return (
		<Wrapper>
			<PortfolioDetails />
		</Wrapper>
	);
};

export default index;
