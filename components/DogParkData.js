import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

/* Firestore config */
const firestoreConfig = JSON.parse(process.env.EXPO_PUBLIC_FIRESTORE);
const app = initializeApp(firestoreConfig);
const firestoreDB = getFirestore(app);

/* Fetch dog park data from API and save it to Firestore */
export const fetchDogParkData = async () => {
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
            return {
                /* Save id, name, address and location */
                id: dogpark.id,
                name: dogpark.name && dogpark.name.fi ? dogpark.name.fi : "",
                address: dogpark.street_address && dogpark.street_address.fi ? dogpark.street_address.fi : "",
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

        setLoading(false);

    } catch (error) {
        console.error("Error fetching dog park data: " + error);
    }
}


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