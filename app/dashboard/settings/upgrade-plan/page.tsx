"use client";
import DashboardButton from "@/components/DashboardButton";
import TitleHandler from "@/components/TitleHandler";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Upgrade = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="p-6 lg:ml-64 ml-0 min-h-screen flex flex-col justify-between pb-10 md:ml-64">
      <div>
        <div className="flex items-center mb-4 gap-2">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <TitleHandler
            title="Select Plan"
            text="Choose the perfect plan to empower your emissions tracking journey and unlock advanced features."
          />
        </div>
        <div className="flex gap-10 flex-wrap mt-4 h-full w-full pb-9 flex-col md:flex-row">
          {/* Contenedor 1 */}
          <div className="relative bg-white shadow-xl px-7 py-5 rounded-xl w-[350px] flex-grow">
            <div className="flex flex-col mb-5">
              <h1 className="font-bold text-neutral-700 text-3xl Geometos">
                Basic
              </h1>
              <p className="text-neutral-400 text-xs mb-1">
                Best for businesses starting their climate journey.
              </p>
            </div>
            <div className="mb-5 mt-9">
              <DashboardButton
                isLoading={isLoading}
                onClick={() => {
                  console.log("Basic plan selected");
                }}
                style={{
                  background: "#9FA2B4",
                  fontFamily: "font-sans, sans-serif",
                  padding: "23px",
                  textTransform: "none",
                  width: "100%",
                }}
              >
                Select
              </DashboardButton>
            </div>
            <div className="border-t border-gray-300 mt-4"></div>
            <div className="flex flex-col gap-4 mt-4">
              {[
                "Measure scope 1, scope 2, and scope 3 emissions",
                "GHG methodology report that details emission factor sets and methods used.",
                "Up to one establishment",
                "Online support",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full border-4 border-white flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800">
                        <svg
                          className="w-4 h-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12l5 5L19 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h2 className="font-bold text-neutral-700 text-xs">{item}</h2>
                </div>
              ))}
            </div>
          </div>
          {/* Contenedor 2 */}
          <div className="relative bg-white shadow-xl px-7 py-5 rounded-xl w-[350px] flex-grow">
            <div className="flex flex-col mb-5">
              <h1 className="font-bold text-neutral-700 text-3xl Geometos">
                Pro
              </h1>
              <p className="text-neutral-400 text-xs mb-1">
                Best for businesses wanting to measure their emissions.
              </p>
            </div>
            <div className="mb-5">
              <DashboardButton
                isLoading={isLoading}
                onClick={() => {
                  console.log("Pro plan selected");
                }}
                style={{
                  background: "#9FA2B4",
                  fontFamily: "font-sans, sans-serif",
                  padding: "23px",
                  textTransform: "none",
                  width: "100%",
                }}
              >
                Select
              </DashboardButton>
            </div>
            <div className="border-t border-gray-300 mt-4"></div>
            <div className="flex flex-col gap-4 mt-4">
              {[
                "Measure scope 1, scope 2, and scope 3 emissions",
                "GHG methodology report that details emission factor sets and methods used.",
                "Share emissions data with customers, suppliers, investors, and other stakeholders via Scope 3 Data Exchange.",
                "Up to 15 establishments",
                "Online support",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full border-4 border-white flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800">
                        <svg
                          className="w-4 h-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12l5 5L19 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h2 className="font-bold text-neutral-700 text-xs">{item}</h2>
                </div>
              ))}
            </div>
          </div>
          {/* Contenedor 3 */}
          <div className="relative bg-white shadow-xl px-7 py-5 rounded-xl border-2 border-blue-800 w-[350px] flex-grow">
            <div className="flex flex-col mb-5">
              <h1 className="font-bold text-neutral-700 text-3xl Geometos">
                Advanced
              </h1>
              <p className="text-neutral-400 text-xs mb-1">
                Best for businesses working to set or achieve a net-zero target.
              </p>
            </div>
            <div className="mb-5">
              <DashboardButton
                isLoading={isLoading}
                onClick={() => {
                  console.log("Advanced plan selected");
                }}
                style={{
                  background: "linear-gradient(to top, #2A8CFE, #03133A)",
                  fontFamily: "font-sans, sans-serif",
                  padding: "23px",
                  textTransform: "none",
                  width: "100%",
                }}
              >
                Current Plan
              </DashboardButton>
            </div>
            <div className="border-t border-gray-300 mt-4"></div>
            <p className="text-neutral-400 text-xs mb-1">
              Everything included in the Pro tier, and:
            </p>
            <div className="flex flex-col gap-4 mt-4">
              {[
                "Custom emission factors",
                "Dedicated Climate Solutions Expert and Customer Success Manager",
                "Single sign-on access",
                "Unlimited establishments",
                "Integrations, bulk uploads, and API access",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full border-4 border-white flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800">
                        <svg
                          className="w-4 h-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12l5 5L19 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h2 className="font-bold text-neutral-700 text-xs">{item}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
