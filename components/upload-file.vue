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
    <img :src="fileLink" alt="Uploaded File" />
  </div>
</template>

<script setup lang="ts">
const s3 = useS3();
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
  s3.uploadFile(
    isUploading,
    uploadSuccess,
    errorMessage,
    uploadProgress,
    fileLink,
    selectedFile.value
  );
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
img {
  max-width: 300px;
  max-height: 300px;
}
</style>
