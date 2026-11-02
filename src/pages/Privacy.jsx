import React from "react";
import LegalLayout from "@/components/legal/LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="November 2026"
      intro="This policy explains what Forex News stores, why it stores it, and the control you have over it."
      sections={[
        {
          h: "What we collect",
          p: "Your watchlist, currency pairs, alert preferences and chosen time zone are stored so the calendar opens exactly as you left it. We also receive basic device and app-version details when the app crashes, which help us fix bugs.",
        },
        {
          h: "Market data",
          p: "Economic releases and news headlines come from third-party data providers. They are processed to display dates, consensus figures, actuals and impact ratings inside the app.",
        },
        {
          h: "Notifications",
          p: "Push notifications are delivered through your device's notification service. You can turn off any alert category, or all of them, from the app settings or your system settings at any time.",
        },
        {
          h: "Sharing",
          p: "We do not sell personal data. Limited processing is handled by hosting, notification and crash-reporting providers strictly on our behalf.",
        },
        {
          h: "Your choices",
          p: "You can clear your saved preferences from the app settings, disable crash reporting, and stop all alerts. For any privacy request, email support@amanblaze.in.",
        },
      ]}
    />
  );
}