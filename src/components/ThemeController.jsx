import { useTheme } from "../context/ThemeController"; // adjust path accordingly

function ThemeController() {
  const { theme, toggleTheme } = useTheme();

  return (
    <label tabIndex={1} className="flex cursor-pointer gap-2">
      {/* Light icon */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>

      <input
        type="checkbox"
        checked={theme === "retro"}
        onChange={toggleTheme}
        className="toggle theme-controller"
      />

      {/* Dark icon */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </label>
  );
}

export default ThemeController;
