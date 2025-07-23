import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get("/auth/profile");
                setUser(data);
            } catch {
                setUser(null);
            }
        };
        if (localStorage.getItem("accessToken")) fetchProfile();
    }, []);

    const login = (user, accessToken) => {
        setUser(user);
        localStorage.setItem("accessToken", accessToken);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("accessToken");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);