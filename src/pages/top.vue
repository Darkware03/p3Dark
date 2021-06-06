<template>
  <div class="q-pa-md">
    <q-card class="q-gutter-md row items-startq-px-sm window-height" dark>
      <!-- notice "basic" prop (which disables default animation) -->
      <q-img
      v-for="item in detalleAlbum"
        :src="item.images[0].url"
        :ratio="1"
        basic
        spinner-color="white"
        class="rounded-borders"
      >
        <div class="absolute-bottom text-center text-italic text-body2">
         <div class="text-bold">{{item.name}}</div>
         <!-- <div>Canciones: {{item.tracks.total}}</div> -->
         <div class="">
         <q-btn @click="AbrirSpotify(item.uri)" outline 
         color="positive"
         label='abrir en SPOTIFY'></q-btn>
         </div>
         <div>
           {{item.description}}
         </div>
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: 'https://placeimg.com/500/300/nature',
      transitions: [
        'slide-right',
      ],
        detalleAlbum:[],
        token:'BQAmRLfcdTPXFkn7w--BfwhIsP8zyINgIf0PpHyh_EAuENnUdC50bOrdd-I-zyhOa7f3ZpdDJ-PagYj4L1H8uKzy37SZa0Uo2U6ueI8PDR-jIJks0Mt5RsWnaRvESUR57WHJb1KzhMqbG-SbEtoQ-_2uv15pdapEyifHKRJbMtF6C6pVMgLgn354m1-nkyB-SBy5qFTs5H9SgJgsUB2aLbU9OtHRRuBSmEXci-0qitx7JuFkh1viGRpYD8ANICBZOcbPuqs5ZeDH8RvmgZ8s-LV1y8OhY8O_4FEC7BOh'
    
    }
  },

  methods: {
    trigger () {
      this.url = 'https://placeimg.com/500/300/nature?t=' + Math.random()
    },
      obtenerAlbum(){
        this.$axios.get('https://api.spotify.com/v1/browse/featured-playlists',{
          headers:{
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": 'Bearer '+ this.token}
        })
          .then((response) => {
            console.log(response.data.playlists.items)
           this.detalleAlbum = response.data.playlists.items
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
      AbrirSpotify(link){
        window.location.href = link
      }
  },
  mounted(){
    this.obtenerAlbum()
  }
}
</script>