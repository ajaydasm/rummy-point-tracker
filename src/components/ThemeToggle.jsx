import React from "react";
import { Button } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react"; 

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="text-end">
      <Button
        variant={theme === "dark" ? "light" : "dark"}
        size="sm"
        onClick={toggleTheme}
        className="d-flex align-items-center gap-2 transition-theme"
      >
        {theme === "dark" ? (
          <>
            <Sun size={18} /> 
          </>
        ) : (
          <>
            <Moon size={18} /> 
          </>
        )}
      </Button>
    </div>
  );
};

export default ThemeToggle;
