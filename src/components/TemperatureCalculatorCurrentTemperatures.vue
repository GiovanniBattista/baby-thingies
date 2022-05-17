<template>
  <f7-list-item accordion-item accordion-item-opened>
    <template v-slot:title>2. Temperaturen
      <f7-chip color="red">{{currentTemperatureHotWater}}°C</f7-chip>/<f7-chip color="blue">{{currentTemperatureColdWater}}°C</f7-chip>
    </template>
    <f7-accordion-content>

      <f7-list>
        <f7-list-input
          name="currentTemperatureHotWater" 
          v-model:value="currentTemperatureHotWater" 
          type="number" 
          label="Heißes Wasser"
          @change="$emit('update:hot', parseInt($event.target.value))"
          :error-message="composeErrors(v$.currentTemperatureHotWater.$errors)"
          :error-message-force="v$.currentTemperatureHotWater.$errors.length > 0"
          outline
          floating-label
          clear-button
        />

        <f7-list-input
          name="currentTemperatureColdWater" 
          v-model:value="currentTemperatureColdWater" 
          type="number"
          label="Kaltes Wasser"
          @change="$emit('update:hot', parseInt($event.target.value))"
          :error-message="composeErrors(v$.currentTemperatureColdWater.$errors)"
          :error-message-force="v$.currentTemperatureColdWater.$errors.length > 0"
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
  name: "TemperatureCalculatorCurrentTemperatures",

  components: {
  },

  setup() {
    return { 
      v$: useValidate() 
    }
  },

  props: {
    hot: Number,
    cold: Number,
  },

  emits: [ 'update:hot', 'update:cold' ],

  data() {
    return {
      currentTemperatureHotWater: this.hot,
      currentTemperatureColdWater: this.cold,
    }
  },

  computed: {
    currentTemperatureHotWaterErrors() {
      return 
    },
    currentTemperatureColdWaterErrors() {
      return v$.currentTemperatureColdWater.$errors.toString()
    },
  },

  methods: {
    composeErrors( errors ) {
      return errors.map(error => error.$message).toString()
    }
  },

  validations() {
    return {
      currentTemperatureHotWater: { 
        required, 
        decimal, 
        minValue: minValue(40),
        $autoDirty: true },
      currentTemperatureColdWater: { 
        required, 
        decimal, 
        $autoDirty: true },
    }
  }
}
</script>

<style lang="scss" scoped>

</style>