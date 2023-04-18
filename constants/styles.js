import * as React from "react";
import { StyleSheet } from "react-native";

{
	/*
In this file you can create multiple css styles to be used troughout the app
as with other things, we use export here to be able to import the STYLES object in other files
Basically all styling should be done trough this file to keep the main app cole as clean as possible
*/
}

{
	/*Under here is the STYLES object, every style should be contained in it*/
}
{
	/*
The example style should remain to give people an idea of how it works
In the exaple, you can put css styling, the syntax is a bit different, for correct usage check react native docs
To use the styles, give the object in the app code the style attribute with STYLES.x where x is the spesific style in this file you want
*/
}

//Global variables
const colorBase = "#E9EDF0";
const colorAlt = "#ededed";
const colorAccent = "#389ADE";
const colorDark = "#1F5673";
const colorDarker = "#000000";
const colorError = "red";

const font = "Raleway";
const fontMedium = "RalewayMedium";
const fontLight = "RalewayLight";
const fontBold = "RalewayBold";
const fontExtraLight = "RalewayExtraLight";
const fsXXXL = 68;
const fsXXL = 64;
const fsXL = 36;
const fsL = 24;
const fsM = 20;
const fsSm = 16;
const fsXs = 12;
const borderRadius = 8;

//example stylesheet - don't touch
export const STYLES = StyleSheet.create({
	div: {
		borderWidth: 5,
		borderColor: "black",
	},

	example: {
		backgroundColor: "white",
	},
});

//Global styles for elements - should consist only of colors pretty much
export const ELSTYLES = StyleSheet.create({
	rippleColors: () => ({
		colorBase: colorBase,
		colorAccent: colorAccent,
		colorAlt: colorAlt,
		colorDark: colorDark,
	}),
	//Titles - supposed to be in descending order
	title: {
		fontFamily: font,
		fontSize: fsXXXL,
		color: colorBase,
	},
	titleXXLlight: {
		fontFamily: fontExtraLight,
		fontSize: fsXXL,
		color: colorBase,
	},
	titleXL: {
		fontFamily: fontMedium,
		fontSize: fsXL,
		color: colorBase,
	},

	titleL: {
		fontFamily: fontMedium,
		fontSize: fsL,
		color: colorBase,
	},
	titleLalt: {
		fontFamily: fontMedium,
		fontSize: fsL,
		color: colorDarker,
	},
	titleLlight: {
		fontFamily: fontLight,
		fontSize: fsL,
		color: colorBase,
	},
	titleLExtralight: {
		fontFamily: fontExtraLight,
		fontSize: fsL,
		color: colorBase,
	},
	titleMlight: {
		fontFamily: fontLight,
		fontSize: fsM,
		color: colorBase,
	},

	titleSm: {
		fontFamily: fontMedium,
		fontSize: fsSm,
		color: colorBase,
	},
	//End of titles
	//texts and labels
	txtL: {
		fontFamily: fontMedium,
		fontSize: fsL,
	},

	txt: {
		fontFamily: fontMedium,
		fontSize: fsSm,
	},
	txtLight: {
		fontFamily: fontLight,
		fontSize: fsSm,
	},
	txtAlt: {
		color: colorBase,
		font: fontMedium,
	},
	txtAltM: {
		color: colorBase,
		fontSize: fsM,
		font: fontMedium,
	},
	numtxtAltM: {
		color: colorBase,
		fontSize: fsM,
		font: fontMedium,
		maxWidth: 120,
	},
	label: {
		fontFamily: fontExtraLight,
		fontSize: fsL,
		marginTop: 6,
	},
	labelM: {
		fontFamily: font,
		fontSize: fsM,
		marginTop: 16,
	},
	//end of text and labels

	//inputs and buttons
	input: {
		fontSize: fsSm,
		fontFamily: fontLight,
		backgroundColor: colorBase,
		borderRadius: borderRadius,
		paddingVertical: 12,
		paddingHorizontal: 12,
		marginTop: 8,
		marginBottom: 8,
		borderWidth: 2,
		borderColor: colorAccent,
		color: colorDarker,
	},

	button: {
		backgroundColor: colorBase,
		borderRadius: borderRadius,
		borderColor: colorAccent,
		borderWidth: 2,
		color: colorDark,
		marginVertical: 4,
	},
	buttonAlt: {
		backgroundColor: colorAlt,
		borderRadius: borderRadius,
		borderColor: colorDark,
		borderWidth: 2,
		color: colorDark,
		marginVertical: 4,
	},
	buttonFitImg: {
		width: "50%",
		height: "50%",
	},
	buttonRound: {
		backgroundColor: colorBase,
		borderRadius: 40,
		borderColor: colorAccent,
		borderWidth: 2,
		color: colorDark,
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		margin: 4,
	},
	buttonPressed: {
		backgroundColor: colorAccent,
		borderRadius: borderRadius,
		borderColor: colorBase,
		borderWidth: 2,
		marginVertical: 4,
	},

	buttonTxt: {
		fontFamily: fontMedium,
		color: colorAccent,
	},
	buttonAltTxt: {
		font: fontBold,
		color: colorAccent,
		fontSize: fsM,
	},
	buttonTxtPressed: {
		font: font,
		color: colorBase,
	},

	errrorMsg: {
		color: colorError,
		font: fontMedium,
		fontSize: fsSm,
		marginBottom: 8,
		fontStyle: "italic",
	},

	forgotPasswordTxt: {
		fontFamily: fontMedium,
		color: colorAccent,
		fontStyle: "italic",
		textDecorationLine: "underline",
		font: fontExtraLight,
		fontSize: fsXs,
		marginVertical: 12,
	},
});

