import UserList from "./components/users/UserList";
import { useTheme } from "./themes/index";

const App = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark">
      <UserList />
    </div>
  );
};

export default App;
