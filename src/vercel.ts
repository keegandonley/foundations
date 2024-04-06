export const getFullyQualifiedDeploymentUrl = async (
  path: `/${string}`,
  importHeaders?: () => Promise<any>,
  defaultPort = "3000"
) => {
  if (process.env.NODE_ENV === "development") {
    const port = process.env.PORT || defaultPort;
    return { url: `http://localhost:${port}${path}` };
  }

  let host = null;
  let cookie;

  if (typeof window === "undefined" && importHeaders) {
    const getHeaders = await importHeaders();
    const headersList = getHeaders();
    host = headersList.get("host") || "keegan.codes";
    cookie = headersList.get("cookie");
  }

  return {
    url: host ? getUrlFromHost(host, path) : path,
    headers: cookie ? { cookie } : undefined,
  };
};

export const getUrlFromHost = (host: string | null, path?: `/${string}`) => {
  if (host?.includes("localhost")) {
    return `http://${host}${path}`;
  }

  return `https://${host}${path}`;
};

export const getCookieDomain = () => {
  return process.env.NODE_ENV === "development" ? "localhost" : "keegan.codes";
};
