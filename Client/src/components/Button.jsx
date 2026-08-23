// Client / src / components / Button.jsx

const Button = ({
  text,
  children,
  onClick = () => {},
  className = "",
  style = {},
  type = "button",
  variant = "primary",
  size = "m",
  disabled = false,
  iconLeft,
  iconRight,
  color = "teal",
  hoverRounded = true,
}) => {
  const colorVariants = {
    teal: {
      bg: "bg-teal-600",
      border: "border-teal-600",
      hoverBg: "hover:bg-teal-700",
      text: "text-teal-600",
      lightBg: "hover:bg-teal-50",
    },
    gray: {
      bg: "bg-gray-600",
      border: "border-gray-600",
      hoverBg: "hover:bg-gray-700",
      text: "text-gray-600",
      lightBg: "hover:bg-gray-100",
    },
    black: {
      bg: "bg-black",
      border: "border-black",
      hoverBg: "hover:bg-black/90",
      text: "text-black",
      lightBg: "hover:bg-black/10",
    },
  };

  const selectedColor = colorVariants[color] || colorVariants.teal;

  const variants = {
    primary: `${selectedColor.bg} ${selectedColor.border} ${selectedColor.hoverBg} text-white`,
    secondary: "bg-white text-black border-gray-200 hover:bg-gray-100",
    ghost: "bg-transparent border-transparent text-black hover:text-gray-600",
    outline: `bg-transparent border ${selectedColor.border} ${selectedColor.text} ${selectedColor.lightBg}`,
    tealOutline:
      "bg-white text-teal-600 border border-teal-600 hover:bg-teal-50",
  };

  const sizes = {
    s: "px-3 py-1.5 text-sm",
    m: "px-6 py-2",
    l: "px-8 py-3 text-base",
  };

  const baseClasses = `cursor-pointer rounded-md transition-all hover:rounded-full ${hoverRounded ? "hover:rounded-full" : ""} disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2 ${variants[variant] || variants.primary} ${sizes[size] || sizes.m} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      style={style}
      disabled={disabled}
    >
      {iconLeft}
      {children || text}
      {iconRight}
    </button>
  );
};

export default Button;
