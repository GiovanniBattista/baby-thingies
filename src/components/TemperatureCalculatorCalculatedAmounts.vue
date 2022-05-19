<template>
  <f7-block-title>Benötigte Mengen</f7-block-title>
    <f7-row>
      <f7-col>
        <span class="result-text">Heißes Wasser </span>
        <f7-chip color="red">{{ hot }}ml</f7-chip>
      </f7-col>
      <f7-col>
        <span class="d-flex result-text">Kaltes Wasser </span>
        <f7-chip color="blue">{{ cold }}ml</f7-chip>
      </f7-col>
    </f7-row>
</template>

<script>
export default {
  props: {
    hot: Number,
    cold: Number,
  }
}
</script>

<style lang="scss" scoped>
.result-text {
  width: 130px;
}
</style>