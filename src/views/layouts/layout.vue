<script setup>
import Header from './header.vue'
import Loading from './loading.vue'
import { useSidePanelStore } from '@stores/side_panel/store'

const sidePanelStore = useSidePanelStore()
</script>

<template>
  <div class="h-full bg-gray-100 dark:bg-neutral-900">
    <template v-if="sidePanelStore.isLoading">
      <Loading />
    </template>
    <template v-else>
      <Header />

      <slot></slot>
    </template>
  </div>
</template>
