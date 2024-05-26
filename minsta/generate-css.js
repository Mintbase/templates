// generate-css.js
const fs = require("fs");
const path = require("path");
require("dotenv").config(); // Load environment variables from .env file

const colors = {
  primary: process.env.COLOR_PRIMARY || "F3F4F8",
  secondary: process.env.COLOR_SECONDARY || "000",
  mainBg: process.env.COLOR_MAIN_BACKGROUND || "fdfaa7",
  gradOne: process.env.COLOR_GRADONE || "4472ad",
  gradTwo: process.env.COLOR_GRADTWO || "009dea",
  cardOne: process.env.COLOR_CARDONE || "E8EAF0",
  cardTwo: process.env.COLOR_CARDTWO || "049BE8",
  linkColor: process.env.COLOR_LINKCOLOR || "4f58a3",
  icon: process.env.COLOR_ICON || "4B9CE3",
  camera: process.env.COLOR_CAMERA || "FFFFFF",
  modalText: process.env.COLOR_MODAL_TEXT || "000000",
  leaderboardText: process.env.COLOR_LEADERBOARD_TEXT || "000000",
  headerText: process.env.COLOR_HEADER_TEXT || "000000",
  mainText: process.env.COLOR_MAIN_TEXT || "000000",
  freeUseText: process.env.COLOR_FREE_USE_TEXT || "0A7D6C",
  primaryBtnText: process.env.COLOR_PRIMARY_BTN_TEXT || "FFFFFF",
  secondaryBtnText: process.env.COLOR_SECONDARY_BTN_TEXT || "000000",
  lightBlue: process.env.COLOR_LIGHT_BLUE || "50b0d9",
};

const css = `


.nws-modal-wrapper .nws-modal {
  height: auto !important;
}

.nws-modal-wrapper .nws-modal .modal-right {
  display: none !important;
}

.nws-modal-wrapper .nws-modal .modal-left {
  width: 100%;
  border-right: 1px solid
    var(--wallet-selector-sidebar-border-color, var(--sidebar-border-color));
  padding: 32px 24px;
  height: 100%;
  overflow: auto;
  text-align: center;
}
.nws-modal-wrapper .nws-modal {
  height: 215px;
}
.wallet-options-wrapper {
  width: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
}
.nws-modal-wrapper .nws-modal > .modal-left > div:nth-child(2) {
  display: flex;
  justify-items: center;
  text-align: center;
  width: 100%;
}

.nws-modal-wrapper
  .modal-left
  .wallet-options-wrapper
  .options-list-section
  .options-list-section-header {
  display: none;
}



:root {
          --primary: #${colors.primary};
          --secondary: #${colors.secondary};
          --mainBg: #${colors.mainBg};
          --gradOne: #${colors.gradOne};
          --gradTwo: #${colors.gradTwo};
          --cardOne: #${colors.cardOne};
          --cardTwo: #${colors.cardTwo};
          --linkColor: #${colors.linkColor};
          --icon: #${colors.icon};
          --camera: #${colors.camera};
          --modalText: #${colors.modalText};
          --leaderboardText: #${colors.leaderboardText};
          --headerText: #${colors.headerText};
          --mainText: #${colors.mainText};
          --freeUseText: #${colors.freeUseText};
          --bgFreeUse: #${colors.freeUseText}1A;
          --primaryBtnText: #${colors.primaryBtnText};
          --secondaryBtnText: #${colors.secondaryBtnText};
          --lightBlue: #${colors.lightBlue};
        }`;

const outputPath = path.resolve(__dirname, "src/style/global.css");

fs.writeFileSync(outputPath, css);

console.log(`CSS file generated at: ${outputPath}`);
