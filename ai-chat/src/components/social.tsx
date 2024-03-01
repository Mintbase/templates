// @ts-nocheck

"use client";

import GitHubButton from "react-github-btn";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";

export const SocialMedias = () => {
  const url = 'https://ai-chat.mintbase.xyz';
  const title = "Mintbase Templates - AI Chat";

  return (
    <div className="relative pt-5 top-0 left-0  w-full h-[30px] z-50">
      <div className="flex gap-2 justify-end	pr-4">
        <GitHubButton
          href="https://github.com/mintbase/templates/generate"
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-size="large"
          aria-label="Use this template mintbase/templates on GitHub"
        >
          Use this template
        </GitHubButton>
        <GitHubButton
          href="https://github.com/mintbase/templates"
          data-color-scheme="no-preference: dark; light: light; dark: dark;"
          data-icon="octicon-star"
          data-size="large"
          aria-label="Star mintbase/templates on GitHub"
        >
          Star
        </GitHubButton>{" "}
        <div className="social-networks">
          <FacebookShareButton url={url}>
            <FacebookIcon size={24} round />
          </FacebookShareButton>
          <TwitterShareButton url={url} title={title}>
            <XIcon size={24} round />
          </TwitterShareButton>

          <TelegramShareButton url={url} title={title}>
            <TelegramIcon size={24} round />
          </TelegramShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={24} round />
          </LinkedinShareButton>
        </div>
      </div>
    </div>
  );
};
