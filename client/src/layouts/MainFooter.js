import React from "react";
import "./MainFooter.scss";
import Logo from "components/Logo";
import { Box } from "@mui/material";

const MainFooter = () => {
  return (
    <Box id="main-footer" sx={{ zIndex: "2" }}>
      <div className="container footer-container">
        <div>
          <div className="logo">
            <Logo sx={{ height: 25, width: 25, paddingTop: 0.3 }} />
            Volun
            <span className="red">Cheers</span>
          </div>
          <p>
            VolunCheers is a national provider of volunteer recruitment and
            management software through our technology. The easy-to-use system
            engages, tracks, and manages volunteers in service to their
            communities.
          </p>
        </div>
        <div>
          <h3>Email Newsletter</h3>
          <p>
            {/* We send weekly to quarterly emails about volunteer management tips
            and tricks, general events, and more! */}
            Stay in the loop on the latest news and updates on all things.
          </p>
          <form>
            <input type="email" placeholder="Enter Email..." />
            <input
              type="submit"
              value="Subscribe"
              className="btn btn-primary"
            />
          </form>
        </div>
        <div>
          <h3>Site Links</h3>
          <ul className="list">
            <li>
              <a href="#">Help & Support</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Join Our Team</h2>
          <p>
            The VolunCheers team believes in the power of volunteerism, and we
            love helping people finding meaningful ways to give back.
          </p>
          <a href="#" className="btn btn-secondary">
            Join Now
          </a>
        </div>
      </div>
    </Box>
  );
};

export default MainFooter;
