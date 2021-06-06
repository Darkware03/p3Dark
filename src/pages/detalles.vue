<template>
  <div>
    <q-card flat dark class="window-height" square>
        <q-card-section class="text-center">
            <q-img :src="detalleCancion.album.images[0].url" style="width:60%;"/>
        </q-card-section>
        <q-card-section>
            <q-item-label class="text-center text-bold">{{detalleCancion.name}}</q-item-label>
            <q-item-label caption lines="2" class="text-center text-grey-7" 
            v-for="item in detalleCancion.artists">
                {{item.name}} /
            </q-item-label>
        </q-card-section>
      <q-card-section class="text-center">
          <q-btn outline color="positive" label="Esuchar en SPOTIFY" @click="abrirSpotify(detalleCancion.uri)"/>
     </q-card-section>
      <q-card-section class="text-center">
          <q-icon name="get_app" color="green-8" size="xl" />
     </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
        detalleCancion:[],
        token:'BQB6JudOGb4_oNz-nTyMmRA94Yg58Rokg8nPQxBAf1KSzbCgGdPoedEVg_o_aqTfvZkDuY38zbUqvhnoB5kFjln4cOhImQCO5I0A_IzA76JJBtSN3B2KBchW_Zjf8J6oTDN-SrPXWbnxmgKZ8rfDMT7RrpVdw2LB5Jp7miGM4E6T8SHZu69uQ8IW5P8B7Pj1PHxdz7F03YyVRKCvXB6cZiG2pYOHS_0b-wRw0bu4AViokveg8UHuNlszcLqjRyoAABqiOrFmwuG81vF4LBwmQI76n9t2BKKYC0pVI4CH'
    }
  },

  methods: {
      obtenerCancionDetalle(){
        this.$axios.get('https://api.spotify.com/v1/tracks/'+this.$route.params.id,{
          headers:{
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": 'Bearer '+ this.token}
        })
          .then((response) => {
            console.log(response.data)
           this.detalleCancion = response.data
          })
          .catch(() => {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Loading failed',
              icon: 'report_problem'
            })
          })
      },
      abrirSpotify(link){
        window.location.href = link
      }
  },
  mounted(){
      this.obtenerCancionDetalle()
  }
}
</script>