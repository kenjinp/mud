import * as React from "react";
import "./Footer.css";
import { version, name } from "../../../package.json";

function Footer() {
  return (
    <footer className="footer-component">
      <div>
        wildmagic{" "}
        <a href="https://twitter.com/kenny_pizza" target="_blank">
          @kenny.wtf
        </a>{" "}
        2019
      </div>
      <div>
        {/* <a href="https://github.com/wild-magic/Wild-Magic.git" target="_blank">
          github
        </a> */}
        v{version} {name}
      </div>
    </footer>
  );
}

export default Footer;
