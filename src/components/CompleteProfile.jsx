// import { useState } from "react";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import { useAuth } from "../contexts/AuthProvider";
// import "./completeProfile.css";
// import { useParams } from "react-router-dom";

// const CompleteProfile = () => {
//   const tags = [
//     "Arts",
//     "Business",
//     "Communication",
//     "Economics",
//     "Engineering",
//     "Fine Arts",
//     "History",
//     "Journalism",
//     "Law",
//     "Indigenous Languages",
//     "Medicine & Health",
//     "Nursing",
//     "Physics",
//     "Science",
//     "Social Work",
//     "Chinese",
//     "Exchange Student",
//     "White",
//     "Black Canadian",
//     "South Asian",
//     "First Nations",
//     "East Asian",
//     "Southeast Asian",
//     "Arab",
//     "Latin American",
//     "West Asian",
//     "Visible Minorities",
//     "Other",
//     "Prefer Not To Say",
//   ];

//   const [selectedTags, setSelectedTags] = useState([]);
//   const { currentUser } = useAuth();
//   const { var1, var2 } = useParams();
//   // console.log(var1, var2);

//   const handleTagClick = (tag) => {
//     if (selectedTags.includes(tag)) {
//       setSelectedTags(
//         selectedTags.filter((selectedTag) => selectedTag !== tag)
//       );
//     } else {
//       setSelectedTags([...selectedTags, tag]);
//     }
//   };

//   const handleSaveToFirebase = async () => {
//     try {
//       const userProfileData = {
//         userId: currentUser.uid,
//         tags: selectedTags,
//         firstName: var1,
//         lastName: var2,
//       };
//       await addDoc(collection(db, "user_profile"), userProfileData);

//       console.log("Tags saved to Firebase user_profile collection");
//     } catch (error) {
//       console.error("Error saving tags to Firebase:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Select Tags</h1>
//       <div className="tags">
//         {tags.map((tag) => (
//           <button
//             key={tag}
//             className={selectedTags.includes(tag) ? "selected" : ""}
//             onClick={() => handleTagClick(tag)}
//           >
//             {tag}
//           </button>
//         ))}
//       </div>
//       <button onClick={handleSaveToFirebase}>Submit</button>
//     </div>
//   );
// };

// export default CompleteProfile;
