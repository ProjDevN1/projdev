import {
	collection,
	query,
	where,
	getDocs,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	arrayUnion,
	arrayRemove,
	get,
} from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import { getCurrentTime, getCurrentDate } from "./DataHandling.js";
import React, { useState } from "react";


//This enables applying for gigs ad other test features
const testMode = true

// FOR FUNCTIONS THAT START WITH TEMP:
// Only used in database testing, no not make any actual app logic rely on them
// All temp functions will get changed or deleted frequently

//Example on how to get data from the database
async function tempGetGig() {
	//Sets a reference to which document you want, format (db, foldername, filename)
	//Folder and file names can be read from variables
	const docRef = doc(db, "gigs", "gig_1");

	//Gets a copy of the file specified in the reference
	const docData = await getDoc(docRef);

	//Returns the data contained in the document. The .data() function is necessary
	return docData.data();
}

//Export the temp functions here
export { tempGetGig };

//This stores the current user so that other functions can use it
var currentUser = "";
var currentUserId = "";
//This stores all users so user switching remembers which order it should do it
var allUsers = [];
//Gets all users as an array and returns it. Very much work in progress
async function getUser() {
	var users = [];
	const usersSnapshot = await getDocs(collection(db, "users"));
	usersSnapshot.forEach((doc) => {
		const data = doc.data();
		data.id = doc.id
		users.push(data);
	});
	currentUser = users[0];
	if (allUsers.length === 0) {
		allUsers = users;
	}
	console.log(`Current user: ${currentUser.name}`);
	return users;
}

//Switches the current user by shfting the next user in the allUsers array to position[0] and makes it the new current user
async function switchUser() {
	const u = allUsers.shift();
	allUsers.push(u);
	currentUser = allUsers[0];
	getActiveGigs();
	console.log(`Current user: ${currentUser.name}`);
}

function formatDate(date) {
	const str = date.toString();
	const year = str.slice(0, 4);
	const month = str.slice(4, 6);
	const day = str.slice(6, 8);
	return `${day}.${month}.${year}`;
  }

//Edits the required data in correct format for activegigslist screen
function formatActiveGigsData(gigsData, id, gigId) {
	

	const ITEM = {
		id: id,
		gigId: gigId,
		startLocation: `${gigsData.startLocation}`,
		endLocation: `${gigsData.endLocation}`,
		title: `${gigsData.startLocation} - ${gigsData.endLocation}`,
		leaveTime: `${gigsData.startTime}`,
		arrivalTime: `${gigsData.endTime}`,
		vehicle: gigsData.vehicle,
		startAddress: gigsData.startAddress,
		arrivalAddress: gigsData.endAddress,
		estimatedTime: "Not implemented",
		addInfo: "Dont have these yet either lol",
		reward: gigsData.reward,
		client: gigsData.client,
		startCoord: gigsData.startCoord,
		endCoord: gigsData.endCoord,
		startLat: gigsData.startLat,
		startLon: gigsData.startLon,
		endLat: gigsData.endLat,
		endLon: gigsData.endLon,
		date: formatDate(gigsData.date),
	};
	return ITEM;
}

function formatAvailableGigsData(aGigsData, id, gigId) {
	const ITEM = {
		id: id,
		gigId: gigId,
		startLocation: `${aGigsData.startLocation}`,
		endLocation: `${aGigsData.endLocation}`,
		startCoord: aGigsData.startCoord,
		endCoord: aGigsData.endCoord,
		reward: aGigsData.reward,
		startTime: aGigsData.startTime,
		endTime: aGigsData.endTime,
		client: aGigsData.client,
		startLat: aGigsData.startLat,
		startLon: aGigsData.startLon,
		endLat: aGigsData.endLat,
		endLon: aGigsData.endLon,
		route: `${aGigsData.startLocation} - ${aGigsData.endLocation}`,
		date: formatDate(aGigsData.date),
	};
	return ITEM;
}

function sortGigsByDate(gigs) {
	return gigs.sort((a, b) => {
		const dateA = Date.parse(a.date.split('.').reverse().join('-'));
		const dateB = Date.parse(b.date.split('.').reverse().join('-'));
		return dateA - dateB;
	});
}

