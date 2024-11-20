import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { Circle } from "lucide-react-native";

// Constants
import TYPOGRAPHY from "@/constants/Typography";
import COLORS from "@/constants/Colors";
import SPACING from "@/constants/Spacing";

type CafeCardProps = {
  status: "open" | "closing soon" | "closed";

  /** The name of the cafe */
  name: string;

  /** The location of the cafe */
  location: string;

  /** The price range of the cafe */
  priceRange: "$" | "$$" | "$$$" ;

  /** The rating of the cafe */
  rating: number;

  /** The image of the cafe */
  image?: string;

  /** The size of the card */
  size?: "medium" | "large";
};

let cardDimensions = {
  medium: {
    width: 318,
    height: 180,
    image: require("@/assets/images/placeholder/imagemd.png"),
  },
  large: {
    width: 361,
    height: 210,
    image: require("@/assets/images/placeholder/imagexl.png"),
  },
};

export default function CafeCard({
  status,
  name,
  location,
  priceRange,
  rating,
  image,
  size = "medium",
}: CafeCardProps) {
  return (
    <View style={{width: cardDimensions[size].width,}}>
      <View>
        <Image
          source={image ? { uri: image } : cardDimensions[size].image}
          width={cardDimensions[size].width}
          height={cardDimensions[size].height}
          style={{ borderRadius: SPACING["sm"] }}
        />
        <Text
          style={[
            TYPOGRAPHY.body.small.bold,
            styles.priceRangeIcon,
            styles.rating,
          ]}
          testID="icon-button"
        >
          {rating}
        </Text>
      </View>
      <View style={styles.caption}>
        <View style={styles.cafeInfo}>
          <View style={styles.cafeInfoHeader}>
            <Text style={[TYPOGRAPHY.body.large.semiBold]}>{name}</Text>
            <Circle
              width={12}
              height={12}
              strokeWidth={1}
              color={
                status === "open"
                  ? COLORS.status.green
                  : status === "closing soon"
                  ? COLORS.status.orange
                  : COLORS.status.red
              }
              fill={
                status === "open"
                  ? COLORS.status.green
                  : status === "closing soon"
                  ? COLORS.status.orange
                  : COLORS.status.red
              }
              testID="tooltip-icon"
            />
          </View>
          <Text
            style={[TYPOGRAPHY.body.normal.semiBold, styles.cafeInfoLocation]}
          >
            {location}
          </Text>
        </View>
        <Text
          style={[TYPOGRAPHY.body.normal.base, styles.priceRangeIcon]}
          testID="icon-button"
        >
          {priceRange}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardDimensions["medium"].width,
  },
  caption: {
    marginTop: SPACING["lg"],
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cafeInfo: {
    gap: SPACING["xxs"],
  },
  cafeInfoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING["xs"],
  },
  cafeInfoLocation: {
    color: COLORS.black45,
  },
  priceRangeIcon: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.xs,
    borderRadius: 500,
    justifyContent: "center",
  },
  rating: {
    position: "absolute",
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.white, // FIXME: Remove this
  },
});
