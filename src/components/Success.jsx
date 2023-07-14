import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/personal-information");
  };

  return (
    <>
      <div>Congratulations you are successfully registered!!!</div>
      <button onClick={handleNavigate}>Complete Profile</button>
    </>
  );
};

export default Success;
