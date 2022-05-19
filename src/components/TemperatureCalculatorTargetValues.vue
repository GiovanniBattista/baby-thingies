<template>
  <f7-list-item accordion-item>
    <template v-slot:title>1. Fläschchen ({{ targetAmount }}ml/{{ targetTemperature }}°C)</template>
    <f7-accordion-content>
      <f7-list>
        <f7-list-input 
          name="targetAmount" 
          label="Menge (ml)"
          type="number"
          v-model:value="targetAmount"
          @change="$emit('update:amount', parseInt($event.target.value))"
          floating-label
          outline
          clear-button
        />

        <f7-list-input
          name="targetTemperature"
          label="Zieltemperatur"
          type="number" 
          v-model:value="targetTemperature" 
          @change="$emit('update:temperature', parseInt($event.target.value))"
          outline
          floating-label
          clear-button
        />
      </f7-list>
    </f7-accordion-content>
  </f7-list-item>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, minValue, decimal } from '@vuelidate/validators'

export default {

  name: "TemperatureCalculatorTargetValues",

  components: {
  },

  props: { 
    amount: Number, 
    temperature: Number,
  },

  emits: [ 'update:amount', 'update:temperature' ],

  setup() {
    return { 
      v$: useValidate() 
    }
  },

  data() {
    return {
      targetAmount: this.amount,
      targetTemperature: this.temperature,
    }
  },

  validations() {
    return {
      targetAmount: { 
        required,
        decimal,
        minValue: minValue(10),
        $autoDirty: true },
      targetTemperature: { 
        required, 
        decimal, 
        minValue: minValue(40),
        $autoDirty: true },
    }
  }
}
</script>

<style lang="scss" scoped>

</style>