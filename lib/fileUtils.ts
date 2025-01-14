export const addPhotos = (
  prevFiles: File[],
  newFiles: File[],
  maxLength: number
): File[] => {
  const updatedFiles = [...prevFiles, ...newFiles];
  return updatedFiles.slice(0, maxLength);
};

export const deletePhoto = (prevFiles: File[], fileToDelete: File): File[] => {
  return prevFiles.filter((file) => file !== fileToDelete);
};
