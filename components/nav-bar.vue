<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <nuxt-link class="navbar-brand" to="/">Healthier Recipes</nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto justify-content-center">
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            class="nav-item dropdown"
          >
            <a
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              >{{ item.title }}</a
            >
            <div class="dropdown-menu">
              <nuxt-link
                v-for="(subItem, subIndex) in item.subItems"
                :key="subIndex"
                class="dropdown-item"
                :to="subItem.link"
                >{{ subItem.name }}
                <div
                  v-if="subIndex < item.subItems.length - 1"
                  class="dropdown-divider"
                />
              </nuxt-link>
            </div>
          </li>
          <li class="nav-item dropdown nav-item-user">
            <a
              id="navbarDropdown"
              class="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-circle" style="font-size: 18px" />
            </a>
            <div
              class="dropdown-menu dropdown-menu-end dropdown-menu-user"
              ref="dropdownMenu"
              aria-labelledby="navbarDropdown"
            >
              <template v-if="!isAdmin">
                <nuxt-link class="dropdown-item" to="/user/member/myProfile"
                  >My Profile
                </nuxt-link>
                <div class="dropdown-divider" />
                <nuxt-link class="dropdown-item" to="/user/member/myRecipeList"
                  >My Recipes
                </nuxt-link>
                <div class="dropdown-divider" />
                <nuxt-link class="dropdown-item" to="/user/member/savedList"
                  >Saved Recipes
                </nuxt-link>
                <div class="dropdown-divider" />
                <nuxt-link class="dropdown-item" to="/user/member/myReview"
                  >My Reviews
                </nuxt-link>
                <div class="dropdown-divider" />
                <nuxt-link class="dropdown-item" to="/user/member/shoppingList"
                  >Shopping List
                </nuxt-link>
                <div class="dropdown-divider" />
              </template>
              <template v-if="isAdmin">
                <nuxt-link class="dropdown-item" to="/user/admin/dashboard"
                  >Dashboard
                </nuxt-link>
                <div class="dropdown-divider" />
                <nuxt-link class="dropdown-item" to="/user/admin/memberManage"
                  >Manage Members
                </nuxt-link>
                <div class="dropdown-divider" />
                <nuxt-link class="dropdown-item" to="/user/admin/memberReport"
                  >Member Reports
                </nuxt-link>
                <div class="dropdown-divider" />
                <nuxt-link class="dropdown-item" to="/user/admin/recipeReport"
                  >Recipe Reports
                </nuxt-link>
                <div class="dropdown-divider" />
                <nuxt-link
                  class="dropdown-item"
                  to="/user/admin/generateCsvReport"
                  >Generate Csv
                </nuxt-link>
                <div class="dropdown-divider" />
              </template>
              <template v-if="isLoggedIn">
                <nuxt-link class="dropdown-item" @click="logout"
                  >Logout
                </nuxt-link>
              </template>
              <template v-else>
                <nuxt-link class="dropdown-item" to="/user/login"
                  >Login
                </nuxt-link>
                <div class="dropdown-divider"></div>
                <nuxt-link class="dropdown-item" to="/user/register"
                  >Register
                </nuxt-link>
              </template>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const isLoggedIn = authStore.isLoggedIn;
const logout = () => {
  useAuthStore().logout();
  navigateTo('/user/login');
};
const menuItems = reactive([
  {
    title: 'Cuisine',
    subItems: [
      { name: 'African', link: '/?query=african' },
      { name: 'American', link: '/?query=american' },
      { name: 'Asian', link: '/?query=asian' },
      { name: 'Italian', link: '/?query=italian' },
      { name: 'Mexican', link: '/?query=mexican' },
      { name: 'French', link: '/?query=french' },
      { name: 'Indian', link: '/?query=indian' },
    ],
  },
  {
    title: 'Type of Dish',
    subItems: [
      { name: 'Appetizers', link: '/?query=appetizers' },
      { name: 'Breakfast', link: '/?query=breakfast' },
      { name: 'Desserts', link: '/?query=desserts' },
      { name: 'Main Dish', link: '/?query=main-dish' },
      { name: 'Salads', link: '/?query=salads' },
      { name: 'Soups-Stews', link: '/?query=soup' },
      { name: 'Snacks', link: '/?query=snack' },
    ],
  },
  {
    title: 'Cooking Method',
    subItems: [
      { name: 'Baking', link: '/?query=baking' },
      { name: 'Grilling', link: '/?query=grilling' },
      { name: 'Slow-Cooker', link: '/?query=slow' },
      { name: 'Stir-Fry', link: '/?query=stir' },
      { name: 'No-Cook', link: '/?query=no-cook' },
      { name: 'Roasting', link: '/?query=roasting' },
      { name: 'Fry', link: '/?query=fry' },
    ],
  },
  {
    title: 'Dietary Considerations',
    subItems: [
      { name: 'Vegan', link: '/?query=vegan' },
      { name: 'Vegetarian', link: '/?query=vege' },
      { name: 'Gluten-Free', link: '/?query=gluten' },
      { name: 'Low-Carb', link: '/?query=low-carb' },
      { name: 'Diabetic', link: '/?query=diabetic' },
      { name: 'Low-Fat', link: '/?query=low-fat' },
      { name: 'High-Protein', link: '/?query=high-protein' },
    ],
  },
  {
    title: 'Ingredients',
    subItems: [
      { name: 'Chicken', link: '/?query=chicken' },
      { name: 'Beef', link: '/?query=beef' },
      { name: 'Pasta', link: '/?query=pasta' },
      { name: 'Chocolate', link: '/?query=chocolate' },
      { name: 'Vegetables', link: '/?query=vegetables' },
      { name: 'Pork', link: '/?query=pork' },
      { name: 'Cheese', link: '/?query=cheese' },
    ],
  },
  {
    title: 'Occasions and Events',
    subItems: [
      { name: 'Christmas', link: '/?query=christmas' },
      { name: 'Easter', link: '/?query=easter' },
      { name: 'Thanksgiving', link: '/?query=thanksgiving' },
      { name: 'Birthday', link: '/?query=birthday' },
      { name: 'Wedding', link: '/?query=wedding' },
      { name: 'Halloween', link: '/?query=halloween' },
      { name: 'New Year', link: '/?query=new-year' },
    ],
  },
  {
    title: 'Preparation Time and Difficulty',
    subItems: [
      { name: '15-Minutes-or-Less', link: '/?query=15' },
      { name: '30-Minutes-or-Less', link: '/?query=30' },
      { name: 'Easy', link: '/?query=easy' },
      { name: 'Beginner-Cook', link: '/?query=beginner-cook' },
      { name: 'Quick-and-Easy', link: '/?query=quick-and-easy' },
      { name: 'Kid-Friendly', link: '/?query=kid-friendly' },
      { name: 'Make-Ahead', link: '/?query=make-ahead' },
    ],
  },
]);
const isAdmin = ref(false); // Replace with actual logic to determine if the user is an admin
</script>