//So it appears that giving the gigs id's based on their array position is not a good idea
//Because when you then sort them by date, it makes you apply for the wrong gig lol
//So I had to make this abomination to quickfix it
function updateIds(gigs) {
	for (let i = 0; i < gigs.length; i++) {
		gigs[i].id = i;
	}
	return gigs;
  }

//This stores current users active gigs, so that asctivegigslist does not need to load the data on layout
var activeGigsData = [];
//Gets an array of user_1 active gigs. When user switching is completed, will change it to get active gigs of current user
async function getActiveGigs() {
	//Gets data for a gig specified by the gig id in users active gigs array and pushes it to activegigs
	var id = 0;
	const activeGigs = [];

	//Gets a gig, formats it with another function, increments the id and pushes the result to activegigs array
	async function getGig(value) {
		const gigSnapshot = await getDoc(doc(db, "gigs", value));
		const formattedGigs = formatActiveGigsData(gigSnapshot.data(), id, gigSnapshot.id);
		activeGigs.push(formattedGigs);
		id += 1;
	}

	//Gets users active gigs array
	const activeGigsPerUser = currentUser.gigsActive;

	//Checks if users active gigs array is not empty, if it's not then runs the getGig function for all of them
	if (activeGigsPerUser.length === 0) {
		var arr = [];
		activeGigsData = arr;
		return "No active gigs";
	} else {
		await activeGigsPerUser.forEach(getGig);
		const x = sortGigsByDate(activeGigs);
		activeGigsData = updateIds(x);
		return activeGigs;
	}
}

//A function to get gigs from the DB that are NOT completed
//@Ira
var availableGigsData = [];

async function getOngoingGigs() {
	//Return gigs in an arraylist
	const gigArray = [];

	const q = query(collection(db, "gigs"), where("user", "==", "")); //Filters gigs that are already done
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		const id = gigArray.length;
		const formattedGig = formatAvailableGigsData(doc.data(), id, doc.id);
		gigArray.push(formattedGig); //Append gigs to gigArray-list
		const x = sortGigsByDate(gigArray);
		availableGigsData = updateIds(x)
	});
}

//This functon gets the client names associated with a gig in the gigstart or gigapply screens
async function getClientName(gigType, id) {
	//Gig type should be either available or active, depending on which screen it is called from
	let clientId = "";

	//Checks if to get the client from active or available gigs and returns the correct clients name
	if (gigType === "available") {
		clientId = availableGigsData[id].client;
		const clientSnap = await getDoc(doc(db, "clients", clientId));
		return clientSnap.data().name;
	} else if (gigType === "active") {
		clientId = activeGigsData[id].client;
		const clientSnap = await getDoc(doc(db, "clients", clientId));
		console.log(clientSnap.data().name)
		return clientSnap.data().name;
	} else {
		console.log("Incorrect gig type");
	}
}


// Code to get client phone number for contact info 
async function getClientPhone(gigType, id) {
	//Gig type should be either available or active, depending on which screen it is called from
	let clientId = "";

	//Checks if to get the client from active or available gigs and returns the correct clients phone
	if (gigType === "available") {
		clientId = availableGigsData[id].client
		const clientSnap = await getDoc(doc(db, "clients", clientId))
		return clientSnap.data().phone;
	} else if (gigType === "active") {
		clientId = activeGigsData[id].client
		const clientSnap = await getDoc(doc(db, "clients", clientId))
		console.log(clientSnap.data().phone)
		return clientSnap.data().phone
	} else {
		console.log("incorrect gig type")
	}
}

// Code to get client email for contact info
async function getClientEmail(gigType, id) {

	//Gig type should be either available or active, depending on which screen it is called from
	let clientId = "";
	//Checks if to get the client from active or available gigs and returns the correct clients email
	if (gigType === "available") {
		clientId = availableGigsData[id].client
		const clientSnap = await getDoc(doc(db, "clients", clientId))
		return clientSnap.data().email;
	} else if (gigType === "active") {
		clientId = activeGigsData[id].client
		const clientSnap = await getDoc(doc(db, "clients", clientId))
		return clientSnap.data().email
	} else {
		console.log("incorrect gig type")
	}
}

let activeGig = ''
function setActiveGig(gig){
	activeGig = gig;
}


