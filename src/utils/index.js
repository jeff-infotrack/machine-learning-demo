export const getUriQueryParameter = (search, name) => {
  let queryString = search;
  let result = '';

  if (search) {
    queryString = search.substring(1);
    if (name) {
      queryString.split('&').forEach((item) => {
        if (!result) {
          const [key, value] = item.split('=');
          if (key.trim().toLowerCase() === name.trim().toLowerCase()) {
            result = value;
          }
        }
      });
    } else {
      result = queryString;
    }
  }

  return result;
};

export const { developerMode } = window;
