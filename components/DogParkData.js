import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import firestoreDB from './Firestore';


/* Fetch dog park data from API and save it to Firestore */
export const fetchDogParkAPIData = async () => {
    const urls = process.env.EXPO_PUBLIC_DOGPARKS.split(',');
    try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(response => response.json()));

        /* Map through all of the data + flatten result */
        const dogParkData = data.flatMap(allData => allData.results.map(dogpark => {

            /* if dogpark does not have location or location coordinates, return null in its place */
            if (!dogpark.location || !dogpark.location.coordinates) {
                return null;
            }

            const capitalizeFirstLetter = (str) => {
                return str.charAt(0).toUpperCase() + str.slice(1);
            };

            return {
                /* Save id, name, address, city and location */
                id: dogpark.id,
                name: dogpark.name && dogpark.name.fi ? dogpark.name.fi : "",
                address: dogpark.street_address && dogpark.street_address.fi ? dogpark.street_address.fi : "",
                city: capitalizeFirstLetter(dogpark.municipality),
                location: {
                    latitude: dogpark.location.coordinates[1],
                    longitude: dogpark.location.coordinates[0]
                }
            };

            /* filter items: null items (parks without location) are filtered out */
        }).filter(Boolean));

        /* Add dogpark objects as documents to Firestore */
        if (dogParkData.length > 0) {
            dogParkData.forEach(async (dogpark) => {
                try {
                    const docRef = await addDoc(collection(firestoreDB, "dogparks"), dogpark);
                } catch (error) {
                    console.error("Error adding document to firestore database: " + error);
                }
            });
        } else {
            console.log("No dogpark data");
        }

    } catch (error) {
        console.error("Error fetching dog park data: " + error);
    }
};

/* Get dogparks from Firestore */
export const DogParkDataFS = async () => {
    try {
        const querySnapshot = await getDocs(collection(firestoreDB, "dogparks"));

        // map through all the documents in the collection and save them to data
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return data;
    } catch (error) {
        console.error("Error fetching dog park data: " + error);
        return [];
    }
};

// delete all documents in the "dogparks" collection
export const deleteAllDocuments = async () => {
    try {
        // Get all documents in the "dogparks" collection
        const querySnapshot = await getDocs(collection(firestoreDB, "dogparks"));

        // Delete each document
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            console.log(`Document with ID ${doc.id} deleted successfully.`);
        });

        console.log("All documents in dogparks collection successfully deleted.");
    } catch (error) {
        console.error("Error deleting documents: " + error);
    }
};