function removeGigById(id){
	for (let i = 0; i < availableGigsData.length; i++) {
		if (availableGigsData[i].gigId === id) {
			availableGigsData.splice(i, 1);
			availableGigsData = updateIds(availableGigsData)
			break;
		}
	  }
}

async function applyForGig(gigId, arrayPos){
	if (testMode === true){
		const time = getCurrentTime()
		const gigRef = doc(db, "gigs", gigId)
		updateDoc(gigRef, {user: currentUser.id})
		const gig = await getDoc(gigRef)
		const userRef = doc(db, "users", currentUser.id)
		updateDoc(userRef, {
			gigsActive: arrayUnion(gigId)
		})
		removeGigById(gigId)
		console.log(availableGigsData.length)
		const id = activeGigsData.length
		const formattedGig = formatActiveGigsData(gig.data(), id, gig.id)
		activeGigsData.push(formattedGig)
		console.log(activeGigsData.length)
		console.log(formattedGig)
	} else {
		console.log('Test mode is disabled, no changes to DB made')
	}
}
// Function to mark the gig as completed and update endTime to finish time in the database when user clicks "Finish" on DrivingScreen finish modal
async function finishDrive(gigId, arrayPos){
	if (testMode === true){
		const time = getCurrentTime();
		const gigRef = doc(db, "gigs", gigId)
		updateDoc(gigRef, {completed: true})
		updateDoc(gigRef, {driveEndTime: time})
		const userRef = doc(db, 'users', currentUser.id)
		updateDoc(userRef, {
			gigsCompleted: arrayUnion(gigId)
		})
		updateDoc(userRef, {
			gigsActive: arrayRemove(gigId)
		})
		activeGigsData.splice(arrayPos, 1)
		console.log("Finished gig")
	} else {
		console.log("Finish gig failed")
	}
}

// Function to update current user coordinates in firebase
async function updateCurrentLocation(gigId, userCoords){
	if (testMode === true){
		const gigRef = doc(db, 'gigs', gigId)
		updateDoc(gigRef, {currentLocation: userCoords})
		console.log("Location uploaded")
	} else {
		console.log("Location upload failed")
	}
}

//Function to add starting time to Firebase while user pressses "Start"-button on GigStartScreen
//@Ira
async function addStartingTime(userId) {
	if (testMode === true){
		const time = getCurrentTime();
		const gigRef = doc(db, "gigs", userId);
		updateDoc(gigRef, {driveStartTime: time})
		console.log("Gig starting time added")
	} else {
		console.log("Location upload failed")
	}
}


function filterLocations(arr, startLocationParam, endLocationParam) {
	return arr.filter(obj => {
	  if (startLocationParam && endLocationParam) {
		return obj.startLocation === startLocationParam && obj.endLocation === endLocationParam;
	  } else if (startLocationParam) {
		return obj.startLocation === startLocationParam;
	  } else if (endLocationParam) {
		return obj.endLocation === endLocationParam;
	  }
	});
  }
  


//Function that takes search parameters from searchfiltermodal and returns an array of accpeted items
function getFilteredItems(startLocationParam, endLocationParam, startDateRange, endDateRange, minReward){
	console.log(startLocationParam, endLocationParam, startDateRange, endDateRange, minReward)
	let filteredItemsList = []
	if (startDateRange != null || endDateRange != null){
		filteredItemsList = getGigsBetweenDates(startDateRange, endDateRange) 
	}
	if (minReward != 0 && filteredItemsList.length === 0){
		filteredItemsList = availableGigsData.filter(obj => obj.reward > minReward)
	} else if (minReward != 0) {
		filteredItemsList = filteredItemsList.filter(obj => obj.reward > minReward)
	}
	if (startLocationParam != null || endLocationParam != null){
		if (filteredItemsList.length === 0){
			filteredItemsList = filterLocations(availableGigsData, startLocationParam, endLocationParam)
		} else {
			filteredItemsList = filterLocations(filteredItemsList, startLocationParam, endLocationParam)
		}
	}

	console.log(filteredItemsList)
	return filteredItemsList
}

