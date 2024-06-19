const emptyValidation = (body) => {
    for (const key in body) {
      if (!body[key]) {
        return false;
      }
    }
    return true;
  };
  