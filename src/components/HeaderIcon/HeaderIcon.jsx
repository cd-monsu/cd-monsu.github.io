import React, { useState, useEffect } from "react";
import UserPict from "../../assets/Iqbal.png";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../pages/Auth/FirebaseAuth";
export default function HeaderIcon({ name }) {
  const [user, setUser] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (userData) => {
      if (userData) {
        setUser(userData);

        try {
          // Mengambil data tambahan dari Firestore
          const docRef = doc(db, "userInfo", userData.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // Jika dokumen ada, atur informasi tambahan ke dalam state
            setAdditionalInfo(docSnap.data());
          } else {
            console.log("Dokumen tidak ditemukan!");
          }
        } catch (error) {
          console.error("Error fetching additional info:", error);
        }
      } else {
        // Pengguna tidak masuk, arahkan ke halaman login
        navigate("temperature-monitoring-app/login");
      }
    });

    // Bersihkan langganan saat komponen dibongkar
    return () => unsubscribe();
  }, [navigate]);
  return (
    <div className="mx-auto mb-10 mt-4 w-[85%]">
      <div className="flex items-center justify-end gap-2">
        {user && additionalInfo && (
          <p className="text-right text-sm font-bold text-teal-800">
            {additionalInfo.NamaLengkap}
          </p>
        )}
        <img
          src={UserPict}
          alt="user"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>
    </div>
  );
}
