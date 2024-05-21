import jwt from "jsonwebtoken";

interface JwtPayload {
  exp: number;
  [key: string]: any; // Для включения дополнительных полей
}

export const isTokenExpired = (token: string ): boolean => {
  try {
    const decoded = jwt.decode(token) as JwtPayload | null;
    if (!decoded || !decoded.exp) {
      // Если токен не декодируется или не содержит поля exp, считаем его истекшим
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах
    return decoded.exp < currentTime;
  } catch (err) {
    // В случае ошибки при декодировании считаем токен истекшим
    return true;
  }
};

