<template>
  <f7-block strong>
    <f7-row>
      <f7-col>
        Heißes Wasser<br>
        <f7-stepper
          name="currentTemperatureHotWater" 
          v-model:value="currentTemperatureHotWater" 
          type="number"
          @change="$emit('update:hot', parseInt($event.target.value))"
          :error-message="composeErrors(v$.currentTemperatureHotWater.$errors)"
          :error-message-force="v$.currentTemperatureHotWater.$errors.length > 0"
          outline
          large
          color="red"
          :min="40"
          :max="100"
        />
      </f7-col>

      <f7-col>
        Kaltes Wasser<br>
        <f7-stepper
          name="currentTemperatureColdWater" 
          v-model:value="currentTemperatureColdWater" 
          type="number"
          @change="$emit('update:hot', parseInt($event.target.value))"
          :error-message="composeErrors(v$.currentTemperatureColdWater.$errors)"
          :error-message-force="v$.currentTemperatureColdWater.$errors.length > 0"
          outline
          large
          :min="-10"
          :max="100"
        />
      </f7-col>
    </f7-row>
  </f7-block>
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