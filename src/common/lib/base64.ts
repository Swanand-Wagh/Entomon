export const convertFileToBase64 = async (file: File) => {
  const reader = new FileReader();

  return new Promise<string>((resolve, reject) => {
    reader.onload = () => {
      const base64String = reader.result?.toString().split(',')[1]; // Strip the data prefix
      if (base64String) {
        resolve(base64String);
      } else {
        reject('Failed to convert file to Base64.');
      }
    };
    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
};
