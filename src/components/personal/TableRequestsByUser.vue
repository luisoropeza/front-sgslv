<template>
  <v-table class="wrap-table-r" density="compact">
    <thead>
      <tr>
        <th class="text-left"><strong>User</strong></th>
        <th class="text-left"><strong>Team</strong></th>
        <th class="text-left"><strong>Reason</strong></th>
        <th class="text-left"><strong>Status</strong></th>
        <th class="text-left"><strong>Created At</strong></th>
        <th class="text-center"><strong>Actions</strong></th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!requests.length">
        <td colspan="6" class="no-requests">There's no request yet.</td>
      </tr>
      <tr v-else v-for="request in requests" :key="request.id">
        <td class="font-weight-medium">
          {{ request.user.firstName }} {{ request.user.lastName }}
        </td>
        <td class="font-weight-medium">
          {{ request.user?.team?.name ? request.user.team.name : "N/A" }}
        </td>
        <td class="font-weight-medium">{{ request.reason }}</td>
        <td class="font-weight-medium">
          <span
            class="px-3 rounded-lg"
            :class="
              request.status === 'Pending'
                ? 'wrap-span-reason-pending'
                : request.status === 'Rejected'
                ? 'wrap-span-reason-rejected'
                : 'wrap-span-reason-approved'
            "
            >{{ request.status }}</span
          >
        </td>
        <td class="font-weight-medium">
          {{ format(request.createdAt, "short") }}
        </td>
        <td class="text-center">
          <v-btn
            color="blue-accent-3"
            size="x-small"
            :to="{
              name: 'personal-employee-request',
              params: { employeeId: request.user.id, requestId: request.id },
            }"
          >
            <v-icon icon="mdi-eye" size="20" />
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { format } from "@formkit/tempo";

const prop = defineProps(["requests"]);
</script>

<style scoped>
.wrap-table-r {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}
.no-requests {
  text-align: center;
  color: gray;
  font-style: italic;
}
.wrap-span-reason-pending {
  background-color: #fff59d;
  color: #f9a825;
}
.wrap-span-reason-rejected {
  background-color: #ef9a9a;
  color: #c62828;
}
.wrap-span-reason-approved {
  background-color: #a5d6a7;
  color: #2e7d32;
}
</style>
