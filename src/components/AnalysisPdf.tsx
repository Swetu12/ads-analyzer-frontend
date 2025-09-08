import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { campaignData } from "@/data/mock_ads_response.ts";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
});

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Roboto", fontSize: 11, lineHeight: 1.5 },
  section: { marginBottom: 15 },
  title: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
  subtitle: { fontSize: 14, marginBottom: 5, fontWeight: "bold" },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableRow: { flexDirection: "row" },
  tableCol: { borderStyle: "solid", borderWidth: 1, flex: 1, padding: 5 },
  tableHeader: { backgroundColor: "#f0f0f0", fontWeight: "bold" },
  bullet: { marginLeft: 10, marginBottom: 3 },
});

const BulletList = ({ items }: { items: string[] }) => (
  <View>
    {items.map((item, idx) => (
      <Text key={idx} style={styles.bullet}>
        • {item}
      </Text>
    ))}
  </View>
);

export const AnalysisPDF = () => {
  const campaign = campaignData[0];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{campaign.campaign}</Text>
          <Text>Score: {campaign.score}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Summary</Text>
          <Text>{campaign.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Top Performing Ads</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCol, styles.tableHeader]}>Title</Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>CTR</Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>
                Conversion Rate
              </Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>
                Impressions
              </Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>Clicks</Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>Spend</Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>Revenue</Text>
            </View>
            {campaign.top_performing_ads.map((ad) => (
              <View style={styles.tableRow} key={ad.id}>
                <Text style={styles.tableCol}>{ad.title}</Text>
                <Text style={styles.tableCol}>
                  {(ad.ctr * 100).toFixed(2)}%
                </Text>
                <Text style={styles.tableCol}>
                  {(ad.conversion_rate * 100).toFixed(2)}%
                </Text>
                <Text style={styles.tableCol}>{ad.impressions}</Text>
                <Text style={styles.tableCol}>{ad.clicks}</Text>
                <Text style={styles.tableCol}>${ad.spend}</Text>
                <Text style={styles.tableCol}>${ad.revenue}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Lowest Performing Ads</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCol, styles.tableHeader]}>Title</Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>CTR</Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>
                Conversion Rate
              </Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>
                Impressions
              </Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>Clicks</Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>Spend</Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>Revenue</Text>
            </View>
            {campaign.lowest_performing_ads.map((ad) => (
              <View style={styles.tableRow} key={ad.id}>
                <Text style={styles.tableCol}>{ad.title}</Text>
                <Text style={styles.tableCol}>
                  {(ad.ctr * 100).toFixed(2)}%
                </Text>
                <Text style={styles.tableCol}>
                  {(ad.conversion_rate * 100).toFixed(2)}%
                </Text>
                <Text style={styles.tableCol}>{ad.impressions}</Text>
                <Text style={styles.tableCol}>{ad.clicks}</Text>
                <Text style={styles.tableCol}>${ad.spend}</Text>
                <Text style={styles.tableCol}>${ad.revenue}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Recommendations</Text>
          <BulletList items={campaign.recommendations} />
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Advanced Recommendations</Text>
          <BulletList items={campaign.advanced_recommendations} />
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Audience Feedback</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCol, styles.tableHeader]}>
                Sentiment
              </Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>Comment</Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>Rating</Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>
                Demographic
              </Text>
            </View>
            {campaign.audience_feedback.map((feedback, idx) => (
              <View style={styles.tableRow} key={idx}>
                <Text style={styles.tableCol}>{feedback.sentiment}</Text>
                <Text style={styles.tableCol}>{feedback.comment}</Text>
                <Text style={styles.tableCol}>{feedback.rating}</Text>
                <Text style={styles.tableCol}>{feedback.demographic}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Performance Breakdown</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCol, styles.tableHeader]}>Metric</Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>Current</Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>
                Previous
              </Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>
                Change (%)
              </Text>
              <Text style={[styles.tableCol, styles.tableHeader]}>Trend</Text>
            </View>
            {campaign.performance_breakdown.map((perf, idx) => (
              <View style={styles.tableRow} key={idx}>
                <Text style={styles.tableCol}>{perf.metric}</Text>
                <Text style={styles.tableCol}>{perf.current}</Text>
                <Text style={styles.tableCol}>{perf.previous}</Text>
                <Text style={styles.tableCol}>{perf.change}%</Text>
                <Text style={styles.tableCol}>{perf.trend}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Causes</Text>
          <BulletList items={campaign.causes_and_impact.causes} />
          <Text style={styles.subtitle}>Impact</Text>
          <BulletList items={campaign.causes_and_impact.impact} />
        </View>
      </Page>
    </Document>
  );
};
