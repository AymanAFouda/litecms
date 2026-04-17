import Social from "../common/Social";
import config from "../../config/config.json";
import menu from "../../config/menu.json";
import social from "../../config/social.json";
import Logo from "../common/Logo";
import { markdownify } from "../../utils/textConverter";
import { Link } from "react-router-dom";


const Footer = () => {
  const { copyright, footer_content } = config.params;
  return (
    <footer className="section relative mt-12 pt-[70px] pb-[50px] hidden md:block">
      <img
        className="-z-[1] absolute inset-0 block object-cover object-left md:object-top w-full footer-img"
        src="/images/footer-bg-shape.svg"
        alt="footer background"
        fill="true"
      />
      <div className="container text-center">
        <div className="mb-6 inline-flex">
          <Logo />
        </div>

        {/* footer menu */}
        <ul className="mb-12 mt-6 flex-wrap space-x-2 lg:space-x-4">
          {menu.footer.map((menu) => (
            <li className="inline-block" key={menu.name}>
              <Link
                to={`${menu.url}/#!`}
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="p-2 font-bold text-dark hover:text-primary dark:text-darkmode-light lg:p-4"
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* social icons */}
        <div className="inline-flex">
          <Social source={social} className="socials mb-12 justify-center" />
        </div>
        {/* copyright */}
        {markdownify(copyright, "p")}
        {markdownify(footer_content, "p", "max-w-[470px] mx-auto")}
      </div>
    </footer>
  );
};

export default Footer;
