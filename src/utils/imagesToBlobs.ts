type Color = {
  name: string;
  hexColor: string;
};

type Size = {
  id: number;
  name: string;
  quantity: number;
};

type ColorItem = {
  id: number; // This is colorId
  color: Color;
  sizes: Size[];
  images: string[]; // URLs of images
  status: boolean;
};

type ConvertedColorImages = {
  colorId: number; // This corresponds to `id` from ColorItem
  images: string[]; // Array of Blob URLs
};

export async function convertImagesToBlobs(
  selectedBlobImages: { id: number; images: string[] }[] // Partial structure
): Promise<ConvertedColorImages[]> {
  const convertedData = await Promise.all(
    selectedBlobImages.map(async ({ id, images }) => {
      // Convert images to Blobs and then generate Blob URLs
      const blobUrls = await Promise.all(
        images.map(async (imageUrl) => {
          try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
              throw new Error(`Failed to fetch image: ${imageUrl}`);
            }
            const blob = await response.blob();
            return URL.createObjectURL(blob); 
          } catch (error) {
            console.error(`Error fetching image URL (${imageUrl}):`, error);
            throw error;
          }
        })
      );

      return { colorId: id, images: blobUrls };
    })
  );

  return convertedData;
}


