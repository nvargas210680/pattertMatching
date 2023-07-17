import { useState } from "react";
import {
  collection,
  setDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthProvider";
import "./completeProfile.css";
import { useNavigate, useParams } from "react-router-dom";

const CompleteProfile2 = () => {
  const tags = [
    "Arts",
    "master",
    "Business",
    "Communication",
    "Economics",
    "Engineering",
    "Fine Arts",
    "History",
    "Journalism",
    "Law",
    "Indigenous Languages",
    "Medicine & Health",
    "Nursing",
    "Physics",
    "Science",
    "Social Work",
    "Chinese",
    "Exchange Student",
    "White",
    "Black Canadian",
    "South Asian",
    "First Nations",
    "East Asian",
    "Southeast Asian",
    "Arab",
    "Latin American",
    "West Asian",
    "Visible Minorities",
    "Other",
    "Prefer Not To Say",
  ];

  const [selectedTags, setSelectedTags] = useState([]);
  const { currentUser } = useAuth();
  const { var1, var2 } = useParams();
  const navigate = useNavigate();

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSaveToFirebase = async () => {
    try {
      const userProfileRef = doc(db, "user_profile", currentUser.uid);
      const userProfileData = {
        userId: currentUser.uid,
        firstName: var1,
        lastName: var2,
        tags: selectedTags,
      };

      await Promise.all([
        setDoc(userProfileRef, userProfileData),
        // saveTagsToFirebase(),
      ]);

      console.log("Tags saved to Firebase user_profile collection");
      navigate("suggested-scholarship");
      // Find collection based on selected tags
      const q = query(
        collection(db, "scholarships2"),
        where("tag", "in", selectedTags)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        // Perform actions with the matched documents
      });

      // Navigate to the "suggested-scholarship" page
      navigate("/complete-profile/:var1/:var2/suggested-scholarship");
    } catch (error) {
      console.error("Error saving tags to Firebase:", error);
    }
  };

  return (
    <div>
      <h1>Select Tags</h1>
      <div className="tags">
        {tags.map((tag) => (
          <button
            key={tag}
            className={selectedTags.includes(tag) ? "selected" : ""}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <button onClick={handleSaveToFirebase}>Submit</button>
    </div>
  );
};

export default CompleteProfile2;
