import Guest from "@/Components/Guest";
import { currentUser } from "@clerk/nextjs/server";
import AddTransactions from "@/Components/AddTransaction";
import Balance from "@/Components/Balance";
import TransactionList from "@/Components/TransactionList";

const HomePage = async () => {
  const user = await currentUser();
  if (user) {
    return (
      <main>
        <h1>Welcome to the Home Page, {user.firstName}!</h1>
        <AddTransactions />
        <Balance />
        <TransactionList />
      </main>
    );
  }
  return <Guest />;
};

export default HomePage;
