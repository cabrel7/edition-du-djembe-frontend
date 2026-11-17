<template>
  <img
    v-if="src && !broken"
    ref="img"
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    loading="lazy"
    decoding="async"
    :class="imgClass"
    @error="onError"
  />
  <slot v-else name="fallback">
    <div :class="[imgClass, 'bg-secondary flex items-center justify-center']" role="img" :aria-label="alt">
      <ImageOff class="w-1/2 h-1/2 text-muted-foreground" />
    </div>
  </slot>
</template>

<script>
import { ImageOff } from 'lucide-vue-next'
import { retryImage, resetImageRetry } from '@/utils/imageRetry'

// Image de liste admin : chargement différé, dimensions réservées (pas de saut de
// mise en page), nouvelles tentatives différées puis repli (icône ou slot `fallback`).
export default {
  name: 'ListImage',

  components: { ImageOff },

  props: {
    src: { type: String, default: '' },
    alt: { type: String, default: '' },
    width: { type: Number, default: undefined },
    height: { type: Number, default: undefined },
    imgClass: { type: String, default: '' }
  },

  data() {
    return {
      broken: false,
      cancelRetry: null
    }
  },

  watch: {
    src() {
      // Nouvelle source : on repart de zéro (compteur de tentatives et repli).
      this.clearPendingRetry()
      this.broken = false
      resetImageRetry(this.$refs.img)
    }
  },

  beforeUnmount() {
    this.clearPendingRetry()
  },

  methods: {
    onError(event) {
      this.clearPendingRetry()
      this.cancelRetry = retryImage(event, () => { this.broken = true })
    },

    clearPendingRetry() {
      if (this.cancelRetry) this.cancelRetry()
      this.cancelRetry = null
    }
  }
}
</script>
