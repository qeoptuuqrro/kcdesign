// Utility function to get the correct path with base URL
export const getAssetPath = (path) => {
  if (!path) return path;
  if (path.startsWith("http")) return path; // Already absolute URL
  if (!path.startsWith("/")) return path; // Relative path
  
  // Add base URL for absolute paths
  return import.meta.env.BASE_URL.replace(/\/$/, "") + path;
};
