<template>
   <q-layout >
      <q-header>
     <q-card class="q-py-sm q-px-lg" flat square dark>
      <div class="row">
        <div class="col">
        <q-input outlined dark v-model="nombre_cancion" class="color-red" label-color="positive"
        label="Busca tu cancion favorita" color="green" dense/>
        </div>
        <div class="q-pl-sm">
          <q-btn round color="positive" icon="search" @click="obtenerCancion()"/>
        </div>
      </div>
     </q-card>
      </q-header>
 <q-page-container>
  <q-page padding>        
     <q-card dark flat>
    <q-list bordered class="q-pt-sm q-pb-xl">
      <q-item clickable v-ripple v-for="items in canciones_list" class="text-bold q-px-md q-pb-sm" :to="'/download/detalles/'+items.id">
        <q-item-section avatar class="q-pl-lg">
          <q-avatar rounded>
            <img :src="items.album.images[0].url">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="">{{items.name}}</q-item-label>
          <q-item-label caption lines="2" class="text-xs text-grey-7">{{items.album.name}} / {{items.album.release_date}}</q-item-label>
        </q-item-section>
      <!-- <q-item-section side><q-icon name="get_app" color="positive" size="sm" /></q-item-section> -->
      </q-item>
    </q-list>
     </q-card>
     <p v-if="canciones_list.length<=0" class="text-white text-bold text-center">Busca canciones...</p>
    </q-page>
   </q-page-container>
  </q-layout>
</template>
<script lang="ts">
export default {
    data:() => ({
        buscador:null,
        nombre_cancion:null,
        canciones_list:[],
        token:'BQB6JudOGb4_oNz-nTyMmRA94Yg58Rokg8nPQxBAf1KSzbCgGdPoedEVg_o_aqTfvZkDuY38zbUqvhnoB5kFjln4cOhImQCO5I0A_IzA76JJBtSN3B2KBchW_Zjf8J6oTDN-SrPXWbnxmgKZ8rfDMT7RrpVdw2LB5Jp7miGM4E6T8SHZu69uQ8IW5P8B7Pj1PHxdz7F03YyVRKCvXB6cZiG2pYOHS_0b-wRw0bu4AViokveg8UHuNlszcLqjRyoAABqiOrFmwuG81vF4LBwmQI76n9t2BKKYC0pVI4CH'

    }),
    methods:{
      obtenerCancion(){
        this.$axios.get('https://api.spotify.com/v1/search?q='+this.nombre_cancion+'&type=track',{
          headers:{
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": 'Bearer '+ this.token
          }
        })
          .then((response) => {            
            if (response.data.tracks.items.length>0) {   
                console.log(response.data.tracks.items)
                this.canciones_list = response.data.tracks.items
            }else{
            this.$q.notify({
              color: 'amber',
              position: 'top',
              textColor: 'black',
              message: 'Esta cancion parece que no existe, comprueba haber escrito bien el nombre',
              icon: 'report_problem'
            })            
            }
          })
          .catch(() => {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'ERROR CON EL SERVIDOR',
              icon: 'report_problem'
            })
          })
      },
    },
    mounted(){
    }
}
</script>