import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.js";
import AOS from "aos";
import lottie from "lottie-web";

window.$ = window.jQuery = $;
window.bodymovin = lottie;

import "./main2.js";

window.addEventListener("load", () => {
  AOS.init();
  console.log("vendors OK");
});