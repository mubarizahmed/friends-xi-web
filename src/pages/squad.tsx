import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { createClient } from "contentful";

const montserrat = Montserrat({ subsets: ["latin"] });

interface Player {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    kitNumber: number;
    role: string;
    age: number;
    about: string;
    picture?: {
      fields: {
        file: {
          url: string;
        };
      };
    };

    matches: number;
    runs: number;
    wickets: number;
    captain?: boolean;
    vicecaptain?: boolean;
    wicketkeeper?: boolean;
    president?: boolean;
  };
}

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to get role indicators
  const getRoleIndicators = () => {
    const indicators = [];

    if (player.fields.captain) {
      indicators.push({
        label: "C",
        title: "Captain",
        color: "bg-fximoonstone",
      });
    }

    if (player.fields.vicecaptain) {
      indicators.push({
        label: "VC",
        title: "Vice Captain",
        color: "bg-fxinavy",
      });
    }

    if (player.fields.wicketkeeper) {
      indicators.push({
        label: "WK",
        title: "Wicket Keeper",
        color: "bg-fximagenta",
      });
    }

    if (player.fields.president) {
      indicators.push({
        label: "P",
        title: "President",
        color: "bg-fxisafetyorange",
      });
    }

    return indicators;
  };

  const roleIndicators = getRoleIndicators();

  return (
    <div className="border-fximagenta overflow-hidden rounded-none border-2 bg-black shadow-md">
      {/* Collapsed View */}
      <div
        className="hover:bg-fximagenta/30 cursor-pointer p-4 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Kit Number */}
            <div className="bg-fximagenta flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white">
              {player.fields.kitNumber}
            </div>

            {/* Player Info */}
            <div>
              <h3 className={`text-lg font-semibold text-white`}>
                {player.fields.name}
              </h3>
              <p className="font-family-mono text-fxisafetyorange text-sm">
                {player.fields.role.toLocaleUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Role Indicator Circles */}
            {roleIndicators.map((indicator, index) => (
              <div
                key={index}
                className={`${indicator.color} flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white`}
                title={indicator.title}
              >
                {indicator.label}
              </div>
            ))}

            {/* Expand/Collapse Icon */}
            <div className="ml-2 text-gray-400">
              {isExpanded ? (
                <FaChevronUp className="h-5 w-5" />
              ) : (
                <FaChevronDown className="h-5 w-5" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="border-fxisafetyorange border-t-2 bg-black p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Player Image */}
            <div className="col-span-1">
              <div
                className="relative h-80 w-full overflow-hidden rounded-none bg-gray-200"
                style={{ aspectRatio: "3/4" }}
              >
                {player.fields.picture ? (
                  <Image
                    src={`https:${player.fields.picture.fields.file.url}`}
                    alt={player.fields.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  /* Fallback content */
                  <div className="bg-fximoonstone flex h-full w-full items-center justify-center text-4xl font-bold text-white">
                    {player.fields.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* Player Details */}
            <div className="col-span-1 md:col-span-2">
              <div className="space-y-4">
                {/* Basic Info */}
                <div>
                  <h4
                    className={`text-fximoonstone mb-2 text-lg font-semibold`}
                  >
                    Player Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-fximoonstone font-medium">
                        Age:
                      </span>
                      <span className="ml-2 text-white">
                        {player.fields.age} years
                      </span>
                    </div>
                    <div>
                      <span className="text-fximoonstone font-medium">
                        Kit Number:
                      </span>
                      <span className="ml-2 text-white">
                        #{player.fields.kitNumber}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-fximoonstone font-medium">
                        Role:
                      </span>
                      <span className="ml-2 text-white">
                        {player.fields.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div>
                  <h4
                    className={`text-fximoonstone mb-2 text-lg font-semibold`}
                  >
                    About
                  </h4>
                  <p className="text-sm leading-relaxed text-white">
                    {player.fields.about}
                  </p>
                </div>

                {/* Stats */}
                <div>
                  <h4
                    className={`text-fximoonstone mb-3 text-lg font-semibold ${montserrat.className}`}
                  >
                    Career Stats
                  </h4>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="bg-fximoonstone font-family-mono rounded-none border p-3 text-center">
                      <div className="text-lg font-bold text-white">
                        {player.fields.matches}
                      </div>
                      <div className="text-xs font-black text-white">
                        MATCHES
                      </div>
                    </div>
                    <div className="bg-fximoonstone font-family-mono rounded-none border p-3 text-center">
                      <div className="text-lg font-bold text-white">
                        {player.fields.runs}
                      </div>
                      <div className="text-xs font-black text-white">RUNS</div>
                    </div>
                    <div className="bg-fximoonstone font-family-mono rounded-none border p-3 text-center">
                      <div className="text-lg font-bold text-white">
                        {player.fields.wickets}
                      </div>
                      <div className="text-xs font-black text-white">
                        WICKETS
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function SquadPage({ players }: { players: Player[] }) {
  return (
    <>
      <Head>
        <title>Squad | Friends XI e.V.</title>
        <meta
          name="description"
          content="Meet the talented players of Friends XI e.V. cricket team. View player profiles, stats, and career information."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-black pt-4">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <h1
              className={`text-fxisafetyorange mb-4 text-3xl font-bold md:text-5xl ${montserrat.className}`}
            >
              Squad
            </h1>
          </div>

          {/* Squad Stats */}
          <div className="font-family-mono mb-8 grid grid-cols-2 gap-2 md:grid-cols-4">
            <div className="border-fximagenta bg-fximagenta/30 relative flex items-end justify-between rounded-none border-2 p-1 pt-6 text-center">
              <div className="wrap z-50 text-left text-sm font-black text-white">
                <div className="whitespace-nowrap">SQUAD</div>
                <div className="whitespace-nowrap">MEMBERS</div>
              </div>
              <div className="text-fximagenta absolute inset-0 flex items-center justify-center text-7xl font-black">
                {players.length}
              </div>
            </div>
            <div className="border-fximagenta bg-fximagenta/30 relative flex items-end justify-between rounded-none border-2 p-1 text-center">
              <div className="wrap z-50 text-left text-sm font-black text-white">
                <div className="whitespace-nowrap">AVG</div>
                <div className="whitespace-nowrap">AGE</div>
              </div>
              <div className="text-fximagenta absolute inset-0 flex items-center justify-center text-7xl font-black">
                {players.length > 0
                  ? Math.round(
                      players.reduce(
                        (sum, player) => sum + player.fields.age,
                        0,
                      ) / players.length,
                    )
                  : 0}
              </div>
            </div>
            <div className="border-fximagenta bg-fximagenta/30 relative flex items-end justify-between rounded-none border-2 p-1 text-center">
              <div className="text-fximagenta absolute inset-0 flex items-center justify-center text-7xl font-black">
                {players.reduce((sum, player) => sum + player.fields.runs, 0)}
              </div>
              <div className="wrap z-50 text-left text-sm font-black text-white">
                <div className="whitespace-nowrap">TOTAL</div>
                <div className="whitespace-nowrap">RUNS</div>
              </div>
            </div>
            <div className="border-fximagenta bg-fximagenta/30 relative flex items-end justify-between rounded-none border-2 p-1 text-center">
              <div className="wrap z-50 text-left text-sm font-black text-white">
                <div className="whitespace-nowrap">TOTAL</div>
                <div className="whitespace-nowrap">WICKETS</div>
              </div>
              <div className="text-fximagenta absolute inset-0 flex items-center justify-center text-7xl font-black">
                {players.reduce(
                  (sum, player) => sum + player.fields.wickets,
                  0,
                )}
              </div>
            </div>
          </div>

          {/* Players List */}
          {players && players.length > 0 ? (
            <div className="space-y-2">
              {players.map((player) => (
                <PlayerCard key={player.sys.id} player={player} />
              ))}
            </div>
          ) : (
            /* No Players State */
            <div className="py-16 text-center">
              <div className="mb-4 text-6xl">🏏</div>
              <h3
                className={`mb-4 text-2xl font-bold text-gray-900 ${montserrat.className}`}
              >
                Squad Information Coming Soon
              </h3>
              <p className="mb-8 text-gray-600">
                We&apos;re updating our squad information. Check back soon to
                meet our talented players!
              </p>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 rounded-lg bg-black p-8 text-center">
            <h3
              className={`text-fximoonstone font-family-mono mb-4 text-2xl font-bold`}
            >
              INTERESTED IN JOINING OUR SQUAD?
            </h3>
            <p className="mb-6 text-white">
              We&apos;re always looking for talented cricketers to join Friends
              XI e.V. If you&apos;re passionate about cricket and want to be
              part of our team, get in touch!
            </p>
            <button
              onClick={() => {
                const contactElement = document.getElementById("contact");
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-fximoonstone hover:bg-opacity-90 rounded-lg px-6 py-3 font-semibold text-white transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID ?? "",
      accessToken: process.env.CONTENTFUL_ACCESS_KEY ?? "",
    });

    const res = await client.getEntries({
      content_type: "squad", // Make sure this matches your Contentful content type
      order: ["fields.name"],
    });

    return {
      props: {
        players: res.items,
      },
      revalidate: 300, // Revalidate every 5 minutes
    };
  } catch (error) {
    console.error("Error fetching players:", error);
    return {
      props: {
        players: [],
      },
      revalidate: 300,
    };
  }
}
