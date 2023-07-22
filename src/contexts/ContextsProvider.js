import { AuthProvider } from "./AuthContext";
import { FirebaseProvider } from "./FirebaseContext";
import { PostsProvider } from "./PostsContext";

const ContextsProvider = ({ children }) => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <PostsProvider>
          {children}
        </PostsProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
};

export default ContextsProvider;
