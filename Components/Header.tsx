import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  const user = await checkUser();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2>Expense Tracker</h2>
        <Show
          when="signed-in"
          fallback={
            <div>
              <SignInButton />
            </div>
          }
        >
          <div>
            <UserButton />
          </div>
        </Show>
      </div>
    </nav>
  );
};

export default Header;
