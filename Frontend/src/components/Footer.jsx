
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 px-6 py-5">
      <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">

        <p>
          © 2026 CollabHub. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <Link
            to="/help"
            className="transition hover:text-violet-400"
          >
            Help & Support
          </Link>

          <a
            href="#privacy"
            className="transition hover:text-violet-400"
          >
            Privacy Policy
          </a>

          <a
            href="#terms"
            className="transition hover:text-violet-400"
          >
            Terms of Service
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