<style scoped>
.navbar-brand {
  font-size: 2rem; /* 设置标题字体大小 */
  font-weight: bold; /* 加粗字体 */
  color: #2c7a7b; /* 设置一个柔和的绿色，强调健康 */
  text-transform: uppercase; /* 将文本全部转换为大写 */
  background: linear-gradient(
    to right,
    #2c7a7b,
    #6fd6ce
  ); /* 添加渐变背景效果 */
  -webkit-background-clip: text; /* 使文字本身有渐变效果 */
  display: inline-block; /* 让背景色和边框适应文字大小 */
  padding: 10px 15px; /* 给标题增加内边距 */
  border-radius: 5px; /* 圆角边框 */
}

.navbar-brand::after {
  display: block;
  margin-top: 5px;
  width: 80%;
  height: 2px;
  background: #2c7a7b; /* 设置与文字相同的颜色 */
  margin-left: auto;
  margin-right: auto;
}

.navbar-brand:hover {
  transform: scale(1.05); /* 鼠标悬停时放大标题 */
  transition: transform 0.3s ease; /* 添加平滑过渡效果 */
}

.navbar-nav {
  display: flex;
  flex-wrap: wrap; /* 允许导航栏在宽度不够时自动换行 */
  justify-content: center;
}

.nav-item {
  position: relative;
}

.navbar-collapse {
  justify-content: center;
}

.no-caret .dropdown-toggle::after {
  display: none;
}

.navbar a {
  font-size: 1rem; /* 设置字体大小，适合导航栏 */
  font-weight: bold; /* 设置粗体，使其与标题一致 */
  text-decoration: none; /* 移除默认的下划线 */
  text-transform: uppercase; /* 全部字母大写，保持一致风格 */
  padding: 10px 15px; /* 给导航栏链接增加内边距，增加点击区域 */
  transition: color 0.3s ease; /* 添加颜色变化的平滑过渡效果 */
  border-radius: 5px;
}

.navbar a:hover {
  color: #38b2ac; /* 鼠标悬停时使用一个稍浅的颜色，与标题保持风格一致 */
  text-decoration: none; /* 鼠标悬停时添加下划线，突出链接 */
}

.dropdown-menu {
  padding: 0; /* 确保没有多余的内边距 */
  margin: 0; /* 确保没有多余的外边距 */
  font-size: 1rem; /* 字体大小与导航栏保持一致 */
  font-weight: bold; /* 粗体文字 */
  color: #2c7a7b; /* 设置与商标一致的颜色 */
  text-transform: uppercase; /* 全部字母大写 */
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease; /* 平滑过渡效果 */
}

.dropdown-menu-user {
  padding: 0; /* 确保没有多余的内边距 */
  margin: 0; /* 确保没有多余的外边距 */
  font-size: 1rem; /* 字体大小与导航栏保持一致 */
  font-weight: bold; /* 粗体文字 */
  color: #2c7a7b; /* 设置与商标一致的颜色 */
  text-transform: uppercase; /* 全部字母大写 */
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease; /* 平滑过渡效果 */
  left: auto;
  right: 0;
}

.nav-item-user:hover .dropdown-menu {
  display: block;
  opacity: 1;
  left: auto;
  right: 0;
}

.dropdown-menu-user:hover {
  left: auto;
  right: 0;
}

.dropdown-item {
  text-decoration: none; /* 移除默认的下划线 */
  padding: 10px 20px; /* 给每个菜单项设置相同的内边距 */
  font-size: 1rem; /* 保持文字大小一致 */
  font-weight: bold; /* 粗体文字 */
  color: #3f3f3f; /* 设置颜色 */
  text-transform: uppercase; /* 全部字母大写 */
  cursor: pointer;
  border-bottom: none; /* 先去掉默认的边框 */
  transition:
    background-color 0.3s ease,
    color 0.3s ease; /* 添加平滑过渡效果 */
  border-bottom: 1px solid #bdbdbd; /* 通过 border-bottom 设置分割线 */
}

.dropdown-divider {
  display: none; /* 隐藏分割线 */
}

.nav-item:last-child {
  border-bottom: none; /* 最后一个菜单项不要分隔线 */
}

.nav-item:hover .dropdown-menu {
  display: block;
  opacity: 1;
}

.nav-item a:hover {
  background-color: #4cae4c;
  color: white;
  transition: background-color 0.3s ease;
}

.dropdown-submenu .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: -1px;
}

.nav-item.dropdown:hover {
  right: 0 !important;
  left: auto !important;
}
</style>
