import { useState } from "react";
import ThemePreview from "./ThemePreview";

const App = () => {
  
  const [toggle, setToggle] = useState(true);
  const [theme, setTheme] = useState('dark');

  const changeTheme = () => {
    toggle ?  setTheme('dark') : setTheme('light');
    setToggle(!toggle);
    
    document.documentElement.setAttribute("data-theme", theme);
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={changeTheme}>Change Theme</button>
    </div>
  );
};

export default App;