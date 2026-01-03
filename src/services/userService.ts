import { db } from "./firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  increment,
  doc,
  updateDoc,
} from "firebase/firestore";

// Guard: Ensure Firebase is initialized (client-side only)
const ensureDb = () => {
  if (!db) {
    throw new Error('Firebase is not initialized. This function must be called on the client side.');
  }
  return db;
};





export const checkUserExists = async (phone: string) => {
  const database = ensureDb();
  const usersRef = collection(database, "wings_users");
  const q = query(usersRef, where("phone", "==", phone));
  const snap = await getDocs(q);
  return !snap.empty;
};

export const checkStudentLoginUserExists = async (phone: string) => {
  const database = ensureDb();
  const studentsRef = collection(database, "wings_student_login");
  const q = query(studentsRef, where("phone", "==", phone));
  const snap = await getDocs(q);
  return !snap.empty;
};

export const getStudentLoginUserByPhone = async (phone: string) => {
  const database = ensureDb();
  const studentsRef = collection(database, "wings_student_login");
  const q = query(studentsRef, where("phone", "==", phone));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const userDoc = snap.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  }
  return null;
};

export const checkEmailExists = async (email: string) => {
  const database = ensureDb();
  const usersRef = collection(database, "wings_users");
  const q = query(usersRef, where("email", "==", email));
  const snap = await getDocs(q);
  return !snap.empty;
};

export const getUserByPhone = async (phone: string) => {
  const database = ensureDb();
  const usersRef = collection(database, "wings_users");
  const q = query(usersRef, where("phone", "==", phone));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const userDoc = snap.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  }
  return null;
};

export const getUserByEmail = async (email: string) => {
  const database = ensureDb();
  const usersRef = collection(database, "wings_users");
  const q = query(usersRef, where("email", "==", email));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const userDoc = snap.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  }
  return null;
};


export const registerUser = async (userData: any) => {
  try {
    const database = ensureDb();
    const usersRef = collection(database, "wings_users");

    // 1️⃣ CHECK IF USER ALREADY EXISTS
    const q = query(usersRef, where("email", "==", userData.email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return "EXISTS"; // user already has an account
    }

    // 2️⃣ CONVERT BRANCH ID TO BRANCH NAME
    // let branchName = '';
    // if (userData.isEECAgent === 'Yes' && userData.branch) {
    //   const branch = BRANCHES.find(b => b.identifier === userData.branch);
    //   branchName = branch ? branch.name : '';
    // }

    // 3️⃣ CONVERT STATE CODE TO STATE NAME
    // let stateName = '';
    // if (userData.state) {
    //   const state = STATES.find(s => s.code === userData.state);
    //   stateName = state ? state.name : userData.state;
    // }

    // 4️⃣ CREATE NEW USER
    await addDoc(usersRef, {
      ...userData,
      // state: stateName, // Save state name instead of code
      // targetCountry: userData.targetCountry || 'New Zealand', // Ensure targetCountry is saved (default to USA if not provided)
      // isEECAgent: userData.isEECAgent || '', // Save EEC agent status
      // branch: branchName, // Save branch name instead of ID
      // isVerified: true,
      count: 0, // Initialize count to 0 for new users
      createdAt: serverTimestamp(),
    });

    return "CREATED"; // new user created successfully

  } catch (error) {
    return "ERROR";
  }
};

export const incrementPrepPlanCount = async (email: string) => {
  try {
    const database = ensureDb();
    const usersRef = collection(database, "wings_users");
    
    // Find user by email
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: "User not found" };
    }

    // Get the first matching user document
    const userDoc = querySnapshot.docs[0];
    const userRef = doc(database, "wings_users", userDoc.id);

    // Increment the count field (initializes to 0 if it doesn't exist)
    await updateDoc(userRef, {
      count: increment(1),
      lastUpdated: serverTimestamp(),
    });

    return { success: true };

  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};

// Save quick inquiry to "Wings Quick Inquiry" collection
// No restrictions - allows multiple submissions from same phone/email
export const saveQuickInquiry = async (inquiryData: any) => {
  try {
    const database = ensureDb();
    const inquiriesRef = collection(database, "wings_quick_inquiry");
    
    // Save inquiry without checking for duplicates (allows multiple submissions)
    await addDoc(inquiriesRef, {
      ...inquiryData,
      createdAt: serverTimestamp(),
    });

    return "CREATED"; // inquiry saved successfully

  } catch (error) {
    console.error("Error saving quick inquiry:", error);
    return "ERROR";
  }
};

// Save franchise application to "wings_franchise_application" collection
// No restrictions - allows multiple submissions from same phone/email
export const saveFranchiseApplication = async (applicationData: any) => {
  try {
    const database = ensureDb();
    const applicationsRef = collection(database, "wings_franchise_application");
    
    // Save application without checking for duplicates (allows multiple submissions)
    await addDoc(applicationsRef, {
      ...applicationData,
      createdAt: serverTimestamp(),
    });

    return "CREATED"; // application saved successfully

  } catch (error) {
    console.error("Error saving franchise application:", error);
    return "ERROR";
  }
};


export const registerStudentLoginUser = async (userData: any) => {
  try {
    const database = ensureDb();
    const studentsRef = collection(database, "wings_student_login");

    // 1️⃣ CHECK IF USER ALREADY EXISTS
    const q = query(studentsRef, where("email", "==", userData.email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return "EXISTS"; // user already has an account
    }

    // 2️⃣ CONVERT BRANCH ID TO BRANCH NAME
    // let branchName = '';
    // if (userData.isEECAgent === 'Yes' && userData.branch) {
    //   const branch = BRANCHES.find(b => b.identifier === userData.branch);
    //   branchName = branch ? branch.name : '';
    // }

    // 3️⃣ CONVERT STATE CODE TO STATE NAME
    // let stateName = '';
    // if (userData.state) {
    //   const state = STATES.find(s => s.code === userData.state);
    //   stateName = state ? state.name : userData.state;
    // }

    // 4️⃣ CREATE NEW USER
    await addDoc(studentsRef, {
      ...userData,
      // state: stateName, // Save state name instead of code
      // targetCountry: userData.targetCountry || 'New Zealand', // Ensure targetCountry is saved (default to USA if not provided)
      // isEECAgent: userData.isEECAgent || '', // Save EEC agent status
      // branch: branchName, // Save branch name instead of ID
      // isVerified: true,
      createdAt: serverTimestamp(),
    });

    return "CREATED"; // new user created successfully

  } catch (error) {
    return "ERROR";
  }
};


export const registerEventRegistrationUser = async (userData: any) => {
  try {
    const database = ensureDb();
    const eventRegistrationsRef = collection(database, "wings_event_registrations");

    // 1️⃣ CHECK IF USER ALREADY EXISTS
    const q = query(eventRegistrationsRef, where("phone", "==", userData.phone) && where("event_id", "==", userData.event_id));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return "EXISTS"; // user already has an account
    }

    // 2️⃣ CREATE NEW USER
    await addDoc(eventRegistrationsRef, {
      ...userData,
      createdAt: serverTimestamp(),
    });

    return "CREATED"; // new user created successfully
  } catch (error) {
    return "ERROR";
  }
};