import jwt from "jsonwebtoken";

export default (request) => {
    const headerAuth = request.headers.authorization;
  
    if (!headerAuth) {
        return { isAuth: false }
    }
    
    const bearerToken = headerAuth.split(" ");

    if (!bearerToken) {
        return { isAuth: false };
    }

    try {
        const decodeToken = jwt.verify(bearerToken[1], process.env.JWT_SECRET);
        if (!!!decodeToken) {
            return { isAuth: false };
        }
    
        return { 
            isAuth: true, 
            user: decodeToken 
        }; 
    } catch (err) {
        return { isAuth: false };
    }

}