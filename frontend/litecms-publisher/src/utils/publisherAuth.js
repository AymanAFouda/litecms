export function getPublisherAuth() {
  return sessionStorage.getItem("publisherAuth");
}

export function isPublisherLoggedIn() {
  return !!getPublisherAuth();
}

export function savePublisherAuth(authHeader) {
  sessionStorage.setItem("publisherAuth", authHeader);
}

export function clearPublisherAuth() {
  sessionStorage.removeItem("publisherAuth");
}

export function getAuthHeaders(extraHeaders = {}) {
  const auth = getPublisherAuth();

  return {
      ...(auth && { Authorization: auth }),
      ...extraHeaders,
  };
}