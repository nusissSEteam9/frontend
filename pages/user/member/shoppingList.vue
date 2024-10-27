<template>
  <div class="container my-4 shopping-cart" style="max-width: 60%">
    <div class="text-center mb-4">
      <h2 class="text-center">Shopping Cart</h2>
    </div>

    <!-- Input field and Add button for adding new item -->
    <div class="input-group mb-3">
      <input
        v-model="newItemName"
        type="text"
        class="form-control"
        placeholder="Enter new item"
      />
      <button type="button" @click="addItem" class="btn btn-success">
        <i class="bi bi-plus"></i> Add
      </button>
    </div>

    <p v-if="shoppingList.length === 0" class="text-center text-muted">
      Your cart is empty
    </p>

    <table v-else class="table table-bordered align-middle">
      <thead class="table-light">
        <tr>
          <!-- Only show checkbox in edit mode -->
          <th v-if="isEditMode" style="width: 5%">Select</th>
          <th>Item</th>
          <th v-if="isEditMode" style="width: 10%">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in shoppingList" :key="item.id" style="height: 70px">
          <!-- Checkbox for selecting items in edit mode -->
          <td v-if="isEditMode">
            <input
              type="checkbox"
              class="form-check-input"
              v-model="item.isChecked"
            />
          </td>

          <!-- Item name -->
          <td
            :style="
              item.isChecked
                ? 'color: grey; text-decoration: line-through;'
                : ''
            "
          >
            {{ item.ingredientName }}
          </td>

          <!-- Delete button in edit mode -->
          <td v-if="isEditMode" class="text-center">
            <button
              type="button"
              @click="deleteItem(item.id)"
              class="btn btn-danger btn-sm"
            >
              <i class="bi bi-trash"></i> Delete
            </button>
          </td>
        </tr>
      </tbody>

      <!-- Footer for Delete Selected Button -->
      <tfoot v-if="isEditMode">
        <tr>
          <td colspan="5" class="text-end">
            <button
              type="button"
              @click="deleteSelectedItems"
              class="btn btn-danger"
            >
              <i class="bi bi-trash"></i> Delete Selected
            </button>
          </td>
        </tr>
      </tfoot>
    </table>

    <!-- Edit and Finish Editing Buttons -->
    <div class="d-flex justify-content-between">
      <button
        type="button"
        @click="toggleEditMode"
        class="btn btn-primary"
        style="margin-top: 10px"
      >
        <i class="bi" :class="isEditMode ? 'bi-check-circle' : 'bi-pencil'"></i>
        {{ isEditMode ? 'Finish Editing' : 'Edit' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

const shoppingList = ref([]);
const newItemName = ref('');
const isEditMode = ref(false); // Track whether in edit mode or not
const authStore = useAuthStore();
const config = useRuntimeConfig();

// Fetch shopping list from an API on component mount
onMounted(async () => {
  try {
    const data = await $fetch('/api/user/member/shoppingList/view', {
      baseURL: config.public.backendProxyUrl,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    shoppingList.value = data;
  } catch (error) {
    console.error('Failed to load shopping list:', error);
  }
});

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value;
};

const deleteItems = async (ids) => {
  try {
    await $fetch('/api/user/member/shoppingList/clearItems', {
      method: 'POST',
      baseURL: config.public.backendProxyUrl,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify({ ids }), // Pass the ids to the backend
    });
    // Remove the deleted items from the local shoppingList
    shoppingList.value = shoppingList.value.filter(
      (item) => !ids.includes(item.id)
    );
  } catch (error) {
    console.error('Failed to delete items:', error);
  }
};

const deleteItem = async (id) => {
  await deleteItems([id]);
};

const deleteSelectedItems = async () => {
  const selectedIds = shoppingList.value
    .filter((item) => item.isChecked)
    .map((item) => item.id);
  await deleteItems(selectedIds);
};

const addItem = async () => {
  if (!newItemName.value) return; // Avoid adding empty items
  try {
    const data = await fetch('/api/user/member/shoppingList/addItem', {
      method: 'POST',
      baseURL: config.public.backendProxyUrl,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify({ ingredientName: newItemName.value }),
    });
    // Add the new item to the shopping list
    shoppingList.value.push({
      id: data.id,
      ingredientName: newItemName.value,
      isChecked: false,
    });
    newItemName.value = ''; // Clear input field after adding
  } catch (error) {
    console.error('Failed to add item:', error);
  }
};
</script>

<style scoped>
.shopping-cart {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table {
  margin-bottom: 0;
}

.table th,
.table td {
  vertical-align: middle;
}
</style>
