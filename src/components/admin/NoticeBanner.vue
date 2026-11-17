<template>
  <div
    v-if="notice"
    :role="notice.type === 'error' ? 'alert' : 'status'"
    :class="[
      'rounded-lg p-4 flex items-center justify-between gap-4 border',
      notice.type === 'error'
        ? 'bg-destructive/10 border-destructive/20 text-destructive'
        : 'bg-primary/10 border-primary/20 text-foreground'
    ]"
  >
    <p class="text-sm">{{ notice.text }}</p>
    <button
      type="button"
      class="border border-input bg-background hover:bg-accent px-3 py-2 rounded-md text-sm font-medium text-foreground"
      @click="$emit('close')"
    >
      Fermer
    </button>
  </div>
</template>

<script>
// Bandeau accessible : role="alert" pour une erreur, role="status" sinon.
// notice : { type: 'error' | 'success' | 'info', text: string } ou null.
export default {
  name: 'NoticeBanner',

  props: {
    notice: { type: Object, default: null }
  },

  emits: ['close']
}
</script>
