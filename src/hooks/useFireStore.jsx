// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   orderBy,
//   query,
//   serverTimestamp,
//   updateDoc,
//   where,
// } from "firebase/firestore";
// import { useEffect, useRef, useState } from "react";
// import { db } from "../Firebase";

// export default function useFireStore() {
//   let getCollection = (collectionName, _q) => {
//     let qRef = useRef(_q).current;
//     let [error, setError] = useState("");
//     let [loading, setLoading] = useState(false);
//     let [data, setData] = useState([]);

//     useEffect(
//       function () {
//         setLoading(true);
//         let ref = collection(db, collectionName);

//         let queires = [];
//         if (qRef) {
//           queires.push(where(...qRef));
//         }
//         queires.push(orderBy("date", "desc"));
//         let q = query(ref, ...queires);
//         onSnapshot(q, (docs) => {
//           if (docs.empty) {
//             setError("No Result Found!");
//             setData([]);
//           } else {
//             let collectionDatas = [];
//             docs.forEach((doc) => {
//               let document = { id: doc.id, ...doc.data() };
//               collectionDatas.push(document);
//             });
//             setData(collectionDatas);
//             setLoading(false);
//             setError("");
//           }
//         });
//       },
//       [qRef]
//     );

//     return { error, loading, data };
//   };

//   //.............................
//   let getDocument = (collectionName, id) => {
//     let [error, setError] = useState("");
//     let [loading, setLoading] = useState(false);
//     let [data, setData] = useState(null);

//     useEffect(
//       function () {
//         setLoading(true);
//         let ref = doc(db, collectionName, id);

//         onSnapshot(ref, (doc) => {
//           if (!doc.exists()) {
//             setError("No Result Found!");
//             setLoading(false);
//           } else {
//             let document = { id: doc.id, ...doc.data() };

//             setData(document);
//             setLoading(false);
//             setError("");
//           }
//         });
//       },
//       [id]
//     );

//     return { error, loading, data };
//   };
//   //.............................
//   let addCollection = async (collectionName, data) => {
//     data.date = serverTimestamp();
//     let ref = collection(db, collectionName);
//     await addDoc(ref, data);
//   };

//   //.............................
//   let deleteDocument = async (collectionName, id) => {
//     let ref = doc(db, collectionName, id);
//     return deleteDoc(ref);
//   };

//   //.............................
//   let updateDocument = async (collectionName, id, data) => {
//     // data.date = serverTimestamp();
//     let ref = doc(db, collectionName, id);
//     return updateDoc(ref, data);
//   };

//   //.............................

//   return {
//     getCollection,
//     getDocument,
//     addCollection,
//     deleteDocument,
//     updateDocument,
//   };
// }

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../Firebase";

//✅ Hook to get a collection
export function useGetCollection(collectionName, _q) {
  const qRef = useRef(_q).current;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const ref = collection(db, collectionName);

    let queries = [];
    if (qRef) {
      queries.push(where(...qRef));
    }
    queries.push(orderBy("date", "desc"));

    const q = query(ref, ...queries);

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          setError("No Result Found!");
          setData([]);
        } else {
          const documents = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(documents);
          setError("");
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [collectionName, qRef]);

  return { error, loading, data };
}

// export function useGetCollection(collectionName, conditionArray) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!collectionName || !conditionArray) {
//       setLoading(false);
//       return; // 🔥 do NOT create a listener if not ready
//     }

//     const [fieldPath, opStr, value] = conditionArray;
//     const colRef = collection(db, collectionName);
//     const q = query(colRef, where(fieldPath, opStr, value));

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const results = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setData(results);
//         setLoading(false);
//       },
//       (err) => {
//         console.error("Error fetching collection:", err);
//         setError(err);
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, [collectionName, conditionArray]);

//   return { data, loading, error };
// }

