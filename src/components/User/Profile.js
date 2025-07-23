import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  if (!user) return <div>Loading...</div>;
  return (
    <div>
      <h2>Profile</h2>
      <div>Username: {user.username}</div>
      <div>Email: {user.email}</div>
      <div>Role: {user.role}</div>
      {user.profilePic && <img src={`${process.env.REACT_APP_API_URL}/${user.profilePic}`} alt="Profile" width={100} />}
    </div>
  );
}