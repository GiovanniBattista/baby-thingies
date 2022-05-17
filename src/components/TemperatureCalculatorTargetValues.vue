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
          @change="$emit('update:amount', $event.target.value)"
          floating-label
          outline
          clear-button
        />

        <f7-list-input
          name="targetTemperature"
          label="Zieltemperatur"
          type="number" 
          v-model:value="targetTemperature" 
          @change="$emit('update:temperature', $event.target.value)"
          outline
          floating-label
          clear-button
        />
      </f7-list>
      <!--
      <div class="accordion-body">
        <div class="mb-3">
          <label for="targetAmount" class="form-label">Menge (ml)</label>

          <div class="input-group has-validation">
            <input 
              name="targetAmount" 
              type="number" 
              v-model="targetAmount" 
              class="form-control" 
              :class="{ 'is-invalid': v$.targetAmount.$error }"
              @change="$emit('update:amount', $event.target.value)">  
            <span class="input-group-text">ml</span>
            <form-control-error
              :errors="v$.targetAmount.$errors"
            ></form-control-error>
          </div>
        </div>
        <div>
          <label for="targetTemperature" class="form-label">Zieltemperatur</label>
          <div class="input-group has-validation">
            <input 
              name="targetTemperature" 
              type="number" 
              v-model="targetTemperature" 
              class="form-control" 
              :class="{ 'is-invalid': v$.targetTemperature.$error }"
              @change="$emit('update:temperature', $event.target.value)">
            <span class="input-group-text">°C</span>
            <form-control-error
              :errors="v$.targetTemperature.$errors"
            ></form-control-error>
          </div>
        </div>
      </div>
      -->
    </f7-accordion-content>
  </f7-list-item>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, minValue, decimal } from '@vuelidate/validators'
import FormControlError from '../components/FormControlError.vue'

export default {

  name: "TemperatureCalculatorTargetValues",

  components: {
    FormControlError
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