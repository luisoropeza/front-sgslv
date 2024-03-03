/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
    meta: {
      title: "Welcome to License App",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/layouts/admin.vue"),
    redirect: "/admin/home",
    meta: {
      title: "Dashboard",
    },
    children: [
      {
        path: "home",
        name: "admin-home",
        component: () => import("@/pages/both/dashboard.vue"),
      },
      {
        path: "profile",
        name: "admin-profile",
        component: () => import("@/pages/both/profile.vue"),
      },
      {
        path: "teams",
        name: "admin-teams",
        component: () => import("@/pages/admin/teams.vue"),
      },
      {
        path: "team/:id",
        name: "admin-team",
        component: () => import("@/pages/admin/team.vue"),
      },
      {
        path: "users",
        name: "admin-users",
        component: () => import("@/pages/admin/users.vue"),
      },
      {
        path: "/user/:id",
        name: "admin-user",
        component: () => import("@/pages/admin/user.vue"),
      },
      {
        path: "requests",
        name: "admin-requests",
        component: () => import("@/pages/admin/requests.vue"),
      },
      {
        path: "user/:userId/request/:requestId",
        name: "admin-user-request",
        component: () => import("@/pages/admin/request.vue"),
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/layouts/user.vue"),
    redirect: "/user/home",
    meta: {
      title: "Dashboard",
    },
    children: [
      {
        path: "home",
        name: "user-home",
        component: () => import("@/pages/both/dashboard.vue"),
      },
      {
        path: "profile",
        name: "user-profile",
        component: () => import("@/pages/both/profile.vue"),
      },
      {
        path: "requests",
        name: "user-requests",
        component: () => import("@/pages/user/requests.vue"),
      },
      {
        path: "request/:id",
        name: "user-request",
        component: () => import("@/pages/user/request.vue"),
      },
    ],
  },
  {
    path: "/404",
    name: "Error404",
    component: () => import("@/pages/Error404.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const roleRoutesMap = {
  ADMIN: {
    allowedRoutes: [
      "admin",
      "admin-home",
      "admin-profile",
      "admin-teams",
      "admin-team",
      "admin-users",
      "admin-user",
      "admin-requests",
      "admin-user-request",
    ],
  },
  USER: {
    allowedRoutes: [
      "user",
      "user-home",
      "user-profile",
      "user-requests",
      "user-request",
    ],
  },
};

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  document.title = to.meta.title || "Bienvenido a tu Licencia App";

  if (!token) {
    if (to.name !== "login") {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    if (to.name === "login") {
      if (role === "ADMIN") {
        next({ name: "admin-home" });
      } else if (role === "USER") {
        next({ name: "user-home" });
      } else {
        next();
      }
    } else {
      const allowedRoutes = roleRoutesMap[role].allowedRoutes;
      if (allowedRoutes.includes(to.name)) {
        next();
      } else {
        if (role === "ADMIN") {
          next({ name: "admin-home" });
        } else if (role === "USER") {
          next({ name: "user-home" });
        }
      }
    }
  }
});
export default router;
