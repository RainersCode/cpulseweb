 
import Portfolio from "@/components/portfolio";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "Portfolio - CoinPulse",
	description: "View our successful cryptocurrency analysis projects and case studies",
};

const index = () => {
	return (
		<Wrapper>
			<Portfolio />
		</Wrapper>
	);
};

export default index;
