import { Link } from "react-router-dom";

const Button = ({ href, type, rel, onClick, children }) => {
  const handleClick = (e) => {
    if (href === "#") {
      e.preventDefault();
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      to={href}
      target={href === "#" ? "_self" : "_blank"}
      rel={`noopener noreferrer ${
        rel ? (rel === "follow" ? "" : rel) : "nofollow"
      }`}
      onClick={handleClick}
      className={`btn me-4 mb-4 ${
        type === "outline" ? "btn-outline-primary" : "btn-primary"
      } border-primary hover:text-white hover:no-underline`}
    >
      {children}
    </Link>
  );
};

export default Button;
