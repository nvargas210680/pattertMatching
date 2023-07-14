import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { db } from "../firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";

function SuggestedScholarships() {
  const [userProfile, setUserProfile] = useState();
  const [scholarships, setScholarships] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userCollection = collection(db, "user_profile");
      const userQuery = query(
        userCollection,
        where("userId", "==", currentUser.uid)
      );

      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        const doc = userSnapshot.docs[0];
        const docData = doc.data();
        setUserProfile(docData);

        const scholarshipsCollection = collection(db, "scholarships2");
        const scholarshipsQuery = query(
          scholarshipsCollection,
          where("tag", "in", docData.tags)
        );

        const scholarshipsSnapshot = await getDocs(scholarshipsQuery);
        const scholarshipData = [];
        scholarshipsSnapshot.forEach((doc) => {
          const data = doc.data();
          scholarshipData.push({ id: doc.id, ...data });
        });
        setScholarships(scholarshipData);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  return (
    <div>
      <div>{userProfile?.firstName}</div>
      <div>
        {userProfile?.tags && (
          <table>
            <thead>
              <tr>
                <th>Scholarship</th>
                <th>Deadline</th>
                <th>URL</th>
                <th>Value</th>
                <th>Demographic</th>
                <th>Requirements</th>
                <th>Tag</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((scholarship) => (
                <tr key={scholarship.id}>
                  <td>{scholarship.scholarship}</td>
                  <td>{scholarship.deadline}</td>
                  <td>{scholarship.url}</td>
                  <td>{scholarship.value}</td>
                  <td>{scholarship.demographic}</td>
                  <td>{scholarship.requirements}</td>
                  <td>{scholarship.tag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SuggestedScholarships;
