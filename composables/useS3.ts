import { useAuthStore } from '~/stores/auth';
export const useS3 = () => {
  const authStore = useAuthStore();
  const getPresignedUrl = async (selectedFile: File) => {
    try {
      const response = await $fetch<{ url: string }>(
        `/recipe/presigned-url/healthy-recipe-images/${selectedFile.name}`,
        {
          baseURL: `http://localhost:8080/api`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );
      return response.url;
    } catch (error) {
      console.error('Get Presigned URL Error:', error);
    }
  };

  const uploadFile = async (selectedFile: File) => {
    try {
      const presignedUrl = await getPresignedUrl(selectedFile);
      if (!presignedUrl) {
        throw new Error('Failed to get presigned URL.');
      }

      // Step 2: Upload the file to S3 using the pre-signed URL
      // Note: $fetch does not natively support tracking upload progress.
      // To track progress, you can use the native fetch with XMLHttpRequest or other methods.
      // Below is a simple upload without progress tracking.

      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': selectedFile.type,
        },
        body: selectedFile,
      });

      if (uploadResponse.ok) {
        const res = await uploadResponse.json();
        console.log('Upload Success:', res);
        return res;
      } else {
        throw new Error('Failed to upload file.');
      }
    } catch (error) {
      console.error('Upload Error:', error);
    }
  };
  return { uploadFile, getPresignedUrl };
};
