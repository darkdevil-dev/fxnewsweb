import React from "react";
import LegalLayout from "@/components/legal/LegalLayout";

export default function Terms() {
  return (
    <LegalLayout
      title="Terms of Service"
      updated="November 2026"
      intro="By downloading or using Forex News, you agree to these terms. Please read them before you rely on anything in the app."
      sections={[
        {
          h: "Information, not advice",
          p: "Forex News is an information tool. The calendar, headlines and impact ratings are not investment advice, recommendations or an offer to trade, and nothing in the app should be treated as a personal recommendation.",
        },
        {
          h: "Accuracy and delays",
          p: "Economic data and headlines come from third parties and may be delayed, revised, incomplete or unavailable. We work to keep everything current but make no warranty of accuracy or uninterrupted availability.",
        },
        {
          h: "Alerts",
          p: "Push alerts are delivered on a best-effort basis and depend on your device, network and system settings. A missed or late alert is not grounds for any claim.",
        },
        {
          h: "Trading risk",
          p: "Trading foreign exchange carries substantial risk. Every decision you make, and its outcome, is your own responsibility.",
        },
        {
          h: "Acceptable use",
          p: "You agree not to scrape, resell or redistribute the app's data, reverse engineer the app, or use it in a way that breaks the law or interferes with other users.",
        },
        {
          h: "Changes",
          p: "We may update these terms as the app evolves. Continued use after an update means you accept the revised terms.",
        },
      ]}
    />
  );
}