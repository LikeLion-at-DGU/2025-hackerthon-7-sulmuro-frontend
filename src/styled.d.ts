import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      // 배경색
      Bg: string;

      // Netral
      N70: string;
      N50: string;
      N40: string;
      N30: string;
      N20: string;
      N10: string;
      N00: string;
      WHITE: string;

      // 파랑 색상
      B60: string;
      B50: string;
      B40: string;
      B30: string;
      B20: string;
      B10: string;

      // 빨강 색상
      R60: string;
      R50: string;
      R40: string;
      R30: string;
      R20: string;
      R10: string;
    };
    fonts: {
      // pretendard

      // Head 24px
      ExtraBold24: any;
      Bold24: any;

      // Head2 20px
      Bold20: any;
      SemiBold20: any;

      // Body1 16px
      Bold16: any;
      SemiBold16: any;
      regular16: any;

      // Body2 14px
      SemiBold14: any;
      regular14: any;

      // small1 12px
      SemiBold12: any;
      regular12: any;
      // small2 10px

      SemiBold10: any;
      regular10: any;
    };
  }
}
