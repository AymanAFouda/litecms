import config from "../../config/config.json";
import { Link } from "react-router-dom";

const Logo = ({ src }) => {
  // destructuring items from config object
  const { logo, logo_width, logo_height, logo_text, title } =
    config.site;

  return (
    <Link to="/" className="navbar-brand">
      {src || logo ? (
        <img
          width={logo_width.replace("px", "") * 2}
          height={logo_height.replace("px", "") * 2}
          src={logo}
          alt={title}
          style={{
            height: logo_height.replace("px", "") + "px",
            width: logo_width.replace("px", "") + "px",
          }}
          className="m-auto ml-2 md:ml-auto"
        />
      ) : logo_text ? (
        logo_text
      ) : (
        title
      )}
    </Link>
  );
};

export default Logo;
