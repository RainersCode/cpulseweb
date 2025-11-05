import AdminDashboard from "@/components/admin/AdminDashboard";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
	title: "Admin Dashboard - CoinPulse",
	description: "Admin dashboard to manage articles and tweets",
};

const AdminPage = () => {
	return (
		<Wrapper>
			<AdminDashboard />
		</Wrapper>
	);
};

export default AdminPage;