// ✅ Hook to get a single document
export function useGetDocument(collectionName, id) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const ref = doc(db, collectionName, id);

    const unsub = onSnapshot(
      ref,
      (docSnap) => {
        if (!docSnap.exists()) {
          setError("No Result Found!");
          setData(null);
        } else {
          setData({ id: docSnap.id, ...docSnap.data() });
          setError("");
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [collectionName, id]);

  return { error, loading, data };
}

// ✅ Simple Firestore functions (no hooks needed)
export async function addCollection(collectionName, data) {
  data.date = serverTimestamp();
  const ref = collection(db, collectionName);
  return addDoc(ref, data);
}

export async function deleteDocument(collectionName, id) {
  const ref = doc(db, collectionName, id);
  return deleteDoc(ref);
}

export async function updateDocument(collectionName, id, data) {
  const ref = doc(db, collectionName, id);
  return updateDoc(ref, data);
}

// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   orderBy,
//   query,
//   serverTimestamp,
//   updateDoc,
//   where,
// } from "firebase/firestore";
// import { useEffect, useRef, useState } from "react";
// import { db } from "../Firebase"; // Make sure this is correctly configured

// // ✅ Hook to get a collection safely
// export function useGetCollection(collectionName, conditionArray) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (
//       !collectionName ||
//       !Array.isArray(conditionArray) ||
//       conditionArray.length !== 3 ||
//       conditionArray.some((item) => item === undefined || item === null)
//     ) {
//       // console.warn("Invalid Firestore query input:", conditionArray);
//       setError("Invalid Firestore query conditions.");
//       setLoading(false);
//       return;
//     }

//     const [fieldPath, opStr, value] = conditionArray;

//     try {
//       const colRef = collection(db, collectionName);
//       const q = query(colRef, where(fieldPath, opStr, value));

//       const unsubscribe = onSnapshot(
//         q,
//         (snapshot) => {
//           const results = snapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));
//           setData(results);
//           setError(null);
//           setLoading(false);
//         },
//         (err) => {
//           console.error("Firestore Listen Error:", err.message);
//           setError(err.message);
//           setLoading(false);
//         }
//       );

//       return () => unsubscribe();
//     } catch (err) {
//       console.error("Firestore Query Setup Error:", err.message);
//       setError(err.message);
//       setLoading(false);
//     }
//   }, [collectionName, conditionArray]);

//   return { data, loading, error };
// }

// // ✅ Hook to get a single document
// export function useGetDocument(collectionName, id) {
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     if (!collectionName || !id) {
//       setError("Invalid document path");
//       setLoading(false);
//       return;
//     }

//     const ref = doc(db, collectionName, id);

//     const unsub = onSnapshot(
//       ref,
//       (docSnap) => {
//         if (!docSnap.exists()) {
//           setError("No Result Found!");
//           setData(null);
//         } else {
//           setData({ id: docSnap.id, ...docSnap.data() });
//           setError("");
//         }
//         setLoading(false);
//       },
//       (err) => {
//         setError(err.message);
//         setLoading(false);
//       }
//     );

//     return () => unsub();
//   }, [collectionName, id]);

//   return { error, loading, data };
// }

// // ✅ Add a document
// export async function addCollection(collectionName, data) {
//   try {
//     data.date = serverTimestamp();
//     const ref = collection(db, collectionName);
//     return await addDoc(ref, data);
//   } catch (err) {
//     console.error("Add Error:", err.message);
//     throw err;
//   }
// }

// // ✅ Delete a document
// export async function deleteDocument(collectionName, id) {
//   try {
//     const ref = doc(db, collectionName, id);
//     return await deleteDoc(ref);
//   } catch (err) {
//     console.error("Delete Error:", err.message);
//     throw err;
//   }
// }

// // ✅ Update a document
// export async function updateDocument(collectionName, id, data) {
//   try {
//     const ref = doc(db, collectionName, id);
//     return await updateDoc(ref, data);
//   } catch (err) {
//     console.error("Update Error:", err.message);
//     throw err;
//   }
// }
