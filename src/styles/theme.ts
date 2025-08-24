const fontGenerator = (
  fontFamily = "Pretendard-Custom",
  fontSize = "1rem",
  fontWeight = "normal",
  lineHeight = "normal",
  letterSpacing = "normal"
) => ({
  "font-family": fontFamily,
  "font-weight": fontWeight,
  "font-size": fontSize,
  "line-height": lineHeight,
  "letter-spacing": letterSpacing,
});

const colors = {
  // 배경색
  Bg: "#52525B",

  // Netral
  N70: "#2A2A2E",
  N50: "#52525B",
  N40: "#71717A",
  N30: "#A1A1AA",
  N20: "#D4D4D8",
  N10: "#E4E4E7",
  N00: "#F4F4F5",
  WHITE: "#FFF",

  // 파랑 색상
  B60: "#0C3CB7",
  B50: "#4278EA",
  B40: "#72A1FF",
  B30: "#A2C7FF",
  B20: "#DAE9FF",
  B10: "#ECF4FF",

  // 빨강 색상
  R60: "#AD0002",
  R50: "#FC696A ",
  R40: "#FF9596",
  R30: "#FFB5BB",
  R20: "#FFD9D9",
  R10: "#FFF1F1 ",
};

const theme = {
  colors,

  fonts: {
    // 404 Page
    ExtraBold90: fontGenerator(
      "Pretendard-Custom",
      "90px",
      "800",
      "auto",
      "normal"
    ),
    Semibold32: fontGenerator(
      "Pretendard-Custom",
      "32px",
      "600",
      "auto",
      "normal"
    ),

    // Head1
    ExtraBold24: fontGenerator(
      "Pretendard-Custom",
      "24px",
      "800",
      "auto",
      "130%"
    ),
    Bold24: fontGenerator("Pretendard-Custom", "24px", "700", "auto", "130%"),

    // Head2
    Bold20: fontGenerator("Pretendard-Custom", "20px", "700", "auto", "130%"),
    SemiBold20: fontGenerator(
      "Pretendard-Custom",
      "20px",
      "600",
      "auto",
      "130%"
    ),

    // Body1
    Bold16: fontGenerator("Pretendard-Custom", "16px", "700", "auto", "normal"),
    SemiBold16: fontGenerator(
      "Pretendard-Custom",
      "16px",
      "600",
      "auto",
      "normal"
    ),
    Regular16: fontGenerator(
      "Pretendard-Custom",
      "16px",
      "400",
      "auto",
      "normal"
    ),

    // Body2
    SemiBold14: fontGenerator(
      "Pretendard-Custom",
      "14px",
      "600",
      "auto",
      "normal"
    ),
    Regular14: fontGenerator(
      "Pretendard-Custom",
      "14px",
      "400",
      "auto",
      "normal"
    ),

    // small1
    SemiBold12: fontGenerator(
      "Pretendard-Custom",
      "12px",
      "600",
      "auto",
      "normal"
    ),
    Regular12: fontGenerator(
      "Pretendard-Custom",
      "12px",
      "400",
      "auto",
      "normal"
    ),

    // small2
    // Body2
    SemiBold10: fontGenerator(
      "Pretendard-Custom",
      "10px",
      "600",
      "auto",
      "normal"
    ),
    Regular10: fontGenerator(
      "Pretendard-Custom",
      "10px",
      "400",
      "auto",
      "normal"
    ),
  },
};

export default theme;
