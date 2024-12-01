export const transformGoogleDriveUrl = (url: string): string | null => {
  if (!url.startsWith('https://drive.google.com')) return null;

  const regex = /\/d\/([^/]+)\/view/;
  const match = url.match(regex);

  if (match && match[1]) {
    const id = match[1];
    return `https://lh3.googleusercontent.com/d/${id}`;
  }

  return null;
};
