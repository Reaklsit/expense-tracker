import { SignInButton } from "@clerk/nextjs";

const Guest = () => {
  return (
    <div className="guest">
      <h1>WELCOME</h1>
      <p>Please sign in to access your account.</p>
      <SignInButton />
    </div>
  );
};

export default Guest;
