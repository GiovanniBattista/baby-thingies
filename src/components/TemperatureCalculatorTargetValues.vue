<template>
  <f7-list-item accordion-item>
    <template v-slot:title>1. Fläschchen ({{ targetAmount }}ml/{{ targetTemperature }}°C)</template>
    <f7-accordion-content>
      <f7-block>
        <f7-row>
          <f7-col>
            Menge (ml)<br>
            <f7-stepper
              name="targetAmount" 
              type="number"
              v-model:value="targetAmount"
              @change="$emit('update:amount', parseInt($event.target.value))"
              outline
              :min="30"
              :max="210"
              :step="30"
              large
            />
          </f7-col>

          <f7-col>
            Zieltemperatur<br>
            <f7-stepper
              name="targetTemperature"
              type="number" 
              v-model:value="targetTemperature" 
              @change="$emit('update:temperature', parseInt($event.target.value))"
              outline
              large
            />
          </f7-col>
        </f7-row>
      </f7-block>
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