
export const can = (permission, action) => {
  switch (action) {
    case "user":
      if (permission[7] == "1") {
        return true;
      } else {
        return false;
      }
      break;
    case "manage":
      if (permission[6] == "1") {
        return true;
      } else {
        return false;
      }
      break;
    case "admin":
      if (permission[5] == "1") {
        return true;
      } else {
        return false;
      }
      break;
    default:
      return false;
      break;
  }
};