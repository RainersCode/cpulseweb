import Articles from "@/components/articles";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "Articles - CoinPulse",
	description: "Read our latest cryptocurrency articles and insights",
};

const index = () => {
	return (
		<Wrapper>
			<Articles />
		</Wrapper>
	);
};

export default index;
