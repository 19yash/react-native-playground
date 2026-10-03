// import { ColorValue, Platform } from "react-native";
// import styled from "styled-components/native";

import { styled } from 'styled-components/native'

// export const TabContainer = styled.View`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
// `;

// export const StyledTabContent = styled.View`
//   align-items: center;
// `;

// export const styles = StyleService.create({
//   tabBar: {
//     backgroundColor: "color-basic-300",
//     borderTopWidth: 0,
//     height: Platform.OS === "ios" ? 90 : 60,
//     paddingTop: 0,
//     shadowOffset: {
//       width: 0,
//       height: 16,
//     },
//     elevation: 22,
//     shadowOpacity: 9,
//     shadowRadius: 32,
//     shadowColor: "#000",
//   },
//   tabBarIconStyle: {
//     flex: 1,
//     width: "100%",
//   },
//   headerTitleStyle: {
//     color: "color-basic-600",
//     fontSize: 22,
//     alignContent: "center",
//     alignItems: "center",
//     alignSelf: "center",
//   },
//   headerStyle: {
//     backgroundColor: "color-app-background",
//     shadowColor: "transparent",
//   },
//   hide: {
//     display: "none",
//   },

//   tabText: {
//     marginTop: 4,
//   },
// });

// export const bottomNavigationOptionsStyles = (theme: ThemeType) => ({
//   tabBarStyle: {
//     backgroundColor: theme["color-basic-100"] as ColorValue,
//     paddingTop: 8,
//     paddingHorizontal: 14,
//     paddingBottom: 16,
//     shadowColor: "transparent",
//     borderTopWidth: 1,
//     borderTopColor: theme["color-basic-500"] as ColorValue,
//   },
// });

// export const StyleIconView = styled.View<{
//   showBackButtonBackground?: boolean;
// }>`
//   margin-left: ${(props) =>
//     props.showBackButtonBackground
//       ? props.theme.uikit["spacing-lg"]
//       : props.theme.uikit["spacing-xs"]};
//   margin-top: ${(props) => props.theme.uikit["spacing-xs"]};
//   border-radius: ${(props) => props.theme.uikit["radius-md"]};
//   padding: ${(props) => props.theme.uikit["spacing-xs"]};
//   background-color: ${(props) =>
//     props.showBackButtonBackground
//       ? props.theme.uikit["color-basic-300"]
//       : "transparent"};
// `;

// export const StyledViewContainer = styled.View<{
//   paddingTop?: string;
//   paddingBottom?: string;
// }>`
//   flex-direction: row;
//   align-items: center;
//   padding-bottom: ${(props) =>
//     props.theme.uikit[`spacing-${props.paddingBottom ?? "none"}`]};

//   padding-top: ${(props) =>
//     props.theme.uikit[`spacing-${props.paddingTop ?? "none"}`]};
// `;

// export const StyledText = styled(Text)<{
//   paddingRight?: string;
// }>`
//   padding-right: ${(props) =>
//     props.theme.uikit[`spacing-${props.paddingRight ?? "none"}`]};
// `;

// export const StyledView = styled.View<{
//   paddingTop?: string;
//   paddingBottom?: string;
// }>`
//   padding-bottom: ${(props) =>
//     props.theme.uikit[`spacing-${props.paddingBottom ?? "none"}`]};

//   padding-top: ${(props) =>
//     props.theme.uikit[`spacing-${props.paddingTop ?? "none"}`]};
// `;

// export const StyledBottomNavigationView = styled.View`
//   flex: 1;
// `;

export const TabContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`