//login layout and element specifics
export const LOGIN = StyleSheet.create({
	bgColors: () => ({
		color1: colorAccent,
		color2: colorDark,
	}),
	contentWrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	container: {
		backgroundColor: colorAlt,
		borderRadius: borderRadius,
		padding: 16,
		width: 250,
		marginBottom: 52,
	},

	loginBtn: {
		alignSelf: "flex-start",
		paddingHorizontal: "8%",
		paddingVertical: "4%",
	},
});

//landing layout and element specifics
export const LANDING = StyleSheet.create({
	bgColors: () => ({
		color1: colorAccent,
		color2: colorDark,
	}),

	contentWrapper: {
		flex: 1,
		justifyContent: "space-around",
		paddingHorizontal: 40,
	},
	buttonWrapper: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	buttonLanding: {
		alignSelf: "center",
		flex: 0.48,
		alignItems: "center",
		paddingVertical: "8%",
	},
	titleWrapper: {
		flex: 1,
		justifyContent: "center",
	},
});

//register layout
export const REGISTER = StyleSheet.create({
	bgColors: () => ({
		color1: colorAccent,
		color2: colorDark,
	}),

	screenWrapper: {
		backgroundColor: colorAccent,
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	inputContainer: {
		backgroundColor: colorAlt,
		padding: 16,
		width: "100%",
		marginBottom: 16,
		borderRadius: borderRadius,
	},

	registerBtn: {
		alignSelf: "flex-start",
		paddingHorizontal: "8%",
		paddingVertical: "4%",
		fontSize: fsXL,
	},

	addLicenceBtn: {
		paddingVertical: "4%",
		textAlign: "center",
		fontSize: fsSm,
	},
});

//forgot password layout
export const FORGOTPASS = StyleSheet.create({
	forgotWrapper: {
		backgroundColor: colorAccent,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	contentWrapper: {
		backgroundColor: colorAlt,
		padding: 16,
		width: "70%",
		borderRadius: borderRadius,
		margin: 8,
	},
	submitBtn: {
		alignSelf: "flex-start",
		padding: 8,
	},
});

//add pics and info layout
export const ADDPICTURES = StyleSheet.create({
	screenWrapper: {
		backgroundColor: colorAccent,
		flex: 1,
		justifyContent: "space-evenly",
	},
	contentWrapperTopBottom: {
		flexDirection: "row",
		justifyContent: "center",
		justifyContent: "space-around",
		widht: "100%",
		height: "22.5%",
		alignItems: "center",
		paddingTop: 50,
		paddingHorizontal: 16,
	},
	innerTop: {
		display: "flex",
	},
	contentWrapperMiddle: {
		height: "55%",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	innerContentWrapper1: {
		backgroundColor: colorAlt,
		padding: 16,
		width: 250,
		borderRadius: borderRadius,
		flexDirection: "row",
		alignItems: "center",
		height: "25%",
	},
	innerContentWrapper2: {
		backgroundColor: colorAlt,
		padding: 16,
		width: 250,
		borderRadius: borderRadius,
		height: "60%",
		justifyContent: "space-evenly",
	},
	addPicsBtn: {
		alignSelf: "center",
		flex: 1,
		alignItems: "center",
		paddingVertical: "8%",
		margin: "8%",
	},
	input: {
		fontSize: fsSm,
		fontFamily: fontLight,
		backgroundColor: colorBase,
		borderRadius: borderRadius,
		paddingVertical: 8,
		paddingHorizontal: 12,
		marginTop: 8,
		marginBottom: 8,
		borderWidth: 2,
		borderColor: colorAccent,
		color: colorDarker,
		height: "90%",
	},
});

//start gig map layout
export const STARTGIG = StyleSheet.create({
	screenWrapper: {
		flex: 1,
		backgroundColor: colorAccent,
	},
	mapWrapper: {
		flex: 1,
		backgroundColor: colorBase,
	},
	labelM: {
		fontFamily: fontMedium,
		color: colorAlt,
		fontSize: fsM,
	},
	labelL: {
		color: colorAlt,
		fontSize: fsL,
	},
	infoWrapper: {
		flex: 1,
		padding: 16,
		borderColor: colorDark,
		borderTopWidth: 4,
	},
	routeTitle: {
		fontFamily: fontMedium,
		fontSize: fsXL - 12,
		color: colorBase,
	},

	infoBtnWrapper: {
		position: "absolute",
		flex: 1,
		flexDirection: "row",
		right: 0,
	},
	mapNavBtnWarpper: {
		position: "absolute",
		flexDirection: "column",
		flex: 1,
		left: 0,
		top: 0,
		margin: 4,
	},

	ratingWrapper: {
		position: "absolute",
		top: -60,
		right: 20,
	},

	rating: {
		width: 120,
		height: 120,
		borderRadius: 60,
		borderColor: colorDark,
		borderWidth: 4,
		backgroundColor: colorAlt,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	ratingTxt: {
		color: colorDark,
		fontSize: fsL,
		fontWeight: "500",
		alignItems: "center",
		alignContent: "center",
		justifyContent: "center",
	},

	buttonWrapper: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
	},

	buttonStart: {
		flex: 1,
		margin: 4,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	textWrapper: {
		flex: 1,
		justifyContent: "space-between",
		margin: 4,
		paddingTop: 4,
		paddingBottom: 4,
	},
	section: {
		flex: 1,
		justifyContent: "flex-start",
	},
	contactInfoModal: {
		flex: 0.4,
		backgroundColor: colorBase,
		padding: 16,
		margin: 0,
		flexDirection: "column",
		justifyContent: "space-between",
	},
});

//gig list layout
export const GIGLIST = StyleSheet.create({
	screenWrapper: {
		flex: 1,
		backgroundColor: colorAlt,
	},
	navbar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 8,
		borderColor: colorDark,
		borderBottomWidth: 4,
	},
	navbarR: {
		flexDirection: "row",
	},
	content: {
		flex: 1,
		padding: 12,
		backgroundColor: colorAccent,
	},
	listBtn: {
		backgroundColor: colorAccent,
		padding: 12,
		borderColor: colorAlt,
		borderWidth: 2,
		margin: 4,
		borderRadius: borderRadius,
	},
	listBtnTitle: {
		fontFamily: fontMedium,
		fontSize: fsL,
		color: colorAlt,
	},
	reward: {
		fontSize: fsL,
		color: colorAlt,
	},
	date: {
		fontSize: fsM,
		color: colorAlt,
		fontWeight: "500",
		marginRight: 2,
	},
	departure: {
		fontSize: fsSm,

		color: colorAlt,
		fontWeight: "400",
		marginVertical: 1,
		flex: 1,
	},
	vehicle: {
		fontSize: fsSm,
		color: colorAlt,
		fontWeight: "400",
		alignSelf: "flex-end",
	},
	separator: {
		height: "100%",
		borderColor: colorAlt,
		borderWidth: 0.8,
		marginHorizontal: 8,
		alignSelf: "center",
	},

	modalWrapper: {
		flex: 0.6,
		backgroundColor: colorBase,
		padding: 16,
		flexDirection: "column",
		justifyContent: "space-between",
	},
	searchBtnTxt: {
		fontSize: fsM,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontFamily: fontMedium,
		color: colorDarker,
	},
	dropdown: {
		backgroundColor: colorBase,
		fontFamily: fontMedium,
		color: colorDarker,
		borderColor: colorAccent,
		borderWidth: 2,
	},
});

export const GIGLISTFILTER = StyleSheet.create({
	title: {
		fontSize: fsXL,
		fontFamily: fontLight,
		color: colorDarker,
		marginBottom: 24,
	},
	dateTimeBtn: {
		flex: 0.49,
		justifyContent: "center",
		alignItems: "center",
		borderColor: colorAccent,
		borderWidth: 2,
		borderRadius: borderRadius,
		padding: 16,
		marginTop: 16,
	},
});
