<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-positive" >
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-center text-bold">
          SPOTDOWNLOAD
        </q-toolbar-title>

        <div>spotdownload v 1.0.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8 text-center"
        >
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view class="bg-dark"/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'
const linksData = [
  {
    title: 'Top Spotify',
    caption: 'canciones mas famosas',
    icon: 'star',
    link: '/top'
  },
  {
    title: 'Busca y descarga',
    caption: 'busca y descarga musica de spotify',
    icon: 'get_app',
    link: '/download'
  },
  {
    title: 'Quienes somos?',
    caption: 'Conoce mas sobre el grupo 6',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
];

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink },
  setup() {
    const leftDrawerOpen = ref(false);
    const essentialLinks = ref(linksData);
    const darkmode = false
    return {leftDrawerOpen, essentialLinks, darkmode}
  }
});
</script>
