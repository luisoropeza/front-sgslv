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
        component: () => import("@/pages/dashboard.vue"),
      },
      {
        path: "profile",
        name: "admin-profile",
        component: () => import("@/pages/admin/profile.vue"),
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
        path: "employee/:employeeId/request/:requestId",
        name: "admin-employee-request",
        component: () => import("@/pages/admin/request.vue"),
      },
    ],
  },
  {
    path: "/employee",
    name: "employee",
    component: () => import("@/layouts/employee.vue"),
    redirect: "/employee/home",
    meta: {
      title: "Dashboard",
    },
    children: [
      {
        path: "home",
        name: "employee-home",
        component: () => import("@/pages/dashboard.vue"),
      },
      {
        path: "profile",
        name: "employee-profile",
        component: () => import("@/pages/employee/profile.vue"),
      },
      {
        path: "requests",
        name: "employee-requests",
        component: () => import("@/pages/employee/requests.vue"),
      },
      {
        path: "request/:id",
        name: "employee-request",
        component: () => import("@/pages/employee/request.vue"),
      },
    ],
  },
  {
    path: "/personal",
    name: "personal",
    component: () => import("@/layouts/personal.vue"),
    redirect: "/personal/home",
    meta: {
      title: "Dashboard",
    },
    children: [
      {
        path: "home",
        name: "personal-home",
        component: () => import("@/pages/dashboard.vue"),
      },
      {
        path: "profile",
        name: "personal-profile",
        component: () => import("@/pages/personal/profile.vue"),
      },
      {
        path: "users",
        name: "personal-employees",
        component: () => import("@/pages/personal/users.vue"),
      },
      {
        path: "user/:id",
        name: "personal-employee",
        component: () => import("@/pages/personal/user.vue"),
      },
      {
        path: "requests",
        name: "personal-requests",
        component: () => import("@/pages/personal/requests.vue"),
      },
      {
        path: "employee/:employeeId/request/:requestId",
        name: "personal-employee-request",
        component: () => import("@/pages/personal/request.vue"),
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
      "admin-employee-request",
    ],
  },
  EMPLOYEE: {
    allowedRoutes: [
      "employee",
      "employee-home",
      "employee-profile",
      "employee-requests",
      "employee-request",
    ],
  },
  PERSONAL: {
    allowedRoutes: [
      "personal",
      "personal-home",
      "personal-profile",
      "personal-employees",
      "personal-employee",
      "personal-requests",
      "personal-employee-request",
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
      } else if (role === "EMPLOYEE") {
        next({ name: "employee-home" });
      } else if (role === "PERSONAL") {
        next({ name: "personal-home" });
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
        } else if (role === "EMPLOYEE") {
          next({ name: "employee-home" });
        } else if (role === "PERSONAL") {
          next({ name: "personal-home" });
        }
      }
    }
  }
});
export default router;