//Function to return an array of active gigs between selected dates
//@Ira
function getGigsBetweenDates(startDateRange, endDateRange) {
	var newList = [];

	if (startDateRange != null && endDateRange != null) {
		const startDate = parseInt((((startDateRange.toISOString()).substr(0,10)).split('-')).join(""));
		const endDate = parseInt((((endDateRange.toISOString()).substr(0, 10)).split('-')).join(""));
		//console.log("TÄMÄ 1: " + startDate);
		//console.log("TÄMÄ 2: " + endDate);
		availableGigsData.forEach((gig) => {
			var tempGigDate = (gig.date).split('.');
			var gigDate = parseInt(tempGigDate[2] + tempGigDate[1] + tempGigDate[0]);
			//console.log("TÄMÄ 3: " + gigDate); 
			//console.log(typeof gigDate)
			//console.log(startDate <= gigDate)
			//console.log(gigDate <= endDate)
			if (startDate <= gigDate && gigDate <= endDate) {
				newList.push(gig);
			} else {
				console.log(gig.id, " is not between selected dates.");
			}
		})
		console.log(newList)

	} else if (startDateRange == null && endDateRange != null) {
		const endDate = parseInt((((endDateRange.toISOString()).substr(0, 10)).split('-')).join(""));
		availableGigsData.forEach((gig) => {
			var tempGigDate = (gig.date).split('.');
			var gigDate = parseInt(tempGigDate[2] + tempGigDate[1] + tempGigDate[0]);
			if (gigDate <= endDate) {
				newList.push(gig);
			} else {
				console.log(gig.id, " is not between selected dates.");
			}
		})
		console.log(newList)

	} else if (startDateRange != null && endDateRange == null) {
		const startDate = parseInt((((startDateRange.toISOString()).substr(0,10)).split('-')).join(""));
		console.log("TÄMÄ 1: " + startDate);
		availableGigsData.forEach((gig) => {
			var tempGigDate = (gig.date).split('.');
			var gigDate = parseInt(tempGigDate[2] + tempGigDate[1] + tempGigDate[0]);
			if (gigDate >= startDate) {
				newList.push(gig);
			} else {
				console.log(gig.id, " is not between selected dates.");
			}
		})
		console.log(newList)

	} 

	return newList;
}

async function resetGigsProgress(){
	try {
		// Loop through each document in the users collection
		const usersSnapshot = await getDocs(collection(db, "users"));
		for (const userDoc of usersSnapshot.docs) {
		  const docRef = doc(db, "users", userDoc.id)
		  // Clear the "gigsActive" and "gigsCompleted" arrays
		  await updateDoc(docRef, {
			gigsActive: [],
			gigsCompleted: []
		  });
		}
	
		// Loop through each document in the gigs collection
		const gigsSnapshot = await getDocs(collection(db, "gigs"));
		for (const gigDoc of gigsSnapshot.docs) {
		  const docRef = doc(db, "gigs", gigDoc.id)
		  // Reset the "completed" field to false
		  // and clear the "driveEndTime", "driveStartTime", "user" and "currentLocation" fields
		  await updateDoc(docRef, {
			completed: false,
			driveEndTime: {time: ""},
			driveStartTime: {time: ""},
			user: "",
			currentLocation: ""
		  });
		}
	
		console.log('Gigs progress reset complete.');
	  } catch (error) {
		console.error('Error resetting gigs progress:', error);
	  }
}

function getUpdatedData(type) {
	if (type === "active"){
		console.log("act")
		for (let i = 0; i < activeGigsData.length; i++) {
			console.log(activeGigsData[i].gigId)
		}
		return activeGigsData
	}
	if (type === "available"){
		console.log("av")
		for (let i = 0; i < availableGigsData.length; i++) {
			console.log(availableGigsData[i].gigId)
		}
		return availableGigsData
	}
}



//Export non-temp functions and data here
export {
	getClientName,
	getOngoingGigs,
	getUser,
	getActiveGigs,
	activeGigsData,
	currentUser,
	switchUser,
	availableGigsData,
	setActiveGig,
	activeGig,
	applyForGig,
	finishDrive,
	addStartingTime,
	updateCurrentLocation,
	getFilteredItems,
	resetGigsProgress,
	getClientPhone,
	getClientEmail,
	getUpdatedData,
};
