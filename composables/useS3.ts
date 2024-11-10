import { useAuthStore } from '~/stores/auth';
export const useS3 = () => {
  const authStore = useAuthStore();
  const getPresignedUrl = async (selectedFile: File) => {
    try {
      const response = await $fetch<{ url: string }>(
        `/api/recipe/presigned-url/healthy-recipe-images/${selectedFile.name}`,
        {
          baseURL: `http://localhost:8080`,
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
  const uploadFile = async (
    isUploading: Ref<boolean>,
    uploadSuccess: Ref<boolean>,
    errorMessage: Ref<string>,
    uploadProgress: Ref<number>,
    fileLink: Ref<string>,
    selectedFile: File
  ) => {
    isUploading.value = true;
    uploadSuccess.value = false;
    errorMessage.value = '';
    uploadProgress.value = 0;

    try {
      const presignedUrl = await useS3().getPresignedUrl(selectedFile);
      if (!presignedUrl) {
        errorMessage.value = 'Failed to get a presigned URL. Please try again.';
        isUploading.value = false;
        return;
      }
      // Step 2: Upload the file to S3 using XMLHttpRequest for progress
      const xhr = new XMLHttpRequest();

      xhr.open('PUT', presignedUrl, true);
      xhr.setRequestHeader('Content-Type', selectedFile.type);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          uploadProgress.value = Math.round((event.loaded / event.total) * 100);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          uploadSuccess.value = true;
          return presignedUrl.split('?')[0];
        }
        isUploading.value = false;
      };

      xhr.onerror = () => {
        errorMessage.value = 'Failed to upload the file. Please try again.';
        isUploading.value = false;
      };

      xhr.send(selectedFile);
    } catch (error) {
      console.error('Upload Error:', error);
      errorMessage.value = 'Failed to upload the file. Please try again.';
      isUploading.value = false;
    }
  };
  return { getPresignedUrl, uploadFile };
};
