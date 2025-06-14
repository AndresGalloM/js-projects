import { oAuthSignIn } from "@/auth/actions";
import DiscordIcon from "./icons/DiscordIcon";
import GithubIcon from "./icons/GithubIcon";

const OAUTH_CLIENTS = [
  {
    provider: "discord",
    name: "Discord",
    className: "hover:bg-[#7289da]",
    icon: <DiscordIcon width={24} height={24} />,
  },
  {
    provider: "github",
    name: "Github",
    className: "hover:bg-[#2dba4e]",
    icon: <GithubIcon width={24} height={24} />,
  },
] as const;

export default function OAuthClients() {
  return (
    <div className=" flex gap-2 justify-center">
      {OAUTH_CLIENTS.map(({ provider, className, icon }) => (
        <button
          key={provider}
          type="button"
          className={`${className} px-4 py-1 rounded-md border border-gray-700 hover:cursor-pointer`}
          onClick={async () => await oAuthSignIn(provider)}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
