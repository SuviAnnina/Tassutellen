import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { firestoreDB } from './Firestore';

/* Fetch dog beach data from API and save it to Firestore collection "dogbeaches" */
export const fetchDogBeachAPIData = async () => {
    const url = process.env.EXPO_PUBLIC_DOGBEACHES;
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Error in dog beach API fetch: " + response.statusText);
        }
        const dogBeachData = await response.json();
        console.log(dogBeachData);

        /* Map through all of the data and save relevant info */
        const mappedDogBeachData = dogBeachData.results.map(dogbeach => {
            if (!dogbeach.location || !dogbeach.location.coordinates) {
                return null;
            }

            const capitalizeFirstLetter = (string) => {
                return string.charAt(0).toUpperCase() + string.slice(1);
            };

            return {
                /* Save id, name, address, city and location */
                id: dogbeach.id,
                name: dogbeach.name && dogbeach.name.fi ? dogbeach.name.fi : "", // poor naming in API, same as dog parks despite being beaches
                address: dogbeach.street_address && dogbeach.street_address.fi ? dogbeach.street_address.fi : "",
                city: capitalizeFirstLetter(dogbeach.municipality),
                location: {
                    latitude: dogbeach.location.coordinates[1],
                    longitude: dogbeach.location.coordinates[0]
                }
            };

            /* Filter items: null items (beaches without location) are filtered out */
        }).filter(Boolean);

        /* Add dogbeach objects as documents to Firestore collection dogbeaches */
        if (mappedDogBeachData.length > 0) {
            mappedDogBeachData.forEach(async (dogbeach) => {
                try {
                    const docRef = await addDoc(collection(firestoreDB, "dogbeaches"), dogbeach);
                } catch (error) {
                    console.error("Error adding document to firestore database for dogbeaches: " + error);
                }
            });
        } else {
            console.log("No dog beach data");
        }
    }
    catch (error) {
        console.error("Error fetching dog beach data: " + error);
        throw error;
    }
}

/* Get dogbeaches from Firestore */
export const DogBeachDataFS = async () => {
    try {
        const querySnapshot = await getDocs(collection(firestoreDB, "dogbeaches"));

        // Map through all the documents in the collection and save them to data
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return data;
    } catch (error) {
        console.error("Error fetching dog beach data from Firestore: " + error);
        return [];
    }
};

/* Delete all documents in the "dogbeaches" collection */
export const deleteAllDogBeachDocuments = async () => {
    try {
        // Get all documents in the "dogbeaches" collection
        const querySnapshot = await getDocs(collection(firestoreDB, "dogbeaches"));

        // Delete each document
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            console.log(`Document with ID ${doc.id} deleted successfully from dogbeaches.`);
        });

        console.log("All documents in dogbeaches collection successfully deleted.");
    } catch (error) {
        console.error("Error deleting dog beach documents: " + error);
    }
};