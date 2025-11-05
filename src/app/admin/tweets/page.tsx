import Wrapper from "@/layouts/Wrapper";
import TweetsAdmin from "@/components/admin/TweetsAdmin";

export const metadata = {
	title: "Manage Tweets - CoinPulse Admin",
	description: "Add, edit, and manage tweets displayed on the website",
};

const TweetsAdminPage = () => {
	return (
		<Wrapper>
			<TweetsAdmin />
		</Wrapper>
	);
};

export default TweetsAdminPage;
