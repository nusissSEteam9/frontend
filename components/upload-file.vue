<template>
  <!-- Same as before, with an enhanced progress bar -->
  <div class="upload-container">
    <h2>Upload a File to S3</h2>
    <input type="file" @change="onFileChange" />
    <button :disabled="!selectedFile || isUploading" @click="uploadFile">
      {{ isUploading ? 'Uploading...' : 'Upload' }}
    </button>
    <div v-if="uploadSuccess" class="success">File uploaded successfully!</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="uploadProgress > 0 && uploadProgress < 100">
      Upload Progress: {{ uploadProgress }}%
      <progress :value="uploadProgress" max="100"></progress>
    </div>
    <img v-if="uploadSuccess" :src="fileLink" alt="no image" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedFile = ref<undefined | File>(undefined);
const fileLink = ref('');
const isUploading = ref(false);
const uploadSuccess = ref(false);
const errorMessage = ref('');
const uploadProgress = ref(0);

// Handle file selection
const onFileChange = (event: any) => {
  const file = event.target.files[0] as File;
  if (file) {
    // Example: Allow only images less than 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      alert('Only JPEG, PNG, and GIF files are allowed.');
      return;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 5MB.');
      return;
    }

    selectedFile.value = file;
    uploadSuccess.value = false;
    errorMessage.value = '';
    uploadProgress.value = 0;
  }
};

// Upload file using XMLHttpRequest for progress tracking
const uploadFile = async () => {
  if (!selectedFile.value) {
    alert('Please select a file first.');
    return;
  }

  isUploading.value = true;
  uploadSuccess.value = false;
  errorMessage.value = '';
  uploadProgress.value = 0;

  try {
    const presignedUrl = await useS3().getPresignedUrl(selectedFile.value);
    if (!presignedUrl) {
      errorMessage.value = 'Failed to get a presigned URL. Please try again.';
      isUploading.value = false;
      return;
    }
    // Step 2: Upload the file to S3 using XMLHttpRequest for progress
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', presignedUrl, true);
    xhr.setRequestHeader('Content-Type', selectedFile.value.type);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        uploadProgress.value = Math.round((event.loaded / event.total) * 100);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        uploadSuccess.value = true;
        fileLink.value = presignedUrl.split('?')[0];
      } else {
        errorMessage.value = 'Failed to upload the file. Please try again.';
      }
      isUploading.value = false;
    };

    xhr.onerror = () => {
      errorMessage.value = 'Failed to upload the file. Please try again.';
      isUploading.value = false;
    };

    xhr.send(selectedFile.value);
  } catch (error) {
    console.error('Upload Error:', error);
    errorMessage.value = 'Failed to upload the file. Please try again.';
    isUploading.value = false;
  }
};
</script>

<style scoped>
.upload-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.success {
  color: green;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}

progress {
  width: 100%;
  height: 20px;
  margin-top: 10px;
}
</style>
