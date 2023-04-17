import React from "react";
import { GOOGLE_AUTH_URL } from "../index.js";
/**<img src={} alt="Google" />  */
const SocialLogin = () => {
  return (
    <div>
      <a
        className="btn btn-block text-white social-btn google"
        href={GOOGLE_AUTH_URL}
      >
        Log in with Google
      </a>
    </div>
  );
};

export default SocialLogin;
